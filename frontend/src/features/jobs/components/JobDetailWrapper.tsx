import {useSearchParams} from 'react-router'
import { useResponsive } from "@/hooks/useResponsive";
import { JobDetail } from "@/features/jobs/components/JobDetail";

export function JobsDetailWrapper() {
  const [searchParams] = useSearchParams()
  const { breakpoint } = useResponsive();

  const jobIdFromParams = searchParams.get("jobId");

  if (!jobIdFromParams) return null;

  return (
    <div>
      {["mobile", "mobileLarge"].includes(breakpoint) ? (
        <div>{/* Panel de la descripcion de la vacante */}</div>
      ) : (
          <JobDetail jobId={{ id: jobIdFromParams }} />
      )}
    </div>
  );
}
