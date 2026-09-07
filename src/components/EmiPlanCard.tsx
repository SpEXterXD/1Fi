'use client';

import { EmiPlanItem } from '@/lib/types';

interface EmiPlanCardProps {
  plan: EmiPlanItem;
  isSelected: boolean;
  onSelect: () => void;
}

export default function EmiPlanCard({ plan, isSelected, onSelect }: EmiPlanCardProps) {
  const formatRupees = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  const isZeroInterest = plan.interestRate === 0;

  return (
    <label
      className="relative flex cursor-pointer flex-col rounded-lg border transition-[border-color,background-color,box-shadow] duration-150"
      style={
        isSelected
          ? {
              borderColor: 'var(--accent)',
              background: 'var(--accent-light)',
              // Left accent bar — the ONLY bold visual flourish, restrained everywhere else
              boxShadow: 'inset 4px 0 0 var(--accent)',
            }
          : {
              borderColor: 'var(--border-subtle)',
              background: 'var(--bg-surface)',
            }
      }
    >
      {/* Native radio keeps keyboard and screen-reader behavior; the card is its label */}
      <input
        type="radio"
        name="emi-plan"
        className="sr-only"
        checked={isSelected}
        onChange={onSelect}
      />

      <div className="flex items-center justify-between gap-3 p-4">
        {/* Left: radio + monthly amount + tenure label */}
        <div className="flex items-center gap-3">
          {/* Radio indicator — not just color, also shape change: filled circle vs empty ring */}
          <div
            className="shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors"
            style={
              isSelected
                ? { borderColor: 'var(--accent)', background: 'var(--accent)' }
                : { borderColor: 'var(--border-strong)', background: 'transparent' }
            }
            aria-hidden="true"
          >
            {isSelected && (
              <div
                className="w-1.5 h-1.5 rounded-full bg-white"
                aria-hidden="true"
              />
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-xl font-black tabular-nums tracking-tight"
                style={{ color: isSelected ? 'var(--accent)' : 'var(--text-primary)' }}
              >
                {formatRupees(plan.monthlyAmount)}
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                /mo
              </span>
            </div>
            <span
              className="text-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              for {plan.tenureMonths}&nbsp;months
            </span>
          </div>
        </div>

        {/* Right: interest rate tag */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          {isZeroInterest ? (
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded"
              style={{
                background: 'var(--accent-light)',
                color: 'var(--accent)',
                border: '1px solid var(--accent)',
              }}
            >
              0% interest
            </span>
          ) : (
            <span
              className="text-sm font-semibold tabular-nums"
              style={{ color: 'var(--text-secondary)' }}
            >
              {plan.interestRate}% p.a.
            </span>
          )}
          <span
            className="text-[11px]"
            style={{ color: 'var(--text-muted)' }}
          >
            {plan.tenureMonths}&nbsp;EMIs
          </span>
        </div>
      </div>

      {/* Cashback — only shows when present. Left edge aligns with the monthly
          amount column: card padding (16px) + radio (16px) + gap (12px) = 44px */}
      {plan.cashback && plan.cashback > 0 && (
        <div
          className="flex items-center justify-between border-t pt-2 pb-3 pl-11 pr-4 text-xs"
          style={{ borderColor: isSelected ? 'var(--accent)' : 'var(--border-subtle)', opacity: 0.9 }}
        >
          <span
            className="font-bold"
            style={{ color: 'var(--cashback)' }}
          >
            {formatRupees(plan.cashback)} cashback
          </span>
          <span style={{ color: 'var(--text-muted)' }}>credited to 1Fi wallet</span>
        </div>
      )}
    </label>
  );
}
