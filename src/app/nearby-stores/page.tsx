import type { Metadata } from "next";
import ShopShell from "@/components/ShopShell";
import ShopPlaceholder from "@/components/ShopPlaceholder";

export const metadata: Metadata = {
  title: "Nearby Stores — 1Fi Shop",
  description: "Nearby stores on 1Fi — coming soon.",
};

// Intentionally blank per the assignment ("no implementation is required").
export default function NearbyStoresPage() {
  return (
    <ShopShell active="nearby-stores">
      <ShopPlaceholder icon="map-pin" title="Nearby Stores" message="Coming soon." />
    </ShopShell>
  );
}
