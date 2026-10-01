import type { Metadata } from "next";
import { StatCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/States";
import { Badge } from "@/components/ui/Table";
import { formatCount, formatINR } from "@/lib/format";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "BizFlow dashboard empty state — foundation milestone, no business data yet.",
};

/**
 * Milestone 0 dashboard: clean empty state only.
 * Values are hard-coded zeros to make the demo state explicit —
 * no business data is fabricated.
 */
const metrics = [
  { label: "Today's Sales", value: formatINR(0), hint: "No sales recorded yet" },
  { label: "Products", value: formatCount(0), hint: "Catalog not set up yet" },
  { label: "Customers", value: formatCount(0), hint: "No customers added yet" },
  { label: "Low Stock", value: formatCount(0), hint: "Inventory tracking starts later" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Welcome to BizFlow. This is the foundation shell — connect data in a later
            milestone to see live figures here.
          </p>
        </div>
        <Badge tone="info">Foundation · Milestone 0</Badge>
      </div>

      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Business overview (empty state)"
      >
        {metrics.map((metric) => (
          <StatCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            hint={metric.hint}
          />
        ))}
      </div>

      <EmptyState
        title="No business activity yet"
        description="Products, inventory, customers, suppliers, sales and invoices will appear here once those milestones are implemented. Nothing here is real data."
      />
    </div>
  );
}
