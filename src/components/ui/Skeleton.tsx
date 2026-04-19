// src/components/Skeleton.tsx

export const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse bg-gray-200 dark:bg-slate-800 rounded-xl ${className}`}
  />
);

export const ProductCardSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 rounded-[32px] p-5 border border-gray-100 dark:border-slate-800 shadow-sm">
    <Skeleton className="aspect-square rounded-[24px] mb-4" />
    <Skeleton className="h-4 w-20 mb-3 rounded-full" />
    <Skeleton className="h-6 w-full mb-2" />
    <Skeleton className="h-6 w-2/3 mb-6" />
    <div className="flex justify-between items-center">
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-12 w-12 rounded-2xl" />
    </div>
  </div>
);

export const HomeSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 py-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <Skeleton className="aspect-square rounded-[40px] w-full" />
      <div className="space-y-6 flex flex-col justify-center">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-12 w-32 rounded-2xl" />
      </div>
    </div>
  </div>
);

export const OrderTrackingSkeleton = () => (
  <div className="mx-auto max-w-5xl px-4 py-10">
    <div className="mb-8 space-y-4">
      <Skeleton className="h-4 w-32 rounded-full" />
      <Skeleton className="h-12 w-2/3 rounded-2xl" />
      <Skeleton className="h-6 w-1/2 rounded-xl" />
    </div>
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6 rounded-[32px] border border-gray-100 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <Skeleton className="h-8 w-40 rounded-xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
      <div className="space-y-6 rounded-[32px] border border-gray-100 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <Skeleton className="h-8 w-32 rounded-xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-16 w-full rounded-2xl" />
      </div>
    </div>
  </div>
);
