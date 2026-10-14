import { getEmDashCollection } from "emdash";

export type BusinessInfo = {
	whatsappNumber: string;
	whatsappDefaultMessage: string;
	greeting: string;
	phoneDisplay: string;
	city: string;
	region: string;
	country: string;
	deliveryNote: string;
	instagramUrl: string;
	tiktokUrl: string;
	footerTagline: string;
	footerLegal: string;
	priceRange: string;
	cuisine: string;
};

// Fallbacks keep the site usable (and ordering possible) if the editor
// clears a field or the entry is missing.
const DEFAULTS: BusinessInfo = {
	whatsappNumber: "573014023272",
	whatsappDefaultMessage: "Hola Marose, quiero hacer un pedido",
	greeting: "Hola Marose 🤎",
	phoneDisplay: "+57 301 402 3272",
	city: "Cartagena de Indias",
	region: "Bolívar",
	country: "CO",
	deliveryNote: "El valor del domicilio varía según la zona de entrega.",
	instagramUrl: "https://instagram.com/marosectg",
	tiktokUrl: "https://www.tiktok.com/@marosepostres",
	footerTagline: "Hecho con amor · Cartagena",
	footerLegal: "Repostería artesanal",
	priceRange: "$$",
	cuisine: "Postres artesanales",
};

function text(value: unknown, fallback: string): string {
	return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

/**
 * Reads the single "Información del negocio" entry. The oldest published
 * entry wins, so an accidental duplicate never replaces the real one.
 * Repeated calls in one render are served by EmDash's object cache.
 */
export async function getBusinessInfo(): Promise<BusinessInfo> {
	const { entries } = await getEmDashCollection("business_info", {
		limit: 1,
		orderBy: { created_at: "asc" },
	});
	const data = (entries[0]?.data ?? {}) as unknown as Record<string, unknown>;
	const digits = text(data.whatsapp_number, DEFAULTS.whatsappNumber).replace(
		/\D/g,
		"",
	);

	return {
		whatsappNumber: digits || DEFAULTS.whatsappNumber,
		whatsappDefaultMessage: text(
			data.whatsapp_default_message,
			DEFAULTS.whatsappDefaultMessage,
		),
		greeting: text(data.order_greeting, DEFAULTS.greeting),
		phoneDisplay: text(data.phone_display, DEFAULTS.phoneDisplay),
		city: text(data.city, DEFAULTS.city),
		region: text(data.region, DEFAULTS.region),
		country: text(data.country, DEFAULTS.country),
		deliveryNote: text(data.delivery_note, DEFAULTS.deliveryNote),
		instagramUrl: text(data.instagram_url, DEFAULTS.instagramUrl),
		tiktokUrl: text(data.tiktok_url, DEFAULTS.tiktokUrl),
		footerTagline: text(data.footer_tagline, DEFAULTS.footerTagline),
		footerLegal: text(data.footer_legal, DEFAULTS.footerLegal),
		priceRange: text(data.price_range, DEFAULTS.priceRange),
		cuisine: text(data.cuisine, DEFAULTS.cuisine),
	};
}

export function whatsappUrl(number: string, message: string): string {
	return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
