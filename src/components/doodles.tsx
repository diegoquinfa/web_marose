import type { SVGProps } from "react";

export function HeartDoodle(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 32 30" fill="none" aria-hidden="true" {...props}>
			<path
				d="M16 27S2.5 18.7 2.5 9.9C2.5 5.3 6 2 10.2 2c2.6 0 4.7 1.4 5.8 3.4C17.1 3.4 19.2 2 21.8 2 26 2 29.5 5.3 29.5 9.9 29.5 18.7 16 27 16 27Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function SparkleDoodle(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 28 28" fill="none" aria-hidden="true" {...props}>
			<path
				d="M14 1.5c1.1 6.6 4.9 10.4 11.5 11.5C18.9 14.1 15.1 17.9 14 24.5 12.9 17.9 9.1 14.1 2.5 13 9.1 11.9 12.9 8.1 14 1.5Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function StarDoodle(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
			<path
				d="M16 2.5l3.7 8.5 9.3.8-7 6.1 2.1 9.1L16 22.3 7.9 27.1 10 18 3 11.8l9.3-.8L16 2.5Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

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
