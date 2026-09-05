interface PriceBlockProps {
  mrp: number;
  sellingPrice: number;
}

export default function PriceBlock({ mrp, sellingPrice }: PriceBlockProps) {
  const savings = mrp - sellingPrice;
  const discountPercent = mrp > 0 ? Math.round((savings / mrp) * 100) : 0;

  const formatRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex flex-col space-y-1.5 py-3 border-y border-slate-200/80 dark:border-slate-800">
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          {formatRupees(sellingPrice)}
        </span>

        {mrp > sellingPrice && (
          <span className="text-base sm:text-lg text-slate-400 line-through font-medium">
            MRP {formatRupees(mrp)}
          </span>
        )}

        {savings > 0 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span>Inclusive of all taxes</span>
        {savings > 0 && (
          <>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              You save {formatRupees(savings)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
