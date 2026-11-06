"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { MESSAGES } from "@/constants/messages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Login to ReadLog</CardTitle>
      </CardHeader>
      <CardContent>
        <form data-testid="login-form" noValidate onSubmit={handleSubmit} className="space-y-4">
          {authError && (
            <div data-testid="error-auth" className="text-sm font-medium text-destructive">
              {authError}
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              data-testid="login-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setAuthError("");
              }}
              placeholder="you@example.com"
            />
            {emailError && (
              <span data-testid="error-email" className="text-sm text-destructive block">
                {emailError}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              data-testid="login-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setAuthError("");
              }}
            />
            {passwordError && (
              <span data-testid="error-password" className="text-sm text-destructive block">
                {passwordError}
              </span>
            )}
          </div>

          <Button type="submit" data-testid="login-submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
