import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/cookies";
import { MESSAGES } from "@/constants/messages";

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: MESSAGES.UNAUTHORIZED }, { status: 401 });
  }

  return NextResponse.json({ id: session.userId, email: session.email }, { status: 200 });
}
