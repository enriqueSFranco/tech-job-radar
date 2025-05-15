import { Job } from "@/types";
import { Card } from "@/ui/organisms/Card/Card";

interface Props {
  items: Job[];
  toggleSaveJob(id: string): () => void;
  isJobSaved(id: string): boolean;
}

export function JobList({ items, toggleSaveJob, isJobSaved }: Props) {
  return (
    <div data-testid="job-list-container">
      <ul
        aria-label="Lista de empleos disponibles"
        role="list"
        data-testid="job-list"
        className="w-full grid grid-flow-row md:auto-cols-min divide-y-[1px] divide-white/20 lg:flex lg:flex-wrap lg:justify-center lg:items-center lg:gap-8"
      >
        {items.map((item) => (
          <li key={`jobId-${item.id}`} data-testid={`job-item-${item.id}`}>
            <Card
              item={item}
              onSaveJob={() => toggleSaveJob(item.id)}
              isSave={isJobSaved(item.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
