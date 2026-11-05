"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 data-testid="home-title" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Template Khung Dự Án
        </h1>
        <p className="text-lg text-muted-foreground">
          Khung chuẩn bị sẵn sàng cho đề thi: Xác thực Auth JWT (HttpOnly Cookie), Prisma ORM, Supabase Postgres & Tailwind/ShadCN.
        </p>

        {user ? (
          <Card className="text-left mt-8 border shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Thông tin phiên đăng nhập</CardTitle>
              <CardDescription>Bạn đã đăng nhập thành công vào hệ thống.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted rounded-md text-sm">
                <span className="font-semibold">Email: </span>
                <span className="text-primary font-mono">{user.email}</span>
              </div>
              <div className="p-3 bg-muted rounded-md text-sm">
                <span className="font-semibold">User ID: </span>
                <span className="font-mono text-muted-foreground">{user.id}</span>
              </div>
              <p className="text-xs text-muted-foreground pt-2">
                * Khi có đề bài mới, bạn chỉ cần bổ sung các models và routes nghiệp vụ tương ứng vào cấu trúc có sẵn.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/login" passHref legacyBehavior>
              <Button size="lg" asChild>
                <a>Đăng nhập</a>
              </Button>
            </Link>
            <Link href="/register" passHref legacyBehavior>
              <Button variant="outline" size="lg" asChild>
                <a>Đăng ký tài khoản</a>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
