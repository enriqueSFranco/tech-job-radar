import {useSearchParams} from 'react-router'
import { useResponsive } from "@/hooks/useResponsive";
import { JobDetails } from "@/features/jobs/components/JobDetails/JobDetails";

export function JobsDetailsContent() {
  const [searchParams] = useSearchParams()
  const { isBreakpoint } = useResponsive();
  const jobIdFromParams = searchParams.get("jobId");
  const isScreenSmall = isBreakpoint(["mobile", "mobileLarge"])

  if (!jobIdFromParams) return null;

  return (
    <>
      {isScreenSmall ? (
        <div>Panel de la descripcion de la vacante</div>
      ) : (
          <JobDetails jobId={{ id: jobIdFromParams }} />
      )}
    </>
  );
}
