import { ShieldCheck } from 'lucide-react';

interface ProductInfoProps {
  name: string;
  brand?: string | null;
  description?: string | null;
}

export default function ProductInfo({ name, brand, description }: ProductInfoProps) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        {brand && (
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-900/60">
            {brand}
          </span>
        )}
        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Mutual Fund Backed</span>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {name}
      </h1>

      {description && (
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
          {description}
        </p>
      )}
    </div>
  );
}
