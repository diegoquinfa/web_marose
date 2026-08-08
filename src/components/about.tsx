import { RevealGroup, RevealItem } from "./motion/reveal";

export function About() {
	return (
		<section id="nosotros" className="px-4 py-4">
			<div className="mx-auto max-w-280">
				<div className="relative overflow-hidden rounded-card bg-espresso-truffle px-6 py-14 shadow-soft sm:px-12 sm:py-16">
					<RevealGroup className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
						<RevealItem className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-deep-cocoa shadow-soft ring-1 ring-cocoa-hairline sm:h-48 sm:w-48">
							<img
								src="/logos/logo-2.webp"
								alt="Mascota de Marose: un pancito con gorro de chef y batidora"
								className="h-full w-full rounded-full object-cover"
							/>
						</RevealItem>

						<RevealItem className="text-center md:text-left">
							<h2 className="font-velvet-serif text-heading font-medium text-blush-cream">
								Hecho con <span className="italic text-rose-petal">amor</span>
							</h2>
							<p className="mt-4 text-pretty text-[17px] leading-relaxed text-rose-mist">
								Marose nació en Cartagena de una idea simple: hornear postres
								ricos, bonitos y honestos. Usamos ingredientes frescos, recetas
								caseras y muchísimo cariño en cada bowl, cada galleta y cada
								torta.
							</p>
							<p className="mt-4 font-dulce-script text-3xl text-rose-petal">
								gracias por endulzar tu día con nosotros
							</p>
						</RevealItem>
					</RevealGroup>
				</div>
			</div>
		</section>
	);
}
