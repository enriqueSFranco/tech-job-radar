import { JobList } from "@/features/jobs/components/JobList/JobList";
import { Outlet, useOutletContext } from "react-router";
import { useResponsive } from "@/hooks/useResponsive";
import { useAppSelector } from "@/app/hooks";
import { selectAllJobs } from "@/features/jobs/jobs.selectors";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import notFoundImage from "@/resources/search-no-result-found.png";

type OutletContext = {
  separatorRef: React.RefObject<HTMLDivElement>;
};

export function JobsLayout() {
  const {separatorRef} = useOutletContext<OutletContext>();
  const {isOutOfView} = useIntersectionObserver({ref: separatorRef, threshold: 1, rootMargin: "-64px 0px 0px 0px"})
  const jobs = useAppSelector(selectAllJobs);
  const { breakpoint } = useResponsive();

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <picture>
          <img
            src={notFoundImage}
            className="w-sm object-contain aspect-[1/1]"
          />
        </picture>
        <div className="max-w-2xl">
          <h2 className="text-gray-400 text-xl font-bold tracking-wide">No hay empleos que coincidan con tu búsqueda "aqui va la busqueda"</h2>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-x-5 w-full ${
        breakpoint === "mobile" || breakpoint === "mobileLarge"
          ? "grid-cols-1"
          : "grid-cols-2"
      }`}
    >
      <JobList items={jobs} />
      {breakpoint.includes("mobile") ? (
        <div>{/* Panel de la descripcion de la vacante */}</div>
      ) : (
        <div

          className={`transition-all duration-300 overflow-auto ${
            isOutOfView ? "sticky top-20 bg-neutral-900 h-[calc(100vh-80px)] rounded-xl z-10" : null
          } p-6 border-[1px] border-neutral-800 relative rounded-md`}
        >
          <Outlet />
        </div>
      )}
    </div>
  );
}
