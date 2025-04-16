import { chromium } from "playwright";
import { slugify } from "../utils/slugify";

const OCC_BASE_URL = new URL("https://www.occ.com.mx/");

type Job = {
  id: string;
  title: string;
  company?: string;
  location?: string;
  remote?: boolean;
  details?: string;
  type?: string;
  posted_date?: string;
  technologies?: string[];
  experienceLevel?: string;
  educations?: string;
  url?: string;
  salary?: string;
};

const jobs: Job[] = [];

// TODO: Implementar busqueda dinamica
const SEARCH_INPUT = {
  KEYWORD: "frontend developer",
  LOCATION: "Ciudad de México",
};
// await page.waitForURL("**/login");
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    await page.goto(OCC_BASE_URL.toString());

    // Seleccionar el input de búsqueda por palabra clave (puesto, área laboral o empresa)
    const keywordInput = page.getByTestId("search-box-keyword");
    // Rellenar el input de (puesto, área laboral o empresa)
    await keywordInput.fill(SEARCH_INPUT.KEYWORD);
    // Seleccionar el input de ubicación
    const locationInput = page.getByTestId("search-box-location");
    // Rellenar el input de ubicacion
    await locationInput.fill(SEARCH_INPUT.LOCATION);

    (await page.waitForSelector('h5:has-text("Estados")')).waitForElementState(
      "visible"
    );
    await page.click(`li:has-text("${SEARCH_INPUT.LOCATION}")`);
    const keywordSlug = slugify(SEARCH_INPUT.KEYWORD);
    const locationSlug = slugify(SEARCH_INPUT.LOCATION);

    const buttonSearch = page.getByTestId("search-box-submit");
    await buttonSearch.click();

    const expectedPath = `empleos/de-${keywordSlug}/en-${locationSlug}/`;
    const expectedUrl = new URL(expectedPath, OCC_BASE_URL).toString();
    console.log({ keywordSlug, locationSlug, expectedPath, expectedUrl });

    await page.waitForURL(expectedUrl, { waitUntil: "load" });

    await page.waitForTimeout(3000);
    const cards = page.locator("//div[starts-with(@id, 'jobcard-')]");
    const cardslist = await cards.all();

    for (const card of cardslist) {
      // Scroll al elemento (útil si es lazy-loaded)
      await card.scrollIntoViewIfNeeded();

      const previousTitle = await page
        .locator("#job-detail-container div.mt-2 > p")
        .textContent()
        .catch(() => "");

      try {
        await Promise.all([
          card.click(),
          page.waitForFunction(
            (prev) => {
              const el = document.querySelector(
                "#job-detail-container div.mt-2 > p"
              );
              return el?.textContent?.trim() && el.textContent.trim() !== prev;
            },
            previousTitle,
            { timeout: 3000 }
          ),
        ]);
      } catch (error) {
        console.warn(
          "⚠️ No cambió el título, intentando extraer de todas formas..."
        );
      }

      const jobTitleLocator = page.locator(
        "#job-detail-container div.mt-2 > p"
      );
      const jobTitle = await jobTitleLocator.first().textContent();
      if (jobTitle) {
        const newJob: Job = {
          id: crypto.randomUUID(),
          title: jobTitle
        }
        jobs.push(newJob);
      } else {
        console.log("⚠️ No se pudo obtener el título de este empleo");
      }
    }
    // await page.screenshot({path:"src/empleos.png"})
    console.log(jobs);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await context.close();
  }
})();
