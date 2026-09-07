import { MapPin, Store, type LucideIcon } from "lucide-react";

const ICONS: Record<"store" | "map-pin", LucideIcon> = {
  store: Store,
  "map-pin": MapPin,
};

interface ShopPlaceholderProps {
  icon: keyof typeof ICONS;
  title: string;
  message: string;
}

/**
 * Intentionally blank section screen. Top Brands and Nearby Stores are
 * out of scope for the assignment ("no implementation required") but must
 * still be reachable.
 */
export default function ShopPlaceholder({ icon, title, message }: ShopPlaceholderProps) {
  const Icon = ICONS[icon];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div
        className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-20 text-center"
        style={{
          borderColor: "var(--border-subtle)",
          background: "var(--bg-surface)",
        }}
      >
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{ background: "var(--accent-light)", color: "var(--accent)" }}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
            {title}
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
            {message}
          </p>
        </div>
      </div>
    </section>
  );
}
