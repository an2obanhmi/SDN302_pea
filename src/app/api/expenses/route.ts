import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/cookies";
import { ExpenseService } from "@/services/expense.service";
import { MESSAGES } from "@/constants/messages";
import { CATEGORIES } from "@/constants/categories";

export async function GET(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: MESSAGES.UNAUTHORIZED }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;
  const starred = searchParams.get("starred") === "true" ? true : undefined;
  const q = searchParams.get("q") || undefined;

  const expenses = await ExpenseService.getExpenses(session.userId, { category, starred, q });
  return NextResponse.json(expenses, { status: 200 });
}

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: MESSAGES.UNAUTHORIZED }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { title, amount, category, note, spentAt } = body;

    // Validate title
    if (title === undefined || title === null || String(title).trim() === "") {
      return NextResponse.json({ error: MESSAGES.TITLE_REQUIRED }, { status: 400 });
    }
    if (String(title).length > 80) {
      return NextResponse.json({ error: MESSAGES.TITLE_MAX_LENGTH }, { status: 400 });
    }

    // Validate amount
    if (amount === undefined || amount === null || amount === "" || isNaN(Number(amount))) {
      return NextResponse.json({ error: MESSAGES.AMOUNT_REQUIRED }, { status: 400 });
    }
    const numAmount = Number(amount);
    if (numAmount <= 0) {
      return NextResponse.json({ error: MESSAGES.AMOUNT_POSITIVE }, { status: 400 });
    }

    // Validate category
    if (!category || category === "" || category === "Choose category") {
      return NextResponse.json({ error: MESSAGES.CATEGORY_REQUIRED }, { status: 400 });
    }
    if (!CATEGORIES.includes(category as any)) {
      return NextResponse.json({ error: MESSAGES.CATEGORY_INVALID }, { status: 400 });
    }

    // Validate date
    if (!spentAt || String(spentAt).trim() === "") {
      return NextResponse.json({ error: MESSAGES.DATE_REQUIRED }, { status: 400 });
    }
    const todayStr = new Date().toISOString().split("T")[0];
    if (spentAt > todayStr) {
      return NextResponse.json({ error: MESSAGES.DATE_FUTURE }, { status: 400 });
    }

    const expense = await ExpenseService.createExpense(session.userId, {
      title: String(title).trim(),
      amount: Math.round(numAmount * 100) / 100,
      category,
      note: note ? String(note).trim() : "",
      spentAt,
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error: any) {
    if (error.message === MESSAGES.DUPLICATE_EXPENSE) {
      return NextResponse.json({ error: MESSAGES.DUPLICATE_EXPENSE }, { status: 409 });
    }
    return NextResponse.json({ error: error.message || "Failed to create expense" }, { status: 400 });
  }
}
