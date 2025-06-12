import { Job } from "../../models/job.model";

export interface SearchParams {
  keyword: string;
  location: string;
}

export interface IScraper {
  init(): Promise<void>;
  close(): Promise<void>;
  search({ keyword, location }: SearchParams): Promise<void>;
  scrape(): Promise<Job[]>;
}
