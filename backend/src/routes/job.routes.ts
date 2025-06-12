import { Router } from "express";
import { ScrapperService } from "../services/scraper-job.service";
import { JobController } from "../controllers/job.controller";
// import glassdoorScraper from "../infrastructure/scrapers/GlassdoorScraper";
// import occScraper from "../infrastructure/scrapers/OccScraper";
import { validateJobQuery } from "../middlewares/job.middleware";
import { occScraperDummy } from "../infrastructure/scrapers/occScraperDummy";

const router = Router();

const service = new ScrapperService([occScraperDummy]);
const controller = new JobController(service)

// router.get("/jobs", controller.getJobs);
// router.get("/jobs/:id", controller.getJobById);
router.get("/search", validateJobQuery, controller.searchJobs);
// router.get("/scraper/occ/jobs", validateJobQuery, controller.searchJobByTag);

export default router
