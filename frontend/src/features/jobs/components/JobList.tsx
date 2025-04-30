import { Job } from "@/types";
import { Card } from "@/ui/Card";

interface Props {
  items: Job[];
  toggleSaveJob(id: string): () => void
  isJobSaved(id: string): boolean
}

export function JobList({ items, toggleSaveJob, isJobSaved }: Props) {
  return (
    <div>
      <ul className="w-full grid grid-flow-row md:auto-cols-min divide-y-[1px] divide-white/20 lg:flex lg:flex-wrap lg:justify-center lg:items-center lg:gap-8">
        {items.map((item) => (
          <li key={`jobId-${item.id}`}>
            <Card
              item={item}
              onSaveJob={toggleSaveJob(item.id)}
              isSave={isJobSaved(item.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
