import { Response, Request } from "express";
import { JobServiceFactory } from "../services/job-service.factory";
import { WinstonLoggerAdapter } from "../adapters/logger.adapter";

const scraperService = JobServiceFactory.create("scraper");
const databaseService = JobServiceFactory.create("database");

export class JobController {
  private logger = new WinstonLoggerAdapter("job.controller.ts");

  constructor(private readonly service) {}

  searchJobs = async (req: Request, res: Response) => {
    try {
      const { page, resultPerPage, keyword, location } = req.query;
      console.log(req.params);
      const pageNumber = parseInt(page as string, 10);
      const perPage = parseInt(resultPerPage as string, 10);
      const results = await this.service.searchJobsLive({
        keyword: keyword as string,
        location: location as string,
      });
      const totalJobs = results.length;
      const totalPages = Math.ceil(totalJobs / perPage);
      const startIndex = (pageNumber - 1) * perPage;
      const endIndex = startIndex + perPage;
      const paginatedJobs = results.slice(startIndex, endIndex);

      res.json({
        data: paginatedJobs,
        pagination: {
          total_jobs: totalJobs,
          total_pages: totalPages,
          current_page: pageNumber,
          result_per_page: perPage,
        },
        links: {
          self: `/search?keyword=${keyword}&location=${location}&page=${pageNumber}&resultPerPage=${perPage}`,
          next:
            pageNumber < totalPages
              ? `/search?keyword=${keyword}&location=${location}&page=${
                  pageNumber + 1
                }&resultPerPage=${perPage}`
              : null,
        },
      });
    } catch (e) {
      this.logger.writeError(`Error en getJobs: ${e}`);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
}
