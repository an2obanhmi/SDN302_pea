"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { ExpenseFilters } from "@/components/expenses/ExpenseFilters";
import { ExpenseList } from "@/components/expenses/ExpenseList";
import { ExpenseSummary } from "@/components/expenses/ExpenseSummary";

export default function ExpensesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // While finding out whether someone is logged in, or if logged out, do not show page content
  if (loading || !user) {
    return null;
  }

  return (
    <div
      data-testid="expenses-page"
      className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-7xl"
    >
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-8 border-b border-[#E2E8F0] mb-8">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-1">
            Overview / Workspace
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1329]">
            Expense Ledger
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono font-medium text-slate-600">
            Encrypted Session Active
          </span>
        </div>
      </div>

      {/* Grid: Desktop 1280px 2 balanced columns, Mobile 375px single column no overflow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Sticky desktop): Form & Summary */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <ExpenseForm />
          <ExpenseSummary />
        </div>

        {/* Right Column: Filters & Expense List */}
        <div className="lg:col-span-7 space-y-6">
          <ExpenseFilters />
          <ExpenseList />
        </div>
      </div>
    </div>
  );
}
