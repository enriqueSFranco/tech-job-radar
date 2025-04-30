import { chromium, Page, Browser, BrowserContext } from "playwright";
import { Job } from "../../models/job.model";
import { AppError } from "../../shared/AppError";
import { slugify } from "../../shared/slugify";
import { SearchParams } from "./types";
import { OCC_BASE_URL } from "../../config/environment";

export class OccScraper {
  private browser!: Browser;
  private context!: BrowserContext;
  private page!: Page;
  private jobs: Job[] = [];
  protected url = new URL(`${OCC_BASE_URL}`);

  /**
   * Inicializa el navegador y la página con Playwright.
   * @returns {Promise<void>}
   * @throws {AppError} Si ocurre un error al inicializar Playwright.
   */
  public async init(): Promise<void> {
    try {
      console.log("🚀 Iniciando navegador...");
      this.browser = await chromium.launch({ headless: false });
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
    } catch (err) {
      throw new AppError("Fallo al inicializar Playwright", 500, true);
    }
  }

  /**
   * Realiza una búsqueda de trabajos según palabra clave y ubicación.
   * @param {SearchParams} params - Parámetros de búsqueda.
   * @returns {Promise<void>}
   * @throws {AppError} Si ocurre un error durante la búsqueda.
   */
  public async search({ keyword, location }: SearchParams): Promise<void> {
    try {
      const normalizedKeyword = keyword.toLowerCase();
      const normalizedLocation = location.toLowerCase();

      console.log(
        `🔍 Buscando trabajos para: "${normalizedKeyword}" en "${normalizedLocation}"`
      );
      await this.page.goto(this.url.toString(), {
        waitUntil: "domcontentloaded",
      });

      // Llenar los campos de búsqueda
      await this.page.getByTestId("search-box-keyword").fill(normalizedKeyword);
      await this.page
        .getByTestId("search-box-location")
        .fill(normalizedLocation);

      // Esperar el dropdown y seleccionar la primera opción
      await this.page.waitForSelector("div.shadow-dropdown ul > li", {
        timeout: 5000,
      });
      const firstLocationOption = this.page
        .locator("div.shadow-dropdown ul > li")
        .first();

      const optionText = await firstLocationOption.textContent();
      console.log("🧭 Opción de ubicación seleccionada:", optionText?.trim());

      await firstLocationOption.click();

      // Hacer clic en el botón de búsqueda
      await this.page.getByTestId("search-box-submit").click();

      // Esperar redirección a URL con resultados
      const expectedPath = `empleos/de-${slugify(
        normalizedKeyword
      )}/en-${slugify(normalizedLocation)}/`;
      const expectedUrl = new URL(expectedPath, this.url).toString();

      console.log(`📡 Esperando redirección a resultados: ${expectedUrl}`);
      await this.page.waitForURL(expectedUrl, { waitUntil: "networkidle" });

      console.log(`🔗 current url: ${this.page.url()}`);
    } catch (err) {
      const error =
        err instanceof Error
          ? new AppError(`Fallo en la búsqueda: ${err.message}`, 400, true)
          : new Error("Unknown error");
      throw error;
    }
  }

  private async scrapePaginatedResults(maxPage: number): Promise<void> {
    for (let page = 1; page <= maxPage; page++) {
      if (page > 1) {
        const paginatedUrl = new URL(this.page.url());
        paginatedUrl.searchParams.set("page", page.toString());
        console.log(`📄 Navegando a página ${page}: ${paginatedUrl}`);
        await this.page.goto(paginatedUrl.toString(), { waitUntil: "load" });
        await this.page.waitForTimeout(3000);
      }

      console.log(`📦 Extrayendo datos de página ${page}...`);
      const newJobs = await this.extractJobs();
      this.jobs.push(...newJobs);
    }
  }

  /**
   * Realiza el scraping de trabajos desde el sitio de OCC.
   * Incluye paginación.
   * @returns {Promise<Job[]>} Lista de trabajos encontrados.
   * @throws {AppError} Si ocurre un error durante el scraping.
   */
  public async scrape(): Promise<Job[]> {
    try {
      const { maxPage } = await this.extractPaginationNumbers();
      if (maxPage === 1) {
        const newJobs = await this.extractJobs();
        this.jobs.push(...newJobs);
      } else {
        await this.scrapePaginatedResults(maxPage);
      }

      console.log(
        `✅ Scraping finalizado. Total de trabajos: ${this.jobs.length}`
      );
      return this.jobs;
    } catch (err) {
      await this.page.screenshot({
        path: "./src/screenshots/scrape-debug.png",
      });
      const error =
        err instanceof Error
          ? new AppError(
              `Fallo durante el scraping: ${(err as Error).message}`,
              500,
              true
            )
          : new Error("Unknown error");
      throw error;
    }
  }

  /**
   * Extrae la información de paginación (página mínima y máxima).
   * @private
   * @returns {Promise<{ minPage: number; maxPage: number }>} Rango de páginas.
   */
  protected async extractPaginationNumbers(): Promise<{
    minPage: number;
    maxPage: number;
  }> {
    await this.page.waitForSelector('//div[contains(@class, "mt-6")]//ul', {
      state: "visible",
    });
    const items = this.page.locator('//div[contains(@class, "mt-6")]//ul/li');

    const pageNumbers = await items.evaluateAll((nodes) =>
      nodes
        .map((node) => Number(node.textContent?.trim()))
        .filter((n) => !isNaN(n))
    );

    const minPage = Math.min(...pageNumbers);
    const maxPage = Math.max(...pageNumbers);

    console.log(`📚 Paginación detectada: ${minPage} -> ${maxPage}`);
    return { minPage, maxPage };
  }

  /**
   * Extrae los datos de los trabajos en la página actual.
   * @private
   * @returns {Promise<Job[]>} Lista de trabajos extraídos.
   */
  protected async extractJobs(): Promise<Job[]> {
    const jobCards = this.page.locator("//div[starts-with(@id, 'jobcard-')]");
    return jobCards.evaluateAll((cards) => {
      return cards.map((card) => {
        const $title = card.querySelector("h2");
        const title = $title?.textContent?.trim() ?? "⚠️ Título no encontrado";

        const $company = card.querySelector(
          "a[href*='/empleos/bolsa-de-trabajo-']"
        );
        const company =
          $company?.textContent?.trim() ?? "⚠️ Empresa confidencial";

        const $salary = card.querySelector("span.mr-2");
        const salary =
          $salary?.textContent?.trim() ?? "⚠️ Sueldo no encontrado";

        const $postedDate = card.querySelector("label.mr-2");
        const posted_date =
          $postedDate?.textContent?.trim() ?? "⚠️ Fecha no disponible";

        return {
          id: crypto.randomUUID(),
          title,
          company,
          salary,
          posted_date,
        };
      });
    });
  }

  /**
   * Cierra el navegador y el contexto de Playwright.
   * @returns {Promise<void>}
   */
  public async close(): Promise<void> {
    try {
      console.log("🛑 Cerrando navegador...");
      await this.context.close();
      await this.browser.close();
    } catch (err) {
      console.warn("⚠️ Error al cerrar navegador:", err);
    }
  }
}

const occScraper = new OccScraper();
export default occScraper;
