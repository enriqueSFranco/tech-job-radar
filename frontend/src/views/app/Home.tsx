import {useNavigate, useLocation, Outlet} from "react-router"
import { SearchForm } from "@/features/search/components/SearchForm";
// import { JobList } from "@/features/jobs/components/JobList/JobList";
// import { Debugger } from "@/shared/components/Debugger";
// import { Job } from "@/types";
import { Header } from "@/ui/Header";
import { PanelMenu } from "@/ui/PanelMenu";
import { VacancySwitcher } from "@/ui/VacancySwitcher";
import { Suspense, useEffect, useState } from "react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { IcSparkles } from "@/shared/icons";
import "../../App.css";

const MOBILE_BREAKPOINT = 768;

const tabOptions = [
  {
    id: "recomendations",
    label: "Para ti",
    icon: <IcSparkles />,
    path: "/recomendaciones",
  },
  { id: "vacancy", label: "Vacantes", icon: null, path: "/vacantes" },
];


export function Home() {
  // TODO: Usar redux para controlar el estado
  const isScrolled = useScrollTrigger();
  // const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= MOBILE_BREAKPOINT
  );
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  const currentTab = tabOptions.find(tab => location.pathname.startsWith(tab.path))?.id

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
  // const toggleSaveJob = (id: string) => () => {
  //   setMyJobs((prevState) => {
  //     const exists = prevState.some((job) => job.id === id);
  //     if (exists) {
  //       return prevState.filter((job) => job.id !== id);
  //     } else {
  //       const jobToSave = jobs.find((job) => job.id === id);
  //       return jobToSave ? [...prevState, jobToSave] : prevState;
  //     }
  //   });
  // };

  function handleToggleMenu() {
    // setIsPanelOpen((prevState) => !prevState);
    console.log("open menu ", isPanelOpen);
  }

  function handleSelectTab() {
    const tabOption = tabOptions.find((tab) => pathname.startsWith(tab.path));
    if (!tabOption) return;
    // searchParams
    const currentParams = new URLSearchParams(location.search)
    const keyword = currentParams.get("keyword") ?? "rontend-developer"
    const locationParam = currentParams.get("location") ?? "ciudad-de-mexico"
    console.log(`se selecciono ${tabOption.label} - ${location} `);
    navigate(`${tabOption.path}?keyword=${keyword}&location=${locationParam}`)
  }

  // TODO: Variable computada
  // const isJobSaved = (id: string) => myJobs.some((job) => job.id === id);

  return (
    <>
      <Header
        showButtonMenu={isMobile}
        isScrolled={isScrolled}
        onToggleMenu={handleToggleMenu}
      />
      <div className="mt-20 mb-10 w-full">
        <h1 className="text-5xl text-white text-center font-bold">Descubre la chamba perfecta para ti</h1>
      </div>
      <main className="content">
        {isMobile && (
          <Suspense fallback={<div>Loading...</div>}>
            <PanelMenu
              isOpen={isPanelOpen}
              isScrolled={isScrolled}
              onToggle={handleToggleMenu}
            />
          </Suspense>
        )}
        <div className="w-full fex flex-col relative">
          <SearchForm />
          <VacancySwitcher
            tabs={tabOptions}
            defaultActiveTabId={currentTab}
            onTabChange={handleSelectTab}
          />
          {/* separator */}
          <div className="w-full h-[0.5px] bg-neutral-800"></div>
        </div>
        <Outlet />
        {/* <Debugger data={myJobs} /> */}
      </main>
    </>
  );
}
