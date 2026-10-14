import type { CartLine } from "@/islands/stores/cart-store.ts";
import { formatCOP } from "@/lib/format.ts";

export type OrderFormFields = {
	nombre: string;
	cuando: string;
	notas: string;
};

function buildLineText(line: CartLine): string {
	const flavorSuffix = line.flavorLabel ? ` (${line.flavorLabel})` : "";
	const subtotal = line.unitPrice * line.qty;
	return `• ${line.productName}${flavorSuffix} ×${line.qty} — ${formatCOP(subtotal)}`;
}

/**
 * Pure builder for the WhatsApp order message. Never touches the DOM or
 * network — safe to call from anywhere (components, tests, etc).
 */
export function buildOrderMessage(
	lines: CartLine[],
	details: OrderFormFields,
	greeting: string,
): string {
	const grandTotal = lines.reduce(
		(sum, line) => sum + line.unitPrice * line.qty,
		0,
	);

	const messageLines = [
		greeting,
		"Quiero hacer este pedido:",
		"",
		...lines.map(buildLineText),
		"",
		`Total: ${formatCOP(grandTotal)}`,
		`Nombre: ${details.nombre}`,
		`Para cuándo: ${details.cuando}`,
	];

	if (details.notas.trim().length > 0) {
		messageLines.push(`Notas: ${details.notas}`);
	}

	return messageLines.join("\n");
}

/** Builds the wa.me handoff URL for a given message and destination number. */
export function buildOrderUrl(message: string, whatsappNumber: string): string {
	return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Opens the WhatsApp order handoff in a new tab. */
export function openOrderInWhatsapp(
	message: string,
	whatsappNumber: string,
): void {
	window.open(
		buildOrderUrl(message, whatsappNumber),
		"_blank",
		"noopener,noreferrer",
	);
}
