import type { Job } from "@/domain/jobs/types";

interface Props {
  data: Job;
  recommendedVacancy?: boolean;
}

export function Card({ data, recommendedVacancy }: Props) {
  const {title} = data
  return (
    <div>
      <h2>{title}</h2>
    </div>
  )
}
