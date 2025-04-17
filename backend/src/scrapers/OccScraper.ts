import { chromium } from "playwright";
import { slugify } from "../utils/slugify";

const baseUrl = new URL(`${process.env.OCC_BASE_URL}`);

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

const jobs: Job[] = []

// TODO: Implementar busqueda dinamica
const SEARCH_INPUT = {
  KEYWORD: "frontend developer",
  LOCATION: "Ciudad de México",
};

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    await page.goto(baseUrl.toString());

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
    const expectedUrl = new URL(expectedPath, baseUrl).toString();
    console.log({ keywordSlug, locationSlug, expectedPath, expectedUrl });

    await page.waitForURL(expectedUrl, { waitUntil: "load" });

    await page.waitForTimeout(3000);
    const cardLocator = page.locator("//div[starts-with(@id, 'jobcard-')]");

    const jobData = await cardLocator.evaluateAll((cards) => {
      return cards.map(card => {
        const $titleEle = card.querySelector("h2")
        const title = $titleEle?.textContent?.trim() ?? "⚠️ No se pudo recuperar el título";

        const $companyEle = card.querySelector("a[href*='/empleos/bolsa-de-trabajo-']");
        const company =
          $companyEle?.textContent?.trim() ??
          "⚠️ Empresa confidencial";
        return {id: crypto.randomUUID(),title, company}
      })
    });
    jobs.push(...jobData);
    console.log({ jobs });
    } catch (err) {
      console.error("Error:", err);
    } finally {
      await context.close();
    }
})();
