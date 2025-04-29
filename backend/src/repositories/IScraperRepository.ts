import { Job } from "../models/job.model";

export interface IScraperRepository {
  fetchVacancies(keyword: string, location: string): Promise<Job[]> | [];
  findByFilters(): Promise<Job[]> | [];
}
