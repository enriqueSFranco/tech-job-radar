import { useAppSelector } from "@/app/hooks";
import { IcGlassdoor } from "@/shared/icons/IcGlassdoor";
import { IcOcc } from "@/shared/icons/IcOcc";
import { Job } from "@/types";
import { Chip } from "@/ui/atoms/Chip";
import { sanitizeHTML } from "@/utils/sanitize-html";
import { Suspense } from "react";
import { selectJobById } from "../../jobs.selectors";
import styles from "./JobDetails.module.css";

export function JobDetails({ jobId }: { jobId: Pick<Job, "id"> }) {
  const job = useAppSelector((state) => selectJobById(state, jobId.id));

  if (!job) {
    return <div>Trabajo no encontrado 🥺</div>;
  }

  const appHost = new URL(job.applicationUrl).host;
  const platformName = appHost.split(".")[1];
  const isFromOcc = platformName.includes("occ");
  const applyButtonStyles = {
    backgroundColor: isFromOcc ? "#2571db32" : "#73d4a532",
    color: isFromOcc ? "#6ab2f6" : "#17dfa3",
  };
  const platformIcon = isFromOcc ? <IcOcc /> : <IcGlassdoor />;

  const sanitizedDescription = sanitizeHTML(job.jobDescription);
  const sanitizedEducationRequirements = sanitizeHTML(
    job.educationRequirements
  );
  const sanitizedEmploymentType = sanitizeHTML(job.employmentType);

  function navigateToSiteweb(url: URL) {
    window.open(url, "_blank");
  }

  return (
    <Suspense fallback={<div>cargando</div>}>
      <article
        className="p-4 flex flex-col gap-6 relative"
        data-website={platformName}
      >
        <header className="flex flex-col gap-6">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-2xl font-light text-balance leading-1.5 tracking-wider">
              {job.jobTitle}
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateToSiteweb(new URL(job.applicationUrl))}
                style={{
                  backgroundColor: applyButtonStyles.backgroundColor,
                  color: applyButtonStyles.color,
                }}
                className="px-3.5 py-2.5 flex items-center justify-between gap-2 cursor-pointer rounded-md"
              >
                <label className="text-md font-light leading-1.5 tracking-wide">
                  Aplicar en
                </label>
                {platformIcon}
              </button>
              <button className="grid place-content-center bg-neutral-800 hover:bg-neutral-700 transition-colors duration-300 ease-in-out cursor-pointer h-10 w-12 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-start justify-items-start gap-4 outline-[1px] outline-gray-600 rounded-xl p-4">
            <Chip label={job.companyName}>
              <label>Empresa</label>
            </Chip>
            <Chip label={job.jobLocation}>
              <label>Ubicación</label>
            </Chip>
            <Chip label={job.salaryRange}>
              <label>Sueldo</label>
            </Chip>
            <Chip label={job.experienceLevel}>
              <label>Nivel de experiencia</label>
            </Chip>
          </div>
        </header>
        <div className="overflow-y-scroll">
          <div className="w-full">
            <h2 className="font-light text-xl">Descripción del empleo</h2>
            <div
              className={`${styles.job_description} text-base text-gray-400 leading-relaxed`}
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></div>
          </div>
          {job.educationRequirements && (
            <>
              <h2 className="font-light text-xl">Requerimientos</h2>
              <div
                className="text-gray-400 text-base text-balance leading-1.5"
                dangerouslySetInnerHTML={{
                  __html: sanitizedEducationRequirements,
                }}
              ></div>
            </>
          )}
          <div>
            <p
              dangerouslySetInnerHTML={{ __html: sanitizedEmploymentType }}
            ></p>
          </div>
        </div>
      </article>
    </Suspense>
  );
}
