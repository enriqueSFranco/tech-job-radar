// import occScraper from "./infrastructure/scrapers/OccScraper";
import occScraper from "./infrastructure/scrapers/OccScraper";

const main = async () => {
  try {
    await occScraper.init();
    await occScraper.search({
      keyword: "Frontend Developer",
      location: "Ciudad de México",
    });

    const jobs = await occScraper.scrape();

    jobs.forEach((job, index) => {
      console.log(`\n#️⃣ Job ${index + 1}`);
      console.log(`📌 Título: ${job.title}`);
      console.log(`🏢 Empresa: ${job.company}`);
      console.log(`💰 Sueldo: ${job.salary}`);
      console.log(`📅 Publicado: ${job.posted_date}`);
    });
  } catch (error) {
    console.error("❌ Error en scraping:", error);
  } finally {
    await occScraper.close();
  }
};

main();
