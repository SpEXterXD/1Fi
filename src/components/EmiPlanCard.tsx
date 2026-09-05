'use client';

import { EmiPlanItem } from '@/lib/types';
import { Gift, Zap } from 'lucide-react';

interface EmiPlanCardProps {
  plan: EmiPlanItem;
  isSelected: boolean;
  onSelect: () => void;
}

export default function EmiPlanCard({
  plan,
  isSelected,
  onSelect,
}: EmiPlanCardProps) {
  const formatRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isZeroInterest = plan.interestRate === 0;

  return (
    <div
      onClick={onSelect}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`group relative flex flex-col p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/30 dark:border-emerald-500 shadow-md ring-2 ring-emerald-600/20'
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-emerald-300 dark:hover:border-emerald-800/80 hover:bg-slate-50/50 dark:hover:bg-slate-800/40'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Radio + Monthly Amount */}
        <div className="flex items-center gap-3.5">
          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
              isSelected
                ? 'border-emerald-600 bg-emerald-600'
                : 'border-slate-300 dark:border-slate-600 group-hover:border-emerald-400'
            }`}
          >
            {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {formatRupees(plan.monthlyAmount)}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                / month
              </span>
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              for {plan.tenureMonths} Months
            </span>
          </div>
        </div>

        {/* Right: Tenure Badge & Interest Rate */}
        <div className="flex flex-col items-end gap-1">
          {isZeroInterest ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <Zap className="w-3 h-3 fill-emerald-600 dark:fill-emerald-400 text-emerald-600 dark:text-emerald-400" />
              0% Interest
            </span>
          ) : (
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              {plan.interestRate}% p.a.
            </span>
          )}

          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            {plan.tenureMonths} EMIs
          </span>
        </div>
      </div>

      {/* Optional Cashback Tag */}
      {plan.cashback && plan.cashback > 0 && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
          <div className="inline-flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
            <Gift className="w-3.5 h-3.5" />
            <span>{formatRupees(plan.cashback)} Instant Cashback</span>
          </div>
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
            Credited to 1Fi Wallet
          </span>
        </div>
      )}
    </div>
  );
}
