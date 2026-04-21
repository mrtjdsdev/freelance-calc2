import Link from "next/link";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  BookMarked,
  BookOpen,
  Building2,
  Calculator,
  CreditCard,
  FileSpreadsheet,
  Landmark,
  Library,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Business Toolkit",
  description:
    "Curated accounting software, tax books, and business banking picks for freelancers—compare options before you buy.",
};

type ToolkitCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel: "Check Price" | "Learn More";
};

type ToolkitSection = {
  id: string;
  heading: string;
  subheading: string;
  sectionIcon: LucideIcon;
  accent: string;
  cards: ToolkitCard[];
};

const sections: ToolkitSection[] = [
  {
    id: "accounting-software",
    heading: "Accounting Software",
    subheading:
      "Track income and expenses, send invoices, and stay Schedule C–ready with cloud tools built for solopreneurs.",
    sectionIcon: Calculator,
    accent:
      "text-emerald-700 dark:text-emerald-400 ring-emerald-600/20 bg-emerald-50 dark:bg-emerald-950/50 dark:ring-emerald-500/30",
    cards: [
      {
        icon: FileSpreadsheet,
        title: "Top pick (placeholder)",
        description:
          "Replace with your preferred accounting suite—bank feeds, receipt capture, and mileage in one dashboard.",
        ctaLabel: "Check Price",
      },
      {
        icon: FileSpreadsheet,
        title: "Alternative (placeholder)",
        description:
          "A second option for readers who want simpler books or lighter pricing—swap in your affiliate link when ready.",
        ctaLabel: "Learn More",
      },
    ],
  },
  {
    id: "tax-books",
    heading: "Tax Books",
    subheading:
      "Plain-English guides for self-employment, deductions, and estimated taxes—great for learning between filing seasons.",
    sectionIcon: Library,
    accent:
      "text-violet-700 dark:text-violet-300 ring-violet-600/20 bg-violet-50 dark:bg-violet-950/40 dark:ring-violet-500/30",
    cards: [
      {
        icon: BookOpen,
        title: "Self-employed taxes (placeholder)",
        description:
          "Placeholder for a go-to reference on Schedule C, home office, and quarterly estimates—link your Amazon or publisher affiliate.",
        ctaLabel: "Check Price",
      },
      {
        icon: BookMarked,
        title: "Deductions deep-dive (placeholder)",
        description:
          "A focused read on write-offs freelancers actually use—swap the title and URL to match your recommendation.",
        ctaLabel: "Learn More",
      },
    ],
  },
  {
    id: "business-banking",
    heading: "Business Banking",
    subheading:
      "Separate business cash from personal accounts with FDIC-backed products built for small businesses and contractors.",
    sectionIcon: Landmark,
    accent:
      "text-cyan-800 dark:text-cyan-300 ring-cyan-600/25 bg-cyan-50 dark:bg-cyan-950/40 dark:ring-cyan-500/30",
    cards: [
      {
        icon: Building2,
        title: "Business checking (placeholder)",
        description:
          "Placeholder for a no-fee or low-fee business checking pick—great for debit-card spend and clean statements.",
        ctaLabel: "Check Price",
      },
      {
        icon: CreditCard,
        title: "Business savings or card (placeholder)",
        description:
          "Optional second slot for a savings account or business card—drop in your partner link when you have one.",
        ctaLabel: "Learn More",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/80 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/40 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 underline-offset-4 transition hover:text-emerald-800 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          <span aria-hidden className="text-base leading-none">
            ←
          </span>
          Back to Calculator
        </Link>

        <header className="mt-10 text-center sm:mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            Curated picks
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Business Toolkit</h1>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            Hand-picked categories for independent workers. Buttons point to placeholders—replace{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">href</code> with your
            affiliate URLs when you&apos;re ready.
          </p>
        </header>

        <div className="mt-14 space-y-16 sm:mt-16 sm:space-y-20">
          {sections.map((section) => {
            const SectionIcon = section.sectionIcon;
            return (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-2 ${section.accent}`}
                  >
                    <SectionIcon className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2
                      id={`${section.id}-heading`}
                      className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white"
                    >
                      {section.heading}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                      {section.subheading}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:gap-8">
                  {section.cards.map((card) => {
                    const CardIcon = card.icon;
                    return (
                      <article
                        key={`${section.id}-${card.title}`}
                        className="flex flex-col rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-md shadow-slate-200/30 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/85 dark:shadow-black/30"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50 dark:border-slate-600 dark:bg-slate-800/80">
                            <CardIcon className="h-5 w-5 text-emerald-700 dark:text-emerald-400" aria-hidden />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{card.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                              {card.description}
                            </p>
                          </div>
                        </div>
                        <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-700/80">
                          <a
                            href="#"
                            className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:focus-visible:ring-offset-slate-950"
                          >
                            {card.ctaLabel}
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
