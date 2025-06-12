import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addSavedJob, removeSavedJob } from "@/features/jobs/savedJobs.slice";
import { IcBookMark } from "@/shared/icons/IcBookMark";
import type { Job } from "@/types";
import { Chip } from "@/ui/atoms/Chip";
import { sanitizeHTML } from "@/utils/sanitize-html";
import { timeAgo } from "@/utils/time-ago";
import { useLocation, useNavigate } from "react-router";
import styles from "./Card.module.css"

interface Props {
  item: Job;
}

function getTruncatedTextFromHTML(html: string = "", maxChars: number = 100) {
  if (!html.trim()) return ""

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  let text = doc.body.textContent?.trim() || ""
  return text.length > maxChars ? text.slice(0, maxChars).trimEnd() + "..." : text
}

export function Card({ item }: Props) {
  const {pathname, search} = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const savedJobs = useAppSelector((state) => state.savedJobs.savedJobs);
  const isSaved = savedJobs.some((j) => j.id === item.id);

  function handleSaveToggle(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    dispatch(isSaved ? removeSavedJob({ id: item.id }) : dispatch(addSavedJob(item)));
  }

  function handleClick() {
    const params = new URLSearchParams(search);
    params.set("jobId", item.id);
    navigate(`${pathname}?${params.toString()}`);
  }

  const tags = [
    { label: `Modalidad: ${item.isRemote ? "En casa" : "En oficina"}` },
    { label: `Empresa: ${item.companyName}` },
    { label: `Sueldo: ${item.salaryRange}` }
  ];
  console.log(getTruncatedTextFromHTML(item.jobDescription))
  return (
    <article
      onClick={handleClick}
      className={`relative cursor-pointer hover:bg-neutral-800 flex flex-col justify-between gap-2 w-full min-h-56 h-full p-3`}
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
            <span className="text-gray-500 text-[0.60em]">&#9679;</span>
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

      <div role="group" aria-label="Etiquetas del empleo">
        <ul
          className="flex flex-wrap items-center justify-items-start gap-2"
          data-testid={`job-tags-${item.id}`}
        >
          {tags.map(tag => (
            <li key={`tagId-${tag.label}`}>
              <Chip label={tag.label} />
            </li>
          ))}
        </ul>
      </div>

      {item.jobDescription && (
        <div
          className={`text-sm text-gray-300 tracking-wide`}
          data-description={`job-description-${item.id}`}
          dangerouslySetInnerHTML={{__html: sanitizeHTML(getTruncatedTextFromHTML(item.jobDescription))}}
        >
        </div>
      )}

      <footer className="flex justify-between text-sm text-gray-400 font-light">
        <label>{timeAgo(item.datePosted)}</label>
      </footer>
    </article>
  );
}
