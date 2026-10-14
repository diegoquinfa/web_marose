export type Review = {
	id: string;
	timestamp: string;
	comment: string;
};

export type ReviewCardProps = {
	review: Review;
	index: number;
};

export function ReviewCard({ review, index }: ReviewCardProps) {
	const rotation = index % 2 === 0 ? "-rotate-1" : "rotate-1";

	return (
		<article
			className={`shrink-0 w-80 rounded-card bg-rose-noir p-6 shadow-soft select-none ${rotation}`}
			draggable={false}
		>
			<time className="block font-patisserie-sans text-label font-medium uppercase text-rose-mist">
				{review.timestamp}
			</time>
			<p className="mt-2 line-clamp-3 text-pretty font-patisserie-sans text-body-sm leading-relaxed text-blush-cream">
				{review.comment}
			</p>
		</article>
	);
}
