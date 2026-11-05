"use client";

import React from "react";
import { useExpense } from "@/context/ExpenseContext";
import { ExpenseItem } from "./ExpenseItem";
import { MESSAGES } from "@/constants/messages";

export function ExpenseList() {
  const { expenses, loading } = useExpense();

  if (loading && expenses.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Loading expenses...</div>;
  }

  if (expenses.length === 0) {
    return (
      <div
        data-testid="expenses-empty"
        className="text-center py-12 border border-dashed rounded-lg bg-card text-muted-foreground font-medium"
      >
        {MESSAGES.NO_EXPENSES_FOUND}
      </div>
    );
  }

  return (
    <div data-testid="expense-list" className="space-y-3">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
}
