import { SwooshUnderline } from "./doodles";
import { Reveal } from "./motion/reveal";
import { type Review, ReviewCard } from "./review-card";

const REVIEWS: Review[] = [
	{
		id: "r1",
		timestamp: "hace 2 días",
		comment:
			"El pavé de limón es una cosa de otro nivel 🍋 cremoso, fresquito… lo pedí para compartir y no alcanzó, tocó pedir otro.",
	},
	{
		id: "r2",
		timestamp: "la semana pasada",
		comment:
			"Las mini cookies llegaron perfectas, suaves por dentro y con el dip de Nutella derretida… mi familia las devoró en minutos.",
	},
	{
		id: "r3",
		timestamp: "hace 3 días",
		comment:
			"Pedí el pavé de maracuyá y wow, esa capa dorada por encima es adictiva. Se lo regalé a mi mamá y ya me pidió otro 😂",
	},
	{
		id: "r4",
		timestamp: "hace 1 semana",
		comment:
			"La torta de zanahoria está buenísima, húmeda y con las nueces tostadas… se nota que todo es fresco de verdad.",
	},
	{
		id: "r5",
		timestamp: "hace 4 días",
		comment:
			"El cookie pie de Nutella es pecado delicioso 🍫 lo pedí para el cumple de mi hermana y todos quedaron pidiendo la receta.",
	},
	{
		id: "r6",
		timestamp: "hace 5 días",
		comment:
			"Me encantó la presentación, todo llega súper cuidado y la nota escrita a mano es un detalle hermoso. Se nota el amor.",
	},
	{
		id: "r7",
		timestamp: "hace 2 semanas",
		comment:
			"Pedí el bowl de mini cookies con dip de arequipe y es que no se puede parar de comer. Perfectos para compartir… o no.",
	},
	{
		id: "r8",
		timestamp: "hace 3 semanas",
		comment:
			"Ya es la tercera vez que pido y siempre quedo feliz. El pavé limón es mi favorito, esa ralladura fresca por encima es todo.",
	},
];

function renderTrack() {
	return REVIEWS.map((review, i) => (
		<ReviewCard key={review.id} review={review} index={i} />
	));
}

export function ReviewsSection() {
	return (
		<section
			aria-label="Opiniones de nuestros clientes"
			className="relative overflow-hidden px-0 py-9"
		>
			{/* Header */}
			<Reveal className="relative mb-12 px-4 text-center">
				<h2 className="font-velvet-serif text-heading font-medium text-blush-cream">
					Lo que dicen{" "}
					<span className="italic text-rose-petal">nuestros clientes</span>
				</h2>
				<SwooshUnderline className="mx-auto mt-2 h-4 w-52 text-dusty-rose" />
				<p className="mx-auto mt-4 max-w-md text-pretty text-[17px] leading-relaxed text-rose-mist">
					Opiniones reales de quienes ya probaron nuestros postres.
				</p>
			</Reveal>

			{/* Marquee viewport */}
			<div
				className="overflow-hidden motion-reduce:overflow-x-auto motion-reduce:px-4"
				draggable={false}
			>
				<div className="flex w-max gap-6 animate-[marquee_60s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:w-fit motion-reduce:gap-6">
					{renderTrack()}
					{renderTrack()}
				</div>
			</div>
		</section>
	);
}
