"use client";

import React from "react";
import { useReadingLog } from "@/context/ReadingLogContext";
import { ReadingLogItem } from "./ReadingLogItem";
import { MESSAGES } from "@/constants/messages";

export function ReadingLogList() {
  const { readingLogs, loading } = useReadingLog();

  if (loading && readingLogs.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Loading reading sessions...</div>;
  }

  if (readingLogs.length === 0) {
    return (
      <div
        data-testid="reading-logs-empty"
        className="text-center py-12 border border-dashed rounded-lg bg-card text-muted-foreground font-medium"
      >
        {MESSAGES.NO_READING_LOGS_FOUND}
      </div>
    );
  }

  return (
    <div data-testid="reading-log-list" className="space-y-3">
      {readingLogs.map((log) => (
        <ReadingLogItem key={log.id} readingLog={log} />
      ))}
    </div>
  );
}
