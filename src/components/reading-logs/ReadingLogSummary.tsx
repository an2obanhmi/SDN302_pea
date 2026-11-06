"use client";

import React from "react";
import { useReadingLog } from "@/context/ReadingLogContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ReadingLogSummary() {
  const { summary } = useReadingLog();

  const count = summary?.count ?? 0;
  const favoriteCount = summary?.favoriteCount ?? 0;
  const totalMinutes = summary?.totalMinutes ?? 0;
  const breakdown = summary?.breakdown ?? [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Reading Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2 text-center pb-4 border-b">
          <div>
            <div className="text-xs text-muted-foreground uppercase font-semibold">Sessions</div>
            <div data-testid="reading-log-count" className="text-xl font-bold mt-1">
              {count}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase font-semibold">Favorites</div>
            <div data-testid="favorite-count" className="text-xl font-bold mt-1">
              {favoriteCount}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase font-semibold">Total Minutes</div>
            <div data-testid="total-minutes" className="text-xl font-bold mt-1 text-primary">
              {totalMinutes}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
            Genre Breakdown
          </h4>
          <div data-testid="genre-breakdown" className="space-y-2">
            {breakdown.length === 0 ? (
              <div className="text-sm text-muted-foreground italic text-center py-2">
                No breakdown data
              </div>
            ) : (
              breakdown.map((row) => (
                <div
                  key={row.genre}
                  data-testid="breakdown-row"
                  className="flex items-center justify-between text-sm py-1 border-b last:border-b-0"
                >
                  <span data-testid="breakdown-name" className="font-medium">
                    {row.genre}
                  </span>
                  <div className="flex items-center gap-3">
                    <span
                      data-testid="breakdown-count"
                      className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full"
                    >
                      {row.count}
                    </span>
                    <span data-testid="breakdown-total" className="font-semibold w-20 text-right">
                      {row.total}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
