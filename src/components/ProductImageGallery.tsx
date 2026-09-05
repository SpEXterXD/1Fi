"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface ProductImageGalleryProps {
  imageUrl?: string | null;
  productName: string;
  variantValue: string;
}

export default function ProductImageGallery({
  imageUrl,
  productName,
  variantValue,
}: ProductImageGalleryProps) {
  const [src, setSrc] = useState(imageUrl || "/images/placeholder.svg");

  // Sync src when the variant's imageUrl prop changes
  useEffect(() => {
    if (imageUrl) setSrc(imageUrl);
  }, [imageUrl]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md aspect-4/5 rounded-3xl bg-linear-to-b from-slate-50 via-slate-100 to-slate-200/80 dark:from-slate-800/80 dark:via-slate-900 dark:to-slate-950 p-6 flex items-center justify-center border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden group">
        {/* Subtle decorative glow */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-sm shadow-emerald-600/30">
            OFFICIAL 1Fi OFFER
          </span>
        </div>

        {/* Main Product Mockup */}
        <div className="relative w-full h-full max-h-95 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <Image
            src={src}
            alt={`${productName} - ${variantValue}`}
            fill
            sizes="(max-width: 768px) 100vw, 450px"
            className="object-contain drop-shadow-2xl"
            priority
            onError={() => setSrc("/images/placeholder.svg")}
          />
        </div>

        {/* Variant sub-label inside image frame */}
        <div className="absolute bottom-4 right-4 z-10">
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
            {variantValue}
          </span>
        </div>
      </div>
    </div>
  );
}
