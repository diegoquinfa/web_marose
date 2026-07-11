import { CartTrigger } from '#/components/cart/cart-trigger.tsx'
import { WhatsappButton } from '#/components/whatsapp-button.tsx'

const LINKS = [
  { href: '#menu', label: 'Menú' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
]

export function Navbar() {
  return (
    <header className="sticky top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-280 items-center justify-between gap-4 rounded-pill bg-cream-card/85 px-4 py-3 shadow-soft backdrop-blur-md sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <img
            src="/logos/logo192.webp"
            alt="Marose"
            className="h-11 w-11 rounded-full object-cover"
          />
          <span className="font-fondant-display text-2xl font-semibold text-cocoa-ink">
            Marose
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[15px] font-semibold text-cocoa-ink/80 transition-colors hover:text-cocoa-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <CartTrigger />
          <WhatsappButton message="Hola Marose, quiero hacer un pedido" className="hidden sm:inline-flex" />
        </div>
      </nav>
    </header>
  )
}
