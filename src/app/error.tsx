"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function ShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Shop page failed to load:", error);
  }, [error]);

  return (
    <div
      className="flex min-h-[60vh] items-center justify-center px-4 py-16"
      style={{ color: "var(--text-primary)" }}
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
        <p
          className="text-7xl font-black leading-none tabular-nums"
          style={{ color: "var(--border-strong)" }}
        >
          !
        </p>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            Something went wrong
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            We couldn’t load the Shop right now. Please try again.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="btn-accent mt-2 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
      </div>
    </div>
  );
}
