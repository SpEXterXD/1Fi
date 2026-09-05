'use client';

import { EmiPlanItem } from '@/lib/types';
import EmiPlanCard from './EmiPlanCard';
import { TrendingUp, Info } from 'lucide-react';

interface EmiPlanListProps {
  plans: EmiPlanItem[];
  selectedPlanId: string | null;
  onSelectPlan: (planId: string) => void;
}

export default function EmiPlanList({
  plans,
  selectedPlanId,
  onSelectPlan,
}: EmiPlanListProps) {
  return (
    <div className="flex flex-col space-y-4">
      {/* Header with verbatim requested phrase */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            EMI plans backed by mutual funds
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Your mutual fund portfolio earns returns while you pay low monthly EMIs. Zero pledge fee.
        </p>
      </div>

      {/* Info strip */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 text-[11px] text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
        <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span>Select any plan below to calculate tenure benefits & instant cashback.</span>
      </div>

      {/* Plans List */}
      {!plans || plans.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 text-slate-500">
          <p className="text-sm font-medium">No EMI plans available for this variant.</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-2.5">
          {plans.map((plan) => (
            <EmiPlanCard
              key={plan.id}
              plan={plan}
              isSelected={plan.id === selectedPlanId}
              onSelect={() => onSelectPlan(plan.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
