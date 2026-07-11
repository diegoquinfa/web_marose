import { ProductCard, type Product } from './product-card'
import { SwooshUnderline, HeartDoodle } from './doodles'

const PRODUCTS: Product[] = [
  {
    name: 'Pavé',
    image:
      '/food/pave.webp',
    alt: 'Pavé cremoso servido en bowl de kraft con ralladura de limón',
    description:
      '8 Oz de capas cremosas y galleta, suave y fresquito. Nuestro clásico para compartir (o no).',
    price: '$15.000',
    flavors: [
      { label: 'Limón', color: '#a7c94a' },
      { label: 'Maracuyá', color: '#f0b429' },
    ],
    badge: 'Favorito',
  },
  {
    name: 'Bowl de 8 mini cookies',
    image:
      '/food/cookie_bowl.webp',
    alt: 'Bowl con ocho mini cookies de chispas de chocolate recién horneadas',
    description:
      'Ocho mini cookies de chispas de chocolate, servidas con un dip para hundirlas.',
    price: '$18.000',
    flavors: [
      { label: 'Dip de Nutella', color: '#6b4226' },
      { label: 'Dip de arequipe', color: '#d98a3d' },
    ],
  },
  {
    name: 'Cookie pie',
    image: '/food/cookie_pie_nutella.webp',
    alt: 'Cookie pie dorada rellena de Nutella derretida',
    description:
      'Una galleta gigante y esponjosa con relleno de Nutella que se derrite en cada mordida.',
    price: '$14.000',
    flavors: [{ label: 'Relleno de Nutella', color: '#6b4226' }],
    badge: 'Nuevo',
  },
  {
    name: 'Torta de zanahoria',
    image: '/food/carrot_pie.webp',
    alt: 'Porción de torta de zanahoria con frosting de queso crema',
    description:
      'Húmeda, especiada y con un generoso frosting de queso crema. Un abrazo en cada porción.',
    price: '$16.000',
    flavors: [{ label: 'Queso crema', color: '#d98a3d' }],
  },
]

export function Menu() {
  return (
    <section id="menu" className="px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-280">
        <div className="relative mb-12 text-center">
          <HeartDoodle className="mx-auto mb-4 h-7 w-7 text-blush-rose" />
          <h2 className="font-fondant-display text-4xl font-semibold text-cocoa-ink sm:text-[40px]">
            Nuestro <span className="text-caramel-swirl">menú</span>
          </h2>
          <SwooshUnderline className="mx-auto mt-2 h-4 w-48 text-blush-rose" />
          <p className="mx-auto mt-4 max-w-md text-pretty text-[17px] leading-relaxed text-cocoa-ink/75">
            Todo hecho fresco por encargo. Pide el tuyo por WhatsApp y lo
            preparamos con amor.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
