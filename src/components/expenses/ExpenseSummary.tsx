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
    <Card className="border border-[#E2E8F0] shadow-sm bg-white rounded-md overflow-hidden">
      <CardHeader className="bg-[#F8FAFC] border-b border-[#E2E8F0] py-3.5 px-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold tracking-wider uppercase text-[#0B1329]">
            Financial Summary
          </CardTitle>
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 bg-[#E2E8F0]/50 px-2 py-0.5 rounded">
            Live
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-5">
        {/* Metric Triad */}
        <div className="grid grid-cols-3 divide-x divide-[#E2E8F0] bg-[#F8FAFC] border border-[#E2E8F0] rounded-md p-3 text-center">
          <div className="px-1">
            <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
              Entries
            </div>
            <div
              data-testid="expense-count"
              className="text-xl font-bold font-mono text-[#0B1329] mt-0.5"
            >
              {count}
            </div>
          </div>

          <div className="px-1">
            <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
              Starred
            </div>
            <div
              data-testid="starred-count"
              className="text-xl font-bold font-mono text-[#0B1329] mt-0.5"
            >
              {starredCount}
            </div>
          </div>

          <div className="px-1">
            <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
              Total
            </div>
            <div
              data-testid="total-amount"
              className="text-xl font-bold font-mono text-[#F59E0B] mt-0.5"
            >
              {formatCurrency(totalAmount)}
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Category Allocation
            </span>
            <span className="text-[10px] font-mono uppercase text-slate-500">
              Subtotal / Count
            </span>
          </div>

          <div data-testid="category-breakdown" className="space-y-2">
            {breakdown.length === 0 ? (
              <div className="text-xs text-slate-500 italic text-center py-4 bg-[#F8FAFC] rounded border border-dashed border-[#E2E8F0]">
                No category allocations to display
              </div>
            ) : (
              breakdown.map((row) => (
                <div
                  key={row.category}
                  data-testid="breakdown-row"
                  className="group flex items-center justify-between p-2 rounded hover:bg-[#F8FAFC] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B1329] group-hover:bg-[#F59E0B] transition-colors" />
                    <span
                      data-testid="breakdown-name"
                      className="text-xs font-semibold text-[#0B1329]"
                    >
                      {row.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      data-testid="breakdown-count"
                      className="text-[11px] font-mono text-slate-600 bg-[#F1F5F9] px-2 py-0.5 rounded border border-[#E2E8F0]"
                    >
                      {row.count}
                    </span>
                    <span
                      data-testid="breakdown-total"
                      className="font-mono font-bold text-xs text-[#0B1329] w-20 text-right"
                    >
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
