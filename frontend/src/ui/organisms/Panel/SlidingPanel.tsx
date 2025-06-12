import { useEffect, useRef, useState } from "react";
import { useBodyScrollLock } from "@/ui/organisms/Panel/useBodyScrollLock";
import { cn } from "@/utils/cn";
// import { MenuOption } from "@/views/app/JobsExplorer";
// import { Link } from "react-router";

interface SlidingPanelProps {
  isOpenPanel: boolean;
  children: React.ReactNode;
}

export function SlidingPanel({ isOpenPanel, children }: SlidingPanelProps) {
  const [shouldRender, updateShouldRender] = useState(isOpenPanel)
  const [isVisible, updateIsVisible] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(isOpenPanel);

  useEffect(() => {
    if (isOpenPanel) {
      updateShouldRender(true);
      // Hacemos el cambio de clase visible en el siguiente frame
      requestAnimationFrame(() => updateIsVisible(true));
    } else {
      updateIsVisible(false);
    }
  }, [isOpenPanel]);

  // Esperamos que termine la animación para desmontar
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const handleTransitionEnd = () => {
      if (!isOpenPanel) {
        updateShouldRender(false);
      }
    };

    panel.addEventListener("transitionend", handleTransitionEnd);
    return () => panel.removeEventListener("transitionend", handleTransitionEnd);
  }, [isOpenPanel]);

  if (!shouldRender) return null;

  return (
    <div
    ref={panelRef}
    className={cn(
      "fixed top-16 left-0 w-full h-full z-50 bg-blue-700/75 transition-all duration-300 ease-in-out transform",
      isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
    )}
    >
      {children}
    </div>
  );
}
