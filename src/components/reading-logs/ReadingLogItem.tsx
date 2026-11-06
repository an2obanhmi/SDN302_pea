"use client";

import React from "react";
import { ReadingLog } from "@/types/reading-log";
import { useReadingLog } from "@/context/ReadingLogContext";
import { Button } from "@/components/ui/button";
import { Star, Trash2 } from "lucide-react";

export function ReadingLogItem({ readingLog }: { readingLog: ReadingLog }) {
  const { toggleFavorite, deleteReadingLog } = useReadingLog();

  return (
    <div
      data-testid="reading-log-item"
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg bg-card gap-4 shadow-sm"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span data-testid="reading-log-title" className="font-semibold text-base truncate">
            {readingLog.bookTitle}
          </span>
          <span
            data-testid="reading-log-genre"
            className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium"
          >
            {readingLog.genre}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
          <span data-testid="reading-log-date">{readingLog.readOn}</span>
          {readingLog.note && <span className="truncate italic text-xs">{readingLog.note}</span>}
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
        <span data-testid="reading-log-minutes" className="font-bold text-base sm:text-right">
          {readingLog.minutesRead}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            data-testid="btn-toggle-favorite"
            aria-pressed={readingLog.favorite ? "true" : "false"}
            onClick={() => toggleFavorite(readingLog.id, readingLog.favorite)}
            className={`p-2 rounded-md transition-colors hover:bg-accent ${
              readingLog.favorite ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
            }`}
            title={readingLog.favorite ? "Unfavorite" : "Favorite"}
          >
            <Star className={`w-5 h-5 ${readingLog.favorite ? "fill-current" : ""}`} />
          </button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            data-testid="btn-delete-reading-log"
            onClick={() => deleteReadingLog(readingLog.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
