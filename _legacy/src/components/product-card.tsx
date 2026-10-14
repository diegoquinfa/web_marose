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
	"inline-flex items-center gap-2 rounded-pill border px-3.5 py-1.5 font-patisserie-sans text-[13px] font-medium uppercase tracking-[0.14em]";

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
		? "border-rose-petal text-rose-petal"
		: "border-cocoa-hairline text-rose-mist";

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
			className={`${FLAVOR_PILL_BASE_CLASSES} ${toneClasses} cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-petal`}
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

	const actionBlock = (
		<div className="mt-5 flex items-center justify-between gap-3">
			<span className="font-velvet-serif text-[21px] italic text-rose-petal">
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
							<span className="font-patisserie-sans text-[13px] font-medium text-rose-mist">
								{line.flavorLabel ?? ""}
							</span>
							<button
								type="button"
								onClick={() => decrementLine(line.id)}
								className="ml-1 flex h-7 w-7 items-center justify-center rounded-pill border border-cocoa-hairline text-blush-cream text-sm font-bold transition-all duration-200 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-petal"
								aria-label="Disminuir cantidad"
							>
								−
							</button>
							<span className="w-5 text-center font-patisserie-sans text-[14px] font-semibold text-blush-cream">
								{line.qty}
							</span>
							<button
								type="button"
								onClick={() => incrementLine(line.id)}
								className="flex h-7 w-7 items-center justify-center rounded-pill border border-cocoa-hairline text-blush-cream text-sm font-bold transition-all duration-200 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-petal"
								aria-label="Aumentar cantidad"
							>
								+
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={handleOpenFlavorDialog}
						className="inline-flex items-center gap-1 font-patisserie-sans text-[14px] font-semibold text-rose-petal transition-all duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-petal"
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
					className="rounded-pill bg-rose-petal px-5 py-2.5 text-[15px] font-semibold text-cocoa-noir shadow-bloom transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-glow hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-glow"
				>
					Elegir sabor
				</button>
			) : singleInCart ? (
				/* Non-selectable, in cart → single stepper */
				<div className="flex items-center gap-1">
					<button
						type="button"
						onClick={() => decrementLine(singleLineId)}
						className="flex h-9 w-9 items-center justify-center rounded-pill border border-cocoa-hairline text-blush-cream text-lg font-bold transition-all duration-200 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-petal"
						aria-label="Disminuir cantidad"
					>
						−
					</button>
					<span className="w-6 text-center font-patisserie-sans text-[17px] font-semibold text-blush-cream">
						{singleQty}
					</span>
					<button
						type="button"
						onClick={() => incrementLine(singleLineId)}
						className="flex h-9 w-9 items-center justify-center rounded-pill border border-cocoa-hairline text-blush-cream text-lg font-bold transition-all duration-200 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-petal"
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
					className="rounded-pill bg-rose-petal px-5 py-2.5 text-[15px] font-semibold text-cocoa-noir shadow-bloom transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-glow hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-glow"
				>
					Agregar al carrito
				</button>
			)}
		</div>
	);

	return (
		<article className="group flex h-full min-h-90 flex-col overflow-hidden rounded-card bg-espresso-truffle p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift sm:p-6">
			<div className="relative overflow-hidden rounded-image ring-1 ring-cocoa-hairline">
				<ProductImageCarousel
					ref={carouselRef}
					images={product.images}
					productName={product.name}
				/>
				{product.badge && (
					<span className="absolute left-3 top-3 rounded-pill bg-rose-petal px-3 py-1 text-label font-semibold uppercase tracking-[0.08em] text-cocoa-noir shadow-bloom">
						{product.badge}
					</span>
				)}
			</div>

			<h3 className="mt-5 font-wordmark-sans text-[24px] font-semibold leading-tight text-blush-cream text-balance">
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

			<p className="mt-3 flex-1 text-[15px] leading-relaxed text-rose-mist">
				{product.description}
			</p>

			{actionBlock}

			{/* Flavor selection dialog for selectFlavor products */}
			{isFlavorSelectable && product.flavors && product.flavors.length > 0 && (
				<Dialog open={flavorDialogOpen} onOpenChange={setFlavorDialogOpen}>
					<DialogContent className="gap-0 overflow-hidden rounded-card border-0 bg-deep-cocoa p-0 text-blush-cream shadow-lift sm:max-w-md">
						{/* Decorative top header */}
						<div className="relative bg-deep-cocoa px-6 pb-8 pt-8 text-center">
							<DialogHeader>
								<DialogTitle className="font-velvet-serif text-[28px] font-medium leading-tight text-blush-cream">
									Elegí tu sabor
								</DialogTitle>
							</DialogHeader>
							<p className="mt-1 font-dulce-script text-2xl text-rose-petal">
								¿Cuál te provoca hoy?
							</p>
						</div>

						{/* Flavor cards */}
						<div className="space-y-3 border-t border-cocoa-hairline bg-deep-cocoa p-5">
							{product.flavors.map((flavor) => (
								<button
									key={flavor.label}
									type="button"
									onClick={() => handleChooseFlavor(flavor)}
									className="group flex w-full items-center gap-4 rounded-card border border-cocoa-hairline bg-espresso-truffle p-3 text-left shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-petal"
								>
									{flavor.image && (
										<img
											src={flavor.image}
											alt={flavor.label}
											className="h-16 w-16 shrink-0 rounded-image object-cover ring-1 ring-cocoa-hairline"
										/>
									)}
									<div className="flex flex-1 items-center gap-2">
										{flavor.color && (
											<span
												className="h-2.5 w-2.5 shrink-0 rounded-full"
												style={{ backgroundColor: flavor.color }}
												aria-hidden="true"
											/>
										)}
										<span className="font-wordmark-sans text-[18px] font-semibold text-blush-cream">
											{flavor.label}
										</span>
									</div>
									<span className="rounded-pill bg-rose-petal px-4 py-2 text-[14px] font-semibold text-cocoa-noir transition-transform duration-200 group-hover:scale-[1.02]">
										Elegir
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
