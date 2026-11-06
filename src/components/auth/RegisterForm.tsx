"use client";

import React, { useState } from "react";
import { MESSAGES } from "@/constants/messages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getEmailError = (val: string) => {
    if (!val.trim()) return MESSAGES.EMAIL_REQUIRED;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) return MESSAGES.EMAIL_INVALID;
    return "";
  };

  const getPasswordError = (val: string) => {
    if (!val) return MESSAGES.PASSWORD_REQUIRED;
    if (val.length < 6) return MESSAGES.PASSWORD_MIN_LENGTH;
    return "";
  };

  const getConfirmPasswordError = (val: string, passVal: string) => {
    if (!val) return MESSAGES.CONFIRM_PASSWORD_REQUIRED;
    if (val !== passVal) return MESSAGES.PASSWORDS_NOT_MATCH;
    return "";
  };

  const emailError = hasSubmitted ? getEmailError(email) : "";
  const passwordError = hasSubmitted ? getPasswordError(password) : "";
  const confirmPasswordError = hasSubmitted ? getConfirmPasswordError(confirmPassword, password) : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setAuthError("");
    setSuccessMessage("");

    const errEmail = getEmailError(email);
    const errPass = getPasswordError(password);
    const errConfirm = getConfirmPasswordError(confirmPassword, password);

    if (errEmail || errPass || errConfirm) {
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Registration failed");
        return;
      }

      setSuccessMessage(MESSAGES.REGISTRATION_SUCCESS);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setHasSubmitted(false);
    } catch {
      setAuthError("Network error occurred");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border border-[#E2E8F0] shadow-sm bg-white rounded-md overflow-hidden">
      <CardHeader className="bg-[#F8FAFC] border-b border-[#E2E8F0] p-6 text-center space-y-1">
        <div className="w-10 h-10 rounded-full bg-[#0B1329] text-white flex items-center justify-center mx-auto mb-2">
          <UserPlus className="w-4 h-4 text-[#F59E0B]" />
        </div>
        <CardTitle className="font-serif text-2xl font-bold text-[#0B1329]">
          Create ReadLog Account
        </CardTitle>
        <CardDescription className="text-xs text-slate-600">
          Register to begin tracking personal reading sessions with multi-tenant isolation.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form data-testid="register-form" noValidate onSubmit={handleSubmit} className="space-y-4">
          {successMessage && (
            <div
              data-testid="form-success"
              className="p-3 text-xs font-semibold tracking-wide text-emerald-800 bg-emerald-50 border-l-2 border-emerald-500 rounded-sm"
            >
              {successMessage}
            </div>
          )}

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
              htmlFor="register-email"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Email Address
            </Label>
            <Input
              id="register-email"
              data-testid="register-email"
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
              htmlFor="register-password"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Password
            </Label>
            <Input
              id="register-password"
              data-testid="register-password"
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

          <div className="space-y-1.5">
            <Label
              htmlFor="register-confirm-password"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Confirm Password
            </Label>
            <Input
              id="register-confirm-password"
              data-testid="register-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setAuthError("");
              }}
              className="h-10 text-sm bg-[#F8FAFC] border-[#E2E8F0] focus-visible:ring-1 focus-visible:ring-[#0B1329] focus-visible:bg-white rounded-md text-[#0B1329]"
            />
            {confirmPasswordError && (
              <span
                data-testid="error-confirm-password"
                className="text-xs font-medium text-rose-600 block mt-1"
              >
                {confirmPasswordError}
              </span>
            )}
          </div>

          <Button
            type="submit"
            data-testid="register-submit"
            className="w-full h-11 bg-[#0B1329] hover:bg-[#132147] text-white font-semibold text-xs uppercase tracking-wider rounded-md shadow-sm transition-all mt-2"
          >
            Create Account
          </Button>

          <p className="text-center text-xs text-slate-600 pt-2">
            Already registered?{" "}
            <Link href="/login" className="font-semibold text-[#0B1329] hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
