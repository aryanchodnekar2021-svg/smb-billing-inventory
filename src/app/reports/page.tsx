import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/layout/PlaceholderPage";

export const metadata = placeholderMetadata("Reports");

export default function ReportsPage() {
  return (
    <PlaceholderPage
      title="Reports"
      description="Sales, stock and GST reports will live here."
    />
  );
}
