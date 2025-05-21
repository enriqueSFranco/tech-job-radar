import {Suspense, lazy, useEffect, useState} from "react"
import { useParams } from "react-router"
// import data from ""@/resources/json/mockApiData.json"/jobs.json";
import { Job } from "@/types";
import { Details } from "@/features/jobs/components/Details/Details";
import { fetchJobById_improved } from "@/utils/fetchJobById_improved";

export function JobDetails() {
  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, updateIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { jobId } = useParams<{ jobId: string }>();

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    async function loadData() {
      if (!jobId) {
        updateIsLoading(false)
        setJob(null)
        setError(null)
        return
      }
      updateIsLoading(true);
      setError(null)
      try {
        const jobData = jobId ? await fetchJobById_improved(jobId, signal) : null;
        if (!signal.aborted)
          setJob(jobData)
      } catch(e) {
        if (!signal.aborted) {
          if (e instanceof DOMException && e.name === "AbortError") {
            console.log(`Workspace para ${jobId} abortado (probablemente por cleanup).`);
          } else if (e instanceof Error) {
            console.error(`Error cargando job ${jobId}: ${e.message}`);
            setError(`Error al cargar el trabajo: ${e.message}`);
          } else {
            console.error(`Error desconocido cargando job ${jobId}`);
            setError("Ocurrió un error desconocido.");
          }
        }
      } finally {
        if (!signal.aborted) {
          updateIsLoading(false);
        }
      }
    }
    loadData()
    return () => {
      console.log(`UseEffect cleanup: Abortando fetch para ID anterior o al desmontar (jobId actual era: ${jobId}).`);
      controller.abort();
    };
  }, [jobId])

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
