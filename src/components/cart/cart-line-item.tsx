import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCOP } from "#/lib/format.ts";
import { useCartStore, type CartLine } from "#/stores/cart-store.ts";

export function CartLineItem({ line }: { line: CartLine }) {
	const incrementLine = useCartStore((s) => s.incrementLine);
	const decrementLine = useCartStore((s) => s.decrementLine);
	const removeLine = useCartStore((s) => s.removeLine);

	const subtotal = line.unitPrice * line.qty;

	return (
		<div className="flex gap-3 rounded-card bg-cream-card p-3">
			{/* Thumb */}
			<img
				src={line.imageSrc}
				alt={line.productName}
				className="h-16 w-16 shrink-0 rounded-image object-cover"
			/>

			{/* Info + controls */}
			<div className="flex min-w-0 flex-1 flex-col gap-1.5">
				<div className="flex items-start justify-between gap-2">
					<h4 className="font-fondant-display text-[17px] font-semibold leading-tight text-cocoa-ink">
						{line.productName}
					</h4>
					<button
						type="button"
						onClick={() => removeLine(line.id)}
						aria-label={`Eliminar ${line.productName}`}
						className="shrink-0 rounded-pill p-1 text-cocoa-ink/50 transition-colors hover:bg-sticker-blush hover:text-cocoa-ink"
					>
						<Trash2 className="h-4 w-4" />
					</button>
				</div>

				{line.flavorLabel && (
					<span className="inline-flex w-fit items-center rounded-pill bg-sticker-blush px-2.5 py-0.5 text-label font-semibold text-cocoa-ink">
						{line.flavorLabel}
					</span>
				)}

				<div className="mt-auto flex items-center justify-between">
					{/* Qty controls */}
					<div className="inline-flex items-center gap-1 rounded-pill bg-sticker-blush px-1 py-0.5">
						<button
							type="button"
							onClick={() => decrementLine(line.id)}
							aria-label="Reducir cantidad"
							className="rounded-pill p-1 text-cocoa-ink transition-colors hover:bg-cocoa-ink/10"
						>
							<Minus className="h-3.5 w-3.5" />
						</button>
						<span className="min-w-[1.5rem] text-center text-[15px] font-semibold text-cocoa-ink">
							{line.qty}
						</span>
						<button
							type="button"
							onClick={() => incrementLine(line.id)}
							aria-label="Aumentar cantidad"
							className="rounded-pill p-1 text-cocoa-ink transition-colors hover:bg-cocoa-ink/10"
						>
							<Plus className="h-3.5 w-3.5" />
						</button>
					</div>

					{/* Subtotal */}
					<span className="font-sugar-sans text-[15px] font-bold text-caramel-swirl">
						{formatCOP(subtotal)}
					</span>
				</div>
			</div>
		</div>
	);
}
