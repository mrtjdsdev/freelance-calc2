import Link from "next/link";
import type { Metadata } from "next";
import FreelanceTaxCalculator from "./components/FreelanceTaxCalculator";
import { STATE_OPTIONS, stateSlugFromCode } from "@/lib/tax-calculator";

export const metadata: Metadata = {
  title: "Freelance Tax Calculator",
  description:
    "Freelance tax calculator for 2026: estimate self-employment tax (15.3%), federal income tax using IRS-style brackets, and state tax for any US state. Free—see total tax owed, net take-home, and monthly budget.",
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <FreelanceTaxCalculator />
      <section
        aria-labelledby="browse-by-state-heading"
        className="border-t border-slate-200/80 bg-gradient-to-b from-white to-slate-50 dark:border-slate-800 dark:from-slate-950 dark:to-slate-900"
      >
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 lg:px-8">
          <h2
            id="browse-by-state-heading"
            className="text-center text-xl font-semibold tracking-tight text-slate-900 dark:text-white"
          >
            Browse by State
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600 dark:text-slate-400">
            Open the calculator prefilled for your state—federal SE tax plus state estimates for all 50 states.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-4">
            {STATE_OPTIONS.map(({ code, label }) => (
              <Link
                key={code}
                href={`/tax-calculator/${stateSlugFromCode(code)}`}
                className="rounded-lg border border-transparent px-2 py-2 text-sm text-slate-700 underline-offset-4 transition hover:border-emerald-200 hover:bg-emerald-50/80 hover:text-emerald-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:text-slate-300 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/50 dark:hover:text-emerald-200 dark:focus-visible:ring-offset-slate-950"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
