import { useEffect, useRef, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { cn } from '#/lib/utils.ts'
import { selectItemCount, useCartStore } from '#/stores/cart-store.ts'

export function CartTrigger() {
  const openDrawer = useCartStore((s) => s.openDrawer)
  const itemCount = useCartStore(selectItemCount)

  // SSR-safe: badge hidden until client hydration completes
  const [mounted, setMounted] = useState(false)
  const [bump, setBump] = useState(false)
  const prevCount = useRef(itemCount)

  useEffect(() => {
    useCartStore.persist.rehydrate()
    setMounted(true)
  }, [])

  // Bump animation when item count increases
  useEffect(() => {
    if (itemCount > prevCount.current) {
      setBump(true)
      const timer = setTimeout(() => setBump(false), 300)
      prevCount.current = itemCount
      return () => clearTimeout(timer)
    }
    prevCount.current = itemCount
  }, [itemCount])

  const showBadge = mounted && itemCount > 0

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={`Abrir carrito (${itemCount} productos)`}
      className="relative inline-flex items-center justify-center rounded-full p-2.5 text-cocoa-ink transition-colors hover:bg-sticker-blush"
    >
      <ShoppingBag className="h-6 w-6" />
      {showBadge && (
        <span
          className={cn(
            'absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-pill bg-bubblegum-pop px-1 text-label font-semibold text-paper-white shadow-pop',
            bump && 'animate-bump',
          )}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  )
}
