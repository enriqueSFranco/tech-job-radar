import { Job } from "@/types"
// import { IcGlassdoor } from "../../../../shared/icons/business/IcGlassdoor";
// import { IcOcc } from "../../../../shared/icons/business/IcOcc";
import { useLocation } from "react-router";

type Props = {
  job: Job
}
export function Details({job}: Props) {
  const location = useLocation()
  // const applicationUrlHost = new URL(location.pathname).host;
  // const siteName = applicationUrlHost.split(".")[1];
  // const buttonBackgroundColor = siteName.includes("occ") ? "#0A3CAD59" : "#00A26340";
  // const siteIcon = siteName.includes("occ") ? <IcOcc /> : <IcGlassdoor />;
  return (
    <article className="">
      <header className="">
        <div className="flex flex-col items-start justify-center">

        <h2 className="text-2xl font-bold">{job.jobTitle}</h2>
        <div className="flex items-center justify-center gap-1">
          <p className="text-gray-400 font-light text-sm"><strong>Empresa:</strong> {job.companyName}</p>
          <span className="text-gray-500 text-sm">&#9679;</span>
          <p className="text-gray-400 font-light text-sm"><strong>Ubicación:</strong> {job.jobLocation}</p>
        </div>
        </div>
        {/* badges */}
        <div className="flex items-center justify-between">
          <span>{job.datePosted}</span>
          <button>Aplica en occ</button>
        </div>
      </header>
      <div className="">
        <div className="w-full h-2 bg-neutral-900"></div>
        <p><strong>Descripción:</strong> {job.jobDescription}</p>
      </div>
    </article>
  )
}
