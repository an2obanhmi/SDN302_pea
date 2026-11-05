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
    <div data-testid="expenses-page" className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Expense Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Summary */}
        <div className="lg:col-span-4 space-y-6">
          <ExpenseForm />
          <ExpenseSummary />
        </div>

        {/* Right Column: Filters & Expense List */}
        <div className="lg:col-span-8 space-y-6">
          <ExpenseFilters />
          <ExpenseList />
        </div>
      </div>
    </div>
  );
}
