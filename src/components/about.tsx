import { SparkleDoodle, HeartDoodle } from "./doodles";
import { RevealGroup, RevealItem } from "./motion/reveal";

export function About() {
	return (
		<section id="nosotros" className="px-4 py-4">
			<div className="mx-auto max-w-280">
				<div className="relative overflow-hidden rounded-card bg-sticker-blush px-6 py-14 shadow-soft sm:px-12 sm:py-16">
					<SparkleDoodle className="absolute right-8 top-8 h-8 w-8 text-blush-rose" />
					<HeartDoodle className="absolute bottom-8 left-8 h-7 w-7 text-blush-rose" />

					<RevealGroup className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
						<RevealItem className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-cream-card shadow-soft sm:h-48 sm:w-48">
							<img
								src="/logos/logo192.webp"
								alt="Mascota de Marose: un pancito con gorro de chef y batidora"
								className="h-full w-full rounded-full object-cover"
							/>
						</RevealItem>

						<RevealItem className="text-center md:text-left">
							<h2 className="font-fondant-display text-4xl font-semibold text-cocoa-ink">
								Hecho con <span className="text-caramel-swirl">amor</span>
							</h2>
							<p className="mt-4 text-pretty text-[17px] leading-relaxed text-cocoa-ink/80">
								Marose nació en Cartagena de una idea simple: hornear postres
								ricos, bonitos y honestos. Usamos ingredientes frescos, recetas
								caseras y muchísimo cariño en cada bowl, cada galleta y cada
								torta.
							</p>
							<p className="mt-4 font-handwritten-sugar text-3xl text-caramel-swirl">
								gracias por endulzar tu día con nosotros
							</p>
						</RevealItem>
					</RevealGroup>
				</div>
			</div>
		</section>
	);
}
