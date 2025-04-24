import { Job } from "../../models/job.model";

/**
 * Parámetros para realizar la búsqueda de trabajos.
 * @typedef {Object} SearchParams
 * @property {string} keyword - Palabra clave de búsqueda.
 * @property {string} location - Ubicación de la búsqueda.
 */
export interface SearchParams {
  keyword: string;
  location: string;
}

export abstract class BaseScraper {
  // común para todos los scrapers
  protected abstract url: string;
  protected searchParams: SearchParams = { keyword: "", location: "" };

  async scrape(): Promise<Job[]> {
    await this.init();

    await this.search(this.searchParams);
    const jobs = await this.extractJobs();

    await this.close();
    return jobs;
  }

  protected abstract init(): Promise<void>;
  protected abstract close(): Promise<void>;
  protected abstract search(params: SearchParams): Promise<void>;
  protected abstract extractJobs(): Promise<Job[]>;
  protected extractPaginationNumbers?(): Promise<{
    minPage: number;
    maxPage: number;
  }> {
    return Promise.resolve({ minPage: 1, maxPage: 1 });
  }
}
