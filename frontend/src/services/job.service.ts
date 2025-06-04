import { Job } from "@/schemas/job.schema";
import { axiosClient } from "./api.service";
import { API_JOBS } from "@/config/environments";

interface ApiResponse {
  data: Job[];
  total: number;
  totalPerPage: number;
  next: string | null;
  prev: string | null;
  headers: Headers;
}

export async function findJobs(
  keyword: string,
  location: string
) {
  try {
    const response = await axiosClient.get(API_JOBS, {
      params: { keyword, location },
    });
    console.log("job.service", response)
    // TODO: Manejar errores de la peticion
    // TODO: Mapear resultados
    return response;
  } catch (e) {
    console.error("Error en la búsqueda:", e);
    throw new Error(`Error: [job.service] ${e}`);
  }
}
