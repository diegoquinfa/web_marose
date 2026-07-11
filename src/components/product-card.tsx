import { useRef } from 'react'
import { formatCOP } from '#/lib/format.ts'
import {
  ProductImageCarousel,
  type ProductImage,
  type ProductImageCarouselHandle,
} from './product-image-carousel'
import { WhatsappButton } from './whatsapp-button'

type Flavor = {
  label: string
  color?: string
  image?: string
}

export type Product = {
  name: string
  images: ProductImage[]
  description: string
  price: number
  flavors?: Flavor[]
  badge?: string
  selectFlavor?: boolean
}

const FLAVOR_PILL_CLASSES =
  'inline-flex items-center gap-2 rounded-pill bg-sticker-blush px-3.5 py-1.5 text-[13px] font-semibold text-cocoa-ink'

function FlavorPill({
  flavor,
  onClick,
}: {
  flavor: Flavor
  onClick?: () => void
}) {
  const content = (
    <>
      {flavor.color && (
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: flavor.color }}
          aria-hidden="true"
        />
      )}
      {flavor.label}
    </>
  )

  if (!onClick) {
    return <span className={FLAVOR_PILL_CLASSES}>{content}</span>
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Ver foto de ${flavor.label}`}
      className={`${FLAVOR_PILL_CLASSES} cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft`}
    >
      {content}
    </button>
  )
}

export function ProductCard({ product }: { product: Product }) {
  const carouselRef = useRef<ProductImageCarouselHandle>(null)

  return (
    <article className="group flex flex-col overflow-hidden rounded-card bg-cream-card p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift sm:p-6">
      <div className="relative overflow-hidden rounded-image">
        <ProductImageCarousel
          ref={carouselRef}
          images={product.images}
          productName={product.name}
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-pill bg-bubblegum-pop px-3 py-1 text-label font-semibold uppercase tracking-[0.08em] text-paper-white shadow-pop">
            {product.badge}
          </span>
        )}
      </div>

      <h3 className="mt-5 font-fondant-display text-[26px] font-semibold leading-tight text-cocoa-ink">
        {product.name}
      </h3>

      {product.flavors && product.flavors.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {product.flavors.map((flavor) => {
            const flavorImage = flavor.image
            return (
              <FlavorPill
                key={flavor.label}
                flavor={flavor}
                onClick={
                  flavorImage
                    ? () => carouselRef.current?.scrollToImage(flavorImage)
                    : undefined
                }
              />
            )
          })}
        </div>
      )}

      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-cocoa-ink/75">
        {product.description}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="font-sugar-sans text-xl font-bold text-caramel-swirl">
          {formatCOP(product.price)}
        </span>
      </div>

      <WhatsappButton
        message={`Hola Marose, quiero pedir ${product.name}`}
        label="Pedir por WhatsApp"
        className="mt-4 w-full"
      />
    </article>
  )
}
