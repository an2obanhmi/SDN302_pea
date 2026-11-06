"use client";

import React from "react";
import { useExpense } from "@/context/ExpenseContext";
import { ExpenseItem } from "./ExpenseItem";
import { MESSAGES } from "@/constants/messages";
import { Receipt } from "lucide-react";

export function ExpenseList() {
  const { expenses, loading } = useExpense();

  if (loading && expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-500 space-y-2">
        <div className="w-5 h-5 border-2 border-[#0B1329] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest font-mono">Syncing Ledger...</span>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div
        data-testid="expenses-empty"
        className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-[#E2E8F0] rounded-md bg-white text-center space-y-3"
      >
        <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-slate-400">
          <Receipt className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[#0B1329]">
            {MESSAGES.NO_EXPENSES_FOUND}
          </p>
          <p className="text-xs text-slate-600 max-w-xs">
            No entries match your active filters or your ledger is currently empty.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="expense-list" className="space-y-2.5">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
}
