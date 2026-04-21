import Link from "next/link";

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-white/40 bg-white/65 backdrop-blur-xl backdrop-saturate-150 dark:border-slate-700/50 dark:bg-slate-950/60"
      role="banner"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-baseline gap-1 text-lg font-bold tracking-tight text-slate-900 transition hover:text-emerald-800 dark:text-white dark:hover:text-emerald-300 sm:text-xl"
        >
          <span className="font-extrabold tracking-tight">TaxSnap</span>
          <span className="rounded-md bg-emerald-600/15 px-1.5 py-0.5 text-sm font-semibold tabular-nums text-emerald-700 ring-1 ring-emerald-600/25 dark:bg-emerald-400/15 dark:text-emerald-400 dark:ring-emerald-400/30">
            2026
          </span>
        </Link>

        <nav
          className="flex items-center gap-1 sm:gap-2"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            Calculator
          </Link>
          <Link
            href="/resources"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            Resources
          </Link>
        </nav>
      </div>
    </header>
  );
}
