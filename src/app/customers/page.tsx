import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/layout/PlaceholderPage";

export const metadata = placeholderMetadata("Customers");

export default function CustomersPage() {
  return (
    <PlaceholderPage
      title="Customers"
      description="Customer directory and purchase history will live here."
    />
  );
}
