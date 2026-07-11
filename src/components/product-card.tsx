import { useEffect, useRef, useState } from 'react'
import { formatCOP } from '#/lib/format.ts'
import { useCartStore } from '#/stores/cart-store.ts'
import {
  ProductImageCarousel,
  type ProductImage,
  type ProductImageCarouselHandle,
} from './product-image-carousel'

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

const FLAVOR_PILL_BASE_CLASSES =
  'inline-flex items-center gap-2 rounded-pill px-3.5 py-1.5 text-[13px] font-semibold'

function FlavorPill({
  flavor,
  onClick,
  selected,
  ariaLabel,
}: {
  flavor: Flavor
  onClick?: () => void
  selected?: boolean
  ariaLabel?: string
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

  const toneClasses = selected
    ? 'bg-cocoa-ink text-paper-white'
    : 'bg-sticker-blush text-cocoa-ink'

  if (!onClick) {
    return <span className={`${FLAVOR_PILL_BASE_CLASSES} ${toneClasses}`}>{content}</span>
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={ariaLabel ?? `Ver foto de ${flavor.label}`}
      className={`${FLAVOR_PILL_BASE_CLASSES} ${toneClasses} cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft`}
    >
      {content}
    </button>
  )
}

const ADDED_FEEDBACK_MS = 1500

export function ProductCard({ product }: { product: Product }) {
  const carouselRef = useRef<ProductImageCarouselHandle>(null)
  const addLine = useCartStore((state) => state.addLine)

  const isFlavorSelectable = product.selectFlavor === true
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | undefined>(
    isFlavorSelectable ? product.flavors?.[0] : undefined,
  )
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (!justAdded) return
    const timeout = setTimeout(() => setJustAdded(false), ADDED_FEEDBACK_MS)
    return () => clearTimeout(timeout)
  }, [justAdded])

  const handleSelectFlavor = (flavor: Flavor) => {
    setSelectedFlavor(flavor)
    if (flavor.image) carouselRef.current?.scrollToImage(flavor.image)
  }

  const handleAddToCart = () => {
    addLine({
      productName: product.name,
      flavorLabel: isFlavorSelectable ? (selectedFlavor?.label ?? null) : null,
      unitPrice: product.price,
      imageSrc: (isFlavorSelectable ? selectedFlavor?.image : undefined) ?? product.images[0].src,
    })
    setJustAdded(true)
  }

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
                selected={isFlavorSelectable ? selectedFlavor?.label === flavor.label : undefined}
                ariaLabel={
                  isFlavorSelectable
                    ? `Elegir sabor ${flavor.label}`
                    : `Ver foto de ${flavor.label}`
                }
                onClick={
                  isFlavorSelectable
                    ? () => handleSelectFlavor(flavor)
                    : flavorImage
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

      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-cocoa-ink px-6 py-3.5 text-[17px] font-semibold text-paper-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
      >
        {justAdded ? '¡Agregado!' : 'Agregar al carrito'}
      </button>
    </article>
  )
}
