export interface JobDTO {
  id: string;
  title: string;
  company?: string;
  location?: string;
  remote?: boolean;
  details?: string;
  type?: string;
  posted_date?: string;
  technologies?: string[];
  experienceLevel?: string;
  educations?: string;
  url?: string;
  salary?: string;
};
