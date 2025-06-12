export const tagOptions = [
  { id: "1", tags: ["ventas"], category: "comercial" },
  {
    id: "2",
    tags: ["tecnologías de la información", "sistemas"],
    category: "tecnologia",
  },
  { id: "3", tags: ["contabilidad"], category: "finanzas" },
  { id: "4", tags: ["administrativo"], category: "administracion" },
  { id: "5", tags: ["ingenieria"], category: "ingenieria" },
  { id: "6", tags: ["recursos humanos"], category: "rrhh" },
  {
    id: "7",
    tags: ["logistica", "transporte", "distribución", "almacen"],
    category: "logistica",
  },
  {
    id: "8",
    tags: ["manufactura", "producción", "operación"],
    category: "operaciones",
  },
];

export function TagList() {
  return (
    <nav>
      <ul className="flex flex-wrap justify-center gap-4">
        {tagOptions.map(({ id, tags, category }) => {
          return (
            <li key={`tagId-${id}`} data-category={category}>
              <button
                type="button"
                aria-label=""
                className={`flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out hover:scale-95`}
              >
                <span className="tag rounded-full inline-block font-light text-md capitalize text-sm px-3 py-0.5">
                  {tags.join(" - ")}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
