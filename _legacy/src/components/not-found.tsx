import { Link } from "@tanstack/react-router";

import { WhatsappButton } from "./whatsapp-button";

export function NotFound() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-cocoa-noir px-4 py-16">
			<div className="relative mx-auto w-full max-w-2xl">
				<div className="relative overflow-hidden rounded-card bg-espresso-truffle px-8 py-14 text-center shadow-soft sm:px-14 sm:py-20">
					{/* Mascot seal */}
					<div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-deep-cocoa shadow-soft ring-1 ring-cocoa-hairline sm:h-28 sm:w-28">
						<img
							src="/logos/logo-2.webp"
							alt=""
							className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20"
						/>
					</div>

					{/* Code */}
					<p className="font-velvet-serif text-[80px] font-medium leading-none text-rose-petal sm:text-[120px]">
						404
					</p>

					{/* Heading */}
					<h1 className="mt-4 text-balance font-velvet-serif text-heading-sm font-medium text-blush-cream sm:text-heading">
						¡Ups! Se nos cayó el postre
					</h1>

					{/* Script flourish */}
					<p className="mt-3 font-dulce-script text-3xl text-rose-petal sm:text-4xl">
						esta página no existe
					</p>

					{/* Body */}
					<p className="mx-auto mt-5 max-w-md text-pretty text-[17px] leading-relaxed text-rose-mist">
						Parece que te perdiste entre los cookies. Volvamos al inicio o
						escríbenos por WhatsApp y te ayudamos con tu pedido.
					</p>

					{/* Actions */}
					<div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
						<Link
							to="/"
							className="inline-flex items-center justify-center rounded-pill border border-cocoa-hairline px-6 py-3.5 text-[17px] font-medium text-blush-cream transition-all duration-200 hover:-translate-y-0.5 hover:border-dusty-rose hover:text-rose-petal"
						>
							Volver al inicio
						</Link>
						<WhatsappButton
							message="Hola Marose, tengo una duda sobre mi pedido"
							label="Escríbenos"
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
