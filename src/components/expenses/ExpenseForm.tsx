"use client";

import React, { useState } from "react";
import { useExpense } from "@/context/ExpenseContext";
import { CATEGORIES } from "@/constants/categories";
import { MESSAGES } from "@/constants/messages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export function ExpenseForm() {
  const { addExpense } = useExpense();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [spentAt, setSpentAt] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [expenseError, setExpenseError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getTitleError = (val: string) => {
    if (!val.trim()) return MESSAGES.TITLE_REQUIRED;
    if (val.length > 80) return MESSAGES.TITLE_MAX_LENGTH;
    return "";
  };

  const getAmountError = (val: string) => {
    if (!val || val.trim() === "" || isNaN(Number(val))) return MESSAGES.AMOUNT_REQUIRED;
    if (Number(val) <= 0) return MESSAGES.AMOUNT_POSITIVE;
    return "";
  };

  const getCategoryError = (val: string) => {
    if (!val || val === "Choose category") return MESSAGES.CATEGORY_REQUIRED;
    if (!CATEGORIES.includes(val as any)) return MESSAGES.CATEGORY_INVALID;
    return "";
  };

  const getDateError = (val: string) => {
    if (!val || !val.trim()) return MESSAGES.DATE_REQUIRED;
    const todayStr = new Date().toISOString().split("T")[0];
    if (val > todayStr) return MESSAGES.DATE_FUTURE;
    return "";
  };

  const titleError = hasSubmitted ? getTitleError(title) : "";
  const amountError = hasSubmitted ? getAmountError(amount) : "";
  const categoryError = hasSubmitted ? getCategoryError(category) : "";
  const dateError = hasSubmitted ? getDateError(spentAt) : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setExpenseError("");
    setSuccessMessage("");

    const errTitle = getTitleError(title);
    const errAmt = getAmountError(amount);
    const errCat = getCategoryError(category);
    const errDate = getDateError(spentAt);

    if (errTitle || errAmt || errCat || errDate) {
      return;
    }

    const res = await addExpense({
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      note: note.trim(),
      spentAt,
    });

    if (!res.success) {
      setExpenseError(res.error || "Failed to add expense");
    } else {
      setSuccessMessage(MESSAGES.EXPENSE_ADDED);
      setTitle("");
      setAmount("");
      setCategory("");
      setNote("");
      setSpentAt("");
      setHasSubmitted(false);
    }
  };

  return (
    <Card className="border border-[#E2E8F0] shadow-sm bg-white rounded-md overflow-hidden">
      <CardHeader className="bg-[#F8FAFC] border-b border-[#E2E8F0] py-3.5 px-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold tracking-wider uppercase text-[#0B1329]">
            New Transaction
          </CardTitle>
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 bg-[#E2E8F0]/50 px-2 py-0.5 rounded">
            Entry
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <form data-testid="expense-form" noValidate onSubmit={handleSubmit} className="space-y-4">
          {successMessage && (
            <div
              data-testid="expense-success"
              className="p-3 text-xs font-semibold tracking-wide text-emerald-800 bg-emerald-50 border-l-2 border-emerald-500 rounded-sm"
            >
              {successMessage}
            </div>
          )}

          {expenseError && (
            <div
              data-testid="error-expense"
              className="p-3 text-xs font-semibold tracking-wide text-rose-800 bg-rose-50 border-l-2 border-rose-500 rounded-sm"
            >
              {expenseError}
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <Label
              htmlFor="input-title"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Expense Title
            </Label>
            <Input
              id="input-title"
              data-testid="input-title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setExpenseError("");
              }}
              placeholder="e.g. Grab to campus"
              className="h-10 text-sm bg-[#F8FAFC] border-[#E2E8F0] focus-visible:ring-1 focus-visible:ring-[#0B1329] focus-visible:bg-white rounded-md text-[#0B1329]"
            />
            {titleError && (
              <span data-testid="error-title" className="text-xs font-medium text-rose-600 block mt-1">
                {titleError}
              </span>
            )}
          </div>

          {/* Amount & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <Label
                htmlFor="input-amount"
                className="text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Amount ($)
              </Label>
              <Input
                id="input-amount"
                data-testid="input-amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setExpenseError("");
                }}
                placeholder="0.00"
                className="h-10 font-mono text-sm bg-[#F8FAFC] border-[#E2E8F0] focus-visible:ring-1 focus-visible:ring-[#0B1329] focus-visible:bg-white rounded-md text-[#0B1329]"
              />
              {amountError && (
                <span
                  data-testid="error-amount"
                  className="text-xs font-medium text-rose-600 block mt-1"
                >
                  {amountError}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="input-category"
                className="text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Category
              </Label>
              <Select
                id="input-category"
                data-testid="input-category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setExpenseError("");
                }}
                className="h-10 text-sm bg-[#F8FAFC] border-[#E2E8F0] focus-visible:ring-1 focus-visible:ring-[#0B1329] focus-visible:bg-white rounded-md text-[#0B1329]"
              >
                <option value="">Choose category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
              {categoryError && (
                <span
                  data-testid="error-category"
                  className="text-xs font-medium text-rose-600 block mt-1"
                >
                  {categoryError}
                </span>
              )}
            </div>
          </div>

          {/* Date & Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <Label
                htmlFor="input-date"
                className="text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Date
              </Label>
              <Input
                id="input-date"
                data-testid="input-date"
                type="date"
                value={spentAt}
                onChange={(e) => {
                  setSpentAt(e.target.value);
                  setExpenseError("");
                }}
                className="h-10 text-sm bg-[#F8FAFC] border-[#E2E8F0] focus-visible:ring-1 focus-visible:ring-[#0B1329] focus-visible:bg-white rounded-md text-[#0B1329]"
              />
              {dateError && (
                <span data-testid="error-date" className="text-xs font-medium text-rose-600 block mt-1">
                  {dateError}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="input-note"
                className="text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Note (Optional)
              </Label>
              <Input
                id="input-note"
                data-testid="input-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Additional memo"
                className="h-10 text-sm bg-[#F8FAFC] border-[#E2E8F0] focus-visible:ring-1 focus-visible:ring-[#0B1329] focus-visible:bg-white rounded-md text-[#0B1329]"
              />
            </div>
          </div>

          <Button
            type="submit"
            data-testid="btn-add-expense"
            className="w-full h-11 bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1329] font-bold text-xs uppercase tracking-wider rounded-md shadow-sm transition-all duration-150 flex items-center justify-center gap-2 mt-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Expense</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
