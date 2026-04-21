import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How TaxSnap collects, uses, and protects information when you use our freelance tax calculator and resources.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/80 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/40 dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
          Legal
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            TaxSnap (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates this website to provide
            educational tax estimation tools and related content. This Privacy Policy describes how information may
            be handled when you use our site. Review this page with qualified counsel before relying on it for
            compliance; it is a starting point for affiliate and transparency disclosures, not legal advice.
          </p>

          <h2 className="pt-4 text-lg font-semibold text-slate-900 dark:text-white">Information we may collect</h2>
          <p>
            Like many websites, we may receive technical data automatically (such as browser type, general location
            derived from IP, and pages visited) through hosting providers, analytics, or similar services if
            enabled. Calculator inputs you enter may be processed in your browser; we do not intend to store your
            personal tax figures on our servers unless we implement features that explicitly say otherwise.
          </p>

          <h2 className="pt-4 text-lg font-semibold text-slate-900 dark:text-white">Cookies and similar technologies</h2>
          <p>
            We may use cookies or local storage for site functionality, preferences, or analytics. You can control
            cookies through your browser settings. Third-party tools (including affiliate networks) may set their
            own cookies subject to their policies.
          </p>

          <h2 className="pt-4 text-lg font-semibold text-slate-900 dark:text-white">Affiliate relationships</h2>
          <p>
            Some links on TaxSnap are affiliate links. If you click an affiliate link and complete a qualifying
            action, we may earn a commission at no additional cost to you. This does not influence our educational
            estimates, but you should verify offers independently.
          </p>

          <h2 className="pt-4 text-lg font-semibold text-slate-900 dark:text-white">Children&apos;s privacy</h2>
          <p>
            Our services are not directed at children under 13, and we do not knowingly collect personal information
            from children.
          </p>

          <h2 className="pt-4 text-lg font-semibold text-slate-900 dark:text-white">Changes</h2>
          <p>
            We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top will change
            when we do. Continued use of the site after changes constitutes your acceptance of the revised policy.
          </p>

          <h2 className="pt-4 text-lg font-semibold text-slate-900 dark:text-white">Contact</h2>
          <p>
            For privacy-related questions, see our{" "}
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
