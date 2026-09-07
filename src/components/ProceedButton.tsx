"use client";

import { useEffect, useRef, useState } from "react";
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
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const formatRupees = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const totalPayable = selectedPlan
    ? selectedPlan.monthlyAmount * selectedPlan.tenureMonths
    : 0;

  // Dialog behavior per WAI-ARIA: move focus in, trap Tab, close on Escape,
  // restore focus and body scroll on close.
  useEffect(() => {
    if (!showModal) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowModal(false);
        return;
      }

      const panel = panelRef.current;
      if (event.key !== "Tab" || !panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus();
      previouslyFocused.current = null;
    };
  }, [showModal]);

  return (
    <>
      {/* Sticky CTA bar — mobile bottom (safe-area aware), desktop inline */}
      <div
        className="sticky bottom-0 z-20 -mx-4 sm:mx-0 px-4 sm:px-0 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pt-0 sm:pb-0 backdrop-blur-sm sm:backdrop-blur-none border-t sm:border-0"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <button
          type="button"
          id="proceed-button"
          disabled={!selectedPlan}
          onClick={() => selectedPlan && setShowModal(true)}
          className={`w-full py-3.5 px-6 rounded-lg font-bold text-sm ${
            selectedPlan ? "btn-accent cursor-pointer" : "cursor-not-allowed"
          }`}
          style={
            selectedPlan
              ? undefined
              : {
                  background: 'var(--bg-raised)',
                  color: 'var(--text-muted)',
                }
          }
        >
          {selectedPlan
            ? `Proceed — ${selectedPlan.tenureMonths}\u00A0months at ${formatRupees(selectedPlan.monthlyAmount)}/mo`
            : 'Select an EMI plan to proceed'}
        </button>
      </div>

      {/* Confirmation modal */}
      {showModal && selectedPlan && selectedVariant && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overscroll-contain"
          style={{ background: 'rgba(0,0,0,0.55)' }}
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="proceed-plan-title"
            tabIndex={-1}
            className="relative w-full max-w-md rounded-xl border p-6 shadow-2xl focus:outline-none"
            style={{
              background: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            {/* Close — 40px hit target */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 flex h-10 w-10 items-center justify-center rounded-md transition-colors"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Header */}
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--accent)' }}>
                Plan confirmed
              </p>
              <h3
                id="proceed-plan-title"
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
                { label: 'Tenure', value: `${selectedPlan.tenureMonths}\u00A0months` },
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
              className="btn-accent mt-4 w-full py-3 px-4 rounded-lg font-bold text-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
