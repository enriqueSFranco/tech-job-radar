import { useAppSelector } from "@/app/hooks";
import { JobsDetailWrapper } from "@/features/jobs/components/JobDetailWrapper";
import { JobList } from "@/features/jobs/components/JobList/JobList";
import { selectJobs } from "@/features/jobs/jobs.selectors";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useResponsive } from "@/hooks/useResponsive";
import { IcSparkles } from "@/shared/icons/IcSparkles";
import { TabSwitcher } from "@/ui/molecules/Tab/TabSwitcher";
import { useCurrentTab } from "@/ui/molecules/Tab/useCurrentTab";
import { useRef } from "react";

export interface MenuOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path: string;
}

export const menuOptions: MenuOption[] = [
  { id: "1", label: "Mis vacantes favoritas", icon: "♥️", path: "" },
  { id: "2", label: "Configuración", icon: "⚙️", path: "" },
];

const tabOptions = [
  {
    id: "recomendations",
    label: "Para ti",
    icon: <IcSparkles />,
    path: "/recomendaciones",
  },
  { id: "vacancy", label: "Vacantes", icon: null, path: "/empleos" },
];

export function JobExplorer() {
  const jobs = useAppSelector(selectJobs);
  const { breakpoint } = useResponsive();
  const separatorRef = useRef<HTMLDivElement>(null);
  const { currentTab, selectTab } = useCurrentTab(tabOptions);
  const { isOutOfView } = useIntersectionObserver({
    ref: separatorRef,
    threshold: 1,
    rootMargin: "-64px 0px 0px 0px",
  });

  return (
    <main className="sm:container sm:mx-auto">
      <div className="flex flex-col justify-center h-28 w-full">
        <TabSwitcher
          tabs={tabOptions}
          defaultActiveTabId={currentTab}
          onTabChange={selectTab}
        />
        <div
          ref={separatorRef}
          className="w-full h-[1px] bg-neutral-800 relative"
        ></div>
      </div>
      <div
        className={`grid gap-x-5 w-full ${
          breakpoint === "mobile" || breakpoint === "mobileLarge"
            ? "grid-cols-1"
            : "grid-cols-12"
        }`}
      >
        <JobList jobs={jobs} />
        {["mobile", "mobileLarge"].includes(breakpoint) ? (
          <div>{/* Panel de la descripcion de la vacante */}</div>
        ) : (
          <div
            className={`col-span-7 transition-all duration-300 overflow-auto ${
              isOutOfView
                ? "sticky top-20 bg-neutral-900 h-[calc(100vh-80px)] rounded-xl"
                : null
            } border-[1px] border-neutral-800 relative rounded-md`}
          >
            <JobsDetailWrapper />
          </div>
        )}
      </div>
    </main>
  );
}
