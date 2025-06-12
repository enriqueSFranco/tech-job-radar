import { Job } from "@/types";
import { JobList } from "./JobList/JobList";
import { JobsDetailsContent } from "./JobDetails/JobDetailsContent";
import { useResponsive } from "@/hooks/useResponsive";

type Props = {
  jobs: Job[];
  isSticky: boolean;
};
export function JobExplorerContent({ jobs, isSticky }: Props) {
  const { isBreakpoint } = useResponsive();
  const isScreenSmall = isBreakpoint(["mobile", "mobileLarge", "tablet"]);

  return (
    <>
      <aside data-testid="job-list-container" className="lg:col-span-5 col-span-12 h-min">
        <JobList jobs={jobs} />
      </aside>
      {isScreenSmall ? (
        <div className="hidden">Panel de la descripcion de la vacante</div>
      ) : (
        <div
          className={`md:col-span-7 hidden md:block transition-all duration-300 overflow-hidden overscroll-contain border-[1px] border-neutral-800 relative ${
            isSticky ? "sticky top-5 bg-neutral-900 h-[calc(100vh-80px)]" : null
          }`}
        >
          <JobsDetailsContent />
        </div>
      )}
    </>
  );
}
