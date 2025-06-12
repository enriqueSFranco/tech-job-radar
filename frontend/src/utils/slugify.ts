export const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD") // Normaliza caracteres (acentos, ñ, etc.)
    .replace(/[\u0300-\u036f]/g, "") // Elimina acentos y diacríticos
    .replace(/[^a-z0-9\s-]/g, "") // Elimina símbolos no válidos para URLs
    .replace(/\s+/g, "-") // Convierte espacios en guiones
    .replace(/-+/g, "-"); // Evita guiones duplicados
