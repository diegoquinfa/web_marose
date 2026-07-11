import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartLine = {
  id: string
  productName: string
  flavorLabel: string | null
  unitPrice: number
  qty: number
  imageSrc: string
}

type NewCartLine = Omit<CartLine, 'id' | 'qty'>

type CartState = {
  lines: CartLine[]
  isOpen: boolean
}

type CartActions = {
  addLine: (line: NewCartLine) => void
  incrementLine: (id: string) => void
  decrementLine: (id: string) => void
  removeLine: (id: string) => void
  clearCart: () => void
  openDrawer: () => void
  closeDrawer: () => void
}

export type CartStore = CartState & CartActions

const MIN_QTY = 1
const MAX_QTY = 99

function buildLineId(productName: string, flavorLabel: string | null): string {
  return `${productName}::${flavorLabel ?? ''}`
}

/**
 * Cart store. Persists only `lines` to localStorage under `marose-cart-v1`.
 * `skipHydration` is enabled so SSR renders a neutral empty cart; callers must
 * invoke `useCartStore.persist.rehydrate()` in a client-only effect to
 * restore persisted lines without causing a hydration mismatch.
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,

      addLine: (line) =>
        set((state) => {
          const id = buildLineId(line.productName, line.flavorLabel)
          const existing = state.lines.find((l) => l.id === id)

          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.id === id ? { ...l, qty: Math.min(MAX_QTY, l.qty + 1) } : l,
              ),
            }
          }

          return {
            lines: [...state.lines, { ...line, id, qty: MIN_QTY }],
          }
        }),

      incrementLine: (id) =>
        set((state) => ({
          lines: state.lines.map((l) =>
            l.id === id ? { ...l, qty: Math.min(MAX_QTY, l.qty + 1) } : l,
          ),
        })),

      decrementLine: (id) =>
        set((state) => {
          const line = state.lines.find((l) => l.id === id)
          if (!line) return state

          if (line.qty <= MIN_QTY) {
            return { lines: state.lines.filter((l) => l.id !== id) }
          }

          return {
            lines: state.lines.map((l) =>
              l.id === id ? { ...l, qty: l.qty - 1 } : l,
            ),
          }
        }),

      removeLine: (id) =>
        set((state) => ({
          lines: state.lines.filter((l) => l.id !== id),
        })),

      clearCart: () => set({ lines: [] }),

      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
    }),
    {
      name: 'marose-cart-v1',
      version: 1,
      skipHydration: true,
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
)

export const selectItemCount = (state: CartStore): number =>
  state.lines.reduce((sum, line) => sum + line.qty, 0)

export const selectGrandTotal = (state: CartStore): number =>
  state.lines.reduce((sum, line) => sum + line.unitPrice * line.qty, 0)

export const selectIsEmpty = (state: CartStore): boolean =>
  state.lines.length === 0

export const selectLinesByProduct =
  (productName: string) =>
  (state: CartStore): CartLine[] =>
    state.lines.filter((l) => l.productName === productName)
