import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/layout/PlaceholderPage";

export const metadata = placeholderMetadata("Products");

export default function ProductsPage() {
  return (
    <PlaceholderPage
      title="Products"
      description="Product catalog management will live here."
    />
  );
}
