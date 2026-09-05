export interface EmiPlanItem {
  id: string;
  variantId?: string;
  monthlyAmount: number;
  tenureMonths: number;
  interestRate: number;
  cashback: number | null;
  createdAt?: string | Date;
}

export interface VariantItem {
  id: string;
  productId?: string;
  variantType: string;
  variantValue: string;
  mrp: number;
  sellingPrice: number;
  imageUrl: string | null;
  emiPlans: EmiPlanItem[];
}

export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  brand: string | null;
  imageUrl: string;
  startingPrice: number;
  variantCount: number;
}

export interface ProductDetail {
  id: string;
  slug: string;
  name: string;
  brand: string | null;
  description: string | null;
  imageUrl: string;
  variants: VariantItem[];
}
