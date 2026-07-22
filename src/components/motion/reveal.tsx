import type { ReactNode } from "react";
import {
	LazyMotion,
	type Variants,
	domAnimation,
	m,
	useReducedMotion,
} from "motion/react";

type RevealProps = {
	/** `"view"` (default) reveals once on scroll into viewport; `"load"` reveals on mount. */
	mode?: "view" | "load";
	/** Delay in seconds before the reveal (or, for `RevealGroup`, before its stagger) starts. */
	delay?: number;
	className?: string;
	children: ReactNode;
};

type RevealItemProps = {
	className?: string;
	children: ReactNode;
};

const VIEWPORT = {
	once: true,
	amount: 0.2,
	margin: "0px 0px -60px 0px",
} as const;

/**
 * Groups can grow far taller than the viewport (e.g. the single-column
 * product grid on mobile), so a percentage-based `amount` could require more
 * visible pixels than the screen can ever show — and the reveal would never
 * fire. Groups trigger as soon as any part of them enters instead.
 */
const GROUP_VIEWPORT = {
	once: true,
	amount: 0,
	margin: "0px 0px -60px 0px",
} as const;

const fadeRise: Variants = {
	hidden: { opacity: 0, y: 16 },
	visible: { opacity: 1, y: 0 },
};

const group: Variants = {
	hidden: {},
	visible: (custom: { delay: number; reduce: boolean }) => ({
		transition: custom.reduce
			? { staggerChildren: 0, delayChildren: 0 }
			: { staggerChildren: 0.09, delayChildren: custom.delay },
	}),
};

function useRevealTransition(delay: number) {
	const reduce = useReducedMotion();
	return reduce
		? { duration: 0 }
		: { duration: 0.5, ease: "easeOut" as const, delay };
}

function useRevealTrigger(
	mode: "view" | "load",
	viewport: typeof VIEWPORT | typeof GROUP_VIEWPORT = VIEWPORT,
) {
	return mode === "view"
		? { whileInView: "visible" as const, viewport }
		: { animate: "visible" as const };
}

/**
 * Single-block reveal: soft fade + 16px rise. Reveals once on scroll into
 * viewport (default `mode="view"`) or on mount (`mode="load"`, used by
 * above-the-fold content like the hero image). Respects
 * `prefers-reduced-motion` by snapping the transition to instant.
 */
export function Reveal({
	mode = "view",
	delay = 0,
	className,
	children,
}: RevealProps) {
	const transition = useRevealTransition(delay);
	const trigger = useRevealTrigger(mode);

	return <>{children}</>;

	return (
		<LazyMotion features={domAnimation} strict>
			<m.div
				data-reveal
				className={className}
				variants={fadeRise}
				initial="hidden"
				transition={transition}
				{...trigger}
			>
				{children}
			</m.div>
		</LazyMotion>
	);
}

/**
 * Stagger container for `RevealItem` children. Orchestrates a subtle
 * `staggerChildren` delay between siblings; the container itself follows the
 * same view/load trigger rules as `Reveal`.
 */
export function RevealGroup({
	mode = "view",
	delay = 0,
	className,
	children,
}: RevealProps) {
	const reduce = useReducedMotion();
	const trigger = useRevealTrigger(mode, GROUP_VIEWPORT);

	return <>{children}</>;

	return (
		<LazyMotion features={domAnimation} strict>
			<m.div
				data-reveal
				className={className}
				variants={group}
				custom={{ delay, reduce: Boolean(reduce) }}
				initial="hidden"
				{...trigger}
			>
				{children}
			</m.div>
		</LazyMotion>
	);
}

/**
 * Stagger child of `RevealGroup`. Has no trigger of its own — it inherits
 * `initial`/`animate`/`whileInView` state from the enclosing group and only
 * contributes its own fade + rise transition.
 */
export function RevealItem({ className, children }: RevealItemProps) {
	const transition = useRevealTransition(0);

	return <>{children}</>;

	return (
		<m.div
			data-reveal
			className={className}
			variants={fadeRise}
			transition={transition}
		>
			{children}
		</m.div>
	);
}
