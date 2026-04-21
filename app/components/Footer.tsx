import Link from "next/link";

const toolsLinks = [
  { href: "/", label: "Home" },
  { href: "/resources", label: "Resources" },
] as const;

const companyLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Footer() {
  return (
    <footer
      className="mt-auto border-t border-slate-200/90 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Tools
            </h2>
            <ul className="mt-4 space-y-3">
              {toolsLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm font-medium text-slate-700 transition hover:text-emerald-800 dark:text-slate-300 dark:hover:text-emerald-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Company
            </h2>
            <ul className="mt-4 space-y-3">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm font-medium text-slate-700 transition hover:text-emerald-800 dark:text-slate-300 dark:hover:text-emerald-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Disclaimer
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              TaxSnap is for educational purposes only. We are not tax professionals but our affiliates are!.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200/80 pt-8 dark:border-slate-700/80">
          <p className="text-center text-xs text-slate-500 dark:text-slate-500 sm:text-left">
            © {new Date().getFullYear()} TaxSnap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
