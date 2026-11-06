import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ExpenseProvider } from "@/context/ExpenseContext";
import { ReadingLogProvider } from "@/context/ReadingLogContext";
import { Header } from "@/components/layout/Header";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "ExpenseTrail — Personal Expense Architecture",
  description: "Minimalist functionalist personal expense tracking with real-time category breakdown.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen bg-[#F8FAFC] text-[#0B1329] font-sans antialiased selection:bg-[#F59E0B]/20 selection:text-[#0B1329]">
        <AuthProvider>
          <ExpenseProvider>
            <ReadingLogProvider>
              <Header />
              <main className="min-h-[calc(100vh-4rem)]">{children}</main>
            </ReadingLogProvider>
          </ExpenseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
