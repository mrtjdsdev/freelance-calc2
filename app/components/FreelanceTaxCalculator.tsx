'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  calculateFreelanceTax,
  STATE_OPTIONS,
  type FilingStatus,
  type TaxBreakdown,
  type USStateCode,
} from "@/lib/tax-calculator";
import TaxDeductionsChecklist from "./TaxDeductionsChecklist";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const moneyDetailed = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const PIE_COLORS = ["#059669", "#d97706", "#7c3aed"];

/** Recharts touches `window`/DOM; render chart only after client mount so SSR/Vercel builds never execute it. */
function NoSSR({ fallback, children }: { fallback: ReactNode; children: ReactNode }) {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  if (!client) return fallback;
  return children;
}

function parseMoney(raw: string): number {
  const n = Number.parseFloat(raw.replace(/,/g, ""));
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

export type FreelanceTaxCalculatorProps = {
  initialState?: USStateCode;
  heading?: string;
  subheading?: string;
};

export default function FreelanceTaxCalculator({
  initialState = "CA",
  heading = "Freelance Tax Calculator",
  subheading = "Estimate self-employment, federal (2026 brackets), and state taxes. Tune income and expenses to preview annual liability and monthly cash flow.",
}: FreelanceTaxCalculatorProps) {
  const [grossRaw, setGrossRaw] = useState("85000");
  const [expensesRaw, setExpensesRaw] = useState("12000");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [state, setState] = useState<USStateCode>(initialState);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const calculateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (calculateTimeoutRef.current) clearTimeout(calculateTimeoutRef.current);
    };
  }, []);

  const [displayResult, setDisplayResult] = useState<TaxBreakdown>(() =>
    calculateFreelanceTax({
      grossIncome: parseMoney("85000"),
      businessExpenses: parseMoney("12000"),
      filingStatus: "single",
      state: initialState,
    }),
  );

  const grossIncome = parseMoney(grossRaw);
  const businessExpenses = parseMoney(expensesRaw);

  const runCalculation = () => {
    if (calculateTimeoutRef.current) clearTimeout(calculateTimeoutRef.current);
    setIsCalculating(true);
    calculateTimeoutRef.current = setTimeout(() => {
      calculateTimeoutRef.current = null;
      setDisplayResult(
        calculateFreelanceTax({
          grossIncome,
          businessExpenses,
          filingStatus,
          state,
        }),
      );
      setIsCalculating(false);
    }, 1000);
  };

  const result = displayResult;
  const monthlyTakeHome = result.netTakeHome / 12;
  const monthlyTax = result.totalTax / 12;
  const monthlySE = result.selfEmploymentTax / 12;
  const monthlyFed = result.federalIncomeTax / 12;
  const monthlyState = result.stateIncomeTax / 12;

  const pieData = useMemo(
    () =>
      [
        { name: "Take-home pay", value: result.netTakeHome },
        { name: "Federal tax", value: result.federalIncomeTax },
        { name: "Self-employment tax", value: result.selfEmploymentTax },
      ].filter((d) => d.value > 0),
    [result.netTakeHome, result.federalIncomeTax, result.selfEmploymentTax],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/80 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/40 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <header className="mb-10 text-center sm:mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            Independent contractor
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            {subheading}
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 lg:items-start">
          <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-lg shadow-slate-200/40 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/80 dark:shadow-black/40 lg:col-span-5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Inputs</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Numbers are simplified projections only.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="gross" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Annual gross income
                </label>
                <div className="relative mt-1.5">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                    $
                  </span>
                  <input
                    id="gross"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={grossRaw}
                    onChange={(e) => setGrossRaw(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-3 text-base outline-none ring-emerald-500/20 transition focus:border-emerald-500 focus:ring-4 dark:border-slate-600 dark:bg-slate-950 dark:focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="expenses"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Estimated business expenses
                </label>
                <div className="relative mt-1.5">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                    $
                  </span>
                  <input
                    id="expenses"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={expensesRaw}
                    onChange={(e) => setExpensesRaw(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-3 text-base outline-none ring-emerald-500/20 transition focus:border-emerald-500 focus:ring-4 dark:border-slate-600 dark:bg-slate-950 dark:focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Filing status
                </span>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                  {(
                    [
                      { id: "single" as const, label: "Single" },
                      { id: "married" as const, label: "Married" },
                    ] as const
                  ).map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setFilingStatus(id)}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30 sm:flex-1 ${
                        filingStatus === id
                          ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/25 dark:border-emerald-500 dark:bg-emerald-500"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-500"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  US state
                </label>
                <div className="relative mt-1.5">
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value as USStateCode)}
                    className="block w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-10 text-base outline-none ring-emerald-500/20 transition focus:border-emerald-500 focus:ring-4 dark:border-slate-600 dark:bg-slate-950 dark:focus:border-emerald-400"
                  >
                    {STATE_OPTIONS.map(({ code, label }) => (
                      <option key={code} value={code}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden={true}
                      focusable="false"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={runCalculation}
              disabled={isCalculating}
              className="mt-8 w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/35 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-emerald-500 dark:hover:bg-emerald-400"
            >
              {isCalculating ? "Calculating…" : "Calculate"}
            </button>
            <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-500">
              Update your inputs, then run the calculator to refresh results.
            </p>
          </section>

          <section className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-px shadow-xl shadow-emerald-900/20 dark:border-emerald-500/30 dark:shadow-black/50">
              <div className="relative rounded-[calc(1rem-1px)] bg-white p-6 dark:bg-slate-950 sm:p-8">
                {isCalculating ? (
                  <div
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-[calc(1rem-1px)] bg-white/90 px-6 backdrop-blur-[2px] dark:bg-slate-950/92"
                    role="status"
                    aria-live="polite"
                    aria-busy="true"
                  >
                    <div
                      className="h-11 w-11 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-600 dark:border-emerald-900 dark:border-t-emerald-400"
                      aria-hidden={true}
                    />
                    <p className="text-center text-sm font-medium text-slate-800 dark:text-slate-100">
                      Calculating your deductions...
                    </p>
                  </div>
                ) : null}

                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Results</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Net profit {moneyDetailed.format(result.netProfit)} before taxes
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-600/15 dark:bg-emerald-950/80 dark:text-emerald-200 dark:ring-emerald-400/25">
                    2026 federal brackets · SE 15.3%
                  </span>
                </div>

                <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                    <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Total tax owed
                    </dt>
                    <dd className="mt-2 text-2xl font-semibold tabular-nums text-slate-900 dark:text-white">
                      {money.format(result.totalTax)}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                    <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Net take-home
                    </dt>
                    <dd className="mt-2 text-2xl font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
                      {money.format(result.netTakeHome)}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/90 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/40 sm:col-span-1">
                    <dt className="text-xs font-medium uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
                      Monthly after tax
                    </dt>
                    <dd className="mt-2 text-2xl font-semibold tabular-nums text-emerald-800 dark:text-emerald-200">
                      {moneyDetailed.format(monthlyTakeHome)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Cash flow split</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Take-home pay, federal income tax, and self-employment tax (annual). State tax is not included in
                    this chart.
                  </p>
                  {pieData.length > 0 ? (
                    <div className="mt-4 h-[350px] w-full">
                      <NoSSR
                        fallback={
                          <div
                            className="h-[350px] w-full rounded-lg bg-slate-200 dark:bg-slate-700"
                            aria-hidden
                          />
                        }
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={56}
                              outerRadius={96}
                              paddingAngle={2}
                            >
                              {pieData.map((_, index) => (
                                <Cell key={pieData[index].name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => [moneyDetailed.format(Number(value)), "Amount"]}
                              contentStyle={{
                                borderRadius: "0.75rem",
                                border: "1px solid rgb(226 232 240)",
                                backgroundColor: "rgba(255,255,255,0.96)",
                              }}
                            />
                            <Legend verticalAlign="bottom" height={40} />
                          </PieChart>
                        </ResponsiveContainer>
                      </NoSSR>
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                      Add income and click Calculate to see the chart.
                    </p>
                  )}
                </div>

                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Tax breakdown</h3>
                  <ul className="mt-3 divide-y divide-slate-100 dark:divide-slate-800">
                    <li className="flex justify-between gap-4 py-2.5 text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Self-employment (15.3%)</span>
                      <span className="tabular-nums font-medium text-slate-900 dark:text-slate-100">
                        {moneyDetailed.format(result.selfEmploymentTax)}
                      </span>
                    </li>
                    <li className="flex justify-between gap-4 py-2.5 text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Federal income tax</span>
                      <span className="tabular-nums font-medium text-slate-900 dark:text-slate-100">
                        {moneyDetailed.format(result.federalIncomeTax)}
                      </span>
                    </li>
                    <li className="flex justify-between gap-4 py-2.5 text-sm">
                      <span className="text-slate-600 dark:text-slate-400">State income tax</span>
                      <span className="tabular-nums font-medium text-slate-900 dark:text-slate-100">
                        {moneyDetailed.format(result.stateIncomeTax)}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Monthly budget snapshot</h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    Averages your annual figures across 12 months for planning.
                  </p>
                  <ul className="mt-4 space-y-3">
                    <li className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Take-home pay / month</span>
                      <span className="font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
                        {moneyDetailed.format(monthlyTakeHome)}
                      </span>
                    </li>
                    <li className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                      <span className="text-slate-600 dark:text-slate-400">All taxes / month</span>
                      <span className="tabular-nums font-medium text-slate-900 dark:text-slate-100">
                        {moneyDetailed.format(monthlyTax)}
                      </span>
                    </li>
                    <li className="grid gap-2 border-t border-slate-200 pt-3 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-400 sm:grid-cols-3 sm:gap-3">
                      <span>
                        SE:{" "}
                        <span className="font-medium tabular-nums text-slate-800 dark:text-slate-200">
                          {moneyDetailed.format(monthlySE)}
                        </span>
                      </span>
                      <span>
                        Federal:{" "}
                        <span className="font-medium tabular-nums text-slate-800 dark:text-slate-200">
                          {moneyDetailed.format(monthlyFed)}
                        </span>
                      </span>
                      <span>
                        State:{" "}
                        <span className="font-medium tabular-nums text-slate-800 dark:text-slate-200">
                          {moneyDetailed.format(monthlyState)}
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>

                <aside className="mt-8 rounded-xl border border-sky-200 bg-sky-50 p-4 shadow-sm ring-1 ring-sky-100 dark:border-sky-800 dark:bg-sky-950/50 dark:ring-sky-900/80">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-900 dark:text-sky-300">
                    Pro Tip
                  </p>
                  <p className="mt-2 text-sm font-medium leading-snug text-sky-950 dark:text-sky-100">
                    Don&apos;t overpay! Get our 2026 Freelance Expense Checklist to find every deduction.
                  </p>

                  {leadSubmitted ? (
                    <p
                      role="status"
                      className="mt-4 text-sm font-semibold text-sky-900 dark:text-sky-200"
                    >
                      Thanks! Check your inbox.
                    </p>
                  ) : (
                    <form
                      className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setLeadSubmitted(true);
                      }}
                    >
                      <div className="min-w-0 flex-1">
                        <label htmlFor="lead-email" className="sr-only">
                          Email address
                        </label>
                        <input
                          id="lead-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className="block w-full rounded-lg border border-sky-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 dark:border-sky-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-400"
                        />
                      </div>
                      <button
                        type="submit"
                        className="shrink-0 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-sky-500 dark:hover:bg-sky-400 dark:focus-visible:ring-offset-slate-950"
                      >
                        Download Checklist
                      </button>
                    </form>
                  )}
                </aside>

                <p className="mt-6 text-xs leading-relaxed text-slate-500 dark:text-slate-500">
                  Educational estimate only—not tax, legal, or financial advice. Federal figures use 2026
                  ordinary brackets and standard deductions; state logic is simplified and may omit credits,
                  local taxes, and pass-through adjustments.
                </p>
              </div>
            </div>
          </section>
        </div>

        <TaxDeductionsChecklist />
      </div>
    </div>
  );
}
