import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./components/Footer";
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
    default: "Freelance Tax Calculator | TaxSnap 2026",
    template: "%s | TaxSnap 2026",
  },
  description:
    "Freelance tax calculator for self-employed workers: estimate 15.3% self-employment tax, 2026 federal income tax, and state tax in all 50 US states. Free tool—plan take-home pay and monthly budget.",
  keywords: [
    "freelance tax calculator",
    "self-employment tax calculator",
    "self-employment tax 2026",
    "Schedule C estimate",
    "tax calculator by state",
    "TaxSnap",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TaxSnap 2026",
    title: "Freelance Tax Calculator | TaxSnap 2026",
    description:
      "Free freelance tax calculator: self-employment (SE) tax, 2026 federal brackets, and state tax for all US states. Plan take-home pay in minutes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Tax Calculator | TaxSnap 2026",
    description:
      "Free freelance tax calculator: self-employment (SE) tax, 2026 federal brackets, and state tax for all US states. Plan take-home pay in minutes.",
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
        <Footer />
      </body>
    </html>
  );
}
