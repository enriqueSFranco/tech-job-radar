import {Response, Request} from "express"
import { Job } from "../models/job.model";
import { JobService } from "../services/job.service";

export class JobController {
  constructor(private readonly service: JobService) {}

  getJobs = async (req: Request, res: Response) => {
    try {
      const {page = 1, perPage = 20} = req.query
      const pageNumber = parseInt(page)
      const pageSize = parseInt(perPage)

      if (isNaN(pageNumber) || pageNumber < 1) {
        res.status(400).json({message: "Numero de pagina invalido"})
      }
      if (isNaN(pageSize) || pageSize  < 1) {
        res.status(400).json({message: "Cantidad de vacantes por pagina invalida"})
      }
      const allJobs: Job[] = await this.service.getJobs();
      const totalJobs = allJobs.length
      const totalPages = Math.ceil(totalJobs / pageSize)

      const startIndex = (pageNumber - 1) * pageSize
      const endIndex = pageNumber * pageSize
      const paginatedJobs = allJobs.slice(startIndex, endIndex)
      res.json({ results: paginatedJobs, totalJobs, totalPages, currentPage: pageNumber, perPage: pageSize });
    } catch (e) {
      console.error("Error en getJobs:", e);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
}
