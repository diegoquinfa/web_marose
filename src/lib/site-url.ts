import { env } from "cloudflare:workers";

/**
 * Public site URL from the `EMDASH_SITE_URL` runtime variable
 * (wrangler.jsonc `vars` in production, `.dev.vars` locally), as the EmDash
 * deployment docs recommend. Read at runtime, never from `import.meta.env`,
 * so previews and production share one build.
 */
export function getSiteUrl(fallbackOrigin?: string): string {
	const value = (env as Record<string, unknown>).EMDASH_SITE_URL;
	const url =
		typeof value === "string" && value.trim() ? value : fallbackOrigin;
	if (!url) {
		throw new Error(
			"EMDASH_SITE_URL is not set. Add it to wrangler.jsonc vars or .dev.vars.",
		);
	}
	return url.replace(/\/+$/, "");
}

/** Bare hostname of the site URL without "www.", e.g. "marosectg.com". */
export function getSiteDomain(fallbackOrigin?: string): string {
	return new URL(getSiteUrl(fallbackOrigin)).hostname.replace(/^www\./, "");
}
