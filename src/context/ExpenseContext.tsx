"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Expense, ExpenseSummary } from "@/types/expense";
import { useAuth } from "./AuthContext";

interface ExpenseContextType {
  expenses: Expense[];
  summary: ExpenseSummary | null;
  loading: boolean;
  filters: {
    category: string;
    starred: boolean;
    q: string;
  };
  setCategoryFilter: (category: string) => void;
  setStarredFilter: (starred: boolean) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  refreshData: () => Promise<void>;
  addExpense: (data: any) => Promise<{ success: boolean; error?: string }>;
  toggleStar: (id: string, currentStarred: boolean) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<ExpenseSummary | null>(null);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    starred: false,
    q: "",
  });

  const fetchData = useCallback(async () => {
    if (!user) {
      setExpenses([]);
      setSummary(null);
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category && filters.category !== "All") {
        params.append("category", filters.category);
      }
      if (filters.starred) {
        params.append("starred", "true");
      }
      if (filters.q.trim()) {
        params.append("q", filters.q.trim());
      }

      const queryString = params.toString() ? `?${params.toString()}` : "";
      const [expRes, sumRes] = await Promise.all([
        fetch(`/api/expenses${queryString}`),
        fetch(`/api/expenses/summary${queryString}`),
      ]);

      if (expRes.ok && sumRes.ok) {
        const expData = await expRes.json();
        const sumData = await sumRes.json();
        setExpenses(expData);
        setSummary(sumData);
      }
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    } finally {
      setLoading(false);
    }
  }, [user, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const setCategoryFilter = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const setStarredFilter = (starred: boolean) => {
    setFilters((prev) => ({ ...prev, starred }));
  };

  const setSearchQuery = (q: string) => {
    setFilters((prev) => ({ ...prev, q }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      starred: false,
      q: "",
    });
  };

  const addExpense = async (data: any) => {
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (!res.ok) {
        return { success: false, error: resData.error || "Failed to add expense" };
      }

      await fetchData();
      return { success: true };
    } catch {
      return { success: false, error: "Network error" };
    }
  };

  const toggleStar = async (id: string, currentStarred: boolean) => {
    try {
      const res = await fetch(`/api/expenses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ starred: !currentStarred }),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const res = await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        summary,
        loading,
        filters,
        setCategoryFilter,
        setStarredFilter,
        setSearchQuery,
        clearFilters,
        refreshData: fetchData,
        addExpense,
        toggleStar,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
}
