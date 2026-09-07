"use client";

import { VariantItem } from "@/lib/types";

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

  const formatRupees = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="flex flex-col gap-2">
      <p
        className="text-xs font-semibold"
        style={{ color: "var(--text-secondary)" }}
      >
        Storage
      </p>

      <div className="grid grid-cols-2 gap-2">
        {variants.map((v) => {
          const isSelected = v.id === selectedVariantId;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect(v.id)}
              aria-pressed={isSelected}
              className="relative flex flex-col p-3 rounded-lg border text-left transition-[border-color,background-color,box-shadow] duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2"
              style={
                isSelected
                  ? {
                      borderColor: "var(--accent)",
                      background: "var(--accent-light)",
                      boxShadow: "inset 0 0 0 1px var(--accent)",
                      // @ts-expect-error custom property
                      "--tw-ring-color": "var(--accent)",
                    }
                  : {
                      borderColor: "var(--border-subtle)",
                      background: "var(--bg-surface)",
                    }
              }
            >
              <span
                className="text-sm font-bold"
                style={{
                  color: isSelected ? "var(--accent)" : "var(--text-primary)",
                }}
              >
                {v.variantValue}
              </span>
              <span
                className="text-xs font-medium mt-0.5 tabular-nums"
                style={{ color: "var(--text-muted)" }}
              >
                {formatRupees(v.sellingPrice)}
              </span>

              {/* Selected indicator — top-right dot */}
              {isSelected && (
                <span
                  className="absolute top-2 right-2 w-2 h-2 rounded-full"
                  style={{ background: "var(--accent)" }}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
