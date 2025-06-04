import axios from "axios"
import {BASE_API_URL} from "@/config/environments"

export const axiosClient = axios.create({
  baseURL: BASE_API_URL.toString(),
  timeout: 3000,
  headers: {"Content-Type": "application/json"}
})
