import { IScraper } from "../infrastructure/scrapers/types";
import { Job } from "../models/job.model";
import {
  type ILoggerAdapter,
  WinstonLoggerAdapter,
} from "../adapters/logger.adapter";

const logger: ILoggerAdapter = new WinstonLoggerAdapter("job.service.ts");

export class ScraperService {
  private data: Array<Job>;

  constructor(private readonly scrapers: IScraper[]) {
    this.data = [];
  }

  public scraper = async ({
    keyword,
    location,
  }: {
    keyword: string;
    location: string;
  }): Promise<Array<Job>> => {
    try {
      // 1.- iniciar los scrapers
      await Promise.allSettled(this.scrapers.map((s) => s.init()));
      // 2.- scraper el form para realizar la busqueda
      await Promise.allSettled(
        this.scrapers.map((s) => s.search({ keyword, location }))
      );
      // 3.- scraper los resultados de cada sitio web
      if (this.data.length === 0) {
        const scraperResults = await Promise.allSettled(
          this.scrapers.map((s) => s.scrape())
        );
        scraperResults.forEach((result, index) => {
          if (result.status === "rejected") {
            logger.writeError(`❌ Scraper ${index} failed: ${result.reason}`);
          }
        });

        this.data = scraperResults
          .filter((r) => r.status === "fulfilled")
          .flatMap((r) => r.value);
      }
      // 4. retornar los datos que el scraper recupero
      const results = this.data;
      return results;
    } catch (e) {
      await Promise.allSettled(this.scrapers.map((s) => s.close()));
      throw new Error("❌ Error en scraping:" + e);
    }
  };
}
