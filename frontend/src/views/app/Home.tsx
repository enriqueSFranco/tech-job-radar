import { useState } from "react";
import { SearchForm } from "@/features/search/components/SearchForm";
import { Header } from "@/ui/organisms/Header/Header";
import { useResponsive } from "@/hooks/useResponsive";
import { MenuToggle } from "@/ui/organisms/Header/MenuToggle";
import { PanelMenu } from "@/ui/organisms/Panel/PanelMenu";
import { Debugger } from "@/shared/components/Debugger";
import { useAppSelector } from "@/app/hooks";
import { selectSavedJobs } from "@/features/jobs/jobs.selectors";
import { Outlet } from "react-router";
import "../../App.css";

function LeftHeader() {
  return (
    <div className="flex items-center justify-center">
      <h1 className={`text-xl font-bold capitalize tracking-wide`}>
        job radar
      </h1>
    </div>
  );
}

function Hero() {
  return (
    <section
      className="w-full h-72 grid place-content-center bg-[linear-gradient(to_right,#222222E6_1px,transparent_1px),linear-gradient(to_bottom,#222222E6_1px,transparent_1px)] bg-[size:24px_24px] fade-mask">
      <h1 className="text-neutral-300 md:text-5xl lg:text-7xl font-extrabold text-center tracking-tight leading-tight z-20">
        La chamba ideal existe
        <br /> y te está{" "}
        <span className="relative inline-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="100%"
            height="100%"
            viewBox="0 0 170 19"
            className="stroke-hero stroke-blue-700 absolute top-16 w-full h-[0.5em]"
          >
            <path
              id="Path"
              d="M2.5 6.65396C79.8864 -0.9541 137.773 1.67389 167.5 8.02777C139.886 5.72365 78.8636 5.60446 29.0909 9.40306C61.8182 8.71233 113.977 11.613 128.977 16.3094C113.068 14.2374 84.3182 12.8562 49.5455 17"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="relative">buscando</span>
        </span>
      </h1>
    </section>
  );
}

export function Home() {
  // TODO: Usar redux para controlar el estado
  const savedJobs = useAppSelector(selectSavedJobs);
  const [isPanelMenuOpen, updateIsPanelMenuOpen] = useState(false);
  const { breakpoint } = useResponsive();
  const isMobileOrTablet =
    breakpoint.includes("mobile") || breakpoint.includes("mobileLarge");

  function handleOpenPanelMenu() {
    updateIsPanelMenuOpen((prevState) => !prevState);
  }

  return (
    <>
      <Header
        isPanelOpen={isPanelMenuOpen}
        leftSlot={<LeftHeader />}
        rightSlot={
          isMobileOrTablet && (
            <MenuToggle
              isPanelOpen={isPanelMenuOpen}
              onPanelMenuOpen={handleOpenPanelMenu}
            />
          )
        }
      />
      {isPanelMenuOpen && (
        <PanelMenu isPanelOpen={isPanelMenuOpen} options={[]} />
      )}
      <Hero />
      <SearchForm />
      <Outlet />
      <Debugger data={savedJobs} />
    </>
  );
}
