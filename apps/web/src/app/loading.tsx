import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 pt-8" aria-busy="true" aria-label="Carregando">
      <Skeleton className="h-12 w-72" />
      <Skeleton className="h-5 w-full max-w-2xl" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-56" />
        ))}
      </div>
    </div>
  );
}
