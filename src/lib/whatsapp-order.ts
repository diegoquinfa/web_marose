import { WHATSAPP_NUMBER } from '#/components/whatsapp-button.tsx'
import { formatCOP } from '#/lib/format.ts'
import type { CartLine } from '#/stores/cart-store.ts'

export type OrderFormFields = {
  nombre: string
  cuando: string
  notas: string
}

function buildLineText(line: CartLine): string {
  const flavorSuffix = line.flavorLabel ? ` (${line.flavorLabel})` : ''
  const subtotal = line.unitPrice * line.qty
  return `• ${line.productName}${flavorSuffix} ×${line.qty} — ${formatCOP(subtotal)}`
}

/**
 * Pure builder for the WhatsApp order message. Never touches the DOM or
 * network — safe to call from anywhere (components, tests, etc).
 */
export function buildOrderMessage(lines: CartLine[], fields: OrderFormFields): string {
  const grandTotal = lines.reduce((sum, line) => sum + line.unitPrice * line.qty, 0)

  const messageLines = [
    'Hola Marose 🤎',
    'Quiero hacer este pedido:',
    '',
    ...lines.map(buildLineText),
    '',
    `Total: ${formatCOP(grandTotal)}`,
    `Nombre: ${fields.nombre}`,
    `Para cuándo: ${fields.cuando}`,
  ]

  if (fields.notas.trim().length > 0) {
    messageLines.push(`Notas: ${fields.notas}`)
  }

  return messageLines.join('\n')
}

/** Builds the wa.me handoff URL for a given message. */
export function buildOrderUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/** Opens the WhatsApp order handoff in a new tab. */
export function openOrderInWhatsapp(message: string): void {
  window.open(buildOrderUrl(message), '_blank', 'noopener,noreferrer')
}
