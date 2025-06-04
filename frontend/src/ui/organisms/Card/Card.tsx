import { Link, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { Job } from "@/types";
import { IcBookMark, IcOffice } from "../../../shared/icons";
import { Chip } from "@/ui/atoms/Chip";
import { addSavedJob, removeSavedJob } from "@/features/jobs/savedJobs.slice";

interface Props {
  item: Job;
  isSelected?: boolean;
}

export function Card({ item, isSelected }: Props) {
  const dispatch = useAppDispatch();
  const savedJobs = useAppSelector((state) => state.savedJobs.savedJobs);
  const location = useLocation()

  const currentPath = location.pathname.replace(/\/$/, '')
  const isSaved = savedJobs.some((j) => j.id === item.id);

  function handleSaveToggle() {
    if (isSaved) {
      dispatch(removeSavedJob({ id: item.id }));
    } else {
      dispatch(addSavedJob(item));
    }
  }

  return (
    <div className="relative flex flex-row-reverse">
      <button
        onClick={handleSaveToggle}
        data-testid={`save-button-${item.id}`}
        className="cursor-pointer self-start absolute right-2 top-2"
        aria-label={
          isSaved ? "Quitar este emplo de guardados" : "Guardar estem empleo"
        }
        title={isSaved ? "Quitar de guardados" : "Guardar"}
        aria-pressed={isSaved}
      >
        <IcBookMark
          className={
            isSaved ? "fill-white" : "fill-transparent stroke-gray-500"
          }
        />
      </button>
      <Link
        to={`${currentPath}/${item.id}`}
        className={`${
          isSelected ? "border-blue-600" : "border-neutral-800"
        } p-2 flex flex-col justify-bwetween gap-2 bg-white/5 xl:outline xl:outline-neutral-900 overflow-hidden w-full h-full rounded-xl border-[1px]`}
        aria-labelledby={`job-title-${item.id}`}
        role="region"
        data-testid={`job-card-${item.id}`}
      >
        <header className="flex items-start justify-between text-sm">
          <div className="flex flex-col items-start justify-start gap-2">
            <h2
              id={`job-title-${item.id}`}
              data-testid={`job-title-${item.id}`}
              className="font-bold text-lg tracking-wide"
            >
              {item.jobTitle}
            </h2>
            <div className="flex items-center justify-start gap-1">
              <div className="flex items-center gap-1.5">
                <IcOffice />
                <h3 className="text-sm text-gray-400 self-end">
                  {item.companyName}
                </h3>
              </div>
              <span className="text-gray-500">&#9679;</span>
              <h3 className="text-sm text-gray-400 self-end">
                {item.jobLocation}
              </h3>
            </div>
          </div>
        </header>
        <div role="group" aria-label="Etiquetas del empleo" className="mt-2">
          <ul
            className="flex items-center flex-wrap gap-2"
            data-testid={`job-tags-${item.id}`}
          >
            <li>
              <Chip label={item.isRemote ? "Desde casa" : "En oficina"} />
            </li>
            <li>
              <Chip label={item.employmentType} />
            </li>
          </ul>
        </div>
        {item.jobDescription && (
          <div className="grow">
            <p
              className="text-balance text-sm text-left text-gray-300 tracking-wide"
              data-testid={`job-description-${item.id}`}
            >
              {item.jobDescription}
            </p>
          </div>
        )}
        <footer className="flex items-start justify-between">
          <label className="text-gray-400 text-sm font-light">
            {item.datePosted}
          </label>
        </footer>
      </Link>
    </div>
  );
}
