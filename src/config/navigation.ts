export type NavItem = {
  href: string;
  label: string;
  description: string;
};

/**
 * Primary application navigation.
 * Milestone 0: placeholders only — pages render empty states,
 * no business logic is implemented yet.
 */
export const primaryNav: NavItem[] = [
  { href: "/", label: "Dashboard", description: "Overview of the business" },
  { href: "/products", label: "Products", description: "Catalog placeholder" },
  { href: "/inventory", label: "Inventory", description: "Stock placeholder" },
  { href: "/customers", label: "Customers", description: "Customers placeholder" },
  { href: "/suppliers", label: "Suppliers", description: "Suppliers placeholder" },
  { href: "/sales", label: "Sales", description: "Sales placeholder" },
  { href: "/invoices", label: "Invoices", description: "Invoices placeholder" },
  { href: "/reports", label: "Reports", description: "Reports placeholder" },
  { href: "/settings", label: "Settings", description: "Settings placeholder" },
];
