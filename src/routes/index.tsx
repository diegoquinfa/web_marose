import { createFileRoute } from "@tanstack/react-router";
import { About } from "#/components/about";
import { CartDrawer } from "#/components/cart/cart-drawer.tsx";
import { Footer } from "#/components/footer";
import { Hero } from "#/components/hero";
import { HowToOrder } from "#/components/how-to-order";
import { Menu } from "#/components/menu";
import { Navbar } from "#/components/navbar";
import { ReviewsSection } from "#/components/reviews-section";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<main className="min-h-screen bg-blush-canvas">
			<Navbar />
			<Hero />
			<Menu />
			<ReviewsSection />
			<HowToOrder />
			<About />
			<Footer />
			<CartDrawer />
		</main>
	);
}
