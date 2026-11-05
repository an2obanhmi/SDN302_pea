"use client";

import React from "react";
import { Expense } from "@/types/expense";
import { useExpense } from "@/context/ExpenseContext";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Star, Trash2 } from "lucide-react";

export function ExpenseItem({ expense }: { expense: Expense }) {
  const { toggleStar, deleteExpense } = useExpense();

  return (
    <div
      data-testid="expense-item"
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg bg-card gap-4 shadow-sm"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span data-testid="expense-title" className="font-semibold text-base truncate">
            {expense.title}
          </span>
          <span
            data-testid="expense-category"
            className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium"
          >
            {expense.category}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
          <span data-testid="expense-date">{expense.spentAt}</span>
          {expense.note && <span className="truncate italic text-xs">{expense.note}</span>}
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
        <span data-testid="expense-amount" className="font-bold text-base sm:text-right">
          {formatCurrency(expense.amount)}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            data-testid="btn-toggle-star"
            aria-pressed={expense.starred ? "true" : "false"}
            onClick={() => toggleStar(expense.id, expense.starred)}
            className={`p-2 rounded-md transition-colors hover:bg-accent ${
              expense.starred ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
            }`}
            title={expense.starred ? "Unstar" : "Star"}
          >
            <Star className={`w-5 h-5 ${expense.starred ? "fill-current" : ""}`} />
          </button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            data-testid="btn-delete-expense"
            onClick={() => deleteExpense(expense.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
