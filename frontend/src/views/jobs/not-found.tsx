import notFoundImage from "@/resources/search-no-result-found.png";

export function NoJobsFound({
  keyword,
  location,
}: {
  keyword: string;
  location: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <picture>
        <img src={notFoundImage} className="w-16 md:w-32 lg:w-48 object-contain aspect-[1/1]" />
      </picture>
      <div className="max-w-2xl">
        <h2 className="text-gray-400 text-xl font-bold tracking-wide">
          No hay empleos que coincidan con tu búsqueda "{keyword} en {location}"
        </h2>
      </div>
    </div>
  );
}
