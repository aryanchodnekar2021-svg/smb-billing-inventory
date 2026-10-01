const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

/** Format a number as Indian Rupees. Used for empty/demo states in Milestone 0. */
export function formatINR(value: number): string {
  return inrFormatter.format(value);
}

const intFormatter = new Intl.NumberFormat("en-IN");

/** Format a plain count using the en-IN locale. */
export function formatCount(value: number): string {
  return intFormatter.format(value);
}
