import { Request, Response, NextFunction } from "express";
import { jobSearchQuerySchema,  } from "../models/job.model";

export async function validateJobQuery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { page, resultsPerPage } = req.query;
    const pageNumber = Number(page) || 1;
    const pageSize = Number(resultsPerPage) || 20;

    if (isNaN(pageNumber) || pageNumber < 1) {
      res.status(400).json({ message: "Numero de pagina invalido" });
    }
    if (isNaN(pageSize) || pageSize < 1) {
      res
        .status(400)
        .json({ message: "Cantidad de vacantes por pagina invalida" });
    }
    const validatedQuery = await jobSearchQuerySchema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    });
    (req as any).validatedQuery = validatedQuery;
    next();
  } catch (e) {
    let message = ''
    if (e instanceof Error)
      message = e.message || "Bad Request";
    res.status(400).json({ message });
  }
}
