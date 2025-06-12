import { chromium, Page, Browser, BrowserContext } from "playwright";
import { Job } from "../../models/job.model";
import { AppError } from "../../shared/AppError";
import { slugify } from "../../shared/slugify";
import { SearchParams } from "./types";
import { OCC_BASE_URL } from "../../config/environment";
import { WinstonLoggerAdapter, type ILoggerAdapter } from "../../adapters/logger.adapter";

// 👁️ Evita hacer scraping cada vez que se consulta el frontend. Mejor guardar en base de datos y actualiza cada cierto tiempo.
/* TODOS
 1. Agendar el scraping como una tarea periódica
 Usa un cron job (con node-cron, cron forn node.js) para ejecutar el scraping cada X horas. Así la API siempre responde rápido sin hacer scraping en vivo.
```
  import cron from "node-cron";
  cron.schedule("0 * * * *", () => {
    console.log("Ejecutando scraper cada hora...");
    scrapeAndSave();
  });
```

2. Añadir logs y manejo de errores

3. Respetar términos y condiciones (legal y técnico)
Añade un User-Agent válido.
No ataques con muchas peticiones simultáneas.
Usa robots.txt como guía, aunque no siempre es obligatorio.

### 🚀 Extras si quieres llevarlo al siguiente nivel

- **Agragar filtros avanzados en la API**: por stack, ubicación, tipo (remoto/presencial).
- **Exportación de resultados**: a Excel, PDF, CSV.
- **Alertas por correo**: con nodemailer si hay nuevas vacantes.

🚀 ¿Qué aportaría usar transformers para recomendaciones?
1.Entender semánticamente las vacantes y los perfiles.
2.Recomendar empleos similares a los intereses o historial del usuario (más allá de solo "palabras clave").
 */
export class OccScraper {
  private logger: ILoggerAdapter = new WinstonLoggerAdapter("OccScraper.ts");
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
      this.logger.writeInfo("🚀 Iniciando navegador...");
      this.browser = await chromium.launch({ headless: false });
      this.context = await this.browser.newContext({
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/123.0 Safari/537.36",
        viewport: { width: 1366, height: 768 },
        locale: "es-MX",
      });
      this.page = await this.context.newPage();
      this.page.addInitScript(() => {
        Object.defineProperty(navigator, "webdriver", { get: () => false });
      });
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

      this.logger.writeInfo(
        `🔍 Buscando trabajos para: "${normalizedKeyword}" en "${normalizedLocation}"`
      );
      await this.page.goto(this.url.toString(), {
        waitUntil: "domcontentloaded",
      });

      // Llenar los campos de búsqueda
      await this.page
        .getByTestId("search-box-keyword")
        .fill(normalizedKeyword, {
          timeout: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
        });
      await this.page
        .getByTestId("search-box-location")
        .fill(normalizedLocation, {
          timeout: Math.floor(Math.random() * (100 - 200 + 1)) + 200,
        });

      // Esperar el dropdown y seleccionar la primera opción
      await this.page.waitForSelector("div.shadow-dropdown ul > li", {
        timeout: 5000,
      });
      const firstLocationOption = this.page
        .locator("div.shadow-dropdown ul > li")
        .first();

      const optionText = await firstLocationOption.textContent();
      this.logger.writeInfo(
        `🧭 Opción de ubicación seleccionada: ${optionText?.trim()}`
      );

      await firstLocationOption.click();

      // Hacer clic en el botón de búsqueda
      await this.page.getByTestId("search-box-submit").click();

      // Esperar redirección a URL con resultados
      const expectedPath = `empleos/de-${slugify(
        normalizedKeyword
      )}/en-${slugify(normalizedLocation)}/`;
      const expectedUrl = new URL(expectedPath, this.url).toString();

      this.logger.writeInfo(`📡 Esperando redirección a resultados: ${expectedUrl}`);
      await this.page.waitForURL(expectedUrl, { waitUntil: "networkidle" });

      this.logger.writeInfo(`🔗 current url: ${this.page.url()}`);
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

      this.logger.writeInfo(`📦 Extrayendo datos de página ${page}...`);
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

      this.logger.writeInfo(
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

    this.logger.writeInfo(`📚 Paginación detectada: ${minPage} -> ${maxPage}`);
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
      this.logger.writeInfo("🛑 Cerrando navegador...");
      await this.context.close();
      await this.browser.close();
    } catch (err) {
      this.logger.writeWarn(`⚠️ Error al cerrar navegador: ${err}`);
    }
  }
}

const occScraper = new OccScraper();
export default occScraper;
