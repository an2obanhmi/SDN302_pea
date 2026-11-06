import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ReadingLogProvider } from "@/context/ReadingLogContext";
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReadLog",
  description: "Track your personal reading sessions, books, genres, and minutes read.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ReadingLogProvider>
            <Header />
            <main className="min-h-[calc(100vh-4rem)] bg-muted/20">{children}</main>
          </ReadingLogProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
