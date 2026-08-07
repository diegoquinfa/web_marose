import { ShoppingBag } from "lucide-react";
import { ScrollArea } from "#/components/ui/scroll-area.tsx";
import { formatCOP } from "#/lib/format.ts";
import {
	type CartLine,
	selectGrandTotal,
	selectIsEmpty,
	useCartStore,
} from "#/stores/cart-store.ts";
import { CartLineItem } from "./cart-line-item.tsx";

export function CartView({ onGoToDetails }: { onGoToDetails: () => void }) {
	const lines = useCartStore((s) => s.lines);
	const grandTotal = useCartStore(selectGrandTotal);
	const isEmpty = useCartStore(selectIsEmpty);

	return (
		<div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
			{isEmpty ? (
				<div className="flex flex-col items-center gap-3 py-12 text-center">
					<ShoppingBag className="h-12 w-12 text-rose-mist/40" />
					<p className="font-patisserie-sans text-[17px] font-semibold text-blush-cream">
						Tu carrito está vacío
					</p>
					<p className="text-[15px] text-rose-mist">
						Agregá algo rico del menú para empezar
					</p>
				</div>
			) : (
				<>
					<ScrollArea className="min-h-0 flex-1" showOverflowIndicator>
						<div className="flex flex-col gap-3 pr-3">
							{lines.map((line: CartLine) => (
								<CartLineItem key={line.id} line={line} />
							))}
						</div>
					</ScrollArea>

					<div className="flex items-center justify-between border-t border-cocoa-hairline pt-3">
						<span className="font-patisserie-sans text-[17px] font-semibold text-blush-cream">
							Total
						</span>
						<span className="font-velvet-serif text-xl italic font-semibold text-rose-petal">
							{formatCOP(grandTotal)} + Domicilio
						</span>
					</div>
				</>
			)}

			<button
				type="button"
				disabled={isEmpty}
				onClick={onGoToDetails}
				className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-rose-petal px-6 py-3.5 text-[17px] font-semibold text-cocoa-noir shadow-bloom transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-glow hover:shadow-lift disabled:pointer-events-none disabled:opacity-50"
			>
				Pedir por WhatsApp
			</button>
		</div>
	);
}
