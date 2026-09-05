"use client";

import { useState } from "react";
import { EmiPlanItem, VariantItem } from "@/lib/types";
import { ArrowRight, CheckCircle2, ShieldCheck, X } from "lucide-react";

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

  const formatRupees = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleProceed = () => {
    if (!selectedPlan) return;
    setShowModal(true);
  };

  const totalPayable = selectedPlan
    ? selectedPlan.monthlyAmount * selectedPlan.tenureMonths
    : 0;

  return (
    <>
      <div className="sticky bottom-0 z-20 -mx-4 sm:mx-0 p-4 sm:p-0 bg-white/95 dark:bg-slate-900/95 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-t border-slate-200 dark:border-slate-800 sm:border-0">
        <button
          type="button"
          disabled={!selectedPlan}
          onClick={handleProceed}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg transition-all duration-300 ${
            selectedPlan
              ? "bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:-translate-y-0.5 cursor-pointer"
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 shadow-none cursor-not-allowed"
          }`}
        >
          <span>
            {selectedPlan
              ? `Proceed with ${selectedPlan.tenureMonths}M Plan • ${formatRupees(
                  selectedPlan.monthlyAmount,
                )}/mo`
              : "Select an EMI Plan to Proceed"}
          </span>
          <ArrowRight className="w-5 h-5 shrink-0" />
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && selectedPlan && selectedVariant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Plan Selected Successfully!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Review your mutual-fund backed EMI breakdown below.
                </p>
              </div>
            </div>

            {/* Summary Box */}
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between text-sm pb-2.5 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="font-medium text-slate-500 dark:text-slate-400">
                  Product
                </span>
                <span className="font-bold text-slate-900 dark:text-white text-right">
                  {productName} ({selectedVariant.variantValue})
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Device Selling Price
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {formatRupees(selectedVariant.sellingPrice)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Tenure
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedPlan.tenureMonths} Months
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Monthly EMI
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {formatRupees(selectedPlan.monthlyAmount)} / month
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Interest Rate
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedPlan.interestRate === 0
                    ? "0% (No-Cost EMI)"
                    : `${selectedPlan.interestRate}% p.a.`}
                </span>
              </div>

              {selectedPlan.cashback && selectedPlan.cashback > 0 && (
                <div className="flex items-center justify-between text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Cashback Benefit</span>
                  <span>+ {formatRupees(selectedPlan.cashback)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-white">
                  Total Amount Payable
                </span>
                <span className="font-extrabold text-slate-900 dark:text-white">
                  {formatRupees(totalPayable)}
                </span>
              </div>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-emerald-50/60 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200/60 dark:border-emerald-900/60">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                Backed by your existing mutual funds. Your investments continue
                earning returns.
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
