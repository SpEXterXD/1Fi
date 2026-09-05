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
import { ChevronLeft, ShieldCheck, Sparkles, Zap } from 'lucide-react';

interface ProductDetailClientProps {
  product: ProductDetail;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  // Default to first variant
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ''
  );

  // Default to no selected plan (or null), user must select
  const [selectedEmiPlanId, setSelectedEmiPlanId] = useState<string | null>(null);

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];

  const activeEmiPlan =
    activeVariant?.emiPlans.find((p) => p.id === selectedEmiPlanId) || null;

  // Handle variant switch - resets EMI plan per requirements
  const handleVariantChange = (variantId: string) => {
    setSelectedVariantId(variantId);
    setSelectedEmiPlanId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20">
      {/* Breadcrumb Bar */}
      <div className="border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>All Flagship Smartphones</span>
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Product Gallery + Info + Variant Selector + Price */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <ProductImageGallery
              imageUrl={activeVariant?.imageUrl || product.imageUrl}
              productName={product.name}
              variantValue={activeVariant?.variantValue || ''}
            />

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
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

              {/* Highlights pills — derived from actual EMI plan data for this variant */}
              {activeVariant && activeVariant.emiPlans.length > 0 && (() => {
                const zeroIntPlans = activeVariant.emiPlans.filter(p => p.interestRate === 0);
                const zeroIntTenures = zeroIntPlans.map(p => `${p.tenureMonths}M`).join(' & ');
                const maxCashback = Math.max(
                  0,
                  ...activeVariant.emiPlans
                    .map(p => p.cashback ?? 0)
                );
                const formatRupees = (n: number) =>
                  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
                return (
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    {zeroIntPlans.length > 0 && (
                      <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                        <Zap className="w-4 h-4 mx-auto text-emerald-600 dark:text-emerald-400 mb-1" />
                        <span className="text-[11px] font-bold block text-slate-800 dark:text-slate-200">
                          0% Interest
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          {zeroIntTenures} Months
                        </span>
                      </div>
                    )}
                    {maxCashback > 0 && (
                      <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                        <Sparkles className="w-4 h-4 mx-auto text-teal-600 dark:text-teal-400 mb-1" />
                        <span className="text-[11px] font-bold block text-slate-800 dark:text-slate-200">
                          Up to {formatRupees(maxCashback)}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          Instant Cashback
                        </span>
                      </div>
                    )}
                    <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                      <ShieldCheck className="w-4 h-4 mx-auto text-emerald-600 dark:text-emerald-400 mb-1" />
                      <span className="text-[11px] font-bold block text-slate-800 dark:text-slate-200">
                        Mutual Fund
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Backed Security
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Right Column: EMI Plans List + Proceed CTA */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
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
        </div>
      </main>
    </div>
  );
}
