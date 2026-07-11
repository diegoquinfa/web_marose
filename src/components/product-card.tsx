import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog.tsx";
import { formatCOP } from "#/lib/format.ts";
import { useCartStore } from "#/stores/cart-store.ts";
import {
	type ProductImage,
	ProductImageCarousel,
	type ProductImageCarouselHandle,
} from "./product-image-carousel";

type Flavor = {
	label: string;
	color?: string;
	image?: string;
};

export type Product = {
	name: string;
	images: ProductImage[];
	description: string;
	price: number;
	flavors?: Flavor[];
	badge?: string;
	selectFlavor?: boolean;
};

const FLAVOR_PILL_BASE_CLASSES =
	"inline-flex items-center gap-2 rounded-pill px-3.5 py-1.5 text-[13px] font-semibold";

function FlavorPill({
	flavor,
	onClick,
	selected,
	ariaLabel,
}: {
	flavor: Flavor;
	onClick?: () => void;
	selected?: boolean;
	ariaLabel?: string;
}) {
	const content = (
		<>
			{flavor.color && (
				<span
					className="h-2 w-2 rounded-full"
					style={{ backgroundColor: flavor.color }}
					aria-hidden="true"
				/>
			)}
			{flavor.label}
		</>
	);

	const toneClasses = selected
		? "bg-cocoa-ink text-paper-white"
		: "bg-sticker-blush text-cocoa-ink";

	if (!onClick) {
		return (
			<span className={`${FLAVOR_PILL_BASE_CLASSES} ${toneClasses}`}>
				{content}
			</span>
		);
	}

	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={selected}
			aria-label={ariaLabel ?? `Ver foto de ${flavor.label}`}
			className={`${FLAVOR_PILL_BASE_CLASSES} ${toneClasses} cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft`}
		>
			{content}
		</button>
	);
}

export function ProductCard({ product }: { product: Product }) {
	const carouselRef = useRef<ProductImageCarouselHandle>(null);
	const addLine = useCartStore((s) => s.addLine);
	const incrementLine = useCartStore((s) => s.incrementLine);
	const decrementLine = useCartStore((s) => s.decrementLine);

	const isFlavorSelectable = product.selectFlavor === true;
	const [selectedFlavor, setSelectedFlavor] = useState<Flavor | undefined>(
		undefined,
	);
	const [flavorDialogOpen, setFlavorDialogOpen] = useState(false);

	// Product-level cart lookup: ALL lines matching this product
	const productLines = useCartStore(
		useShallow((s) => s.lines.filter((l) => l.productName === product.name)),
	);

	// For non-selectable products: single-line lookup
	const singleLineId = `${product.name}::`;
	const singleQty = productLines.find((l) => l.flavorLabel === null)?.qty ?? 0;
	const singleInCart = singleQty > 0;

	// Called from the flavor dialog — adds to cart and closes dialog
	const handleChooseFlavor = (flavor: Flavor) => {
		setSelectedFlavor(flavor);
		if (flavor.image) carouselRef.current?.scrollToImage(flavor.image);
		addLine({
			productName: product.name,
			flavorLabel: flavor.label,
			unitPrice: product.price,
			imageSrc: flavor.image ?? product.images[0].src,
		});
		setFlavorDialogOpen(false);
	};

	const handleAddToCart = () => {
		addLine({
			productName: product.name,
			flavorLabel: isFlavorSelectable ? (selectedFlavor?.label ?? null) : null,
			unitPrice: product.price,
			imageSrc:
				(isFlavorSelectable ? selectedFlavor?.image : undefined) ??
				product.images[0].src,
		});
	};

	const handleOpenFlavorDialog = () => {
		setFlavorDialogOpen(true);
	};

	return (
		<article className="group flex flex-col overflow-hidden rounded-card bg-cream-card p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift sm:p-6">
			<div className="relative overflow-hidden rounded-image">
				<ProductImageCarousel
					ref={carouselRef}
					images={product.images}
					productName={product.name}
				/>
				{product.badge && (
					<span className="absolute left-3 top-3 rounded-pill bg-bubblegum-pop px-3 py-1 text-label font-semibold uppercase tracking-[0.08em] text-paper-white shadow-pop">
						{product.badge}
					</span>
				)}
			</div>

			<h3 className="mt-5 font-fondant-display text-[26px] font-semibold leading-tight text-cocoa-ink">
				{product.name}
			</h3>

			{product.flavors && product.flavors.length > 0 && (
				<div className="mt-3 flex flex-wrap gap-2">
					{product.flavors.map((flavor) => {
						const flavorImage = flavor.image;
						return (
							<FlavorPill
								key={flavor.label}
								flavor={flavor}
								ariaLabel={`Ver foto de ${flavor.label}`}
								onClick={
									flavorImage
										? () => carouselRef.current?.scrollToImage(flavorImage)
										: undefined
								}
							/>
						);
					})}
				</div>
			)}

			<p className="mt-3 flex-1 text-[15px] leading-relaxed text-cocoa-ink/75">
				{product.description}
			</p>

			<div className="mt-5 flex items-center justify-between gap-3">
				<span className="font-sugar-sans text-xl font-bold text-caramel-swirl">
					{formatCOP(product.price)}
				</span>

				{isFlavorSelectable && productLines.length > 0 ? (
					/* Multi-flavor: stacked mini-steppers + "Elegir otro sabor" */
					<div className="flex flex-col items-end gap-2">
						{productLines.map((line) => (
							<div key={line.id} className="flex items-center gap-1">
								{(() => {
									const flavor = product.flavors?.find(
										(f) => f.label === line.flavorLabel,
									);
									return flavor?.color ? (
										<span
											className="h-2 w-2 shrink-0 rounded-full"
											style={{ backgroundColor: flavor.color }}
											aria-hidden="true"
										/>
									) : null;
								})()}
								<span className="font-sugar-sans text-[13px] font-semibold text-cocoa-ink">
									{line.flavorLabel ?? ""}
								</span>
								<button
									type="button"
									onClick={() => decrementLine(line.id)}
									className="ml-1 flex h-7 w-7 items-center justify-center rounded-pill bg-sticker-blush text-cocoa-ink text-sm font-bold transition-all duration-200 hover:shadow-soft"
									aria-label="Disminuir cantidad"
								>
									−
								</button>
								<span className="w-5 text-center font-sugar-sans text-[14px] font-bold text-cocoa-ink">
									{line.qty}
								</span>
								<button
									type="button"
									onClick={() => incrementLine(line.id)}
									className="flex h-7 w-7 items-center justify-center rounded-pill bg-sticker-blush text-cocoa-ink text-sm font-bold transition-all duration-200 hover:shadow-soft"
									aria-label="Aumentar cantidad"
								>
									+
								</button>
							</div>
						))}
						<button
							type="button"
							onClick={handleOpenFlavorDialog}
							className="inline-flex items-center gap-1 font-sugar-sans text-[14px] font-semibold text-caramel-swirl transition-all duration-200 hover:underline"
						>
							<Plus size={14} />
							Elegir otro sabor
						</button>
					</div>
				) : isFlavorSelectable ? (
					/* Selectable but no lines in cart → "Elegir sabor" button */
					<button
						type="button"
						onClick={handleOpenFlavorDialog}
						className="rounded-pill bg-cocoa-ink px-5 py-2.5 text-[15px] font-semibold text-paper-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
					>
						Elegir sabor
					</button>
				) : singleInCart ? (
					/* Non-selectable, in cart → single stepper */
					<div className="flex items-center gap-1">
						<button
							type="button"
							onClick={() => decrementLine(singleLineId)}
							className="flex h-9 w-9 items-center justify-center rounded-pill bg-sticker-blush text-cocoa-ink text-lg font-bold transition-all duration-200 hover:shadow-soft"
							aria-label="Disminuir cantidad"
						>
							−
						</button>
						<span className="w-6 text-center font-sugar-sans text-[17px] font-bold text-cocoa-ink">
							{singleQty}
						</span>
						<button
							type="button"
							onClick={() => incrementLine(singleLineId)}
							className="flex h-9 w-9 items-center justify-center rounded-pill bg-sticker-blush text-cocoa-ink text-lg font-bold transition-all duration-200 hover:shadow-soft"
							aria-label="Aumentar cantidad"
						>
							+
						</button>
					</div>
				) : (
					/* Non-selectable, not in cart → "Agregar al carrito" button */
					<button
						type="button"
						onClick={handleAddToCart}
						className="rounded-pill bg-cocoa-ink px-5 py-2.5 text-[15px] font-semibold text-paper-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
					>
						Agregar al carrito
					</button>
				)}
			</div>

			{/* Flavor selection dialog for selectFlavor products */}
			{isFlavorSelectable && product.flavors && product.flavors.length > 0 && (
				<Dialog open={flavorDialogOpen} onOpenChange={setFlavorDialogOpen}>
					<DialogContent className="bg-cream-card text-cocoa-ink sm:max-w-md">
						<DialogHeader>
							<DialogTitle className="font-fondant-display text-xl text-cocoa-ink">
								Elegí tu sabor
							</DialogTitle>
						</DialogHeader>
						<div className="grid grid-cols-2 gap-3 py-2">
							{product.flavors.map((flavor) => (
								<button
									key={flavor.label}
									type="button"
									onClick={() => handleChooseFlavor(flavor)}
									className="group flex flex-col items-center gap-2 rounded-card bg-sticker-blush p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft"
								>
									{flavor.image && (
										<img
											src={flavor.image}
											alt={flavor.label}
											className="h-20 w-20 rounded-image object-cover"
										/>
									)}
									<span className="text-center text-[15px] font-semibold text-cocoa-ink">
										{flavor.label}
									</span>
								</button>
							))}
						</div>
					</DialogContent>
				</Dialog>
			)}
		</article>
	);
}
