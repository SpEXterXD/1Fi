import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-emerald-600 to-teal-400 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-base tracking-tighter">
              1Fi
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              1Fi{" "}
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                Store
              </span>
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              EMI Backed by Mutual Funds
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Zero Foreclosure Fees</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Approval</span>
          </div>
        </div>
      </div>
    </header>
  );
}
