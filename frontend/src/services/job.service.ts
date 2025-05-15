import { Job } from "@/schemas/job.schema";
import {axiosClient} from "./api.service"

export async function search(keyword: string, location: string):Promise<Job[]> {
  try {
    const url = new URL(`/search`);
    url.searchParams.set("keyword", keyword)
    url.searchParams.set("location", location);
    console.info(`url: ${url}`)
    const response = await axiosClient.post(url.toString(), {keyword, location}, {params: {keyword, location}})
    return response.data
  } catch(e) {
    console.error("Error en la búsqueda:", e);
    throw new Error(`Error: [job.service] ${e}`)
  }
}
