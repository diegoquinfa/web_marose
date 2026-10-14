import type { FlavorColorName } from "@/lib/types";

/**
 * Brand hex values for the `products.flavors[].color` select (DESIGN.md).
 * `Neutro` intentionally maps to `null`: no dot is rendered on the pill.
 */
const FLAVOR_COLORS: Record<FlavorColorName, string | null> = {
	Limón: "#a7c94a",
	Maracuyá: "#f0b429",
	Nutella: "#6b4226",
	Arequipe: "#d98a3d",
	Chocolate: "#4a2c1d",
	Fresa: "#e8798a",
	Canela: "#b5733f",
	Neutro: null,
};

/**
 * Maps a flavor color name to its brand hex. Returns `null` when the editor
 * chose no color (`Neutro`) or the stored value is unknown.
 */
export function flavorColor(name: string | null | undefined): string | null {
	if (!name) return null;
	return FLAVOR_COLORS[name as FlavorColorName] ?? null;
}
