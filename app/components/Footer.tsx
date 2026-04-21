import Link from "next/link";

const footerLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Footer() {
  return (
    <footer
      className="mt-auto border-t border-slate-200/90 bg-slate-50/90 dark:border-slate-800 dark:bg-slate-950/80"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 sm:justify-start"
          aria-label="Legal and contact"
        >
          {footerLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-slate-700 underline-offset-4 transition hover:text-emerald-700 hover:underline dark:text-slate-300 dark:hover:text-emerald-400"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:mx-0 sm:text-left">
          TaxSnap is for educational purposes only. We are not tax professionals. Some links on this site
          are affiliate links which help support our work at no cost to you.
        </p>

        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-500 sm:text-left">
          © {new Date().getFullYear()} TaxSnap
        </p>
      </div>
    </footer>
  );
}
