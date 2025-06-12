import { http, HttpResponse } from "msw";
import mockData from "@/resources/json/mockApiData.json";
import { BASE_API_URL, API_JOBS, API_RECOMMENDATIONS } from "@/config/environments";

export const handlers = [
  http.get(API_JOBS, ({ request }) => {
    const url = new URL(request.url);
    const keyword = url.searchParams.get("keyword")?.toLocaleLowerCase() || "";
    const location =
    url.searchParams.get("location")?.toLocaleLowerCase() || "";

    console.info('🔍 MSW INTERCEPTED API_JOBS');

    if (
      keyword.includes("frontend developer") &&
      location.includes("ciudad de mexico")
    ) {
      return HttpResponse.json(mockData);
    }
    if (!keyword.includes("frontend developer") &&
    !location.includes("ciudad de mexico")) {
      return HttpResponse.json({
        data: mockData,
        pagination: {
          total_items: 10,
          current_page: 1,
          total_pages: 1,
          items_per_page: 20,
        },
        links: {
          self: ``,
          next_page: ``
        }
      });
    }

    if (keyword.trim() === "") return;

    // resultados por default (se realizara por 1era vez el scraper a los sitios web con keyword="ingeniero de software", location="ciudad de mexico")
    return HttpResponse.json(mockData);
  }),
  http.get(API_RECOMMENDATIONS, ({request}) => {
    return HttpResponse.json(mockData);
  }),
];
