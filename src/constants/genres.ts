export const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Sci-Fi",
  "Biography",
  "Other",
] as const;

export type Genre = (typeof GENRES)[number];
