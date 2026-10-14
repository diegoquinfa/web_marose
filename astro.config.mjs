import { fileURLToPath } from "node:url";
import cloudflare from "@astrojs/cloudflare";
import { cacheCloudflare } from "@astrojs/cloudflare/cache";
import react from "@astrojs/react";
import { d1, kvCache, r2 } from "@emdash-cms/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";

const SITE_URL = "https://marosectg.com";

/**
 * Marose email provider: Cloudflare Email Sending wrapped in the brand layout.
 * See src/plugins/marose-email.ts.
 */
function maroseEmail(options) {
	return {
		id: "marose-email",
		version: "1.0.0",
		entrypoint: fileURLToPath(
			new URL("./src/plugins/marose-email.ts", import.meta.url),
		).replaceAll("\\", "/"),
		format: "native",
		options,
		capabilities: ["hooks.email-transport:register"],
	};
}

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	cache: {
		provider: cacheCloudflare(),
	},
	routeRules: {
		"/": { maxAge: 300, swr: 86400 },
	},
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
		},
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB" }),
			storage: r2({ binding: "MEDIA" }),
			objectCache: kvCache({ binding: "CACHE" }),
			admin: {
				siteName: "Marose",
				logo: "/brand/admin-logo.webp",
				favicon: "/brand/favicon.webp",
				footerLabel: "Marose · Repostería artesanal",
				locales: ["es-419"],
			},
			plugins: [
				maroseEmail({
					from: { email: "no-reply@marosectg.com", name: "Marose" },
					replyTo: "hola@marosectg.com",
					logoUrl: `${SITE_URL}/brand/admin-logo.webp`,
					siteUrl: SITE_URL,
				}),
			],
		}),
	],
	devToolbar: { enabled: false },
});
