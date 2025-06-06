import { Suspense, useState } from "react";
import { IcGlassdoor } from "@/shared/icons/IcGlassdoor";
import { IcOcc } from "@/shared/icons/IcOcc";
// import { useParams } from "react-router";
// import { Details } from "@/features/jobs/components/Details/Details";
// import { useAppSelector } from "@/app/hooks";
// import { selectJobById } from "@/features/jobs/jobs.selectors";
import { useAppSelector } from "@/app/hooks";
import { selectJobById } from "../jobs.selectors";
import { Job } from "@/types";

export function JobDetail({jobId}: {jobId: Pick<Job, 'id'>}) {
  const job = useAppSelector(state => selectJobById(state, jobId.id))
  // const applicationUrlHost = new URL(location.pathname).host;
  // const siteName = applicationUrlHost.split(".")[1];
  // const buttonBackgroundColor = siteName.includes("occ") ? "#0A3CAD59" : "#00A26340";
  // const siteIcon = siteName.includes("occ") ? <IcOcc /> : <IcGlassdoor />;

  if (!job) {
    return <div>Trabajo no encontrado 🥺</div>;
  }

  return (
    <Suspense fallback={<div>cargando</div>}>
      <article className="bg-red-800">
        <header className="bg-blue-500">
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-2xl font-bold">{job.jobTitle}</h2>
            <div className="flex items-center justify-center gap-1">
              <p className="text-gray-400 font-light text-sm">
                <strong>Empresa:</strong> {job.companyName}
              </p>
              <span className="text-gray-500 text-sm">&#9679;</span>
              <p className="text-gray-400 font-light text-sm">
                <strong>Ubicación:</strong> {job.jobLocation}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>{job.datePosted}</span>
            <button>Aplica en occ</button>
          </div>
        </header>
        <div className="">
          <div className="w-full h-2 bg-neutral-900"></div>
          <p>
            <strong>Descripción:</strong> {job.jobDescription}
          </p>
        </div>
      </article>
    </Suspense>
  );
}
