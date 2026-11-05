"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { MESSAGES } from "@/constants/messages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingUserData, setPendingUserData] = useState<any>(null);

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

      // Lưu thông tin người dùng và hiển thị popup thông báo thành công
      setPendingUserData(data);
      setShowSuccessModal(true);
    } catch {
      setAuthError("Network error occurred");
    }
  };

  const handleConfirmSuccess = () => {
    if (pendingUserData) {
      login(pendingUserData);
    }
    router.push("/");
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>Nhập thông tin tài khoản của bạn để đăng nhập.</CardDescription>
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

      {/* Popup / Modal thông báo sau khi đăng nhập thành công */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <Card className="w-full max-w-sm text-center p-6 shadow-xl space-y-4 bg-background">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold tracking-tight">Đăng nhập thành công!</h3>
              <p className="text-sm text-muted-foreground">
                Chào mừng bạn đã đăng nhập thành công. Nhấn OK để vào trang chủ.
              </p>
            </div>
            <Button onClick={handleConfirmSuccess} className="w-full">
              OK
            </Button>
          </Card>
        </div>
      )}
    </>
  );
}
