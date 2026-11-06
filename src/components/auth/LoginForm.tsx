"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { MESSAGES } from "@/constants/messages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Lock } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [authError, setAuthError] = useState("");

  const getEmailError = (val: string) => {
    if (!val.trim()) return MESSAGES.EMAIL_REQUIRED;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) return MESSAGES.EMAIL_INVALID;
    return "";
  };

  const getPasswordError = (val: string) => {
    if (!val) return MESSAGES.PASSWORD_REQUIRED;
    return "";
  };

  const emailError = hasSubmitted ? getEmailError(email) : "";
  const passwordError = hasSubmitted ? getPasswordError(password) : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setAuthError("");

    const errEmail = getEmailError(email);
    const errPass = getPasswordError(password);

    if (errEmail || errPass) {
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Login failed");
        return;
      }

      login(data);
      router.push("/reading-logs");
    } catch {
      setAuthError("Network error occurred");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border border-[#E2E8F0] shadow-sm bg-white rounded-md overflow-hidden">
      <CardHeader className="bg-[#F8FAFC] border-b border-[#E2E8F0] p-6 text-center space-y-1">
        <div className="w-10 h-10 rounded-full bg-[#0B1329] text-white flex items-center justify-center mx-auto mb-2">
          <Lock className="w-4 h-4 text-[#F59E0B]" />
        </div>
        <CardTitle className="font-serif text-2xl font-bold text-[#0B1329]">
          Sign in to ReadLog
        </CardTitle>
        <CardDescription className="text-xs text-slate-600">
          Enter your credentials to access your personal reading sessions.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form data-testid="login-form" noValidate onSubmit={handleSubmit} className="space-y-4">
          {authError && (
            <div
              data-testid="error-auth"
              className="p-3 text-xs font-semibold tracking-wide text-rose-800 bg-rose-50 border-l-2 border-rose-500 rounded-sm"
            >
              {authError}
            </div>
          )}

          <div className="space-y-1.5">
            <Label
              htmlFor="login-email"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Email Address
            </Label>
            <Input
              id="login-email"
              data-testid="login-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setAuthError("");
              }}
              placeholder="user@example.com"
              className="h-10 text-sm bg-[#F8FAFC] border-[#E2E8F0] focus-visible:ring-1 focus-visible:ring-[#0B1329] focus-visible:bg-white rounded-md text-[#0B1329]"
            />
            {emailError && (
              <span data-testid="error-email" className="text-xs font-medium text-rose-600 block mt-1">
                {emailError}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="login-password"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Password
            </Label>
            <Input
              id="login-password"
              data-testid="login-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setAuthError("");
              }}
              className="h-10 text-sm bg-[#F8FAFC] border-[#E2E8F0] focus-visible:ring-1 focus-visible:ring-[#0B1329] focus-visible:bg-white rounded-md text-[#0B1329]"
            />
            {passwordError && (
              <span
                data-testid="error-password"
                className="text-xs font-medium text-rose-600 block mt-1"
              >
                {passwordError}
              </span>
            )}
          </div>

          <Button
            type="submit"
            data-testid="login-submit"
            className="w-full h-11 bg-[#0B1329] hover:bg-[#132147] text-white font-semibold text-xs uppercase tracking-wider rounded-md shadow-sm transition-all mt-2"
          >
            Authenticate & Open
          </Button>

          <p className="text-center text-xs text-slate-600 pt-2">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-[#0B1329] hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
