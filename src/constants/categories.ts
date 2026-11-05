export const CATEGORIES = [
  "Food",
  "Transport",
  "Bills",
  "Shopping",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];
