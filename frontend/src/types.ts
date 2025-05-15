export interface Job {
  id: string;
  jobTitle: string;
  companyName: string;
  jobLocation: string;
  isRemote: boolean;
  jobDescription?: string;
  employmentType: string;
  datePosted: string;
  techStack: string[];
  experienceLevel: string;
  educationRequirements?: string;
  applicationUrl: string;
  salaryRange: string;
}
