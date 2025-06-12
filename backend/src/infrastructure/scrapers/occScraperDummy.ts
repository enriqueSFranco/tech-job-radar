import { Job } from "../../models/job.model";
import {IScraper, SearchParams} from "./types"

const dummyJobs: Job[] = Array.from({ length: 50 }, (_, i) => ({
  id: crypto.randomUUID(),
  title: `Desarrollador Frontend ${i + 1}`,
  company: "Empresa Tech",
  location: "Ciudad de México",
  remote: i % 2 === 0,
  details: "Descripción ficticia de la vacante.",
  type: "Tiempo completo",
  posted_date: new Date(),
  technologies: ["React", "Node.js"],
  experience_level: "Junior",
  educations: "Licenciatura en Computación",
  url: "https://ejemplo.com/vacante",
  salary: "$30,000 MXN",
}));

export const occScraperDummy: IScraper  = {
  init: async () => Promise.resolve(),
  close: async () => Promise.resolve(),
  search: ({ keyword, location }: SearchParams) => Promise.resolve(),
  scrape: () => Promise.resolve(dummyJobs).then((data) => data)
}

