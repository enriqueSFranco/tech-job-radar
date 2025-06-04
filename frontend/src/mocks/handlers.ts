import { http, HttpResponse } from "msw"
import mockData from "@/resources/json/mockApiData.json"
import { API_ENDPOINT, API_JOBS, API_RECOMMENDATIONS, PORT } from "@/config/environments"

export const handlers = [
  http.get(`${API_ENDPOINT}${API_JOBS}`, () => {
    return HttpResponse.json(mockData)
  })
]
