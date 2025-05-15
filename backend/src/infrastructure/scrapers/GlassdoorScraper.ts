import { Browser, BrowserContext, Locator, Page, chromium } from "playwright";
import { Job } from "../../models/job.model";
import { AppError } from "../../shared/AppError";
import { SearchParams } from "./types";
/*
selectores
  search form
    - keyword: input[id="searchBar-jobTitle"]
    - location: input[id="searchBar-location"]

  job list:
    - container: div[id="left-column"]
    - lista de vacantes: ul[aria-label="Jobs List"]
    - li: [data-test="jobListing", data-jobid="1009663599447"]
    - card:
     - wrapper: div[data-test="job-card-wrapper"]
     - location: div[data-test="emp-location"]
     - salary: div[data-test="detailSalary"]

*/

class GlassdoorScraper {
  private browser!: Browser;
  private context!: BrowserContext;
  private page!: Page;
  private jobs: Job[] = [];
  protected url = `${process.env.GLASSDOOR_BASE_URL}`;

  async init(): Promise<void> {
    try {
      console.log("🚀 Iniciando navegador...");
      this.browser = await chromium.launch({ headless: false });
      this.context = await this.browser.newContext({
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        viewport: { width: 1280, height: 800 },
      });
      this.page = await this.context.newPage();
      await this.page.route("**/*.{png,jpg,jpeg,gif,svg,woff2}", (route) =>
        route.abort()
      );
      if (!this.url) {
        throw new AppError("La URL de Glassdoor no está definida", 500);
      }
      console.log("🌐 Navegando a:", this.url);
      await this.page.goto(this.url.toString(), {
        waitUntil: "domcontentloaded",
      });
      console.log("✅ Página cargada");
    } catch (err) {
      throw new AppError("Fallo al inicializar Playwright", 500, true);
    }
  }

  async search({ keyword, location }: SearchParams): Promise<void> {
    if (!keyword.trim() || !location.trim()) {
      throw new AppError("Keyword y location son obligatorios", 400, true);
    }

    console.log(`🔍 Buscando trabajos para: "${keyword}" en "${location}"`);
    try {
      // Glassdoor está bloqueando al scraper (por User-Agent, IP o headless mode)
      await this.page.goto(this.url.toString(), { waitUntil: "networkidle" });

      const keywordInput = this.page.locator("#searchBar-jobTitle");
      const locationInput = this.page.locator("#searchBar-location");
      // verificamos que existan los inputs
      await Promise.all([
        keywordInput.waitFor({ state: "visible", timeout: 500 }),
        locationInput.waitFor({ state: "visible", timeout: 500 }),
      ]);
      await keywordInput.fill("");
      await keywordInput.fill(keyword);

      await locationInput.fill("");
      await locationInput.fill(location);

      await this.page.keyboard.press("Enter");

      // esperamos a que carguen los resultados
      await this.page.waitForLoadState("networkidle");
      console.info("✅ Busqueda completada.");
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "TimeoutError") {
          throw new AppError(
            "⏰ Timeout esperando elementos de búsqueda",
            408,
            true
          );
        }
      }
      const error =
        err instanceof Error
          ? new AppError(`❌ Fallo en la búsqueda: ${err.message}`, 400, true)
          : new Error("❌ Error desconocido en búsqueda");
      throw error;
    }
  }

  public async scrape(): Promise<Job[]> {
    try {
      await this.extractJobs();
      // console.log(data);
      return [];
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

  protected async extractJobs(): Promise<Job[]> {
    console.log("📦 Extrayendo los datos de cada vacante");
    try {
      await this.page.waitForLoadState("networkidle");
      const container = this.page.locator("#left-column");
      await container.waitFor({ state: "visible", timeout: 500 });

      const jobCards = this.page.locator("#job-card-wrapper");
      console.log(await jobCards.evaluate((node) => node.outerHTML));

      // return jobCards.evaluateAll((cards) => {
      //   return cards.map((card) => {
      //     const $title = card.querySelector("[job-title]");
      //     const title =
      //       $title?.textContent?.trim() ??
      //       "⚠️ No se encontro el titulo de la vacante";
      //     return { id: crypto.randomUUID(), title };
      //   });
      // });
      return [];
    } catch (err) {
      console.error("📍 URL actual:", this.page.url());
      await this.page.screenshot({
        path: "./src/screenshots/debug-glassdoor.png.png",
        fullPage: true,
      });
      const error =
        err instanceof Error
          ? new AppError(
              `❌ Error extrayendo vacantes: ${(err as Error).message}`,
              400,
              true
            )
          : new Error("❌ Error desconocido extrayendo vacantes");
      throw error;
    }
  }

  async close(): Promise<void> {
    try {
      console.log("🛑 Cerrando navegador...");
      if (this.context !== undefined && this.browser !== undefined) {
        await this.context.close();
        await this.browser.close();
      }
    } catch (err) {
      console.warn("⚠️ Error al cerrar navegador:", err);
    }
  }
}

const glassdoorScraper = new GlassdoorScraper();
export default glassdoorScraper;
