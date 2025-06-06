// src/config/environments.ts
import { string, number, object, InferType } from "yup";

const envSchema = object({
  BASE_API_URL: string()
    // .url()
    .required("API_ENDPOINT es requerida")
    .default("http://localhost:3000/"),
  API_JOBS: string()
    .required("API_JOBS es requerida")
    .default("api/v1/jobs"),
  API_RECOMMENDATIONS: string()
    .required("API_RECOMMENDATIONS es requerida")
    .default("api/v1/recommendations"),
  PORT: number().default(4000),
});

type Env = InferType<typeof envSchema>;

// Cambiamos nombre para no redeclarar
const rawApiEndpoint = import.meta.env.BASE_API_URL;
const rawApiJobs = import.meta.env.API_JOBS;
const rawApiRecommendations = import.meta.env.API_RECOMMENDATIONS;
const rawPort = import.meta.env.PORT;

const env: Env = {
  BASE_API_URL: rawApiEndpoint || "https://jobradar.api.com/",
  API_JOBS: rawApiJobs || "api/v1/jobs",
  API_RECOMMENDATIONS: rawApiRecommendations || "api/v1/recommendations",
  PORT: rawPort ? Number(rawPort) : 4000,
};

const validatedEnv = envSchema.validateSync(env, {
  stripUnknown: true,
  abortEarly: false,
});

export const { BASE_API_URL, API_JOBS, API_RECOMMENDATIONS, PORT } = validatedEnv;
