import type { MetadataRoute } from "next";
import { US_STATE_CODES, stateSlugFromCode } from "@/lib/tax-calculator";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const stateEntries: MetadataRoute.Sitemap = US_STATE_CODES.map((code) => ({
    url: `${base}/tax-calculator/${stateSlugFromCode(code)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/resources`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...stateEntries,
  ];
}
