"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E2E8F0] bg-[#FFFFFF]/90 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 font-serif text-xl tracking-tight font-bold text-[#0B1329]"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] inline-block transition-transform duration-300 group-hover:scale-125" />
          <span>ExpenseTrail</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          {user ? (
            <>
              <span
                data-testid="user-email"
                className="hidden sm:inline-block text-xs font-mono font-medium text-slate-600 bg-[#F1F5F9] px-2.5 py-1 rounded"
              >
                {user.email}
              </span>

              <Link
                href="/expenses"
                data-testid="link-expenses"
                className="text-xs uppercase tracking-wider font-semibold text-[#0B1329] hover:text-[#F59E0B] transition-colors py-1.5 px-2"
              >
                Expenses
              </Link>

              <Button
                variant="outline"
                size="sm"
                data-testid="btn-logout"
                onClick={() => logout()}
                className="border-[#0B1329] text-[#0B1329] hover:bg-[#0B1329] hover:text-white rounded text-xs font-semibold uppercase tracking-wider h-8 px-3 transition-colors"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" passHref legacyBehavior>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    data-testid="btn-login"
                    className="text-xs uppercase tracking-wider font-semibold text-slate-600 hover:text-[#0B1329] h-8 px-3"
                  >
                    Login
                  </a>
                </Button>
              </Link>
              <Link href="/register" passHref legacyBehavior>
                <Button size="sm" asChild>
                  <a
                    data-testid="btn-register"
                    className="bg-[#0B1329] hover:bg-[#132147] text-white rounded text-xs font-semibold uppercase tracking-wider h-8 px-3.5 shadow-sm transition-all"
                  >
                    Register
                  </a>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
