import {Request, Response} from "express"
import {AppError} from "../utils/AppError"
import { JobDTO } from "../dtos/job.dto"
import { IScraperService } from "../services/interfaces/IScraperService"

class ScraperController {
  constructor(private readonly service: IScraperService) {}
}
