import { useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { Job } from "@/types";
import { Chip } from "@/ui/atoms/Chip";
import { addSavedJob, removeSavedJob } from "@/features/jobs/savedJobs.slice";
import { IcBookMark } from "@/shared/icons/IcBookMark";

interface Props {
  item: Job;
  isSelected?: boolean;
}

export function Card({ item, isSelected }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const savedJobs = useAppSelector((state) => state.savedJobs.savedJobs);
  const isSaved = savedJobs.some((j) => j.id === item.id);

  function handleSaveToggle(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (isSaved) {
      dispatch(removeSavedJob({ id: item.id }));
    } else {
      dispatch(addSavedJob(item));
    }
  }

  function handleClick() {
    const currentPathname = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("jobId", item.id);
    navigate(`${currentPathname}?${searchParams.toString()}`);
  }

  return (
    <article
      onClick={handleClick}
      className={`relative cursor-pointer transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 flex flex-col gap-2 rounded-xl w-full ${isSelected ? "bg-blue-700/15 border-[1px]" : "border-neutral-800"} xl:outline xl:outline-neutral-900 p-4`}
      aria-labelledby={`job-title-${item.id}`}
      role="region"
      data-testid={`job-card-${item.id}`}
      tabIndex={0}
    >
      <header className="flex items-start justify-between text-sm">
        <div className="flex flex-col items-start gap-2">
          <h2
            id={`job-title-${item.id}`}
            data-testid={`job-title-${item.id}`}
            className="font-bold text-lg tracking-wide"
          >
            {item.jobTitle}
          </h2>
          <div className="flex items-center gap-1">
            <h3 className="text-sm text-gray-400">{item.companyName}</h3>
            <span className="text-gray-500">&#9679;</span>
            <h3 className="text-sm text-gray-400">{item.jobLocation}</h3>
          </div>
        </div>
        <button
          onClick={handleSaveToggle}
          data-testid={`save-button-${item.id}`}
          className="cursor-pointer"
          aria-label={
            isSaved ? "Quitar este empleo de guardados" : "Guardar este empleo"
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
      </header>

      <div role="group" aria-label="Etiquetas del empleo" className="mt-2">
        <ul
          className="flex flex-wrap gap-2"
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
        <p
          className="text-sm text-gray-300 tracking-wide"
          data-testid={`job-description-${item.id}`}
        >
          {item.jobDescription}
        </p>
      )}

      <footer className="flex justify-between text-sm text-gray-400 font-light">
        <label>{item.datePosted}</label>
      </footer>
    </article>
  );
}
