import type { Job } from "@/types";
import styles from "./Card.module.css";
// import {
//   IcBriefCase,
//   IcDollar,
//   IcHomeWork,
//   IcLocation,
//   IcOffice,
//   IcUser,
// } from "../icons";

interface Props {
  data: Job;
  recommendedVacancy?: boolean;
}

export function Card({ data, recommendedVacancy }: Props) {
  const {
    title,
    location,
    type,
    salary,
    posted_date,
    experience_level,
    company,
    remote,
    educations,
    technologies,
    details,
  } = data;

  const cardClassName = recommendedVacancy
    ? styles.recommendedCard
    : "p-4 flex flex-col justify-bwetween gap-2 w-full h-[200px] bg-white/5";

  return (
    <article className={`${cardClassName}`}>
      <header className="flex items-center justify-between text-sm">
        <label className="text-gray-400 text-sm font-light">{posted_date}</label>
      </header>
      <div className="flex flex-col gap-1.5 justify-start items-start tracking-wide">
        <h2 className="font-bold text-lg">{title}</h2>
        <span className="font-light text-sm">{salary}</span>
      </div>
      {details && (
        <div className="">
          <p>{details}</p>
        </div>
      )}

      <footer className="flex flex-col items-start">
        <span>{company}</span>
        <span>{location}</span>
      </footer>
    </article>
  );
}
