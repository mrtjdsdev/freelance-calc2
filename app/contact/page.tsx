import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact TaxSnap for questions about our freelance tax calculator, partnerships, or site feedback.",
};

export default function ContactPage() {
  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/80 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/40 dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
          Get in touch
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Contact</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          We welcome questions about TaxSnap, feedback on the calculator, and inquiries from partners or affiliates.
          We are a small educational project—please allow a few business days for a reply.
        </p>

        <div className="mt-10 rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-lg shadow-slate-200/40 dark:border-slate-700/80 dark:bg-slate-900/80 dark:shadow-black/40">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Email</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            For general inquiries, replace the address below with your public contact email before launch, or use
            your domain&apos;s contact address.
          </p>
          <a
            href="mailto:hello@taxsnap.com"
            className="mt-4 inline-flex text-base font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
          >
            hello@taxsnap.com
          </a>
        </div>

        <p className="mt-8 text-sm text-slate-600 dark:text-slate-400">
          TaxSnap does not provide personalized tax advice by email. For complex situations, consult a qualified tax
          professional.
        </p>
      </div>
    </div>
  );
}
