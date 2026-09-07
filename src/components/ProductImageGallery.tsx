"use client";

import Image from "next/image";
import { useState } from "react";

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
  const [failed, setFailed] = useState(false);
  const [lastImageUrl, setLastImageUrl] = useState(imageUrl);

  // Reset the failure flag when the variant's imageUrl prop changes
  // (state adjustment during render — no effect needed)
  if (lastImageUrl !== imageUrl) {
    setLastImageUrl(imageUrl);
    setFailed(false);
  }

  const src = failed || !imageUrl ? "/images/placeholder.svg" : imageUrl;

  return (
    <div
      className="relative w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center p-10 border"
      style={{
        background: "var(--bg-raised)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={`${productName} — ${variantValue}`}
          fill
          sizes="(max-width: 768px) 100vw, 450px"
          className="object-contain transition-transform duration-300 motion-safe:hover:scale-[1.03]"
          priority
          onError={() => setFailed(true)}
        />
      </div>

      {/* Variant label — small chip at bottom-right */}
      <div className="absolute bottom-3 right-3">
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded"
          style={{
            background: "var(--bg-surface)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {variantValue}
        </span>
      </div>
    </div>
  );
}
