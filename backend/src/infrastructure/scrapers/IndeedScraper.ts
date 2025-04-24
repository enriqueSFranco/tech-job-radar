/*
search form
id="text-input-what"
id="text-input-where"
button textContent="Buscar empleos"

container job results: id="mosaic-jobResults" > id="mosaic-provider-jobcards" > ul > li
card: div.class="cardOutline job_916363f3fe8bc11d"
  - title: h2.class=jobTitle, aria-label="detalles completos de Desarrollador FrontEnd React (Miguel Hidalgo, Ciudad de México)"
  - title con span: <span title="Desarrollador FrontEnd React (Miguel Hidalgo, Ciudad de México)"></span>
  - company name: span[data-testid="company-name"]
  - location: div[data-testid="text-location"]
  - metadata: ul.metadataContainer > li.metadata > div[data-testid="attribute_snippet_testid"] eje. tiempo completo, salario, horario, etc
  - details: button[data-testid="more_links_button"] event click
  - new job: div[data-testid="new-job-tag"] ?? ""

  Nota 1: las vacantes tiene postulaciones rapidas a traves de indeed pero tambien hay vacantes que te envian a la pagina de la empresa
  para relaizar la postulación,

  Nota 2: Falta resolver el problema del captcha que sale en ocasiones al buscar nuevos resultados
  Status: Pausado

*/
import { chromium } from "playwright";
import type { Page, Browser, BrowserContext } from "playwright";
import { AppError } from "../../shared/AppError";
import { JobDTO } from "../../models/job.model";
import { slugify } from "../../shared/slugify";

interface SearchParams {
  keyword: string;
  location: string;
}

class IndeedScraper {
  private jobs: JobDTO[] = [];
  private browser!: Browser;
  private context!: BrowserContext;
  private page!: Page;
  private baseUrl = new URL(`${process.env.INDEED_BASE_URL}`);

  public async init(): Promise<void> {
    try {
      console.log("🚀 Iniciando navegador...");
      this.browser = await chromium.launch();
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
    } catch (err) {
      throw new AppError("Fallo al inicializar Playwright", 500, true);
    }
  }
  public async search({ keyword, location }: SearchParams): Promise<void> {
    try {
      console.log(`🔍 Buscando trabajos para: "${keyword}" en "${location}"`);
      await this.page.goto(this.baseUrl.toString());

      await this.page.getByTestId("#text-input-what").fill(keyword);
      await this.page.getByTestId("#text-input-where").fill(location);
      // dropdown
      // const stateSelector = await this.page.waitForSelector(
      //   'h5:has-text("Estados")'
      // );
      // await stateSelector.waitForElementState("visible");
      // await this.page.click(`li:has-text("${location}")`);

      await this.page.getByText("Buscar empleos").click();

      // const expectedPath = `empleos/de-${slugify(keyword)}/en-${slugify(
      //   location
      // )}/`;
      // const expectedUrl = new URL(expectedPath, this.baseUrl).toString();

      // console.log(`📡 Esperando redirección a resultados: ${expectedUrl}`);
      // await this.page.waitForURL(expectedUrl, { waitUntil: "load" });
      await this.page.waitForTimeout(3000);
    } catch (err) {
      const error =
        err instanceof Error
          ? new AppError(
              `Fallo en la búsqueda: ${(err as Error).message}`,
              400,
              true
            )
          : new Error("Unknown error");
      throw error;
    }
  }

  public async scrape(): Promise<JobDTO[]> {
    try {
      const { maxPage } = await this.extractPaginationNumbers();

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

      console.log(
        `✅ Scraping finalizado. Total de trabajos: ${this.jobs.length}`
      );
      return this.jobs;
    } catch (err) {
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

  private async extractPaginationNumbers(): Promise<{
    minPage: number;
    maxPage: number;
  }> {
    await this.page.waitForSelector("nav[aria-label='pagination']");
    // TODO: Recuperar la paginacion
    const items = this.page.locator("nav[aria-label='pagination'] > ul");

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

  private async extractJobs(): Promise<JobDTO[]> {
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
}

const indeedScraper = new IndeedScraper();
export default indeedScraper;

