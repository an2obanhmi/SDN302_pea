import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/cookies";
import { ReadingLogService } from "@/services/reading-log.service";
import { MESSAGES } from "@/constants/messages";
import { GENRES } from "@/constants/genres";

export async function GET(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: MESSAGES.UNAUTHORIZED }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const genre = searchParams.get("genre") || undefined;
  const favorite = searchParams.get("favorite") === "true" ? true : undefined;
  const q = searchParams.get("q") || undefined;

  const logs = await ReadingLogService.getReadingLogs(session.userId, { genre, favorite, q });
  return NextResponse.json(logs, { status: 200 });
}

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: MESSAGES.UNAUTHORIZED }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { bookTitle, minutesRead, genre, note, readOn } = body;

    // Validate bookTitle
    if (bookTitle === undefined || bookTitle === null || String(bookTitle).trim() === "") {
      return NextResponse.json({ error: MESSAGES.BOOK_TITLE_REQUIRED }, { status: 400 });
    }
    if (String(bookTitle).length > 80) {
      return NextResponse.json({ error: MESSAGES.BOOK_TITLE_MAX_LENGTH }, { status: 400 });
    }

    // Validate minutesRead
    if (minutesRead === undefined || minutesRead === null || minutesRead === "" || isNaN(Number(minutesRead))) {
      return NextResponse.json({ error: MESSAGES.MINUTES_REQUIRED }, { status: 400 });
    }
    const numMinutes = Number(minutesRead);
    if (numMinutes <= 0) {
      return NextResponse.json({ error: MESSAGES.MINUTES_POSITIVE }, { status: 400 });
    }

    // Validate genre
    if (!genre || genre === "" || genre === "Choose genre") {
      return NextResponse.json({ error: MESSAGES.GENRE_REQUIRED }, { status: 400 });
    }
    if (!GENRES.includes(genre as any)) {
      return NextResponse.json({ error: MESSAGES.GENRE_INVALID }, { status: 400 });
    }

    // Validate readOn date
    if (!readOn || String(readOn).trim() === "") {
      return NextResponse.json({ error: MESSAGES.DATE_REQUIRED }, { status: 400 });
    }
    const todayStr = new Date().toISOString().split("T")[0];
    if (readOn > todayStr) {
      return NextResponse.json({ error: MESSAGES.DATE_FUTURE }, { status: 400 });
    }

    const log = await ReadingLogService.createReadingLog(session.userId, {
      bookTitle: String(bookTitle).trim(),
      minutesRead: Math.floor(numMinutes),
      genre,
      note: note ? String(note).trim() : "",
      readOn,
    });

    return NextResponse.json(log, { status: 201 });
  } catch (error: any) {
    if (error.message === MESSAGES.DUPLICATE_READING_LOG) {
      return NextResponse.json({ error: MESSAGES.DUPLICATE_READING_LOG }, { status: 409 });
    }
    return NextResponse.json({ error: error.message || "Failed to create reading session" }, { status: 400 });
  }
}
