import { Job } from "../models/job.model";

const dummyJobs: Job[] = []

export class JobLocalRepository {
  private jobs: Job[];

  constructor() {
    this.jobs = dummyJobs;
  }

  findAll() {
    return this.jobs;
  }

  findByKeywordLocation(keyword: string) {
    return this.jobs.filter(j => j.title.toLowerCase().includes(keyword.toLowerCase()))
  }
}

const jobRepository = new JobLocalRepository();
export default jobRepository
