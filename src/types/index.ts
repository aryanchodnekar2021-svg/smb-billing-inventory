/**
 * Shared foundation types for BizFlow.
 * Business-domain models (products, invoices, GST, …) will be added
 * in later milestones. Milestone 0 intentionally stays minimal.
 */

export type EmptyMetric = {
  label: string;
  value: string;
  hint: string;
};

export type PlaceholderPageProps = {
  title: string;
  description: string;
};
