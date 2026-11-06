"use client";

import React from "react";
import { useExpense } from "@/context/ExpenseContext";
import { CATEGORIES } from "@/constants/categories";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw } from "lucide-react";

export function ExpenseFilters() {
  const {
    filters,
    setCategoryFilter,
    setStarredFilter,
    setSearchQuery,
    clearFilters,
  } = useExpense();

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 p-3.5 bg-white border border-[#E2E8F0] rounded-md shadow-sm">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          data-testid="search-input"
          type="text"
          placeholder="Filter by title or note..."
          value={filters.q}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9 text-xs bg-[#F8FAFC] border-[#E2E8F0] focus-visible:ring-1 focus-visible:ring-[#0B1329] focus-visible:bg-white rounded text-[#0B1329]"
        />
      </div>

      {/* Category Select */}
      <div className="w-full sm:w-44">
        <Select
          data-testid="filter-category"
          value={filters.category}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-9 text-xs bg-[#F8FAFC] border-[#E2E8F0] focus-visible:ring-1 focus-visible:ring-[#0B1329] focus-visible:bg-white rounded text-[#0B1329]"
        >
          <option value="">All</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </div>

      {/* Starred Only Checkbox */}
      <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold uppercase tracking-wider text-slate-700 px-2 py-1.5 rounded hover:bg-[#F8FAFC] transition-colors">
        <input
          type="checkbox"
          data-testid="filter-starred"
          checked={filters.starred}
          onChange={(e) => setStarredFilter(e.target.checked)}
          className="h-4 w-4 rounded border-[#E2E8F0] text-[#F59E0B] focus:ring-[#F59E0B]"
        />
        <span>Starred only</span>
      </label>

      {/* Clear Filters Button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        data-testid="btn-clear-filters"
        onClick={clearFilters}
        className="h-9 text-xs font-semibold uppercase tracking-wider border-[#E2E8F0] text-slate-700 hover:bg-[#F1F5F9] hover:text-[#0B1329] rounded px-3 flex items-center justify-center gap-1.5"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Clear</span>
      </Button>
    </div>
  );
}
