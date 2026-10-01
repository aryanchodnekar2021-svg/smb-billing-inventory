export const siteConfig = {
  name: "BizFlow",
  tagline: "Billing, inventory and business management for small Indian businesses.",
  description:
    "BizFlow is a production-oriented SaaS foundation for billing, inventory, customers, suppliers, reports and GST-ready business management for small Indian retail businesses. Milestone 0 is the application shell only — no business features yet.",
  locale: "en-IN",
  currency: "INR",
} as const;

export type SiteConfig = typeof siteConfig;
