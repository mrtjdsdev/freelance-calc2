"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const ITEMS = [
  { id: "home-office", label: "Home office (dedicated workspace)" },
  { id: "software", label: "Software & subscriptions" },
  { id: "marketing", label: "Marketing & advertising" },
] as const;

export default function TaxDeductionsChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <section
      aria-labelledby="tax-deductions-heading"
      className="mt-10 rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-lg shadow-slate-200/35 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/80 dark:shadow-black/40 sm:p-8"
    >
      <h2
        id="tax-deductions-heading"
        className="text-lg font-semibold text-slate-900 dark:text-white"
      >
        Tax Deductions Checklist
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        Common Schedule C expenses freelancers track—confirm eligibility with a tax pro. Tap items as you
        document them for your records.
      </p>
      <ul className="mt-6 space-y-3">
        {ITEMS.map((item) => {
          const isOn = checked[item.id] ?? false;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() =>
                  setChecked((prev) => ({
                    ...prev,
                    [item.id]: !isOn,
                  }))
                }
                className="flex w-full items-start gap-3 rounded-xl border border-slate-200/90 bg-slate-50/80 px-4 py-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50/40 dark:border-slate-600 dark:bg-slate-800/50 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30"
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition ${
                    isOn
                      ? "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-500 dark:bg-emerald-500"
                      : "border-slate-300 bg-white dark:border-slate-500 dark:bg-slate-900"
                  }`}
                  aria-hidden
                >
                  {isOn ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
                </span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
