import { useEffect, useState } from "react";
import { Job } from "@/types";
import { Card } from "@/ui/organisms/Card/Card";
import { JobsLoader } from "../JobsLoader";
import { NoJobsFound } from "@/views/jobs/not-found";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectJobsStatus } from "../../jobs.selectors";
import { ErrorMessage } from "@/ui/atoms/ErrorMessage";
import { selectFormSearch } from "@/features/search/search.selectors";
import { fetchJobs } from "../../jobs.thunks";
import { useLocation, useNavigate } from "react-router";

interface Props {
  jobs: Job[];
}

export function JobList({ jobs }: Props) {
  const [selectedCardJob, setSelectedCardJob] = useState<Pick<
    Job,
    "id"
  > | null>(jobs.length > 0 ? { id: jobs[0].id } : null);
  const { keyword, location } = useAppSelector(selectFormSearch);
  const navigate = useNavigate();
  const locationPath = useLocation().pathname;
  const dispatch = useAppDispatch();
  const jobsStatus = useAppSelector(selectJobsStatus);

  useEffect(() => {
    if (jobsStatus === "idle")
      dispatch(
        fetchJobs({
          keyword: "frontend developer",
          location: "ciudad de mexico",
        })
      );
  }, [jobsStatus, dispatch]);

  useEffect(() => {
    if (
      jobsStatus === "succeeded" &&
      jobs.length > 0 &&
      (locationPath === "/empleos" || locationPath === "/recomendaciones")
    ) {
      navigate(`${locationPath}/${jobs[0].id}`, { replace: true });
    }
  }, [jobsStatus, jobs, locationPath, navigate]);

  if (jobsStatus === "pending") return <JobsLoader />;

  if (jobsStatus === "failed")
    return <ErrorMessage message="Error loading jobs." />;

  if (jobs.length === 0 && jobsStatus === "succeeded")
    return <NoJobsFound keyword={keyword} location={location} />;

  return (
    <div data-testid="job-list-container" className="col-span-5">
      <ul
        aria-label="Lista de empleos disponibles"
        role="list"
        data-testid="job-list"
        className="grid columns-lg gap-y-5"
      >
        {jobs.map((job) => (
          <li
            key={`jobId-${job.id}`}
            data-testid={`job-job-${job.id}`}
            onClick={() => setSelectedCardJob({ id: job.id })}
          >
            <Card item={job} isSelected={selectedCardJob?.id === job.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
