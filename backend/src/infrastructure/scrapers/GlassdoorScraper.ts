import { Browser, BrowserContext, Locator, Page, chromium } from "playwright";
import { Job } from "../../models/job.model";
import { AppError } from "../../shared/AppError";
import { BaseScraper, SearchParams } from "./BaseScraper";
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

class GlassdoorScraper extends BaseScraper {
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
      });
      this.page = await this.context.newPage();
      await this.page.goto(this.url.toString(), {
        waitUntil: "domcontentloaded",
      });
    } catch (err) {
      throw new AppError("Fallo al inicializar Playwright", 500, true);
    }
  }

  async search({ keyword, location }: SearchParams): Promise<void> {
    try {
      // Glassdoor está bloqueando al scraper (por User-Agent, IP o headless mode)
      console.log(`🔍 Buscando trabajos para: "${keyword}" en "${location}"`);
      await this.page.goto(this.url.toString(), { waitUntil: "networkidle" });

      const keywordInput = this.page.locator("#searchBar-jobTitle");
      const locationInput = this.page.locator("#searchBar-location");
      await keywordInput.fill(keyword);
      await locationInput.fill(location);

      await this.page.keyboard.press("Enter");
      await this.page.waitForTimeout(2000);
      console.log(this.page.url())
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

  public async scrape(): Promise<Job[]> {
    try {
      const data = await this.extractJobs();
      console.log(data);
      return data;
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

  protected async extractJobs(): Promise<Job[]> {}

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
