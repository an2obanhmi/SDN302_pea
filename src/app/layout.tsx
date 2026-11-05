import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ExpenseProvider } from "@/context/ExpenseContext";
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ExpenseTrail",
  description: "Personal expense tracking made simple and transparent.",
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
          <ExpenseProvider>
            <Header />
            <main className="min-h-[calc(100vh-4rem)] bg-muted/20">{children}</main>
          </ExpenseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
