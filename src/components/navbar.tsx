import { CartTrigger } from "#/components/cart/cart-trigger.tsx";
import { WhatsappButton } from "#/components/whatsapp-button.tsx";

const LINKS = [
	{ href: "#menu", label: "Menú" },
	{ href: "#nosotros", label: "Nosotros" },
	{ href: "#contacto", label: "Contacto" },
];

export function Navbar() {
	return (
		<header className="sticky top-4 z-50 px-4">
			<nav className="mx-auto flex max-w-280 items-center justify-between gap-4 rounded-pill bg-deep-cocoa/80 px-4 py-3 shadow-soft backdrop-blur-md sm:px-6">
				<a href="#top" className="flex items-center gap-3">
					<img
						src="/logos/logo-2.webp"
						alt="Marose"
						className="h-11 w-11 rounded-full object-cover"
					/>
					<span className="font-wordmark-sans text-2xl font-semibold text-blush-cream">
						Marose
					</span>
				</a>

				<ul className="hidden items-center gap-8 md:flex">
					{LINKS.map((link) => (
						<li key={link.href}>
							<a
								href={link.href}
								className="font-patisserie-sans text-[15px] font-medium text-blush-cream/80 transition-colors hover:text-blush-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-petal"
							>
								{link.label}
							</a>
						</li>
					))}
				</ul>

				<div className="flex items-center gap-2">
					<CartTrigger />
					<WhatsappButton
						message="Hola Marose, quiero hacer un pedido"
						className="hidden sm:inline-flex"
					/>
				</div>
			</nav>
		</header>
	);
}
