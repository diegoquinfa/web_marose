import { createFileRoute } from "@tanstack/react-router";
import { About } from "#/components/about";
import { CartDrawer } from "#/components/cart/cart-drawer.tsx";
import { Footer } from "#/components/footer";
import { Hero } from "#/components/hero";
import { HowToOrder } from "#/components/how-to-order";
import { Menu } from "#/components/menu";
import { Navbar } from "#/components/navbar";
import { ReviewsSection } from "#/components/reviews-section";

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
	logo: `${SITE_URL}/logos/logo-2.webp`,
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

export const Route = createFileRoute("/")({
	head: () => ({
		links: [{ rel: "canonical", href: `${SITE_URL}/` }],
		meta: socialMeta,
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify(bakeryJsonLd),
			},
		],
	}),
	component: Home,
});

function Home() {
	return (
		<main className="min-h-screen bg-cocoa-noir">
			<Navbar />
			<Hero />
			<Menu />
			<ReviewsSection />
			<HowToOrder />
			<About />
			<Footer />
			<CartDrawer />
		</main>
	);
}
