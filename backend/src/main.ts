import { AppError } from "./utils/AppError";
import occScraper from "./services/occ.service";
import { JobDTO } from "./dtos/job.dto";

async function runTest() {
  const keyword = "react";
  const location = "Ciudad de México";
  try {
    console.log("🔄 Inicializando scraper...");
    await occScraper.init();

    console.log("🔍 Ejecutando búsqueda...");
    const jobs: JobDTO[] = await occScraper.scraperJobs(keyword.toLowerCase(), location.toLowerCase());

    console.log("✅ Resultados obtenidos:", jobs.length);

    jobs.forEach((job, idx) => {
      console.log(`\n🔹 Oferta #${idx + 1}`);
      console.log(`🧪 Título: ${job.title}`);
      console.log(`🏢 Empresa: ${job.company}`);
      console.log(`📅 Publicado: ${job.posted_date}`);
    });
  } catch (err) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    throw new AppError(error.message);
  }
}

await runTest();
