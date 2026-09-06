export default function ShopLoading() {
  return (
    <div style={{ background: "var(--bg-base)" }}>
      {/* Tabs bar skeleton */}
      <div
        className="border-b"
        style={{
          borderColor: "var(--border-subtle)",
          background: "var(--bg-surface)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-2 py-3.5 sm:px-6 lg:px-8">
          <div className="skeleton h-4 w-24 rounded" />
          <div className="skeleton h-4 w-28 rounded" />
          <div className="skeleton h-4 w-32 rounded" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6 flex items-baseline justify-between">
          <div className="skeleton h-6 w-40 rounded" />
          <div className="skeleton h-3 w-24 rounded" />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border"
              style={{
                borderColor: "var(--border-subtle)",
                background: "var(--bg-surface)",
              }}
            >
              <div className="skeleton aspect-[4/3] w-full" />
              <div className="flex flex-col gap-3 p-5">
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-3 w-full rounded" />
                <div className="skeleton h-3 w-2/3 rounded" />
                <div className="skeleton mt-2 h-9 w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
