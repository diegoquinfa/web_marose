import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils.ts";

function ScrollArea({
	className,
	children,
	showOverflowIndicator = false,
	...props
}: ScrollAreaPrimitive.Root.Props & {
	showOverflowIndicator?: boolean;
}) {
	return (
		<ScrollAreaPrimitive.Root
			data-slot="scroll-area"
			className={cn("group/scroll-area relative flex flex-col", className)}
			{...props}
		>
			{/* Sized with flex instead of `size-full`: percentage heights don't
			    resolve inside an auto-height + max-height ancestor (the mobile
			    drawer), which silently disables viewport clipping. */}
			<ScrollAreaPrimitive.Viewport
				data-slot="scroll-area-viewport"
				className="min-h-0 w-full flex-1 overscroll-contain rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-rose-petal/50 focus-visible:outline-1"
			>
				{children}
			</ScrollAreaPrimitive.Viewport>
			<ScrollBar />
			<ScrollAreaPrimitive.Corner />
			{showOverflowIndicator && (
				<div
					data-slot="scroll-area-overflow-indicator"
					aria-hidden="true"
					className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-center opacity-0 transition-opacity duration-300 group-data-overflow-y-end/scroll-area:opacity-100"
				>
					<span className="motion-safe:animate-nudge flex h-6 w-6 items-center justify-center rounded-full bg-deep-cocoa/90 text-blush-cream shadow-soft ring-1 ring-cocoa-hairline">
						<ChevronDown className="h-4 w-4" />
					</span>
				</div>
			)}
		</ScrollAreaPrimitive.Root>
	);
}

function ScrollBar({
	className,
	orientation = "vertical",
	...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
	return (
		<ScrollAreaPrimitive.Scrollbar
			data-slot="scroll-area-scrollbar"
			data-orientation={orientation}
			orientation={orientation}
			className={cn(
				"flex touch-none p-px opacity-40 transition-opacity duration-200 select-none data-hovering:opacity-100 data-scrolling:opacity-100 data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent",
				className,
			)}
			{...props}
		>
			<ScrollAreaPrimitive.Thumb
				data-slot="scroll-area-thumb"
				className="relative flex-1 rounded-full bg-rose-mist/50"
			/>
		</ScrollAreaPrimitive.Scrollbar>
	);
}

export { ScrollArea, ScrollBar };
