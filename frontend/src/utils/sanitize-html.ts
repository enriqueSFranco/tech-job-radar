import DOMPurify, { Config } from "dompurify"

export const sanitizeHTML = (html?: string, config?: Config) => {
  if (!html) return ""
  return DOMPurify.sanitize(html.trim(), config)
}
