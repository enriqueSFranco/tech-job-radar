import type { Locator } from "playwright";
import { JobDTO } from "../../dtos/job.dto";

export interface IScraperService {
  init(): Promise<void>;
  fillSearchFields(keyword: string, location: string): Promise<void>;
  performSearch(keyword: string, location: string): Promise<string>;
  getResults(): JobDTO[];
  scraperJobs(keyword: string, location: string): Promise<JobDTO[]>;
  ensureInitialized(): void;
}
