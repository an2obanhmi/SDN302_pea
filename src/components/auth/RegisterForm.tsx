"use client";

import React, { useState } from "react";
import { MESSAGES } from "@/constants/messages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Create an Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form data-testid="register-form" noValidate onSubmit={handleSubmit} className="space-y-4">
          {successMessage && (
            <div data-testid="form-success" className="text-sm font-medium text-green-600">
              {successMessage}
            </div>
          )}
          {authError && (
            <div data-testid="error-auth" className="text-sm font-medium text-destructive">
              {authError}
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              data-testid="register-email"
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
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              data-testid="register-password"
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

          <div className="space-y-1">
            <Label htmlFor="register-confirm-password">Confirm Password</Label>
            <Input
              id="register-confirm-password"
              data-testid="register-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setAuthError("");
              }}
            />
            {confirmPasswordError && (
              <span data-testid="error-confirm-password" className="text-sm text-destructive block">
                {confirmPasswordError}
              </span>
            )}
          </div>

          <Button type="submit" data-testid="register-submit" className="w-full">
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
