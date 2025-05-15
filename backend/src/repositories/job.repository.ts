import { Job } from "../models/job.model";
import { IJobRepository } from "./IJobRepository";
import occScraper from "../infrastructure/scrapers/OccScraper"
import glassdoorScraper from "../infrastructure/scrapers/GlassdoorScraper";
import {OCC_BASE_URL, GLASSDOOR_BASE_URL} from "../config/environment"

export class JobRepository implements IJobRepository {
  fetchJobs = async(keyword: string, location: string): Promise<Job[]> => {
    // TODO: Implementar lógica para obtener vacantes de ambos sitios
    try {
      throw new Error("");
    } catch(e) {
      throw new Error("");
    }
  }

  findByFilters = async(): Promise<Job[]> => {
    // TODO: Implementar lógica para buscar vacantes con filtros y paginación
    throw new Error("");
  }
}

const jobRepository = new JobRepository()
export default jobRepository
