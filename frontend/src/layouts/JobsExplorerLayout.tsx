import { useResponsive } from "@/hooks/useResponsive";

type Props = {
  children: React.ReactNode;
};

export function JobsExplorerLayout({ children }: Props) {
  const { isBreakpoint } = useResponsive();
  const isScreenSmall = isBreakpoint(["mobile", "mobileLarge", "tablet"]);

  return (
    <div
      className={`sm:container sm:mx-auto grid grid-cols-12 gap-x-4 ${
        isScreenSmall ? "grid-cols-1" : "grid-cols-12"
      }`}
    >
      {children}
    </div>
  );
}
