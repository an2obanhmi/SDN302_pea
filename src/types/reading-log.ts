import { Genre } from "@/constants/genres";

export interface ReadingLog {
  id: string;
  bookTitle: string;
  minutesRead: number;
  genre: Genre | string;
  note: string;
  favorite: boolean;
  readOn: string;
  createdAt: string | Date;
}

export interface GenreBreakdown {
  genre: string;
  count: number;
  total: number;
}

export interface ReadingLogSummary {
  count: number;
  favoriteCount: number;
  totalMinutes: number;
  breakdown: GenreBreakdown[];
}

export interface ReadingLogInput {
  bookTitle?: string;
  minutesRead?: number | string;
  genre?: string;
  note?: string;
  readOn?: string;
  favorite?: boolean;
}
