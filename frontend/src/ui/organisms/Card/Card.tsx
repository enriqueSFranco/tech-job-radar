import type { Job } from "@/types";
import { IcBookMark, IcOffice } from "../../../shared/icons";
import { Link } from "react-router";
import { IcGlassdoor } from "../../../shared/icons/business/IcGlassdoor";
import { IcOcc } from "../../../shared/icons/business/IcOcc";
import { Badge } from "@/ui/atoms/Badge";

interface Props {
  item: Job;
  recommendedVacancy?: boolean;
  onSaveJob(): void;
  isSave: boolean;
}

export function Card({ item, recommendedVacancy, onSaveJob, isSave }: Props) {
  const cardClassName = recommendedVacancy
    ? ""
    : "p-2 flex flex-col justify-bwetween gap-2 h-[200px] bg-white/5";

  // const iconModalityWork = item.isRemote ? <IcHomeWork /> : <IcOffice />;
  const applicationUrlHost = new URL(item.applicationUrl).host;
  const siteName = applicationUrlHost.split(".")[1];
  const buttonBackgroundColor = siteName.includes("occ") ? "#0A3CAD59" : "#00A26340";
  const siteIcon = siteName.includes("occ") ? <IcOcc /> : <IcGlassdoor />;

  return (
    <article className={`${cardClassName}`} aria-labelledby={`job-title-${item.id}`} role="region" data-testid={`job-card-${item.id}`}>
      <header className="flex items-start justify-between text-sm">
        <div className="flex flex-col items-start justify-start gap-2">
          <h2 id={`job-title-${item.id}`} data-testid={`job-title-${item.id}`} className="font-bold text-lg tracking-wide">{item.jobTitle}</h2>
          <div className="flex items-center justify-start gap-1">
            <div className="flex items-center gap-1.5">
              <IcOffice />
              <h3 className="text-sm text-gray-400 self-end">
                {item.companyName}
              </h3>
            </div>
            <span className="text-gray-500">&#9679;</span>
            <h3 className="text-sm text-gray-400 self-end">{item.jobLocation}</h3>
          </div>
        </div>
        <button onClick={onSaveJob} data-testid={`save-button-${item.id}`} className="cursor-pointer" aria-label={isSave ? "Quitar este emplo de guardados" : "Guardar estem empleo"} title={isSave ? "Quitar de guardados" : "Guardar"} aria-pressed={isSave}>
          <IcBookMark className={isSave ? "fill-white" : "stroke-gray-500"} />
        </button>
      </header>
      <div role="group" aria-label="Etiquetas del empleo" className="mt-2">
          <ul className="flex items-center flex-wrap gap-2" data-testid={`job-tags-${item.id}`}>
            <li>
              <Badge label={item.isRemote ? "Desde casa" : "En oficina"} />
            </li>
            <li>
              <Badge label={item.employmentType} />
            </li>
          </ul>
        </div>
      {item.jobDescription && (
        <div className="grow">
          <p className="text-balance text-sm text-left text-gray-300 tracking-wide" data-testid={`job-description-${item.id}`}>
            {item.jobDescription}
          </p>
        </div>
      )}
      <footer className="flex items-start justify-between">
        <label className="text-gray-400 text-sm font-light">
          {item.datePosted}
        </label>
        <Link
          to={item.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`job-link-${item.id}`}
          aria-label={`Ir a la aplicación en ${new URL(item.applicationUrl).hostname}`}
          style={{backgroundColor: buttonBackgroundColor}}
          className="px-4 py-2 rounded-xs text-base font-light flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          Ir a
          {siteIcon}
        </Link>
      </footer>
    </article>
  );
}
