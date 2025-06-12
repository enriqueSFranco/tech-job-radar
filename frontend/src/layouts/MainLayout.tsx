import { useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";
import { Header } from "@/ui/organisms/Header/Header";
import { LeftHeader } from "@/ui/organisms/Header/LeftHeader";
import { MenuToggle } from "@/ui/organisms/Header/MenuToggle";
import { PanelNavigation } from "@/ui/organisms/Panel/PanelNavigation";
import { SlidingPanel } from "@/ui/organisms/Panel/SlidingPanel";
import { SlidingNav } from "@/ui/SlidingNav";

const defaultLinks = [
  { path: "/empleos-guardados", label: "Empleos guardados" },
  { path: "/iniciar-sesion", label: "Iniciar sesión" },
]

type Props = {
  children: React.ReactNode;
};

export function MainLayout({ children }: Props) {
  const [isPanelOpen, updateIsPanelOpen] = useState(false);
  const { isBreakpoint } = useResponsive();

  const isSmallScreen = isBreakpoint(["mobile", "mobileLarge", "tablet"]);
  const isLargeScreen = isBreakpoint([
    "desktop",
    "desktopLarge",
    "tabletLarge",
  ]);

  function togglePanel() {
    updateIsPanelOpen((prevState) => !prevState);
  }
  return (
    <>
      <Header
        leftSlot={<LeftHeader />}
        rightSlot={
          isLargeScreen ? (
            <SlidingNav links={defaultLinks} />
          ) : isSmallScreen ? (
            <MenuToggle
              isOpenPanel={isPanelOpen}
              onOpenPanel={togglePanel}
            />
          ) : null
        }
      />
      <SlidingPanel isOpenPanel={isPanelOpen}>
        <PanelNavigation />
      </SlidingPanel>
      <main className="grid place-content-center px-6">{children}</main>
    </>
  );
}
