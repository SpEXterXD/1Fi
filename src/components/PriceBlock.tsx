interface PriceBlockProps {
  mrp: number;
  sellingPrice: number;
}

export default function PriceBlock({ mrp, sellingPrice }: PriceBlockProps) {
  const savings = mrp - sellingPrice;
  const discountPercent = mrp > 0 ? Math.round((savings / mrp) * 100) : 0;

  const formatRupees = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div
      className="flex flex-col gap-1 py-4 border-y"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      <div className="flex items-baseline gap-3 flex-wrap">
        <span
          className="text-3xl sm:text-4xl font-black tracking-tight tabular-nums"
          style={{ color: 'var(--text-primary)' }}
        >
          {formatRupees(sellingPrice)}
        </span>

        {mrp > sellingPrice && (
          <span
            className="text-base line-through"
            style={{ color: 'var(--text-muted)' }}
          >
            {formatRupees(mrp)}
          </span>
        )}

        {savings > 0 && (
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{
              background: 'var(--accent-light)',
              color: 'var(--accent)',
            }}
          >
            {discountPercent}% off
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
        <span>Inclusive of all taxes</span>
        {savings > 0 && (
          <span style={{ color: 'var(--accent)' }}>
            You save {formatRupees(savings)}
          </span>
        )}
      </div>
    </div>
  );
}
