"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">
          ReadLog
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span data-testid="user-email" className="text-sm font-medium text-muted-foreground">
                {user.email}
              </span>
              <Link
                href="/reading-logs"
                data-testid="link-reading-logs"
                className="text-sm font-medium hover:underline text-primary"
              >
                Reading Logs
              </Link>
              <Button
                variant="outline"
                size="sm"
                data-testid="btn-logout"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" passHref legacyBehavior>
                <Button variant="ghost" size="sm" asChild>
                  <a data-testid="btn-login">Login</a>
                </Button>
              </Link>
              <Link href="/register" passHref legacyBehavior>
                <Button size="sm" asChild>
                  <a data-testid="btn-register">Register</a>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
