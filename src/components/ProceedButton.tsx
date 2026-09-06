"use client";

import { useState } from "react";
import { EmiPlanItem, VariantItem } from "@/lib/types";
import { X } from "lucide-react";

interface ProceedButtonProps {
  selectedPlan: EmiPlanItem | null;
  productName: string;
  selectedVariant: VariantItem | null;
}

export default function ProceedButton({
  selectedPlan,
  productName,
  selectedVariant,
}: ProceedButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const formatRupees = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const totalPayable = selectedPlan
    ? selectedPlan.monthlyAmount * selectedPlan.tenureMonths
    : 0;

  return (
    <>
      {/* Sticky CTA bar — mobile bottom, desktop inline */}
      <div className="sticky bottom-0 z-20 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 sm:py-0 backdrop-blur-sm sm:backdrop-blur-none border-t sm:border-0"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <button
          type="button"
          id="proceed-button"
          disabled={!selectedPlan}
          onClick={() => selectedPlan && setShowModal(true)}
          className="w-full py-3.5 px-6 rounded-lg font-bold text-sm transition-all duration-150"
          style={
            selectedPlan
              ? {
                  background: 'var(--accent)',
                  color: '#ffffff',
                  cursor: 'pointer',
                }
              : {
                  background: 'var(--bg-raised)',
                  color: 'var(--text-muted)',
                  cursor: 'not-allowed',
                }
          }
        >
          {selectedPlan
            ? `Proceed — ${selectedPlan.tenureMonths} months at ${formatRupees(selectedPlan.monthlyAmount)}/mo`
            : 'Select an EMI plan to proceed'}
        </button>
      </div>

      {/* Confirmation modal */}
      {showModal && selectedPlan && selectedVariant && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.55)' }}
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-xl border p-6 shadow-2xl"
            style={{
              background: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-md transition-colors"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Close"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Header */}
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--accent)' }}>
                Plan confirmed
              </p>
              <h3
                className="text-lg font-black"
                style={{ color: 'var(--text-primary)' }}
              >
                {productName}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {selectedVariant.variantValue} variant
              </p>
            </div>

            {/* Breakdown table */}
            <div
              className="rounded-lg border divide-y text-sm"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              {[
                { label: 'Device price', value: formatRupees(selectedVariant.sellingPrice) },
                { label: 'Tenure', value: `${selectedPlan.tenureMonths} months` },
                { label: 'Monthly EMI', value: formatRupees(selectedPlan.monthlyAmount), accent: true },
                {
                  label: 'Interest rate',
                  value: selectedPlan.interestRate === 0
                    ? '0% (no-cost EMI)'
                    : `${selectedPlan.interestRate}% p.a.`,
                },
                ...(selectedPlan.cashback && selectedPlan.cashback > 0
                  ? [{ label: 'Cashback', value: `+ ${formatRupees(selectedPlan.cashback)}`, accent: true }]
                  : []),
                { label: 'Total payable', value: formatRupees(totalPayable), bold: true },
              ].map(({ label, value, accent, bold }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                  <span
                    className={bold ? 'font-black' : 'font-semibold'}
                    style={{ color: accent ? 'var(--accent)' : 'var(--text-primary)' }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Note */}
            <p
              className="mt-4 text-xs text-center"
              style={{ color: 'var(--text-muted)' }}
            >
              Backed by your mutual funds. Your investments continue earning returns.
            </p>

            {/* Close action */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-4 w-full py-3 px-4 rounded-lg font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#ffffff' }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
