import { Link } from "@tanstack/react-router";

import { HeartDoodle, SparkleDoodle, StarDoodle } from "./doodles";
import { WhatsappButton } from "./whatsapp-button";

export function NotFound() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-blush-canvas px-4 py-16">
			<div className="relative mx-auto w-full max-w-2xl">
				{/* Doodle accents */}
				<HeartDoodle className="absolute -left-4 top-8 h-8 w-8 text-blush-rose sm:-left-12 sm:h-10 sm:w-10" />
				<SparkleDoodle className="absolute -right-2 top-16 h-9 w-9 text-blush-rose/80 sm:-right-10 sm:h-11 sm:w-11" />
				<StarDoodle className="absolute -left-2 bottom-20 h-7 w-7 text-caramel-swirl/60 sm:-left-8" />
				<HeartDoodle className="absolute -right-4 bottom-12 h-6 w-6 text-blush-rose/70 sm:-right-12 sm:h-8 sm:w-8" />

				<div className="relative overflow-hidden rounded-card bg-cream-card px-8 py-14 text-center shadow-soft sm:px-14 sm:py-20">
					{/* Mascot seal */}
					<div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-sticker-blush shadow-soft sm:h-28 sm:w-28">
						<img
							src="/logos/logo192.webp"
							alt=""
							className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20"
						/>
					</div>

					{/* Code */}
					<p className="font-fondant-display text-[80px] font-semibold leading-none text-bubblegum-pop sm:text-[120px]">
						404
					</p>

					{/* Heading */}
					<h1 className="mt-4 text-balance font-fondant-display text-heading-sm font-semibold text-cocoa-ink sm:text-heading">
						¡Ups! Se nos cayó el postre
					</h1>

					{/* Handwritten flourish */}
					<p className="mt-3 font-handwritten-sugar text-3xl text-caramel-swirl sm:text-4xl">
						esta página no existe
					</p>

					{/* Body */}
					<p className="mx-auto mt-5 max-w-md text-pretty text-[17px] leading-relaxed text-cocoa-ink/80">
						Parece que te perdiste entre los cookies. Volvamos al inicio o
						escríbenos por WhatsApp y te ayudamos con tu pedido.
					</p>

					{/* Actions */}
					<div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
						<Link
							to="/"
							className="inline-flex items-center justify-center rounded-pill bg-cocoa-ink px-6 py-3.5 text-[17px] font-semibold text-paper-white shadow-soft transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lift"
						>
							Volver al inicio
						</Link>
						<WhatsappButton
							message="Hola Marose, tengo una duda sobre mi pedido"
							label="Escríbenos"
							variant="bubblegum"
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
