export default function LoadingState() {
  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      style={{ color: "var(--text-primary)" }}
    >
      {/* Breadcrumb skeleton */}
      <div className="skeleton h-3 w-20 rounded mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left: image + info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Image frame */}
          <div className="skeleton w-full aspect-square rounded-xl" />

          {/* Product info */}
          <div className="flex flex-col gap-3">
            <div className="skeleton h-3 w-16 rounded" />
            <div className="skeleton h-7 w-3/4 rounded" />
            <div className="skeleton h-3 w-full rounded" />
            <div className="skeleton h-3 w-5/6 rounded" />
          </div>

          {/* Price block */}
          <div className="flex gap-3 items-baseline py-4 border-y" style={{ borderColor: "var(--border-subtle)" }}>
            <div className="skeleton h-9 w-32 rounded" />
            <div className="skeleton h-5 w-20 rounded" />
          </div>

          {/* Variant selector */}
          <div className="grid grid-cols-2 gap-2">
            <div className="skeleton h-14 rounded-lg" />
            <div className="skeleton h-14 rounded-lg" />
          </div>
        </div>

        {/* Right: EMI plan list */}
        <div className="lg:col-span-7">
          {/* Panel */}
          <div className="rounded-xl border" style={{ borderColor: "var(--border-subtle)" }}>
            {/* Header */}
            <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border-subtle)" }}>
              <div className="skeleton h-4 w-48 rounded mb-2" />
              <div className="skeleton h-3 w-64 rounded" />
            </div>
            {/* Plans */}
            <div className="p-4 flex flex-col gap-2.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="skeleton h-14 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Proceed button */}
          <div className="mt-4 skeleton h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
