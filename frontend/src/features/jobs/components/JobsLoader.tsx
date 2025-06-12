import { CardSkeleton } from "@/ui/organisms/Card/CardSkeleton";

export function JobsLoader() {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 10 }, (_, i) => {
        return <CardSkeleton key={`cardSkeleton-${i}`} />;
      })}
    </div>
  );
}

