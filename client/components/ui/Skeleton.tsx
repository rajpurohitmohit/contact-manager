import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} />;
}

export function ContactCardSkeleton() {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-4 flex items-center gap-4">
      <Skeleton className="w-9 h-9 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
      <Skeleton className="h-6 w-24 rounded-full" />
    </div>
  );
}

export function ContactListSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <ContactCardSkeleton key={i} />
      ))}
    </div>
  );
}
