import { prisma } from "@/lib/prisma";
import { MESSAGES } from "@/constants/messages";
import { ExpenseInput } from "@/types/expense";

const CATEGORY_ORDER: Record<string, number> = {
  Food: 1,
  Transport: 2,
  Bills: 3,
  Shopping: 4,
  Other: 5,
};

export class ExpenseService {
  static async checkDuplicate(
    userId: string,
    title: string,
    amount: number,
    spentAt: string,
    excludeId?: string
  ) {
    const existing = await prisma.expense.findFirst({
      where: {
        userId,
        title: { equals: title.trim(), mode: "insensitive" },
        amount,
        spentAt,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    return !!existing;
  }

  static async getExpenses(
    userId: string,
    filters: { category?: string; starred?: boolean; q?: string }
  ) {
    const where: any = { userId };

    if (filters.category && filters.category !== "All") {
      where.category = filters.category;
    }

    if (filters.starred === true) {
      where.starred = true;
    }

    if (filters.q && filters.q.trim().length > 0) {
      const query = filters.q.trim();
      where.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { note: { contains: query, mode: "insensitive" } },
      ];
    }

    const expenses = await prisma.expense.findMany({
      where,
    });

    expenses.sort((a, b) => {
      if (b.spentAt !== a.spentAt) {
        return b.spentAt.localeCompare(a.spentAt);
      }
      return a.title.localeCompare(b.title, undefined, { sensitivity: "accent" });
    });

    return expenses;
  }

  static async getSummary(
    userId: string,
    filters: { category?: string; starred?: boolean; q?: string }
  ) {
    const expenses = await this.getExpenses(userId, filters);

    const count = expenses.length;
    let starredCount = 0;
    let totalAmount = 0;
    const catMap: Record<string, { count: number; total: number }> = {};

    for (const item of expenses) {
      if (item.starred) starredCount++;
      totalAmount += item.amount;

      if (!catMap[item.category]) {
        catMap[item.category] = { count: 0, total: 0 };
      }
      catMap[item.category].count += 1;
      catMap[item.category].total += item.amount;
    }

    const breakdown = Object.entries(catMap).map(([category, stats]) => ({
      category,
      count: stats.count,
      total: stats.total,
    }));

    breakdown.sort((a, b) => {
      if (b.total !== a.total) {
        return b.total - a.total;
      }
      const orderA = CATEGORY_ORDER[a.category] ?? 99;
      const orderB = CATEGORY_ORDER[b.category] ?? 99;
      return orderA - orderB;
    });

    return {
      count,
      starredCount,
      totalAmount,
      breakdown,
    };
  }

  static async createExpense(
    userId: string,
    data: { title: string; amount: number; category: string; note?: string; spentAt: string }
  ) {
    const isDup = await this.checkDuplicate(userId, data.title, data.amount, data.spentAt);
    if (isDup) {
      throw new Error(MESSAGES.DUPLICATE_EXPENSE);
    }

    return prisma.expense.create({
      data: {
        userId,
        title: data.title,
        amount: data.amount,
        category: data.category,
        note: data.note || "",
        starred: false,
        spentAt: data.spentAt,
      },
    });
  }

  static async updateExpense(userId: string, id: string, data: Partial<ExpenseInput>) {
    const existing = await prisma.expense.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      throw new Error(MESSAGES.EXPENSE_NOT_FOUND);
    }

    const newTitle = data.title !== undefined ? data.title : existing.title;
    const newAmount = data.amount !== undefined ? Number(data.amount) : existing.amount;
    const newSpentAt = data.spentAt !== undefined ? data.spentAt : existing.spentAt;

    if (data.title !== undefined || data.amount !== undefined || data.spentAt !== undefined) {
      const isDup = await this.checkDuplicate(userId, newTitle, newAmount, newSpentAt, id);
      if (isDup) {
        throw new Error(MESSAGES.DUPLICATE_EXPENSE);
      }
    }

    return prisma.expense.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.amount !== undefined ? { amount: Number(data.amount) } : {}),
        ...(data.category !== undefined ? { category: data.category } : {}),
        ...(data.note !== undefined ? { note: data.note } : {}),
        ...(data.starred !== undefined ? { starred: data.starred } : {}),
        ...(data.spentAt !== undefined ? { spentAt: data.spentAt } : {}),
      },
    });
  }

  static async deleteExpense(userId: string, id: string) {
    const existing = await prisma.expense.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      throw new Error(MESSAGES.EXPENSE_NOT_FOUND);
    }

    await prisma.expense.delete({
      where: { id },
    });

    return { success: true };
  }
}
