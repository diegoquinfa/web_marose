import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		nitro({
			rollupConfig: { external: [/^@sentry\//] },
			routeRules: {
				"/fonts/**": {
					headers: { "Cache-Control": "public, max-age=31536000, immutable" },
				},
				"/logos/**": {
					headers: { "Cache-Control": "public, max-age=31536000, immutable" },
				},
				"/food/**": {
					headers: { "Cache-Control": "public, max-age=31536000, immutable" },
				},
				"/open_graph.webp": {
					headers: { "Cache-Control": "public, max-age=86400" },
				},
			},
		}),
		tailwindcss(),
		tanstackStart({
			prerender: {
				enabled: true,
				crawlLinks: true,
			},
		}),
		viteReact(),
		babel({ presets: [reactCompilerPreset()] }),
	],
});

export default config;
