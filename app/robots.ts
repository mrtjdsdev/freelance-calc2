import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

/**
 * Served at /robots.txt. Use `app/robots.ts` (not a static `app/robots.txt` file) per Next.js App Router.
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
