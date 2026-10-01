import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/layout/PlaceholderPage";

export const metadata = placeholderMetadata("Sales");

export default function SalesPage() {
  return (
    <PlaceholderPage
      title="Sales"
      description="Point-of-sale and sales records will live here."
    />
  );
}
