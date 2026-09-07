import Link from "next/link";

export default function Navbar() {
  return (
    <header
      style={{
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
      className="sticky top-0 z-40 w-full"
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black tracking-tighter text-white"
            style={{ background: "var(--accent)" }}
            translate="no"
          >
            1Fi
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-sm font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              1Fi
            </span>
            <span
              className="text-[10px] font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Mutual Fund backed EMIs
            </span>
          </div>
        </Link>

        <span
          className="rounded-md px-3 py-1.5 text-xs font-semibold"
          style={{ color: "var(--accent)", background: "var(--accent-light)" }}
        >
          Shop
        </span>
      </div>
    </header>
  );
}
