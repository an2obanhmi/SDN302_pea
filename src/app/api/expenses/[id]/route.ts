import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/cookies";
import { ExpenseService } from "@/services/expense.service";
import { MESSAGES } from "@/constants/messages";
import { CATEGORIES } from "@/constants/categories";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: MESSAGES.UNAUTHORIZED }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await req.json().catch(() => ({}));
    const { title, amount, category, note, spentAt, starred } = body;

    if (title !== undefined) {
      if (title === null || String(title).trim() === "") {
        return NextResponse.json({ error: MESSAGES.TITLE_REQUIRED }, { status: 400 });
      }
      if (String(title).length > 80) {
        return NextResponse.json({ error: MESSAGES.TITLE_MAX_LENGTH }, { status: 400 });
      }
    }

    if (amount !== undefined) {
      if (amount === null || amount === "" || isNaN(Number(amount))) {
        return NextResponse.json({ error: MESSAGES.AMOUNT_REQUIRED }, { status: 400 });
      }
      const numAmount = Number(amount);
      if (numAmount <= 0) {
        return NextResponse.json({ error: MESSAGES.AMOUNT_POSITIVE }, { status: 400 });
      }
    }

    if (category !== undefined) {
      if (!category || category === "Choose category") {
        return NextResponse.json({ error: MESSAGES.CATEGORY_REQUIRED }, { status: 400 });
      }
      if (!CATEGORIES.includes(category as any)) {
        return NextResponse.json({ error: MESSAGES.CATEGORY_INVALID }, { status: 400 });
      }
    }

    if (spentAt !== undefined) {
      if (!spentAt || String(spentAt).trim() === "") {
        return NextResponse.json({ error: MESSAGES.DATE_REQUIRED }, { status: 400 });
      }
      const todayStr = new Date().toISOString().split("T")[0];
      if (spentAt > todayStr) {
        return NextResponse.json({ error: MESSAGES.DATE_FUTURE }, { status: 400 });
      }
    }

    const updated = await ExpenseService.updateExpense(session.userId, id, {
      ...(title !== undefined ? { title: String(title).trim() } : {}),
      ...(amount !== undefined ? { amount: Math.round(Number(amount) * 100) / 100 } : {}),
      ...(category !== undefined ? { category } : {}),
      ...(note !== undefined ? { note: String(note).trim() } : {}),
      ...(starred !== undefined ? { starred: Boolean(starred) } : {}),
      ...(spentAt !== undefined ? { spentAt } : {}),
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    if (error.message === MESSAGES.EXPENSE_NOT_FOUND) {
      return NextResponse.json({ error: MESSAGES.EXPENSE_NOT_FOUND }, { status: 404 });
    }
    if (error.message === MESSAGES.DUPLICATE_EXPENSE) {
      return NextResponse.json({ error: MESSAGES.DUPLICATE_EXPENSE }, { status: 409 });
    }
    return NextResponse.json({ error: error.message || "Failed to update expense" }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: MESSAGES.UNAUTHORIZED }, { status: 401 });
  }

  try {
    const { id } = params;
    const res = await ExpenseService.deleteExpense(session.userId, id);
    return NextResponse.json(res, { status: 200 });
  } catch (error: any) {
    if (error.message === MESSAGES.EXPENSE_NOT_FOUND) {
      return NextResponse.json({ error: MESSAGES.EXPENSE_NOT_FOUND }, { status: 404 });
    }
    return NextResponse.json({ error: error.message || "Failed to delete expense" }, { status: 400 });
  }
}
