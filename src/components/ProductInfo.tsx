interface ProductInfoProps {
  name: string;
  brand?: string | null;
  description?: string | null;
}

export default function ProductInfo({ name, brand, description }: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      {brand && (
        <p
          className="text-[11px] font-bold uppercase tracking-widest"
          style={{ color: 'var(--accent)' }}
        >
          {brand}
        </p>
      )}
      <h1
        className="text-2xl sm:text-3xl font-black tracking-tight leading-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        {name}
      </h1>
      {description && (
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
