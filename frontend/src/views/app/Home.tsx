import { useRef, useState } from "react";
import { Outlet } from "react-router";
import { SearchForm } from "@/features/search/components/SearchForm";
import { Header } from "@/ui/Header";
import { useResponsive } from "@/hooks/useResponsive";
import { VacancySwitcher } from "@/ui/VacancySwitcher";
import { IcSparkles } from "@/shared/icons";
import { useCurrentTab } from "@/hooks/useCurrentTab";
import { HeaderMobileControls } from "@/ui/HeaderMobileControls";
import { PanelMenu } from "@/ui/PanelMenu";
import "../../App.css";

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
  const separatorRef = useRef<HTMLDivElement>(null);
  const [isPanelMenuOpen, updateIsPanelMenuOpen] = useState(false);
  const { breakpoint } = useResponsive();
  const { currentTab, selectTab } = useCurrentTab(tabOptions);
  const isMobileOrTablet =
    breakpoint.includes("mobile") || breakpoint.includes("mobileLarge");

  function handleOpenPanelMenu() {
    updateIsPanelMenuOpen((prevState) => !prevState);
  }

  return (
    <>
      <Header
        leftSlot={
          <h1 className={`text-xl font-bold capitalize tracking-wide`}>
            job radar
          </h1>
        }
        rightSlot={
          isMobileOrTablet && (
            <HeaderMobileControls
              isPanelMenuOpen={isPanelMenuOpen}
              onPanelMenuOpen={handleOpenPanelMenu}
            />
          )
        }
      />

      {isMobileOrTablet && isPanelMenuOpen && (
        <PanelMenu
          isOpen={isPanelMenuOpen}
          onOpenPanelMenu={handleOpenPanelMenu}
        />
      )}
      <div className="mt-20 mb-10 w-full">
        <h1 className="text-5xl text-white text-center font-bold">
          Descubre la chamba perfecta para ti
        </h1>
      </div>
      <main className="content">
        <div className="w-full fex flex-col relative">
          <SearchForm />
          <VacancySwitcher
            tabs={tabOptions}
            defaultActiveTabId={currentTab}
            onTabChange={selectTab}
          />
        </div>
        <div
          ref={separatorRef}
          className="w-full h-[0.5px] bg-neutral-800 relative"
        ></div>
        <Outlet context={{ separatorRef }} />
      </main>
    </>
  );
}
