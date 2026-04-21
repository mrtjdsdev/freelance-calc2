/**
 * Canonical site origin for metadata, sitemap, and robots.
 * In production, set `NEXT_PUBLIC_SITE_URL` to your deployed URL (e.g. https://taxsnap.com).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return raw.replace(/\/$/, "");
}
