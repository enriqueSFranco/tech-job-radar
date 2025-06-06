import { useScrollTrigger } from "@/ui/organisms/Header/useScrollTrigger";

interface HeaderProps {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  isPanelOpen?: boolean;
}

export function Header({ leftSlot, rightSlot, isPanelOpen }: HeaderProps) {
  const isScrolled = useScrollTrigger();

  return (
    <header
      aria-label="main header"
      className={`px-4 flex items-center justify-between w-full h-16 sticky top-0 z-50 shadow-sm border-b border-b-neutral-800 transition-all duration-300 text-white ${isPanelOpen ? "bg-blue-700" : null} ${isScrolled ? "bg-black/40 backdrop-blur-md" : "bg-black"}`}
    >
      {leftSlot}
      <div className="flex items-center justify-center">{rightSlot}</div>
    </header>
  );
}
