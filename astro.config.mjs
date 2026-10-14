import cloudflare from "@astrojs/cloudflare";
import { cacheCloudflare } from "@astrojs/cloudflare/cache";
import react from "@astrojs/react";
import { d1, kvCache, r2 } from "@emdash-cms/cloudflare";
import { cloudflareEmail } from "@emdash-cms/cloudflare/plugins";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";

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
				cloudflareEmail({
					from: { email: "no-reply@marosectg.com", name: "Marose" },
					replyTo: "hola@marosectg.com",
				}),
			],
		}),
	],
	devToolbar: { enabled: false },
});
