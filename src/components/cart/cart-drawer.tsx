import { useState } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '#/components/ui/drawer.tsx'
import { useMediaQuery } from '#/hooks/use-media-query.ts'
import { useCartStore } from '#/stores/cart-store.ts'
import {
  buildOrderMessage,
  openOrderInWhatsapp,
} from '#/lib/whatsapp-order.ts'
import { CartView } from './cart-view.tsx'
import { DetailsView, type DetailsFormData } from './details-view.tsx'

const INITIAL_FORM: DetailsFormData = {
  nombre: '',
  cuando: '',
  notas: '',
}

export function CartDrawer() {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const isOpen = useCartStore((s) => s.isOpen)
  const lines = useCartStore((s) => s.lines)
  const openDrawer = useCartStore((s) => s.openDrawer)
  const closeDrawer = useCartStore((s) => s.closeDrawer)
  const clearCart = useCartStore((s) => s.clearCart)

  const [view, setView] = useState<'cart' | 'details'>('cart')
  const [form, setForm] = useState<DetailsFormData>({ ...INITIAL_FORM })

  const handleFieldChange = (field: keyof DetailsFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleGoToDetails = () => {
    setView('details')
  }

  const handleBack = () => {
    setView('cart')
  }

  const handleSubmitOrder = () => {
    const message = buildOrderMessage(lines, form)
    openOrderInWhatsapp(message)
    clearCart()
    setForm({ ...INITIAL_FORM })
    setView('cart')
    closeDrawer()
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      openDrawer()
    } else {
      closeDrawer()
    }
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={handleOpenChange}
      swipeDirection={isDesktop ? 'right' : 'down'}
    >
      <DrawerContent className="bg-cream-card text-cocoa-ink">
        <DrawerHeader>
          <DrawerTitle className="font-fondant-display text-[24px] font-semibold text-cocoa-ink">
            Tu pedido
          </DrawerTitle>
        </DrawerHeader>

        {view === 'cart' ? (
          <CartView onGoToDetails={handleGoToDetails} />
        ) : (
          <DetailsView
            formData={form}
            onFieldChange={handleFieldChange}
            onBack={handleBack}
            onSubmit={handleSubmitOrder}
          />
        )}
      </DrawerContent>
    </Drawer>
  )
}
