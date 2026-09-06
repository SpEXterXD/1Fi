import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ShopTabs, { isShopTab, type ShopTabId } from "@/components/ShopTabs";
import ShopPlaceholder from "@/components/ShopPlaceholder";

export const metadata = {
  title: "1Fi Shop — Mutual Fund backed EMIs",
  description:
    "Shop page of the 1Fi app: browse the 1Fi Marketplace and buy devices on no-cost EMIs backed by your mutual funds.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab: ShopTabId = isShopTab(tab) ? tab : "marketplace";

  // Data is only needed for the Marketplace section; the other two
  // sections are intentionally blank per the assignment.
  const products =
    activeTab === "marketplace"
      ? await prisma.product.findMany({
          include: {
            variants: {
              include: {
                emiPlans: {
                  orderBy: { monthlyAmount: "asc" },
                  take: 1,
                },
              },
              orderBy: { sellingPrice: "asc" },
            },
          },
          orderBy: { createdAt: "asc" },
        })
      : [];

  const formatRupees = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <ShopTabs active={activeTab} />

      {activeTab === "top-brands" && (
        <ShopPlaceholder
          icon="store"
          title="Top Brands"
          message="Coming soon."
        />
      )}

      {activeTab === "nearby-stores" && (
        <ShopPlaceholder
          icon="map-pin"
          title="Nearby Stores"
          message="Coming soon."
        />
      )}

      {activeTab === "marketplace" && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              Browse devices
            </h2>
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              {products.length} devices on EMI
            </span>
          </div>

          {products.length === 0 ? (
            <div
              className="rounded-xl border border-dashed py-16 text-center"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                No products available right now.
              </p>
              <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                Please check back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => {
                const cheapestVariant = product.variants[0];
                const lowestPrice = cheapestVariant?.sellingPrice ?? 0;
                const lowestMrp = cheapestVariant?.mrp ?? 0;
                const minMonthlyEmi =
                  cheapestVariant?.emiPlans[0]?.monthlyAmount ?? 0;

                return (
                  <article
                    key={product.id}
                    className="group flex flex-col overflow-hidden rounded-xl border transition-shadow duration-200 hover:shadow-md"
                    style={{
                      background: "var(--bg-surface)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    <div
                      className="relative flex aspect-[4/3] items-center justify-center p-8"
                      style={{ background: "var(--bg-raised)" }}
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                      </div>
                      {product.brand && (
                        <span
                          className="absolute top-3 left-3 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                          style={{
                            background: "var(--bg-surface)",
                            color: "var(--text-secondary)",
                            border: "1px solid var(--border-subtle)",
                          }}
                        >
                          {product.brand}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col gap-4 p-5">
                      <div className="space-y-1">
                        <h3
                          className="text-base font-bold leading-tight"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {product.name}
                        </h3>
                        <p
                          className="line-clamp-2 text-xs leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {product.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        {product.variants.map((v) => (
                          <span
                            key={v.id}
                            className="rounded px-2 py-0.5 text-[11px] font-medium"
                            style={{
                              background: "var(--bg-raised)",
                              color: "var(--text-secondary)",
                              border: "1px solid var(--border-subtle)",
                            }}
                          >
                            {v.variantValue}
                          </span>
                        ))}
                      </div>

                      <div
                        className="mt-auto flex items-end justify-between border-t pt-3"
                        style={{ borderColor: "var(--border-subtle)" }}
                      >
                        <div>
                          <p
                            className="mb-0.5 text-[10px] font-medium"
                            style={{ color: "var(--text-muted)" }}
                          >
                            Starting from
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span
                              className="text-lg font-black tabular-nums"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {formatRupees(lowestPrice)}
                            </span>
                            {lowestMrp > lowestPrice && (
                              <span
                                className="text-xs line-through"
                                style={{ color: "var(--text-muted)" }}
                              >
                                {formatRupees(lowestMrp)}
                              </span>
                            )}
                          </div>
                        </div>

                        {minMonthlyEmi > 0 && (
                          <div className="text-right">
                            <p
                              className="mb-0.5 text-[10px] font-medium"
                              style={{ color: "var(--text-muted)" }}
                            >
                              EMI from
                            </p>
                            <span
                              className="text-sm font-black tabular-nums"
                              style={{ color: "var(--accent)" }}
                            >
                              {formatRupees(minMonthlyEmi)}/mo
                            </span>
                          </div>
                        )}
                      </div>

                      <Link
                        href={`/products/${product.slug}`}
                        className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors duration-150"
                        style={{
                          background: "var(--accent)",
                          color: "#ffffff",
                        }}
                      >
                        <span>View EMI plans</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}

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
