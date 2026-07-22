import { WhatsappButton } from "./whatsapp-button";
import { HeartDoodle, SparkleDoodle, StarDoodle } from "./doodles";
import { Reveal, RevealGroup, RevealItem } from "./motion/reveal";

export function Hero() {
	return (
		<section id="top" className="px-4 pt-10 sm:pt-16">
			<div className="relative mx-auto max-w-280 overflow-hidden rounded-card bg-bubblegum-pop px-6 py-14 shadow-pop sm:px-12 sm:py-20">
				{/* Doodles */}
				<HeartDoodle className="absolute left-6 top-10 h-8 w-8 text-paper-white/80" />
				<SparkleDoodle className="absolute right-10 top-8 h-9 w-9 text-paper-white/80" />
				<StarDoodle className="absolute bottom-10 left-1/4 h-7 w-7 text-blush-rose" />
				<HeartDoodle className="absolute bottom-12 right-8 h-6 w-6 text-paper-white/70" />

				<div className="relative grid items-center gap-10 lg:grid-cols-2">
					<RevealGroup mode="load" className="text-center lg:text-left">
						<RevealItem>
							<span className="inline-flex items-center gap-2 rounded-pill bg-cream-card/90 px-4 py-1.5 text-label font-semibold uppercase tracking-[0.08em] text-cocoa-ink">
								Repostería artesanal · Cartagena
							</span>
						</RevealItem>
						<RevealItem>
							<h1 className="mt-5 text-balance font-fondant-display text-5xl font-semibold leading-[1.05] text-cocoa-ink sm:text-6xl lg:text-[64px]">
								Cookies &amp; postres artesanales
							</h1>
						</RevealItem>
						<RevealItem>
							<p className="mt-4 font-handwritten-sugar text-3xl text-cream-card sm:text-4xl">
								hecho fresco y con amor para compartir
							</p>
						</RevealItem>
						<RevealItem>
							<p className="mx-auto mt-5 max-w-md text-pretty text-[17px] leading-relaxed text-cocoa-ink/80 lg:mx-0">
								Pavé, mini cookies con dip, cookie pie y torta de zanahoria.
								Todo recién horneado y listo para endulzar tu día.
							</p>
						</RevealItem>
						<RevealItem className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
							<WhatsappButton message="Hola Marose, quiero pedir postres" />
							<a
								href="#menu"
								className="inline-flex items-center justify-center rounded-pill bg-cream-card px-6 py-3.5 text-[17px] font-bold text-cocoa-ink shadow-soft transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
							>
								Ver menú
							</a>
						</RevealItem>
					</RevealGroup>

					<Reveal
						mode="load"
						delay={0.15}
						className="relative mx-auto w-full max-w-md"
					>
						<img
							src="/food/pave.webp"
							alt="Pavé de Marose servido en bowl de kraft, con una cuchara levantando una porción"
							className="w-full rounded-image object-cover shadow-lift"
						/>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
