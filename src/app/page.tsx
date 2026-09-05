import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Sparkles, TrendingUp, Zap } from "lucide-react";

export const metadata = {
  title: "Flagship Smartphones on EMI Backed by Mutual Funds | 1Fi Store",
  description:
    "Discover latest smartphones on EMI plans backed by your mutual funds. Keep your investments growing while enjoying 0% interest EMIs and instant cashback.",
};

export default async function HomePage() {
  const products = await prisma.product.findMany({
    include: {
      variants: {
        include: {
          emiPlans: {
            orderBy: {
              monthlyAmount: "asc",
            },
            take: 1,
          },
        },
        orderBy: {
          sellingPrice: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const formatRupees = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-200/80 dark:border-slate-800 bg-linear-to-b from-white via-slate-50 to-slate-100/50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#05966910_1px,transparent_1px),linear-gradient(to_bottom,#05966910_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Introducing Mutual Fund Backed Devices</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Flagship Smartphones on EMI{" "}
            <span className="bg-linear-to-r from-emerald-600 via-teal-500 to-emerald-400 bg-clip-text text-transparent">
              Backed by Mutual Funds
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Never liquidate your mutual funds for gadgets. Keep your portfolio
            compounding while you pay low monthly EMIs with zero foreclosure
            penalties.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>0% No-Cost EMI Available</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Portfolio Continues Earning</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Zero Pledge Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Featured Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Select a Device to View EMI Plans
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Showing {products.length} flagship devices
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const lowestPrice =
              product.variants.length > 0
                ? Math.min(...product.variants.map((v) => v.sellingPrice))
                : 0;

            const lowestMrp =
              product.variants.length > 0
                ? Math.min(...product.variants.map((v) => v.mrp))
                : 0;

            // Find lowest monthly EMI across all variants
            const allEmis = product.variants.flatMap((v) =>
              v.emiPlans.map((p) => p.monthlyAmount),
            );
            const minMonthlyEmi = allEmis.length > 0 ? Math.min(...allEmis) : 0;

            return (
              <div
                key={product.id}
                className="group flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 overflow-hidden"
              >
                {/* Image Area */}
                <div className="relative aspect-4/3 bg-linear-to-b from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 p-6 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {product.brand && (
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                      {product.brand}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Variants Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {product.variants.map((v) => (
                      <span
                        key={v.id}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {v.variantValue}
                      </span>
                    ))}
                    <span className="text-[11px] text-slate-400">
                      • {product.variants.length} variants
                    </span>
                  </div>

                  {/* Pricing and EMI Tag */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-end justify-between">
                    <div>
                      <span className="text-[11px] font-medium text-slate-400 block">
                        Price starting from
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                          {formatRupees(lowestPrice)}
                        </span>
                        {lowestMrp > lowestPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            {formatRupees(lowestMrp)}
                          </span>
                        )}
                      </div>
                    </div>

                    {minMonthlyEmi > 0 && (
                      <div className="text-right">
                        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 block">
                          EMI from
                        </span>
                        <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                          {formatRupees(minMonthlyEmi)}/mo
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Link */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white dark:bg-slate-800 dark:hover:bg-emerald-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>View Mutual Fund EMI Plans</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
            <div className="h-5 w-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px]">
              1Fi
            </div>
            <span>1Fi SDE Intern Assignment</span>
          </div>
          <p>
            © 2026 1Fi Financial Technologies. Dynamic Product & EMI
            Architecture.
          </p>
        </div>
      </footer>
    </div>
  );
}
