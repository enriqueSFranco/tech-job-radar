import { Job } from "@/types";
import { Card } from "@/ui/organisms/Card/Card";

interface Props {
  items: Job[];
  path: string
  toggleSaveJob(id: string): () => void;
  isJobSaved(id: string): boolean;
}

export function JobList({ items, path, toggleSaveJob, isJobSaved }: Props) {
  return (
    <div data-testid="job-list-container" className="w-full">
      <ul
        aria-label="Lista de empleos disponibles"
        role="list"
        data-testid="job-list"
        className="w-full space-y-6 grid grid-flow-row md:auto-cols-min divide-white/20 lg:flex lg:flex-wrap lg:justify-center lg:items-center"
      >
        {items.map((item) => (
          <li key={`jobId-${item.id}`} data-testid={`job-item-${item.id}`} className="w-full">
            <Card
              item={item}
              onSaveJob={() => toggleSaveJob(item.id)}
              isSave={isJobSaved(item.id)}
              path={path}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
