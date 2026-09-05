export default function LoadingState() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-6 flex flex-col items-center space-y-6">
          <div className="w-full max-w-md aspect-4/5 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Right Column Skeleton */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-10 w-48 rounded bg-slate-200 dark:bg-slate-800" />

          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="h-16 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-16 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="space-y-3 pt-6">
            <div className="h-6 w-56 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-20 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-20 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-20 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
