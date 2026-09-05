"use client";

import { VariantItem } from "@/lib/types";
import { Check } from "lucide-react";

interface VariantSelectorProps {
  variants: VariantItem[];
  selectedVariantId: string;
  onSelect: (variantId: string) => void;
}

export default function VariantSelector({
  variants,
  selectedVariantId,
  onSelect,
}: VariantSelectorProps) {
  if (!variants || variants.length === 0) return null;

  const formatRupees = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Select Variant
        </label>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {variants.length} options available
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {variants.map((v) => {
          const isSelected = v.id === selectedVariantId;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect(v.id)}
              className={`relative flex flex-col p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 dark:border-emerald-500 shadow-sm ring-2 ring-emerald-600/20"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-sm font-bold ${
                    isSelected
                      ? "text-emerald-950 dark:text-emerald-100"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  {v.variantValue}
                </span>
                {isSelected && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <Check className="w-2.5 h-2.5 stroke-3" />
                  </span>
                )}
              </div>

              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">
                {formatRupees(v.sellingPrice)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
