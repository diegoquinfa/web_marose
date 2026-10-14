import type { SVGProps } from "react";

export function SwooshUnderline(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 200 16" fill="none" aria-hidden="true" {...props}>
			<path
				d="M3 11c40-7 120-9 194-4"
				stroke="currentColor"
				strokeWidth="4"
				strokeLinecap="round"
			/>
		</svg>
	);
}
