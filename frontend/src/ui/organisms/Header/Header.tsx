import { useScrollTrigger } from "@/ui/organisms/Header/useScrollTrigger";

interface HeaderProps {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  isPanelOpen?: boolean;
}

export function Header({ leftSlot, rightSlot }: HeaderProps) {
  const isScrolled = useScrollTrigger();

  return (
    <header
      aria-label="main header"
      className={`px-4 flex items-center justify-between w-full h-16 sticky top-0 z-50 shadow-sm border-b border-b-neutral-800 transition-all duration-300 text-white bg-white dark:bg-black ${isScrolled ? "bg-black/40 backdrop-blur-md" : "bg-black"}`}
    >
      <div className="flex items-center justify-center h-full">{leftSlot}</div>
      <div className="flex items-center justify-center h-full">{rightSlot}</div>
    </header>
  );
}
