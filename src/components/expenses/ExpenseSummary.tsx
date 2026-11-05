"use client";

import React from "react";
import { useExpense } from "@/context/ExpenseContext";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ExpenseSummary() {
  const { summary } = useExpense();

  const count = summary?.count ?? 0;
  const starredCount = summary?.starredCount ?? 0;
  const totalAmount = summary?.totalAmount ?? 0;
  const breakdown = summary?.breakdown ?? [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Spending Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2 text-center pb-4 border-b">
          <div>
            <div className="text-xs text-muted-foreground uppercase font-semibold">Expenses</div>
            <div data-testid="expense-count" className="text-xl font-bold mt-1">
              {count}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase font-semibold">Starred</div>
            <div data-testid="starred-count" className="text-xl font-bold mt-1">
              {starredCount}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase font-semibold">Total</div>
            <div data-testid="total-amount" className="text-xl font-bold mt-1 text-primary">
              {formatCurrency(totalAmount)}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
            Category Breakdown
          </h4>
          <div data-testid="category-breakdown" className="space-y-2">
            {breakdown.length === 0 ? (
              <div className="text-sm text-muted-foreground italic text-center py-2">
                No breakdown data
              </div>
            ) : (
              breakdown.map((row) => (
                <div
                  key={row.category}
                  data-testid="breakdown-row"
                  className="flex items-center justify-between text-sm py-1 border-b last:border-b-0"
                >
                  <span data-testid="breakdown-name" className="font-medium">
                    {row.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span
                      data-testid="breakdown-count"
                      className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full"
                    >
                      {row.count}
                    </span>
                    <span data-testid="breakdown-total" className="font-semibold w-20 text-right">
                      {formatCurrency(row.total)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
