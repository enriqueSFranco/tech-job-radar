import { Response, Request } from "express";
import { JobService } from "../services/job.service";
import { WinstonLoggerAdapter } from "../adapters/logger.adapter";

export class JobController {
  private logger = new WinstonLoggerAdapter("job.controller.ts");

  constructor(private readonly service: JobService) {}

  getJobs = async (req: Request, res: Response) => {
    try {
      const { page, resultPerPage, keyword, location } = req.query;

      const { paginated, total, totalPages } = await this.service.getJobs({
        keyword,
        location,
        pageNumber,
        resultPerPage,
      });

      res.json({
        results: paginated,
        totalJobs: total,
        totalPages,
        currentPage: page,
        resultPerPage,
      });
    } catch (e) {
      this.logger.writeError(`Error en getJobs: ${e}`);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
}
