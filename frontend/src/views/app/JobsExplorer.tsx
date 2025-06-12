import { useAppSelector } from "@/app/hooks";
import { JobsDetailsContent } from "@/features/jobs/components/JobDetails/JobDetailsContent";
import { JobExplorerContent } from "@/features/jobs/components/JobExplorerContent";
import { JobList } from "@/features/jobs/components/JobList/JobList";
import { selectJobs } from "@/features/jobs/jobs.selectors";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useResponsive } from "@/hooks/useResponsive";
import { JobsExplorerLayout } from "@/layouts/JobsExplorerLayout";
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

export function JobsExplorer() {
  const jobs = useAppSelector(selectJobs);
  const separatorRef = useRef<HTMLDivElement>(null);
  const { isOutOfView } = useIntersectionObserver({
    ref: separatorRef,
    threshold: 1,
    rootMargin: "-64px 0px 0px 0px",
  });
  const { currentTab, selectTab } = useCurrentTab(tabOptions);

  return (
    <>
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
      <JobsExplorerLayout>
          <JobExplorerContent jobs={jobs} isSticky={isOutOfView} />
      </JobsExplorerLayout>
    </>
  );
}
