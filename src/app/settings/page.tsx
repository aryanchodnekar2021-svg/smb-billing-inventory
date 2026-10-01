import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/layout/PlaceholderPage";

export const metadata = placeholderMetadata("Settings");

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Business profile, taxes, users and preferences will live here."
    />
  );
}
