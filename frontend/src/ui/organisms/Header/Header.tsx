import { useScrollTrigger } from "@/ui/organisms/Header/useScrollTrigger";

interface HeaderProps {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export function Header({ leftSlot, rightSlot }: HeaderProps) {
  const isScrolled = useScrollTrigger();

  return (
    <header
      aria-label="main header"
      className={`px-4 flex items-center justify-between gap-2 w-full h-16 fixed top-0 z-50
    bg-black/40 backdrop-blur-md shadow-md border-b border-black/20
    transition-all duration-300
    ${isScrolled ? "bg-black/40 backdrop-blur-md" : "bg-black"}
    text-white
  `}
    >
      <div>{leftSlot}</div>
      <div>{rightSlot}</div>
    </header>
  );
}
