import {
  array,
  object,
  string,
  number,
  date,
  InferType,
  boolean,
  mixed,
} from "yup";

export let jobSearchQuerySchema = object({
  keyword: string().default("ingeniero de software").trim(),
  location: string().default("Ciudad de Mexico").trim(),
  page: number()
    .transform((value, originalValue) => Number(originalValue))
    .positive("page must be > 0")
    .integer()
    .min(1)
    .default(1)
    .optional(),
  resultPerPage: number()
    .transform((value, originalValue) => Number(originalValue))
    .positive("page must be > 0")
    .integer()
    .min(1)
    .max(100)
    .optional(),
  sortBy: mixed<"asc" | "desc">().oneOf(["asc", "desc"]).optional(),
});

export let jobSchema = object({
  id: string(),
  title: string().required(),
  company: string().optional(),
  location: string().optional(),
  remote: boolean().optional(),
  details: string(),
  type: string().optional(),
  posted_date: date().default(() => new Date()),
  technologies: array(string()).default(() => []),
  experience_level: string(),
  educations: string().optional(),
  url: string().url().nullable(),
  salary: string().optional(),
})
  .strict()
  .unknown();

export type Job = InferType<typeof jobSchema>;
export type jobSearchQuery = InferType<typeof jobSearchQuerySchema>;
