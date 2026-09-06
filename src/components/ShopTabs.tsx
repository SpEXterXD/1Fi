import Link from "next/link";

export const SHOP_TABS = [
  { id: "top-brands", label: "Top Brands" },
  { id: "nearby-stores", label: "Nearby Stores" },
  { id: "marketplace", label: "1Fi Marketplace" },
] as const;

export type ShopTabId = (typeof SHOP_TABS)[number]["id"];

export function isShopTab(value: string | undefined): value is ShopTabId {
  return SHOP_TABS.some((tab) => tab.id === value);
}

export default function ShopTabs({ active }: { active: ShopTabId }) {
  return (
    <div
      className="border-b"
      style={{
        borderColor: "var(--border-subtle)",
        background: "var(--bg-surface)",
      }}
    >
      <nav
        aria-label="Shop sections"
        className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-2 sm:px-6 lg:px-8"
      >
        {SHOP_TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <Link
              key={tab.id}
              href={tab.id === "marketplace" ? "/?tab=marketplace" : `/?tab=${tab.id}`}
              aria-current={isActive ? "page" : undefined}
              className="relative shrink-0 px-3 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors sm:px-4"
              style={{ color: isActive ? "var(--accent)" : "var(--text-secondary)" }}
            >
              {tab.label}
              {isActive && (
                <span
                  className="absolute inset-x-2 bottom-0 h-0.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
