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
      className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 border border-[#E2E8F0] hover:border-[#0B1329] bg-white rounded-md gap-4 transition-all duration-150 shadow-sm"
    >
      {/* Category accent bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-md transition-colors ${
          expense.starred ? "bg-[#F59E0B]" : "bg-transparent group-hover:bg-[#0B1329]"
        }`}
      />

      <div className="flex-1 min-w-0 pl-1">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span
            data-testid="expense-title"
            className="font-semibold text-base text-[#0B1329] truncate"
          >
            {expense.title}
          </span>
          <span
            data-testid="expense-category"
            className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-[#F1F5F9] text-slate-700 border border-[#E2E8F0]"
          >
            {expense.category}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600 font-medium">
          <span data-testid="expense-date" className="font-mono text-slate-500">
            {expense.spentAt}
          </span>
          {expense.note && (
            <>
              <span className="text-slate-300">•</span>
              <span className="truncate italic text-slate-600">{expense.note}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F1F5F9]">
        <div className="text-left sm:text-right">
          <span
            data-testid="expense-amount"
            className="font-mono font-bold text-lg text-[#0B1329] tracking-tight"
          >
            {formatCurrency(expense.amount)}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            data-testid="btn-toggle-star"
            aria-pressed={expense.starred ? "true" : "false"}
            onClick={() => toggleStar(expense.id, expense.starred)}
            className={`w-9 h-9 flex items-center justify-center rounded transition-colors ${
              expense.starred
                ? "bg-[#FEF3C7] text-[#F59E0B]"
                : "text-slate-400 hover:text-[#0B1329] hover:bg-[#F1F5F9]"
            }`}
            title={expense.starred ? "Unstar" : "Star"}
          >
            <Star className={`w-4 h-4 ${expense.starred ? "fill-[#F59E0B]" : ""}`} />
          </button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            data-testid="btn-delete-expense"
            onClick={() => deleteExpense(expense.id)}
            className="w-9 h-9 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
            title="Delete transaction"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
