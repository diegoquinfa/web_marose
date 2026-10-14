import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query.ts";
import { CartView } from "@/islands/cart/cart-view.tsx";
import {
	type DetailsFormData,
	DetailsView,
} from "@/islands/cart/details-view.tsx";
import {
	useCartStore,
	useCartStoreHydration,
} from "@/islands/stores/cart-store.ts";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/islands/ui/drawer.tsx";
import type { OrderConfig } from "@/lib/types";
import {
	buildOrderMessage,
	openOrderInWhatsapp,
} from "@/lib/whatsapp-order.ts";

const INITIAL_FORM: DetailsFormData = {
	nombre: "",
	cuando: "",
	notas: "",
};

export function CartDrawer({ order }: { order: OrderConfig }) {
	useCartStoreHydration();

	const isDesktop = useMediaQuery("(min-width: 640px)");
	const isOpen = useCartStore((s) => s.isOpen);
	const lines = useCartStore((s) => s.lines);
	const openDrawer = useCartStore((s) => s.openDrawer);
	const closeDrawer = useCartStore((s) => s.closeDrawer);
	const clearCart = useCartStore((s) => s.clearCart);

	const [view, setView] = useState<"cart" | "details">("cart");
	const [form, setForm] = useState<DetailsFormData>({ ...INITIAL_FORM });

	const handleFieldChange = (field: keyof DetailsFormData, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleGoToDetails = () => {
		setView("details");
	};

	const handleBack = () => {
		setView("cart");
	};

	const handleSubmitOrder = () => {
		const message = buildOrderMessage(lines, form, order.greeting);
		openOrderInWhatsapp(message, order.whatsappNumber);
		clearCart();
		setForm({ ...INITIAL_FORM });
		setView("cart");
		closeDrawer();
	};

	const handleOpenChange = (nextOpen: boolean) => {
		if (nextOpen) {
			openDrawer();
		} else {
			closeDrawer();
		}
	};

	return (
		<Drawer
			open={isOpen}
			onOpenChange={handleOpenChange}
			swipeDirection={isDesktop ? "right" : "down"}
		>
			<DrawerContent className="bg-espresso-truffle text-blush-cream">
				<DrawerHeader>
					<DrawerTitle className="font-wordmark-sans text-[24px] font-semibold text-blush-cream">
						Tu pedido
					</DrawerTitle>
				</DrawerHeader>

				{view === "cart" ? (
					<CartView onGoToDetails={handleGoToDetails} />
				) : (
					<DetailsView
						formData={form}
						onFieldChange={handleFieldChange}
						onBack={handleBack}
						onSubmit={handleSubmitOrder}
					/>
				)}
			</DrawerContent>
		</Drawer>
	);
}
