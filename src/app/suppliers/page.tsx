import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/layout/PlaceholderPage";

export const metadata = placeholderMetadata("Suppliers");

export default function SuppliersPage() {
  return (
    <PlaceholderPage
      title="Suppliers"
      description="Supplier directory and purchase orders will live here."
    />
  );
}
