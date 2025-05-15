import { Job } from "../models/job.model";

export interface IJobRepository {
  fetchJobs(keyword: string, location: string): Promise<Job[]>;
  findByFilters(): Promise<Job[]>;
}
