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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Add New Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <form data-testid="expense-form" noValidate onSubmit={handleSubmit} className="space-y-4">
          {successMessage && (
            <div data-testid="expense-success" className="text-sm font-medium text-green-600">
              {successMessage}
            </div>
          )}
          {expenseError && (
            <div data-testid="error-expense" className="text-sm font-medium text-destructive">
              {expenseError}
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="input-title">Title</Label>
            <Input
              id="input-title"
              data-testid="input-title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setExpenseError("");
              }}
              placeholder="e.g. Lunch with team"
            />
            {titleError && (
              <span data-testid="error-title" className="text-sm text-destructive block">
                {titleError}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="input-amount">Amount</Label>
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
              />
              {amountError && (
                <span data-testid="error-amount" className="text-sm text-destructive block">
                  {amountError}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="input-category">Category</Label>
              <Select
                id="input-category"
                data-testid="input-category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setExpenseError("");
                }}
              >
                <option value="">Choose category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
              {categoryError && (
                <span data-testid="error-category" className="text-sm text-destructive block">
                  {categoryError}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="input-date">Date</Label>
              <Input
                id="input-date"
                data-testid="input-date"
                type="date"
                value={spentAt}
                onChange={(e) => {
                  setSpentAt(e.target.value);
                  setExpenseError("");
                }}
              />
              {dateError && (
                <span data-testid="error-date" className="text-sm text-destructive block">
                  {dateError}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="input-note">Note (Optional)</Label>
              <Input
                id="input-note"
                data-testid="input-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Additional details..."
              />
            </div>
          </div>

          <Button type="submit" data-testid="btn-add-expense" className="w-full">
            Add Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
