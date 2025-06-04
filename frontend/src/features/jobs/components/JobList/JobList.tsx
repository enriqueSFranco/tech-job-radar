import { useState } from "react";
import { Job } from "@/types";
import { Card } from "@/ui/organisms/Card/Card";

interface Props {
  items: Job[];
}

export function JobList({ items }: Props) {
  const [selectedCardJob, setSelectedCardJob] = useState<Pick<
    Job,
    "id"
  > | null>(items.length > 0 ? { id: items[0].id } : null);

  return (
    <div data-testid="job-list-container" className="w-full">
      <ul
        aria-label="Lista de empleos disponibles"
        role="list"
        data-testid="job-list"
        className="w-full space-y-3 grid"
      >
        {items.map((item) => (
          <li
            key={`jobId-${item.id}`}
            data-testid={`job-item-${item.id}`}
            className="w-full"
            onClick={() => setSelectedCardJob({ id: item.id })}
          >
            <Card item={item} isSelected={selectedCardJob?.id === item.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
