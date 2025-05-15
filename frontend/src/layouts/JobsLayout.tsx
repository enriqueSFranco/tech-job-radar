import { JobList } from '@/features/jobs/components/JobList/JobList';
import { Outlet, useLocation } from 'react-router';
import data from "@/resources/json/jobs.json";
import { Job } from "@/types";

const jobs: Job[] = data;
const myJobs: Job[] = [];

export function JobsLayout() {
  const location = useLocation()
  const basePath = location.pathname.includes("vacantes") ? "vacantes" : "recomendaciones"
  console.log(basePath)
  const toggleSaveJob = (id: string) => () => {};

  const isJobSaved = (id: string) => myJobs.some((job) => job.id === id);

  return (
    <div className="grid grid-cols-2 gap-x-4 min-h-screen">
      {/* Lista fija a la izquierda */}
        <JobList
          items={jobs}
          toggleSaveJob={toggleSaveJob}
          isJobSaved={isJobSaved}
          path={basePath}
        />
      {/* Detalle dinámico a la derecha */}
      <div className="bg-neutral-900">
        <h2>detalles</h2>
        <Outlet />
      </div>
    </div>
  );
}

