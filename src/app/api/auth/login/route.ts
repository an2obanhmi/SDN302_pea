import { NextResponse } from "next/server";
import { AuthService } from "@/services/auth.service";
import { signSessionToken } from "@/lib/auth";
import { setSessionCookie } from "@/lib/cookies";
import { MESSAGES } from "@/constants/messages";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, password } = body;

    if (!email) {
      return NextResponse.json({ error: MESSAGES.EMAIL_REQUIRED }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: MESSAGES.EMAIL_INVALID }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json({ error: MESSAGES.PASSWORD_REQUIRED }, { status: 400 });
    }

    const user = await AuthService.authenticate(email, password);
    const token = await signSessionToken({ userId: user.id, email: user.email });

    setSessionCookie(token);

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    if (error.message === MESSAGES.INVALID_CREDENTIALS) {
      return NextResponse.json({ error: MESSAGES.INVALID_CREDENTIALS }, { status: 401 });
    }
    return NextResponse.json({ error: error.message || "Login failed" }, { status: 400 });
  }
}
