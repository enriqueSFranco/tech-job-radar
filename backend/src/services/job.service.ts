import { IScraper } from "../infrastructure/scrapers/types";
import { Job } from "../models/job.model";

interface Filters {
  salary?: boolean;
  experience?: boolean;
  location?: boolean;
  postedDate?: boolean;
}

interface GetFilteredJobsParams {
  filterOptions?: Filters;
  pageNumber: number;
  resultPerPage: number;
}

export class JobService {
  private results: Job[]
  constructor(private readonly scrapers: IScraper[]) {
    this.results = []
  }

  public getJobs = async (
    keyword: string = "frontend developer",
    location: string = "Ciudad de Mexico"
  ): Promise<Job[]> => {
    try {
      // 1.- iniciar los scrapers
    await Promise.allSettled(this.scrapers.map((s) => s.init()));
    // 2.- realizar la busqueda
    await Promise.allSettled(
      this.scrapers.map((s) => s.search({ keyword, location }))
    );
    // 3.- scraper los sitios web
      if (this.results.length === 0) {
        const scraperResults = await Promise.allSettled(
          this.scrapers.map((s) => s.scrape())
        );
        scraperResults.forEach((result, index) => {
          if (result.status === "rejected") {
            console.error(`❌ Scraper ${index} failed:`, result.reason);
          }
        });

        this.results = scraperResults
          .filter((result) => result.status === "fulfilled")
          .flatMap((result) => {
            return result.value;
          });
      }
      return this.results;
    } catch (e) {
      await Promise.allSettled(this.scrapers.map(s => s.close()))
      throw new Error("❌ Error en scraping:" + e);
    }
  };

  public getFilteredJobs = async ({
    filterOptions,
    pageNumber,
    resultPerPage,
  }: GetFilteredJobsParams): Promise<Job[]> => {
    try {
      throw new Error("");
    } catch (err) {
      throw new Error("");
    }
  };
}
