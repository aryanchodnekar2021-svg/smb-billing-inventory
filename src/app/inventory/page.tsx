import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/layout/PlaceholderPage";

export const metadata = placeholderMetadata("Inventory");

export default function InventoryPage() {
  return (
    <PlaceholderPage
      title="Inventory"
      description="Stock levels, adjustments and low-stock alerts will live here."
    />
  );
}
