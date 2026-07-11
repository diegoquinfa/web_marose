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
			className={`shrink-0 w-72 rounded-card bg-cream-card p-5 shadow-soft select-none ${rotation}`}
			draggable={false}
		>
			<time className="block font-handwritten-sugar text-lg text-caramel-swirl">
				{review.timestamp}
			</time>
			<p className="mt-2 text-pretty font-sugar-sans text-[15px] leading-relaxed text-cocoa-ink/80">
				{review.comment}
			</p>
		</article>
	);
}
