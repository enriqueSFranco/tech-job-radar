import { JobLocalRepository } from "./job-local.repository"
import { JobPostgreSQLRepository } from "./job-postgresql.repository";

export const getJobRepository = () => {
  switch(process.env.DATA_SOURCE) {
    case 'local':
      return JobLocalRepository;
    case 'postgresql':
      return JobPostgreSQLRepository
  }
}
