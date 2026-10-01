import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EmptyState } from "@/components/ui/States";

export function PlaceholderPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {children ?? (
        <EmptyState
          title={`No ${title.toLowerCase()} yet`}
          description="This section is a navigation placeholder in the foundation milestone. Functionality will be added in a later milestone."
        />
      )}
    </div>
  );
}

export function placeholderMetadata(title: string): Metadata {
  return {
    title,
    description: `${title} — placeholder page in the BizFlow foundation milestone.`,
  };
}
