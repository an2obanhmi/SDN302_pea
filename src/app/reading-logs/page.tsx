"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ReadingLogForm } from "@/components/reading-logs/ReadingLogForm";
import { ReadingLogFilters } from "@/components/reading-logs/ReadingLogFilters";
import { ReadingLogList } from "@/components/reading-logs/ReadingLogList";
import { ReadingLogSummary } from "@/components/reading-logs/ReadingLogSummary";

export default function ReadingLogsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // While finding out whether someone is logged in, or if logged out, do not show page content
  if (loading || !user) {
    return null;
  }

  return (
    <div data-testid="reading-logs-page" className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Reading Sessions Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Summary */}
        <div className="lg:col-span-4 space-y-6">
          <ReadingLogForm />
          <ReadingLogSummary />
        </div>

        {/* Right Column: Filters & Reading Log List */}
        <div className="lg:col-span-8 space-y-6">
          <ReadingLogFilters />
          <ReadingLogList />
        </div>
      </div>
    </div>
  );
}
