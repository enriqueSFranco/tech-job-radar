// import { AppError } from "./shared/AppError";
import occScraper from "./infrastructure/scrapers/OccScraper";
import glassdoorScraper from "./infrastructure/scrapers/GlassdoorScraper";

// import { JobDTO } from "./dtos/job.dto";

// const keyword = "frontend developer";
// const location = "Ciudad de México";

const main = async () => {
  try {
    await glassdoorScraper.init();
    await glassdoorScraper.search({
      keyword: "frontend developer",
      location: "Ciudad de México",
    });

    const jobs = await glassdoorScraper.scrape();

    jobs.forEach((job, index) => {
      console.log(`\n#️⃣ Job ${index + 1}`);
      console.log(`📌 Título: ${job.title}`);
      // console.log(`🏢 Empresa: ${job.company}`);
      // console.log(`💰 Sueldo: ${job.salary}`);
      // console.log(`📅 Publicado: ${job.posted_date}`);
    });
  } catch (error) {
    console.error("❌ Error en scraping:", error);
  } finally {
    await glassdoorScraper.close();
  }
};

main();

// import { chromium } from "playwright";
// import { slugify } from "./shared/slugify";

// const baseUrl = new URL(`${process.env.OCC_BASE_URL}`);

// interface Job {
//   id: string;
//   title: string;
//   company?: string;
//   location?: string;
//   remote?: boolean;
//   details?: string;
//   type?: string;
//   posted_date?: string;
//   technologies?: string[];
//   experienceLevel?: string;
//   educations?: string;
//   url?: string;
//   salary?: string;
// }

// const jobs: Job[] = [];

// // TODO: Implementar busqueda dinamica
// const SEARCH_INPUT = {
//   KEYWORD: "angular",
//   LOCATION: "Ciudad de México",
// };

// (async () => {
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   try {
//     const page = await context.newPage();
//     await page.goto(baseUrl.toString());

//     // Seleccionar el input de búsqueda por palabra clave (puesto, área laboral o empresa)
//     const keywordInput = page.getByTestId("search-box-keyword");
//     // Rellenar el input de (puesto, área laboral o empresa)
//     await keywordInput.fill(SEARCH_INPUT.KEYWORD);
//     // Seleccionar el input de ubicación
//     const locationInput = page.getByTestId("search-box-location");
//     // Rellenar el input de ubicacion
//     await locationInput.fill(SEARCH_INPUT.LOCATION);

//     (await page.waitForSelector('h5:has-text("Estados")')).waitForElementState(
//       "visible"
//     );
//     await page.click(`li:has-text("${SEARCH_INPUT.LOCATION}")`);
//     const keywordSlug = slugify(SEARCH_INPUT.KEYWORD);
//     const locationSlug = slugify(SEARCH_INPUT.LOCATION);

//     const buttonSearch = page.getByTestId("search-box-submit");
//     await buttonSearch.click();
//     // buscar el componente de paginación
//     const extractPaginationNumbers = async (): Promise<{
//       minPage: number;
//       maxPage: number;
//     }> => {
//       await page.waitForSelector('//div[contains(@class, "mt-6")]//ul');

//       const paginationItems = page.locator(
//         '//div[contains(@class, "mt-6")]//ul/li'
//       );

//       const pageNumbers = await paginationItems.evaluateAll((nodes) =>
//         nodes
//           .map((node) => Number(node.textContent?.trim()))
//           .filter((num) => !Number.isNaN(num))
//       );

//       const minPage = Math.min(...pageNumbers);
//       const maxPage = Math.max(...pageNumbers);

//       return { minPage, maxPage };
//     };

//     // console.log({ totalPage: await getTotalPages() });
//     let allJobs: Job[] = [];
//     const expectedPath = `empleos/de-${keywordSlug}/en-${locationSlug}/`;
//     let expectedUrl = new URL(expectedPath, baseUrl);
//     console.log({
//       keywordSlug,
//       locationSlug,
//       expectedPath,
//       expectedUrl: expectedUrl.toString(),
//     });
//     await page.waitForURL(expectedUrl.toString(), { waitUntil: "load" });
//     await page.waitForTimeout(3000);
//     const cardLocator = page.locator("//div[starts-with(@id, 'jobcard-')]");
//     allJobs = await cardLocator.evaluateAll((cards) => {
//       return cards.map((card) => {
//         const $title = card.querySelector("h2");
//         const title =
//           $title?.textContent?.trim() ?? "⚠️ No se pudo recuperar el título";
//         const $salary = card.querySelector("span.mr-2");
//         const salary =
//           $salary?.textContent?.trim() ?? "⚠️ No se pudo recuperar el sueldo";
//         const $company = card.querySelector(
//           "a[href*='/empleos/bolsa-de-trabajo-']"
//         );
//         const company =
//           $company?.textContent?.trim() ?? "⚠️ Empresa confidencial";
//         const $postedDate = card.querySelector("label.mr-2");
//         const postedDate =
//           $postedDate?.textContent?.trim() ??
//           "⚠️ Fecha de publicacion no encontrada";
//         return {
//           id: crypto.randomUUID(),
//           title,
//           company,
//           salary,
//           postedDate,
//         };
//       });
//     });
//     const {maxPage} = await extractPaginationNumbers();
//     if (maxPage > 1) {
//       // const nextButton = page.locator(
//       //   '//div[contains(@class, "mt-6") and contains(@class, "text-center")]//ul/li[last()]'
//       // );
//       // const classAtrr = await nextButton.getAttribute("class");
//       // const isDisabled = classAtrr?.includes("pointer-events-none");

//       for (let i = 2; i <= maxPage; i++) {
//         expectedUrl.searchParams.set("page", String(i));
//         await page.goto(expectedUrl.toString());
//         console.log({ page: i, expectedUrl: expectedUrl.toString() });
//         await page.waitForURL(expectedUrl.toString(), { waitUntil: "load" });

//         await page.waitForTimeout(3000);
//         const cardLocator = page.locator("//div[starts-with(@id, 'jobcard-')]");

//         const newJobs = await cardLocator.evaluateAll((cards) => {
//           return cards.map((card) => {
//             const $title = card.querySelector("h2");
//             const title =
//               $title?.textContent?.trim() ??
//               "⚠️ No se pudo recuperar el título";
//             const $salary = card.querySelector("span.mr-2");
//             const salary =
//               $salary?.textContent?.trim() ??
//               "⚠️ No se pudo recuperar el sueldo";
//             const $company = card.querySelector(
//               "a[href*='/empleos/bolsa-de-trabajo-']"
//             );
//             const company =
//               $company?.textContent?.trim() ?? "⚠️ Empresa confidencial";
//             const $postedDate = card.querySelector("label.mr-2");
//             const postedDate =
//               $postedDate?.textContent?.trim() ??
//               "⚠️ Fecha de publicacion no encontrada";
//             return {
//               id: crypto.randomUUID(),
//               title,
//               company,
//               salary,
//               postedDate,
//             };
//           });
//         });
//         allJobs.push(...newJobs);
//       }
//     }
//     console.log({ data: allJobs, total: allJobs.length });
//   } catch (err) {
//     console.error("Error:", err);
//   } finally {
//     await context.close();
//   }
// })();
