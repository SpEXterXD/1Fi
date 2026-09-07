import type { ReactNode } from "react";
import ShopTabs, { type ShopTabId } from "./ShopTabs";

/** Shared Shop chrome — section tabs + footer, used by all three Shop sections. */
export default function ShopShell({
  active,
  children,
}: {
  active: ShopTabId;
  children: ReactNode;
}) {
  return (
    <div style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <ShopTabs active={active} />
      {children}

      <footer
        className="mt-4 border-t py-6"
        style={{
          borderColor: "var(--border-subtle)",
          background: "var(--bg-surface)",
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div
              className="flex h-5 w-5 items-center justify-center rounded text-[9px] font-black text-white"
              style={{ background: "var(--accent)" }}
              translate="no"
            >
              1Fi
            </div>
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--text-secondary)" }}
            >
              1Fi — Mutual Fund backed EMIs
            </span>
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            &copy; 2026 1Fi
          </p>
        </div>
      </footer>
    </div>
  );
}
