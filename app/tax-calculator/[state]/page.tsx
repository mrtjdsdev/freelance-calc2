import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FreelanceTaxCalculator from "@/app/components/FreelanceTaxCalculator";
import { US_STATE_CODES, getStateLabel, parseStateSlug, stateSlugFromCode } from "@/lib/tax-calculator";

type PageProps = {
  params: Promise<{ state: string }>;
};

export function generateStaticParams(): { state: string }[] {
  return US_STATE_CODES.map((code) => ({
    state: stateSlugFromCode(code),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: segment } = await params;
  const code = parseStateSlug(segment);

  if (!code) {
    return {
      title: "Freelance tax calculator by state",
      description:
        "Estimate freelance self-employment, federal, and state taxes with our free 2026 calculator.",
    };
  }

  const stateName = getStateLabel(code);
  const title = `2026 Freelance Tax Calculator for ${stateName}`;
  const description = `Calculate your self-employment tax in ${stateName} with our free 2026 tool. Estimate federal, state, and SE taxes for freelancers and contractors.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function StateTaxCalculatorPage({ params }: PageProps) {
  const { state: segment } = await params;
  const code = parseStateSlug(segment);

  if (!code) {
    notFound();
  }

  const stateName = getStateLabel(code);
  const heading = `2026 Freelance Tax Calculator for ${stateName}`;
  const subheading = `Estimate self-employment, federal (2026 brackets), and ${stateName} state taxes. Adjust income and expenses to preview liability and monthly cash flow.`;

  return (
    <FreelanceTaxCalculator
      key={code}
      initialState={code}
      heading={heading}
      subheading={subheading}
    />
  );
}
