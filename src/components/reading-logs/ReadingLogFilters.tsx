"use client";

import React from "react";
import { useReadingLog } from "@/context/ReadingLogContext";
import { GENRES } from "@/constants/genres";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function ReadingLogFilters() {
  const {
    filters,
    setGenreFilter,
    setFavoriteFilter,
    setSearchQuery,
    clearFilters,
  } = useReadingLog();

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 p-4 bg-card border rounded-lg shadow-sm">
      <div className="flex-1">
        <Input
          data-testid="search-input"
          type="text"
          placeholder="Search by book title or note..."
          value={filters.q}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="w-full md:w-48">
        <Select
          data-testid="filter-genre"
          value={filters.genre}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option value="">All</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </Select>
      </div>

      <label className="flex items-center gap-2 cursor-pointer select-none text-sm font-medium">
        <input
          type="checkbox"
          data-testid="filter-favorite"
          checked={filters.favorite}
          onChange={(e) => setFavoriteFilter(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <span>Favorites only</span>
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
