import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Freelancer Toolkit",
  description:
    "Bookkeeping software, business banking, and tax filing resources for freelancers—in one toolkit.",
};

const toolkitItems = [
  {
    title: "Bookkeeping Software",
    description:
      "Stay ready for Schedule C with categorized income and expenses, mileage, client invoicing, and reconciliation that scales with your solo practice.",
    href: "#bookkeeping",
  },
  {
    title: "Business Banking",
    description:
      "Keep business and personal money separate with accounts built for contractors—clear statements, debit cards, and rules that simplify reconciliation.",
    href: "#banking",
  },
  {
    title: "Tax Filing",
    description:
      "Move from estimates to filing with guided self-employment flows, state add-ons, and support when your return spans multiple schedules.",
    href: "#filing",
  },
] as const;

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
            Resources
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Freelancer Toolkit
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            Three pillars for running your independent business—pick a category to explore tools we&apos;ll
            expand with guides and partner picks.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:gap-10">
          {toolkitItems.map((item) => (
            <article
              key={item.title}
              id={item.href.replace("#", "")}
              className="flex flex-col rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-lg shadow-slate-200/40 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/80 dark:shadow-black/40"
            >
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:focus-visible:ring-offset-slate-950"
              >
                View Details
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
