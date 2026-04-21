import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "TaxSnap 2026 — Freelance Tax Calculator",
    template: "%s | TaxSnap 2026",
  },
  description:
    "TaxSnap 2026 helps freelancers estimate self-employment tax (15.3%), federal income tax using 2026 brackets, and state tax for all 50 states. Plan take-home pay and monthly budget in one free calculator.",
  keywords: [
    "freelance tax calculator",
    "self-employment tax 2026",
    "Schedule C estimate",
    "tax calculator by state",
    "TaxSnap",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TaxSnap 2026",
    title: "TaxSnap 2026 — Freelance Tax Calculator",
    description:
      "Estimate SE tax, federal tax, and state tax for freelancers. Free 2026 calculator for all US states.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxSnap 2026 — Freelance Tax Calculator",
    description:
      "Estimate SE tax, federal tax, and state tax for freelancers. Free 2026 calculator for all US states.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
