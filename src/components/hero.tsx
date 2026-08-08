import { Reveal, RevealGroup, RevealItem } from "./motion/reveal";
import { WhatsappButton } from "./whatsapp-button";

export function Hero() {
	return (
		<section
			id="top"
			className="bg-cocoa-noir px-4 py-16 sm:py-20 lg:pt-24 lg:pb-20"
		>
			<div className="relative mx-auto grid max-w-280 items-center gap-10 lg:grid-cols-2 lg:gap-14">
				<RevealGroup mode="load" className="text-center lg:text-left">
					<RevealItem>
						<span className="font-patisserie-sans text-label font-medium uppercase text-dusty-rose">
							Pastelería artesanal · Cartagena
						</span>
					</RevealItem>
					<RevealItem>
						<h1 className="mt-5 text-balance font-velvet-serif text-5xl font-medium leading-[1.05] text-blush-cream sm:text-6xl lg:text-[88px]">
							Hay momentos que merecen
							<br />
							<span className="block pb-2 font-dulce-script text-[0.72em] font-normal leading-[1.35] text-rose-petal">
								algo dulce
							</span>
						</h1>
					</RevealItem>
					<RevealItem>
						<p className="mx-auto mt-5 max-w-md text-pretty text-body text-rose-mist lg:mx-0">
							Pavé, mini cookies con dip, cookie pie y torta de zanahoria. Todo
							recién horneado y listo para endulzar tu día.
						</p>
					</RevealItem>
					<RevealItem className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
						<WhatsappButton message="Hola Marose, quiero pedir postres" />
						<a
							href="#menu"
							className="inline-flex items-center justify-center gap-2 rounded-pill border border-cocoa-hairline px-6 py-3.5 font-patisserie-sans text-[15px] font-medium tracking-[0.08em] text-blush-cream transition-colors duration-200 hover:border-dusty-rose hover:text-rose-petal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-petal"
						>
							Ver menú
						</a>
					</RevealItem>
				</RevealGroup>

				<Reveal
					mode="load"
					delay={0.15}
					className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl"
				>
					<div className="relative">
						<div
							aria-hidden="true"
							className="absolute -inset-x-8 -inset-y-10"
							style={{
								background:
									"radial-gradient(circle, rgba(227,164,168,0.18), transparent 70%)",
							}}
						/>
						<img
							src="/logos/banner-2.2.webp"
							alt="Marose — pastelería artesanal en Cartagena"
							className="relative mx-auto w-full"
						/>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
