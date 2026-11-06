"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ReadingLog, ReadingLogSummary } from "@/types/reading-log";
import { useAuth } from "./AuthContext";

interface ReadingLogContextType {
  readingLogs: ReadingLog[];
  summary: ReadingLogSummary | null;
  loading: boolean;
  filters: {
    genre: string;
    favorite: boolean;
    q: string;
  };
  setGenreFilter: (genre: string) => void;
  setFavoriteFilter: (favorite: boolean) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  refreshData: () => Promise<void>;
  addReadingLog: (data: any) => Promise<{ success: boolean; error?: string }>;
  toggleFavorite: (id: string, currentFavorite: boolean) => Promise<void>;
  deleteReadingLog: (id: string) => Promise<void>;
}

const ReadingLogContext = createContext<ReadingLogContextType | undefined>(undefined);

export function ReadingLogProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [readingLogs, setReadingLogs] = useState<ReadingLog[]>([]);
  const [summary, setSummary] = useState<ReadingLogSummary | null>(null);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    genre: "",
    favorite: false,
    q: "",
  });

  const fetchData = useCallback(async () => {
    if (!user) {
      setReadingLogs([]);
      setSummary(null);
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.genre && filters.genre !== "All") {
        params.append("genre", filters.genre);
      }
      if (filters.favorite) {
        params.append("favorite", "true");
      }
      if (filters.q.trim()) {
        params.append("q", filters.q.trim());
      }

      const queryString = params.toString() ? `?${params.toString()}` : "";
      const [logsRes, sumRes] = await Promise.all([
        fetch(`/api/reading-logs${queryString}`),
        fetch(`/api/reading-logs/summary${queryString}`),
      ]);

      if (logsRes.ok && sumRes.ok) {
        const logsData = await logsRes.json();
        const sumData = await sumRes.json();
        setReadingLogs(logsData);
        setSummary(sumData);
      }
    } catch (err) {
      console.error("Failed to fetch reading logs:", err);
    } finally {
      setLoading(false);
    }
  }, [user, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const setGenreFilter = (genre: string) => {
    setFilters((prev) => ({ ...prev, genre }));
  };

  const setFavoriteFilter = (favorite: boolean) => {
    setFilters((prev) => ({ ...prev, favorite }));
  };

  const setSearchQuery = (q: string) => {
    setFilters((prev) => ({ ...prev, q }));
  };

  const clearFilters = () => {
    setFilters({
      genre: "",
      favorite: false,
      q: "",
    });
  };

  const addReadingLog = async (data: any) => {
    try {
      const res = await fetch("/api/reading-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (!res.ok) {
        return { success: false, error: resData.error || "Failed to add reading session" };
      }

      await fetchData();
      return { success: true };
    } catch {
      return { success: false, error: "Network error" };
    }
  };

  const toggleFavorite = async (id: string, currentFavorite: boolean) => {
    try {
      const res = await fetch(`/api/reading-logs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorite: !currentFavorite }),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteReadingLog = async (id: string) => {
    try {
      const res = await fetch(`/api/reading-logs/${id}`, {
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
    <ReadingLogContext.Provider
      value={{
        readingLogs,
        summary,
        loading,
        filters,
        setGenreFilter,
        setFavoriteFilter,
        setSearchQuery,
        clearFilters,
        refreshData: fetchData,
        addReadingLog,
        toggleFavorite,
        deleteReadingLog,
      }}
    >
      {children}
    </ReadingLogContext.Provider>
  );
}

export function useReadingLog() {
  const context = useContext(ReadingLogContext);
  if (!context) {
    throw new Error("useReadingLog must be used within a ReadingLogProvider");
  }
  return context;
}
