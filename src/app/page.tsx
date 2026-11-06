import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ShieldCheck, PieChart, Layers } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 max-w-6xl">
      {/* Editorial Hero */}
      <div className="max-w-3xl space-y-6 mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0B1329] text-white text-[11px] font-mono uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
          SDN302 Architecture Release
        </div>

        <h1
          data-testid="home-title"
          className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-[#0B1329] leading-[1.08]"
        >
          ExpenseTrail
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
          An editorial minimalist ledger engineered for disciplined personal financial clarity.
          Track allocations, favorite key transactions, and inspect real-time categorical summaries.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href="/register" passHref legacyBehavior>
            <Button
              size="lg"
              asChild
              className="bg-[#0B1329] hover:bg-[#132147] text-white rounded text-xs font-semibold uppercase tracking-wider h-11 px-6 shadow-sm transition-all"
            >
              <a className="inline-flex items-center gap-2">
                <span>Open Ledger</span>
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
            <ShieldCheck className="w-4 h-4" />
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-base font-semibold text-[#0B1329]">
              Track spending
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-xs text-slate-600 leading-relaxed">
              Capture every monetary outflow with precise decimal tracking, verified timestamps, and immutable owner isolation.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-[#E2E8F0] shadow-sm bg-white rounded-md p-6 space-y-3 hover:border-[#0B1329] transition-all">
          <div className="w-9 h-9 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0B1329]">
            <Layers className="w-4 h-4" />
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-base font-semibold text-[#0B1329]">
              Sort into categories
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-xs text-slate-600 leading-relaxed">
              Structure daily outlays into Food, Transport, Bills, Shopping, and Other with instant composite filtering.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-[#E2E8F0] shadow-sm bg-white rounded-md p-6 space-y-3 hover:border-[#0B1329] transition-all">
          <div className="w-9 h-9 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0B1329]">
            <PieChart className="w-4 h-4" />
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-base font-semibold text-[#0B1329]">
              See where it goes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-xs text-slate-600 leading-relaxed">
              Instantaneous deterministic aggregation with prioritized category tie-breaking for unambiguous financial intelligence.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
