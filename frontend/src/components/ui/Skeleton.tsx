import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-zinc-800/60 border border-zinc-800/40 ${className}`}
    />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col rounded-3xl bg-zinc-900 border border-zinc-800/80 p-4 space-y-4">
      <Skeleton className="aspect-4/3 w-full rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4 rounded-lg" />
        <Skeleton className="h-3 w-full rounded-lg" />
        <Skeleton className="h-3 w-1/2 rounded-lg" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-6 w-16 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-xl" />
      </div>
    </div>
  );
};
