import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PHARMORIS — Pharmaceutical Intelligence Platform",
  description:
    "Enterprise-grade pharmaceutical supply chain intelligence. Monitor drug stock, track cost savings, and manage pharmacy networks in real time.",
  keywords: ["pharmaceutical", "drug monitoring", "supply chain", "NHS", "pharmacy intelligence"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 dark:bg-[#0A0B0F] dark:text-[#F0F1F5] font-sans antialiased transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
