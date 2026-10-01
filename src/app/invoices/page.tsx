import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/layout/PlaceholderPage";

export const metadata = placeholderMetadata("Invoices");

export default function InvoicesPage() {
  return (
    <PlaceholderPage
      title="Invoices"
      description="GST-ready invoices will live here."
    />
  );
}
