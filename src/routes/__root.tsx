import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import { NotFound } from "../components/not-found";
import appCss from "../styles.css?url";

const SITE_URL = "https://marosectg.com";
const PAGE_TITLE = "Marose · Cookies & postres artesanales — Cartagena";
const PAGE_DESCRIPTION =
	"Marose es una repostería artesanal de Cartagena. Cookies, pavé, cookie pie y torta de zanahoria hechos frescos y con amor para compartir. Pide por WhatsApp.";
const OG_IMAGE = `${SITE_URL}/open_graph.webp`;

// `property` isn't part of React's MetaHTMLAttributes type, so this is kept
// as its own typed constant to avoid excess-property errors on the inline
// array passed to `head()`.
const socialMeta: Array<{ name?: string; property?: string; content: string }> =
	[
		{ name: "robots", content: "index, follow" },
		{ name: "theme-color", content: "#fffaf4" },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "Marose" },
		{ property: "og:title", content: PAGE_TITLE },
		{ property: "og:description", content: PAGE_DESCRIPTION },
		{ property: "og:url", content: `${SITE_URL}/` },
		{ property: "og:image", content: OG_IMAGE },
		{ property: "og:locale", content: "es_CO" },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: PAGE_TITLE },
		{ name: "twitter:description", content: PAGE_DESCRIPTION },
		{ name: "twitter:image", content: OG_IMAGE },
	];

const bakeryJsonLd = {
	"@context": "https://schema.org",
	"@type": "Bakery",
	name: "Marose",
	image: OG_IMAGE,
	url: `${SITE_URL}/`,
	logo: `${SITE_URL}/logos/logo.webp`,
	telephone: "+57 324 682 2755",
	priceRange: "$$",
	servesCuisine: "Postres artesanales",
	address: {
		"@type": "PostalAddress",
		addressLocality: "Cartagena de Indias",
		addressRegion: "Bolívar",
		addressCountry: "CO",
	},
	sameAs: [
		"https://instagram.com/marosectg",
		"https://www.tiktok.com/@marosepostres",
	],
	areaServed: {
		"@type": "City",
		name: "Cartagena de Indias",
	},
};

export const Route = createRootRoute({
	notFoundComponent: NotFound,
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: PAGE_TITLE,
			},
			{
				name: "description",
				content: PAGE_DESCRIPTION,
			},
			...socialMeta,
		],
		links: [
			{
				rel: "preconnect",
				href: "https://analytics.ahrefs.com",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				type: "image/webp",
				href: "/logos/logo192.webp",
			},
			{
				rel: "preload",
				as: "font",
				type: "font/woff2",
				href: "/fonts/Nunito/Nunito-VariableFont_wght.woff2",
				crossOrigin: "anonymous",
			},
			{
				rel: "preload",
				as: "font",
				type: "font/woff2",
				href: "/fonts/Baloo_2/Baloo2-VariableFont_wght.woff2",
				crossOrigin: "anonymous",
			},
			{
				rel: "preload",
				as: "font",
				type: "font/woff2",
				href: "/fonts/Caveat/Caveat-VariableFont_wght.woff2",
				crossOrigin: "anonymous",
			},
			{
				rel: "canonical",
				href: `${SITE_URL}/`,
			},
		],
		scripts: [
			{
				src: "https://analytics.ahrefs.com/analytics.js",
				async: true,
				"data-key": "lI2sfaqZ/EGYIIBK8/m9xg",
			},
			{
				type: "application/ld+json",
				children: JSON.stringify(bakeryJsonLd),
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es" className="bg-blush-canvas">
			<head>
				<HeadContent />
				<noscript>
					<style>
						{"[data-reveal]{opacity:1!important;transform:none!important}"}
					</style>
				</noscript>
			</head>
			<body className="antialiased">
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
