'use client';

import { useState } from 'react';
import { ProductDetail } from '@/lib/types';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import VariantSelector from './VariantSelector';
import PriceBlock from './PriceBlock';
import EmiPlanList from './EmiPlanList';
import ProceedButton from './ProceedButton';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface ProductDetailClientProps {
  product: ProductDetail;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ''
  );
  const [selectedEmiPlanId, setSelectedEmiPlanId] = useState<string | null>(null);

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const activeEmiPlan =
    activeVariant?.emiPlans.find((p) => p.id === selectedEmiPlanId) || null;

  const handleVariantChange = (variantId: string) => {
    setSelectedVariantId(variantId);
    setSelectedEmiPlanId(null);
  };

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {/* Breadcrumb */}
      <div
        className="border-b"
        style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-medium transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Shop
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

          {/* Left column: image + product details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ProductImageGallery
              imageUrl={activeVariant?.imageUrl || product.imageUrl}
              productName={product.name}
              variantValue={activeVariant?.variantValue || ''}
            />

            {/* Product info block — no card wrapper, just vertical stack */}
            <div className="flex flex-col gap-5">
              <ProductInfo
                name={product.name}
                brand={product.brand}
                description={product.description}
              />
              <PriceBlock
                mrp={activeVariant?.mrp || 0}
                sellingPrice={activeVariant?.sellingPrice || 0}
              />
              <VariantSelector
                variants={product.variants}
                selectedVariantId={selectedVariantId}
                onSelect={handleVariantChange}
              />
            </div>
          </div>

          {/* Right column: EMI plans + CTA */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <EmiPlanList
              plans={activeVariant?.emiPlans || []}
              selectedPlanId={selectedEmiPlanId}
              onSelectPlan={(planId) => setSelectedEmiPlanId(planId)}
            />
            <ProceedButton
              selectedPlan={activeEmiPlan}
              productName={product.name}
              selectedVariant={activeVariant}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
