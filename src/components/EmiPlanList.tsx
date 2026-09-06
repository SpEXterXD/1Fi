'use client';

import { EmiPlanItem } from '@/lib/types';
import EmiPlanCard from './EmiPlanCard';

interface EmiPlanListProps {
  plans: EmiPlanItem[];
  selectedPlanId: string | null;
  onSelectPlan: (planId: string) => void;
}

export default function EmiPlanList({ plans, selectedPlanId, onSelectPlan }: EmiPlanListProps) {
  return (
    <div
      className="rounded-xl border"
      style={{
        borderColor: 'var(--border-subtle)',
        background: 'var(--bg-surface)',
      }}
    >
      {/* Panel header */}
      <div
        className="px-5 py-4 border-b"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <h2
          className="text-sm font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          EMI plans backed by mutual funds
        </h2>
        <p
          className="text-xs mt-0.5"
          style={{ color: 'var(--text-secondary)' }}
        >
          Your portfolio earns returns while you pay monthly. Select a plan.
        </p>
      </div>

      {/* Plans */}
      <div className="p-4">
        {!plans || plans.length === 0 ? (
          <div
            className="py-10 text-center rounded-lg border border-dashed"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
          >
            <p className="text-sm font-medium">No EMI plans available for this variant.</p>
          </div>
        ) : (
          <div
            role="radiogroup"
            aria-label="EMI plan options"
            className="flex flex-col gap-2.5"
          >
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
    </div>
  );
}
