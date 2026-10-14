/**
 * Shared contract between Astro sections (server) and React islands (client).
 * Everything here is plain, serializable data: islands never receive EmDash
 * media objects, only resolved URLs.
 */

export type ProductPhoto = {
	src: string;
	alt: string;
	width?: number;
	height?: number;
};

export type ProductFlavor = {
	label: string;
	/** Resolved hex color, or null when the editor chose no color. */
	color: string | null;
	/** Resolved photo URL for this flavor, or null. */
	image: string | null;
};

export type ProductView = {
	id: string;
	name: string;
	description: string;
	/** COP integer, e.g. 15000. */
	price: number;
	photos: ProductPhoto[];
	badge: string | null;
	requiresFlavor: boolean;
	flavors: ProductFlavor[];
	/** True when badge is "Agotado": the card renders but cannot be added. */
	soldOut: boolean;
};

/** Business data the cart needs to build the WhatsApp order. */
export type OrderConfig = {
	/** Digits only with country code, e.g. "573014023272". */
	whatsappNumber: string;
	/** First line of the order message, e.g. "Hola Marose 🤎". */
	greeting: string;
};

/** Values of the `color` select in products.flavors (seed contract). */
export const FLAVOR_COLOR_OPTIONS = [
	"Limón",
	"Maracuyá",
	"Nutella",
	"Arequipe",
	"Chocolate",
	"Fresa",
	"Canela",
	"Neutro",
] as const;
export type FlavorColorName = (typeof FLAVOR_COLOR_OPTIONS)[number];
