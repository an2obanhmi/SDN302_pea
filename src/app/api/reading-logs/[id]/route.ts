import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/cookies";
import { ReadingLogService } from "@/services/reading-log.service";
import { MESSAGES } from "@/constants/messages";
import { GENRES } from "@/constants/genres";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: MESSAGES.UNAUTHORIZED }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await req.json().catch(() => ({}));
    const { bookTitle, minutesRead, genre, note, readOn, favorite } = body;

    // Validate bookTitle if present
    if (bookTitle !== undefined) {
      if (bookTitle === null || String(bookTitle).trim() === "") {
        return NextResponse.json({ error: MESSAGES.BOOK_TITLE_REQUIRED }, { status: 400 });
      }
      if (String(bookTitle).length > 80) {
        return NextResponse.json({ error: MESSAGES.BOOK_TITLE_MAX_LENGTH }, { status: 400 });
      }
    }

    // Validate minutesRead if present
    if (minutesRead !== undefined) {
      if (minutesRead === null || minutesRead === "" || isNaN(Number(minutesRead))) {
        return NextResponse.json({ error: MESSAGES.MINUTES_REQUIRED }, { status: 400 });
      }
      const numMinutes = Number(minutesRead);
      if (numMinutes <= 0) {
        return NextResponse.json({ error: MESSAGES.MINUTES_POSITIVE }, { status: 400 });
      }
    }

    // Validate genre if present
    if (genre !== undefined) {
      if (!genre || genre === "Choose genre") {
        return NextResponse.json({ error: MESSAGES.GENRE_REQUIRED }, { status: 400 });
      }
      if (!GENRES.includes(genre as any)) {
        return NextResponse.json({ error: MESSAGES.GENRE_INVALID }, { status: 400 });
      }
    }

    // Validate readOn date if present
    if (readOn !== undefined) {
      if (!readOn || String(readOn).trim() === "") {
        return NextResponse.json({ error: MESSAGES.DATE_REQUIRED }, { status: 400 });
      }
      const todayStr = new Date().toISOString().split("T")[0];
      if (readOn > todayStr) {
        return NextResponse.json({ error: MESSAGES.DATE_FUTURE }, { status: 400 });
      }
    }

    const updated = await ReadingLogService.updateReadingLog(session.userId, id, {
      ...(bookTitle !== undefined ? { bookTitle: String(bookTitle).trim() } : {}),
      ...(minutesRead !== undefined ? { minutesRead: Math.floor(Number(minutesRead)) } : {}),
      ...(genre !== undefined ? { genre } : {}),
      ...(note !== undefined ? { note: String(note).trim() } : {}),
      ...(favorite !== undefined ? { favorite: Boolean(favorite) } : {}),
      ...(readOn !== undefined ? { readOn } : {}),
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    if (error.message === MESSAGES.READING_LOG_NOT_FOUND) {
      return NextResponse.json({ error: MESSAGES.READING_LOG_NOT_FOUND }, { status: 404 });
    }
    if (error.message === MESSAGES.DUPLICATE_READING_LOG) {
      return NextResponse.json({ error: MESSAGES.DUPLICATE_READING_LOG }, { status: 409 });
    }
    return NextResponse.json({ error: error.message || "Failed to update reading log" }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: MESSAGES.UNAUTHORIZED }, { status: 401 });
  }

  try {
    const { id } = params;
    const res = await ReadingLogService.deleteReadingLog(session.userId, id);
    return NextResponse.json(res, { status: 200 });
  } catch (error: any) {
    if (error.message === MESSAGES.READING_LOG_NOT_FOUND) {
      return NextResponse.json({ error: MESSAGES.READING_LOG_NOT_FOUND }, { status: 404 });
    }
    return NextResponse.json({ error: error.message || "Failed to delete reading log" }, { status: 400 });
  }
}
