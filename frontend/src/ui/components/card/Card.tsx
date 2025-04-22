import type { Job } from "@/domain/jobs/types";
import styles from "./Card.module.css"

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

  const cardClassName = recommendedVacancy ? styles.recommendedCard : styles.regularCard
  const infoList = [
    {icon: '', text: location},
    {icon: '', text: type},
    {icon: '', text: salary},
    {icon: '', text: experience_level},
    {icon: '', text: remote},
  ]
  return (
    <article className={cardClassName}>
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>{title}</h2>
          <h3 className={styles.company}>{company}</h3>
        </div>
        <span className={styles.date}>{posted_date}</span>
      </header>
      <div className={styles.details}>
        <p>{details ?? "No hay detalles para esta vacante"}</p>
      </div>
      <footer className={styles.footer}>
        <ul className={styles.infoList}>
          {infoList.map(item => (
            <li key={`item-${item.text}`} className={styles.infoItem}><span>{item.text}</span></li>
          ))}
        </ul>
      </footer>
    </article>
  );
}
