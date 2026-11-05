import { Category } from "@/constants/categories";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category | string;
  note: string;
  starred: boolean;
  spentAt: string;
  createdAt: string | Date;
}

export interface CategoryBreakdown {
  category: string;
  count: number;
  total: number;
}

export interface ExpenseSummary {
  count: number;
  starredCount: number;
  totalAmount: number;
  breakdown: CategoryBreakdown[];
}

export interface ExpenseInput {
  title?: string;
  amount?: number | string;
  category?: string;
  note?: string;
  spentAt?: string;
  starred?: boolean;
}
