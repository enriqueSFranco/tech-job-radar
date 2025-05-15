import {Suspense, lazy} from "react"
import { useParams } from "react-router"
import data from "@/resources/json/jobs.json";
import { Job } from "@/types";
import { Details } from "@/features/jobs/components/Details/Details";

const jobs: Job[] = data;

export function JobDetails() {
  const { jobId } = useParams<{ jobId: string }>();

  if (!jobId) {
    return <div>Falta el ID del trabajo</div>;
  }

  const job = jobs.find((job) => job.id === jobId);

  if (!job) {
    return <div>Trabajo no encontrado</div>;
  }

  return (
    <section>
      {/* TODO: Usar Suspense y  */}
      <Suspense fallback={<div>cargando</div>}>
        <Details job={job} />
      </Suspense>
    </section>
  );
}
