import { JobList } from "@/features/jobs/components/JobList/JobList";
import { SearchForm } from "@/features/search/components/SearchForm";
import { Debugger } from "@/shared/components/Debugger";
import { Job } from "@/types";
import data from "@/resources/json/jobs.json";
import { Header } from "@/ui/Header";
import { PanelMenu } from "@/ui/PanelMenu";
import { VacancySwitcher } from "@/ui/VacancySwitcher";
import { Suspense, useEffect, useState } from "react";
import "../../App.css";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { IcSparkles } from "@/shared/icons";

const jobs: Job[] = data;
const tabOptions = [
  {
    id: crypto.randomUUID(),
    label: "Para ti",
    icon: <IcSparkles />,
    href: "/",
  },
  { id: crypto.randomUUID(), label: "Buscar", icon: null, href: "/" },
];

const MOBILE_BREAKPOINT = 768;

export function Home() {
  // TODO: Usar redux para controlar el estado
  const isScrolled = useScrollTrigger()
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width:${MOBILE_BREAKPOINT}px)`);

    const handleChange = (e: MediaQueryListEvent) => {
      // actializamos el estado de la ventana
      setIsMobile(e.matches);
    };
    setIsMobile(mediaQuery.matches);

    // agregamos un listener para escuchar el cambio de tamaño
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // TODO: Pasar a un store de redux
  const toggleSaveJob = (id: string) => () => {
    setMyJobs((prevState) => {
      const exists = prevState.some((job) => job.id === id);
      if (exists) {
        return prevState.filter((job) => job.id !== id);
      } else {
        const jobToSave = jobs.find((job) => job.id === id);
        return jobToSave ? [...prevState, jobToSave] : prevState;
      }
    });
  };

  function handleToggleMenu() {
    // setIsPanelOpen((prevState) => !prevState);
    console.log("open menu ", isPanelOpen);
  }


  // TODO: Variable computada
  const isJobSaved = (id: string) => myJobs.some((job) => job.id === id);

  return (
    <>
      <Header showButtonMenu={isMobile} isScrolled={isScrolled} onToggleMenu={handleToggleMenu} />
      <div className="content">
        {isMobile && (
            <Suspense fallback={<div>Loading...</div>}>
              <PanelMenu isOpen={isPanelOpen} isScrolled={isScrolled} onToggle={handleToggleMenu} />
            </Suspense>
          )}
        <div className="w-full fex flex-col gap-4 pt-16 relative">
          <SearchForm />
          <VacancySwitcher tabs={tabOptions} defaultActiveTabId="1" />
          <div className="w-full h-[0.5px] bg-neutral-800"></div>
        </div>
          <JobList
            items={jobs}
            toggleSaveJob={toggleSaveJob}
            isJobSaved={isJobSaved}
          />
        <Debugger data={myJobs} />
      </div>
    </>
  );
}
