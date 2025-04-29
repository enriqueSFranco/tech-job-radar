import { Router } from "express";
import { JobService } from "../services/job.service";
import { JobController } from "../controllers/job.controller";
import glassdoorScraper from "../infrastructure/scrapers/GlassdoorScraper";
import occScraper from "../infrastructure/scrapers/OccScraper";

const router = Router();

const service = new JobService([occScraper]);
const controller = new JobController(service)

router.get("/jobs", controller.getJobs);

export default router
