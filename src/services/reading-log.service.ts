import { prisma } from "@/lib/prisma";
import { MESSAGES } from "@/constants/messages";
import { ReadingLogInput } from "@/types/reading-log";

const GENRE_ORDER: Record<string, number> = {
  Fiction: 1,
  "Non-Fiction": 2,
  "Sci-Fi": 3,
  Biography: 4,
  Other: 5,
};

export class ReadingLogService {
  static async checkDuplicate(
    userId: string,
    bookTitle: string,
    minutesRead: number,
    readOn: string,
    excludeId?: string
  ) {
    const existing = await prisma.readingLog.findFirst({
      where: {
        userId,
        bookTitle: { equals: bookTitle.trim(), mode: "insensitive" },
        minutesRead,
        readOn,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    return !!existing;
  }

  static async getReadingLogs(
    userId: string,
    filters: { genre?: string; favorite?: boolean; q?: string }
  ) {
    const where: any = { userId };

    if (filters.genre && filters.genre !== "All") {
      where.genre = filters.genre;
    }

    if (filters.favorite === true) {
      where.favorite = true;
    }

    if (filters.q && filters.q.trim().length > 0) {
      const query = filters.q.trim();
      where.OR = [
        { bookTitle: { contains: query, mode: "insensitive" } },
        { note: { contains: query, mode: "insensitive" } },
      ];
    }

    const logs = await prisma.readingLog.findMany({
      where,
    });

    // In-memory tie-breaking sort: readOn descending, ties broken by bookTitle alphabetically case-insensitive
    logs.sort((a, b) => {
      if (b.readOn !== a.readOn) {
        return b.readOn.localeCompare(a.readOn);
      }
      return a.bookTitle.localeCompare(b.bookTitle, undefined, { sensitivity: "accent" });
    });

    return logs;
  }

  static async getSummary(
    userId: string,
    filters: { genre?: string; favorite?: boolean; q?: string }
  ) {
    const logs = await this.getReadingLogs(userId, filters);

    const count = logs.length;
    let favoriteCount = 0;
    let totalMinutes = 0;
    const genreMap: Record<string, { count: number; total: number }> = {};

    for (const item of logs) {
      if (item.favorite) favoriteCount++;
      totalMinutes += item.minutesRead;

      if (!genreMap[item.genre]) {
        genreMap[item.genre] = { count: 0, total: 0 };
      }
      genreMap[item.genre].count += 1;
      genreMap[item.genre].total += item.minutesRead;
    }

    const breakdown = Object.entries(genreMap).map(([genre, stats]) => ({
      genre,
      count: stats.count,
      total: stats.total,
    }));

    // Ordered by total minutes descending; equal totals ordered Fiction, Non-Fiction, Sci-Fi, Biography, Other
    breakdown.sort((a, b) => {
      if (b.total !== a.total) {
        return b.total - a.total; // highest total first
      }
      const orderA = GENRE_ORDER[a.genre] ?? 99;
      const orderB = GENRE_ORDER[b.genre] ?? 99;
      return orderA - orderB;
    });

    return {
      count,
      favoriteCount,
      totalMinutes,
      breakdown,
    };
  }

  static async createReadingLog(
    userId: string,
    data: { bookTitle: string; minutesRead: number; genre: string; note?: string; readOn: string }
  ) {
    const isDup = await this.checkDuplicate(
      userId,
      data.bookTitle,
      data.minutesRead,
      data.readOn
    );
    if (isDup) {
      throw new Error(MESSAGES.DUPLICATE_READING_LOG);
    }

    return prisma.readingLog.create({
      data: {
        userId,
        bookTitle: data.bookTitle,
        minutesRead: data.minutesRead,
        genre: data.genre,
        note: data.note || "",
        favorite: false,
        readOn: data.readOn,
      },
    });
  }

  static async updateReadingLog(userId: string, id: string, data: Partial<ReadingLogInput>) {
    const existing = await prisma.readingLog.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      throw new Error(MESSAGES.READING_LOG_NOT_FOUND);
    }

    const newBookTitle = data.bookTitle !== undefined ? data.bookTitle : existing.bookTitle;
    const newMinutes =
      data.minutesRead !== undefined ? Math.floor(Number(data.minutesRead)) : existing.minutesRead;
    const newReadOn = data.readOn !== undefined ? data.readOn : existing.readOn;

    if (
      data.bookTitle !== undefined ||
      data.minutesRead !== undefined ||
      data.readOn !== undefined
    ) {
      const isDup = await this.checkDuplicate(userId, newBookTitle, newMinutes, newReadOn, id);
      if (isDup) {
        throw new Error(MESSAGES.DUPLICATE_READING_LOG);
      }
    }

    return prisma.readingLog.update({
      where: { id },
      data: {
        ...(data.bookTitle !== undefined ? { bookTitle: data.bookTitle } : {}),
        ...(data.minutesRead !== undefined ? { minutesRead: Math.floor(Number(data.minutesRead)) } : {}),
        ...(data.genre !== undefined ? { genre: data.genre } : {}),
        ...(data.note !== undefined ? { note: data.note } : {}),
        ...(data.favorite !== undefined ? { favorite: data.favorite } : {}),
        ...(data.readOn !== undefined ? { readOn: data.readOn } : {}),
      },
    });
  }

  static async deleteReadingLog(userId: string, id: string) {
    const existing = await prisma.readingLog.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      throw new Error(MESSAGES.READING_LOG_NOT_FOUND);
    }

    await prisma.readingLog.delete({
      where: { id },
    });

    return { success: true };
  }
}
