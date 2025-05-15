import axios from "axios"

const API_URL = new URL(`${process.env.API_URL}`)

export const axiosClient = axios.create({
  baseURL: API_URL.toString(),
  headers: {"Content-Type": "application/json"}
})
