import { SwooshUnderline } from "./doodles";
import { Reveal, RevealGroup, RevealItem } from "./motion/reveal";
import { type Product, ProductCard } from "./product-card";

const PRODUCTS: Product[] = [
	{
		name: "Pavé",
		images: [
			{
				src: "/food/pave.webp",
				alt: "Pavé cremoso servido en bowl de kraft con ralladura de limón",
			},
			{
				src: "/food/pave_lemon.webp",
				alt: "Pavé de limón cremoso con ralladura de limón fresca por encima",
			},
			{
				src: "/food/pave_maracuya.webp",
				alt: "Pavé de maracuyá con capa dorada de fruta de la pasión",
			},
		],
		description:
			"8 Oz de capas cremosas y galleta, suave y fresquito. Nuestro clásico para compartir (o no).",
		price: 15000,
		selectFlavor: true,
		flavors: [
			{ label: "Limón", color: "#a7c94a", image: "/food/pave_lemon.webp" },
			{
				label: "Maracuyá",
				color: "#f0b429",
				image: "/food/pave_maracuya.webp",
			},
		],
	},
	{
		name: "Bowl de 18 mini cookies",
		images: [
			{
				src: "/food/cookie_bowl.webp",
				alt: "Bowl con 18 mini cookies de chispas de chocolate recién horneadas",
			},

			{
				src: "/food/dips_cookies.webp",
				alt: "Dip de Nutella o arequipe para las mini cookies",
			},
		],
		description:
			"Suaves por dentro, ligeramente crujientes por fuera, con dip de Nutella o Arequipe para hundirlas. Imposible comer solo una.",
		price: 18000,
		selectFlavor: true,
		flavors: [
			{
				label: "Dip de Nutella",
				color: "#6b4226",
				image: "/food/dips_cookies.webp",
			},
			{
				label: "Dip de arequipe",
				color: "#d98a3d",
				image: "/food/dips_cookies.webp",
			},
		],
		badge: "Favorito",
	},
	{
		name: "Cookie pie",
		images: [
			{
				src: "/food/cookie_pie_nutella.webp",
				alt: "Cookie pie dorada rellena de Nutella derretida",
			},
		],
		description:
			"Bordes dorados, centro suave y relleno de Nutella derretida. Para quienes creen que el chocolate siempre es buena idea.",
		price: 14000,
		flavors: [{ label: "Relleno de Nutella", color: "#6b4226" }],
	},
	{
		name: "Torta de zanahoria",
		images: [
			{
				src: "/food/carrot_pie.webp",
				alt: "Mini cakes de zanahoria con nueces recién horneados en moldes individuales",
			},
		],
		description:
			"Mini cake esponjoso y húmedo de zanahoria fresca, con nuez de Brasil y nuez pecana. Pídelo con o sin canela.",
		price: 16000,
		flavors: [{ label: "Con o sin canela" }],
	},
	{
		name: "Bowl de 8 Brownie Bites",
		images: [
			{
				src: "/food/brownie_bites.webp",
				alt: "Bowl con 8 Brownie Bites, cubitos de 4x4 cm, con dip de Nutella",
			},
		],
		description:
			"Disfruta de 8 cubitos (4 × 4 cm) de brownie con un interior suave, húmedo y chocolatoso, acompañados de un cremoso dip de Nutella para que disfrutes cada bocado a tu gusto.",
		price: 20000,
		flavors: [
			{
				label: "Dip de Nutella",
				color: "#6b4226",
			},
		],
		badge: "Nuevo",
	},
	{
		name: "Bowl de 12 Red Velvet Bites",
		images: [
			{
				src: "/food/red_velvet_bites.webp",
				alt: "Bowl con 12 Red Velvet Bites de 4 × 4 cm",
			},
		],
		description:
			"Disfruta 12 Red Velvet Bites de 4 × 4 cm, preparados artesanalmente con un bizcocho suave, húmedo y de delicado sabor a cacao. Acompáñalos con el dip que más te guste: Nutella o arequipe.",
		price: 20000,
		selectFlavor: true,
		flavors: [
			{
				label: "Dip de Nutella",
				color: "#6b4226",
			},
			{
				label: "Dip de arequipe",
				color: "#d98a3d",
			},
		],
		badge: "Nuevo",
	},
	{
		name: "Brookie pie",
		images: [
			{
				src: "/food/brookie_pie.webp",
				alt: "Brookie pie con base de cookie cuebirto de brownie",
			},
		],
		description:
			"Nuestro Brookie Pie une lo mejor de ambos mundos una base de cookie con bordes dorados y centro suave, cubierta con un brownie intenso, húmedo y lleno de chocolate.",
		price: 18000,
		badge: "Nuevo",
	},
];

export function Menu() {
	return (
		<section id="menu" className="px-4 py-9">
			<div className="mx-auto max-w-280">
				<Reveal className="relative mb-12 text-center">
					<h2 className="font-velvet-serif text-heading font-medium text-blush-cream">
						Nuestro <span className="italic text-rose-petal">menú</span>
					</h2>
					<SwooshUnderline className="mx-auto mt-2 h-4 w-48 text-dusty-rose" />
					<p className="mx-auto mt-4 max-w-md text-pretty text-[17px] leading-relaxed text-rose-mist">
						Todo hecho fresco por encargo. Pide el tuyo por WhatsApp y lo
						preparamos con amor.
					</p>
				</Reveal>

				<RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{PRODUCTS.map((product) => (
						<RevealItem key={product.name}>
							<ProductCard product={product} />
						</RevealItem>
					))}
				</RevealGroup>
			</div>
		</section>
	);
}
