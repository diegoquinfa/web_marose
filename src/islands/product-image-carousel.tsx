import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Ref, useImperativeHandle, useRef, useState } from "react";
import type { ProductPhoto } from "@/lib/types";

export type ProductImageCarouselHandle = {
	scrollToImage: (src: string) => void;
};

export function ProductImageCarousel({
	photos,
	productName,
	ref,
}: {
	photos: ProductPhoto[];
	productName: string;
	ref?: Ref<ProductImageCarouselHandle>;
}) {
	const trackRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const scrollToIndex = (index: number) => {
		const track = trackRef.current;
		if (!track) return;
		const clamped = Math.max(0, Math.min(index, photos.length - 1));
		track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
	};

	useImperativeHandle(ref, () => ({
		scrollToImage: (src: string) => {
			const index = photos.findIndex((photo) => photo.src === src);
			if (index !== -1) scrollToIndex(index);
		},
	}));

	if (photos.length === 1) {
		return (
			<img
				src={photos[0].src}
				alt={photos[0].alt}
				width={photos[0].width}
				height={photos[0].height}
				className="aspect-square w-full rounded-image object-cover"
			/>
		);
	}

	const handleScroll = () => {
		const track = trackRef.current;
		if (!track) return;
		setActiveIndex(Math.round(track.scrollLeft / track.clientWidth));
	};

	return (
		<section
			className="group/carousel relative overflow-hidden rounded-image"
			aria-roledescription="carrusel"
			aria-label={`Fotos de ${productName}`}
		>
			<div
				ref={trackRef}
				onScroll={handleScroll}
				className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-none motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
			>
				{photos.map((photo, index) => (
					<img
						key={photo.src}
						src={photo.src}
						alt={photo.alt}
						width={photo.width}
						height={photo.height}
						loading={index === 0 ? undefined : "lazy"}
						draggable={false}
						className="aspect-square w-full flex-none snap-center object-cover"
					/>
				))}
			</div>

			<button
				type="button"
				onClick={() => scrollToIndex(activeIndex - 1)}
				aria-label="Imagen anterior"
				disabled={activeIndex === 0}
				className="absolute left-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-pill bg-deep-cocoa/90 p-1.5 text-blush-cream opacity-0 shadow-soft backdrop-blur-sm transition-opacity duration-200 focus-visible:opacity-100 disabled:pointer-events-none group-hover/carousel:opacity-100 group-hover/carousel:disabled:opacity-40 sm:flex"
			>
				<ChevronLeft className="h-4 w-4" aria-hidden="true" />
			</button>
			<button
				type="button"
				onClick={() => scrollToIndex(activeIndex + 1)}
				aria-label="Imagen siguiente"
				disabled={activeIndex === photos.length - 1}
				className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-pill bg-deep-cocoa/90 p-1.5 text-blush-cream opacity-0 shadow-soft backdrop-blur-sm transition-opacity duration-200 focus-visible:opacity-100 disabled:pointer-events-none group-hover/carousel:opacity-100 group-hover/carousel:disabled:opacity-40 sm:flex"
			>
				<ChevronRight className="h-4 w-4" aria-hidden="true" />
			</button>

			<div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-pill bg-deep-cocoa/60 px-2 py-1.5 backdrop-blur-sm">
				{photos.map((photo, index) => (
					<button
						key={photo.src}
						type="button"
						onClick={() => scrollToIndex(index)}
						aria-label={`Ver imagen ${index + 1} de ${photos.length}`}
						aria-current={index === activeIndex}
						className={`h-1.5 rounded-pill transition-all duration-300 ${
							index === activeIndex
								? "w-4 bg-paper-white"
								: "w-1.5 bg-paper-white/60 hover:bg-paper-white/80"
						}`}
					/>
				))}
			</div>
		</section>
	);
}
