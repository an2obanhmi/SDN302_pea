import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/cookies";
import { ExpenseService } from "@/services/expense.service";
import { MESSAGES } from "@/constants/messages";

export async function GET(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: MESSAGES.UNAUTHORIZED }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;
  const starred = searchParams.get("starred") === "true" ? true : undefined;
  const q = searchParams.get("q") || undefined;

  const summary = await ExpenseService.getSummary(session.userId, { category, starred, q });
  return NextResponse.json(summary, { status: 200 });
}
