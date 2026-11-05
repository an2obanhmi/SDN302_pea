"use client";

import React from "react";
import { useExpense } from "@/context/ExpenseContext";
import { CATEGORIES } from "@/constants/categories";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function ExpenseFilters() {
  const {
    filters,
    setCategoryFilter,
    setStarredFilter,
    setSearchQuery,
    clearFilters,
  } = useExpense();

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 p-4 bg-card border rounded-lg shadow-sm">
      <div className="flex-1">
        <Input
          data-testid="search-input"
          type="text"
          placeholder="Search by title or note..."
          value={filters.q}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="w-full md:w-48">
        <Select
          data-testid="filter-category"
          value={filters.category}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </div>

      <label className="flex items-center gap-2 cursor-pointer select-none text-sm font-medium">
        <input
          type="checkbox"
          data-testid="filter-starred"
          checked={filters.starred}
          onChange={(e) => setStarredFilter(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <span>Starred only</span>
      </label>

      <Button
        type="button"
        variant="outline"
        data-testid="btn-clear-filters"
        onClick={clearFilters}
      >
        Clear
      </Button>
    </div>
  );
}
