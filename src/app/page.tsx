import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ShopShell from "@/components/ShopShell";

export const metadata = {
  title: "1Fi Shop - Mutual Fund backed EMIs",
  description:
    "Shop page of the 1Fi app: browse the 1Fi Marketplace and buy devices on no-cost EMIs backed by your mutual funds.",
};

export default async function MarketplacePage() {
  const products = await prisma.product.findMany({
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
  });

  const formatRupees = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <ShopShell active="marketplace">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            Browse devices
          </h1>
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
                        className="object-contain transition-transform duration-300 motion-safe:group-hover:scale-[1.04]"
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
                      <h2
                        className="text-base font-bold leading-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {product.name}
                      </h2>
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
                      className="btn-accent flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold"
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
    </ShopShell>
  );
}
