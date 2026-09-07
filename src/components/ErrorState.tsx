import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  statusCode?: number;
}

export default function ErrorState({
  title = 'Product not found',
  message = 'The requested product could not be found. It may have been removed or the URL is incorrect.',
  statusCode = 404,
}: ErrorStateProps) {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center px-4 py-16"
      style={{ color: 'var(--text-primary)' }}
    >
      <div className="max-w-sm w-full text-center flex flex-col gap-4">
        {/* Status code — large typographic display, no icon */}
        <p
          className="text-7xl font-black tabular-nums leading-none"
          style={{ color: 'var(--border-strong)' }}
        >
          {statusCode}
        </p>

        <div className="flex flex-col gap-1">
          <h2
            className="text-xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {message}
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="btn-accent inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
