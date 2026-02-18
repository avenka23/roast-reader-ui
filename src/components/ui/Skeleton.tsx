interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-white/5 rounded ${className}`}
    />
  );
}

export function RoastCardSkeleton() {
  return (
    <div className="bg-white/[0.03] rounded-2xl overflow-hidden border border-white/5">
      <Skeleton className="w-full h-64" />
      <div className="p-6">
        <Skeleton className="h-7 w-3/4 mb-3" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-5/6 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-4/5 mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-28 rounded-full" />
        </div>
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  );
}
