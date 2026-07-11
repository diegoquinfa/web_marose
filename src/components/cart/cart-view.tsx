import { ShoppingBag } from 'lucide-react'
import { formatCOP } from '#/lib/format.ts'
import {
  useCartStore,
  selectGrandTotal,
  selectIsEmpty,
  type CartLine,
} from '#/stores/cart-store.ts'
import { CartLineItem } from './cart-line-item.tsx'

export function CartView({ onGoToDetails }: { onGoToDetails: () => void }) {
  const lines = useCartStore((s) => s.lines)
  const grandTotal = useCartStore(selectGrandTotal)
  const isEmpty = useCartStore(selectIsEmpty)

  return (
    <div className="flex flex-col gap-4 p-4">
      {isEmpty ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <ShoppingBag className="h-12 w-12 text-cocoa-ink/25" />
          <p className="font-sugar-sans text-[17px] font-semibold text-cocoa-ink">
            Tu carrito está vacío
          </p>
          <p className="text-[15px] text-cocoa-ink/60">
            Agregá algo rico del menú para empezar
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {lines.map((line: CartLine) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-cocoa-hairline pt-3">
            <span className="font-sugar-sans text-[17px] font-semibold text-cocoa-ink">
              Total
            </span>
            <span className="font-sugar-sans text-xl font-bold text-caramel-swirl">
              {formatCOP(grandTotal)}
            </span>
          </div>
        </>
      )}

      <button
        type="button"
        disabled={isEmpty}
        onClick={onGoToDetails}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-cocoa-ink px-6 py-3.5 text-[17px] font-semibold text-paper-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift disabled:pointer-events-none disabled:opacity-50"
      >
        Pedir por WhatsApp
      </button>
    </div>
  )
}
