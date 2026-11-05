import { NextResponse } from "next/server";
import { AuthService } from "@/services/auth.service";
import { MESSAGES } from "@/constants/messages";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, password, confirmPassword } = body;

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
    if (password.length < 6) {
      return NextResponse.json({ error: MESSAGES.PASSWORD_MIN_LENGTH }, { status: 400 });
    }

    if (!confirmPassword) {
      return NextResponse.json({ error: MESSAGES.CONFIRM_PASSWORD_REQUIRED }, { status: 400 });
    }
    if (confirmPassword !== password) {
      return NextResponse.json({ error: MESSAGES.PASSWORDS_NOT_MATCH }, { status: 400 });
    }

    const user = await AuthService.register(email, password);
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Registration failed" },
      { status: 400 }
    );
  }
}
