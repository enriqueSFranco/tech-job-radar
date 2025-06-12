import { Hero } from "@/features/hero/Hero";
import { SearchForm } from "@/features/job-search/components/JobSearchForm";
import { TagList } from "@/features/jobs/components/TagList";
import { MainLayout } from "@/layouts/MainLayout";
import "../../App.css";

export function Home() {
  return (
    <MainLayout>
      <Hero />
      <div className="flex flex-col items-center justify-center gap-10 sm:container sm:mx-auto">
        <SearchForm />
        <TagList />
      </div>
    </MainLayout>
  );
}
