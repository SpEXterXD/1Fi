import type { Metadata } from "next";
import ShopShell from "@/components/ShopShell";
import ShopPlaceholder from "@/components/ShopPlaceholder";

export const metadata: Metadata = {
  title: "Top Brands — 1Fi Shop",
  description: "Top brands on 1Fi — coming soon.",
};

// Intentionally blank per the assignment ("no implementation is required").
export default function TopBrandsPage() {
  return (
    <ShopShell active="top-brands">
      <ShopPlaceholder icon="store" title="Top Brands" message="Coming soon." />
    </ShopShell>
  );
}
