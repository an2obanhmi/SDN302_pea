import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/cookies";
import { ReadingLogService } from "@/services/reading-log.service";
import { MESSAGES } from "@/constants/messages";

export async function GET(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: MESSAGES.UNAUTHORIZED }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const genre = searchParams.get("genre") || undefined;
  const favorite = searchParams.get("favorite") === "true" ? true : undefined;
  const q = searchParams.get("q") || undefined;

  const summary = await ReadingLogService.getSummary(session.userId, { genre, favorite, q });
  return NextResponse.json(summary, { status: 200 });
}
