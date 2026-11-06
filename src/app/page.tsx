import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, BookOpen, Library, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 max-w-6xl">
      {/* Editorial Hero */}
      <div className="max-w-3xl space-y-6 mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0B1329] text-white text-[11px] font-mono uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
          SDN302 Official Release
        </div>

        <h1
          data-testid="home-title"
          className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-[#0B1329] leading-[1.08]"
        >
          ReadLog
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
          Track what book was read, how many minutes, on which genre, and when. Mark your favorite reading
          sessions and view a live summary of minutes read by genre at a glance.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href="/register" passHref legacyBehavior>
            <Button
              size="lg"
              asChild
              className="bg-[#0B1329] hover:bg-[#132147] text-white rounded text-xs font-semibold uppercase tracking-wider h-11 px-6 shadow-sm transition-all"
            >
              <a className="inline-flex items-center gap-2">
                <span>Start Reading</span>
                <ArrowUpRight className="w-4 h-4 text-[#F59E0B]" />
              </a>
            </Button>
          </Link>

          <Link href="/login" passHref legacyBehavior>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-[#0B1329] text-[#0B1329] hover:bg-[#0B1329] hover:text-white rounded text-xs font-semibold uppercase tracking-wider h-11 px-6 transition-all"
            >
              <a>Login</a>
            </Button>
          </Link>
        </div>
      </div>

      {/* 3 Strict Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#E2E8F0]">
        <Card className="border border-[#E2E8F0] shadow-sm bg-white rounded-md p-6 space-y-3 hover:border-[#0B1329] transition-all">
          <div className="w-9 h-9 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0B1329]">
            <BookOpen className="w-4 h-4" />
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-base font-semibold text-[#0B1329]">
              Log every session
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-xs text-slate-600 leading-relaxed">
              Record each reading session with book title, minutes read, date, and optional notes.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-[#E2E8F0] shadow-sm bg-white rounded-md p-6 space-y-3 hover:border-[#0B1329] transition-all">
          <div className="w-9 h-9 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0B1329]">
            <Library className="w-4 h-4" />
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-base font-semibold text-[#0B1329]">
              Sort by genre
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-xs text-slate-600 leading-relaxed">
              Organize your reading habits into Fiction, Non-Fiction, Sci-Fi, Biography, and Other.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-[#E2E8F0] shadow-sm bg-white rounded-md p-6 space-y-3 hover:border-[#0B1329] transition-all">
          <div className="w-9 h-9 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0B1329]">
            <BarChart3 className="w-4 h-4" />
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-base font-semibold text-[#0B1329]">
              See minutes read
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-xs text-slate-600 leading-relaxed">
              Live automated summary shows your total reading minutes and breakdown by genre instantly.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
