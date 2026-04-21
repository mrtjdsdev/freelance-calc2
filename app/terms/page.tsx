import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing your use of TaxSnap’s educational tax calculator, resources, and affiliate disclosures.",
};

export default function TermsPage() {
  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/80 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/40 dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
          Legal
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Terms of Use</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            Welcome to TaxSnap. By accessing or using this website, you agree to these Terms of Use. If you do not
            agree, please do not use the site. These terms supplement (and do not replace) professional advice from a
            licensed CPA, EA, or attorney.
          </p>

          <h2 className="pt-4 text-lg font-semibold text-slate-900 dark:text-white">Educational purpose only</h2>
          <p>
            TaxSnap provides estimates and general information for learning and planning. We are not tax
            professionals, and nothing on this site is tax, legal, or financial advice. Results depend on simplified
            assumptions and may omit credits, deductions, or rules that apply to your situation.
          </p>

          <h2 className="pt-4 text-lg font-semibold text-slate-900 dark:text-white">No warranty</h2>
          <p>
            The site and its content are provided &ldquo;as is&rdquo; without warranties of any kind. We disclaim
            liability for errors, omissions, or outcomes from reliance on calculators, articles, or links.
          </p>

          <h2 className="pt-4 text-lg font-semibold text-slate-900 dark:text-white">Affiliate disclosure</h2>
          <p>
            Some links are affiliate links. We may earn a commission when you use them, at no extra cost to you. Our
            editorial content is intended to be helpful regardless of affiliate relationships; always compare options
            on your own.
          </p>

          <h2 className="pt-4 text-lg font-semibold text-slate-900 dark:text-white">Intellectual property</h2>
          <p>
            Unless otherwise noted, TaxSnap and its content (including layout, text, and branding) are owned by us or
            our licensors. You may not copy, scrape, or redistribute site materials for commercial use without
            permission.
          </p>

          <h2 className="pt-4 text-lg font-semibold text-slate-900 dark:text-white">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, TaxSnap and its operators shall not be liable for any indirect,
            incidental, or consequential damages arising from your use of the site.
          </p>

          <h2 className="pt-4 text-lg font-semibold text-slate-900 dark:text-white">Changes</h2>
          <p>
            We may modify these terms at any time. The updated &ldquo;Last updated&rdquo; date reflects material
            changes. Your continued use after updates constitutes acceptance.
          </p>

          <h2 className="pt-4 text-lg font-semibold text-slate-900 dark:text-white">Contact</h2>
          <p>
            Questions about these terms? Visit our{" "}
            <Link href="/contact" className="font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400">
              Contact
            </Link>{" "}
            page.
          </p>
        </div>
      </div>
    </div>
  );
}
