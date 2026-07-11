import { SwooshUnderline, SparkleDoodle, HeartDoodle, StarDoodle } from './doodles'
import { Reveal, RevealGroup, RevealItem } from './motion/reveal'
import { WHATSAPP_NUMBER } from './whatsapp-button'

const STEPS = [
  {
    number: '1',
    title: 'Elige tu antojo',
    description: 'Explora el menú y escoge tu favorito… o déjate tentar por más de uno.',
    handwritten: '¡el más difícil!',
    rotate: '-rotate-2',
    iconBg: 'bg-sticker-blush',
    iconColor: 'text-bubblegum-pop',
    badgeBg: 'bg-bubblegum-pop',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="9" cy="9.5" r="0.8" fill="currentColor" />
        <circle cx="14.5" cy="8.5" r="0.8" fill="currentColor" />
        <circle cx="15.5" cy="13.5" r="0.8" fill="currentColor" />
        <circle cx="10" cy="14.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Envíanos tu pedido',
    description: 'Escríbenos por WhatsApp con el producto, la cantidad y la fecha de entrega.',
    handwritten: 'respondemos rapidito',
    rotate: 'rotate-1',
    iconBg: 'bg-[#e8f5d8]',
    iconColor: 'text-flavor-lime',
    badgeBg: 'bg-flavor-lime',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8M8 12.5h5" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Confirmamos',
    description: 'Con el pago confirmado tu pedido queda reservado y lo preparamos con dedicación.',
    handwritten: 'hecho con amor',
    rotate: '-rotate-1',
    iconBg: 'bg-[#fdeed3]',
    iconColor: 'text-flavor-maracuya',
    badgeBg: 'bg-flavor-maracuya',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
        <path d="M12 21C7 17.5 3.5 14 3.5 9.8 3.5 6.9 5.7 5 8.2 5c1.5 0 2.9.8 3.8 2 .9-1.2 2.3-2 3.8-2 2.5 0 4.7 1.9 4.7 4.8 0 4.2-3.5 7.7-8.5 11.2z" />
        <path d="M9 11.5l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: '4',
    title: 'Recibe y disfruta',
    description: 'Te lo llevamos según disponibilidad en Cartagena, con cada detalle cuidado.',
    handwritten: '¡a disfrutar!',
    rotate: 'rotate-2',
    iconBg: 'bg-[#f3e3d3]',
    iconColor: 'text-caramel-swirl',
    badgeBg: 'bg-caramel-swirl',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
        <path d="M20 12v10H4V12" />
        <path d="M22 7H2v5h20V7z" />
        <path d="M12 22V7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
]

const NOTES = [
  {
    label: 'Pedidos todos los días',
    text: 'Recibimos tu pedido cualquier día de la semana.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M3 10h18M8 3v4M16 3v4" />
        <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Pide con anticipación',
    text: 'Así aseguras disponibilidad — todo se hornea fresco.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2M9.5 2h5" />
      </svg>
    ),
  },
  {
    label: 'Domicilio en Cartagena',
    text: 'El valor varía según la zona de entrega.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
]

export function HowToOrder() {
  return (
    <section id="como-pedir" className="relative overflow-hidden px-4 py-9">
      {/* scattered background doodles */}
      <HeartDoodle className="absolute left-[6%] top-16 h-6 w-6 rotate-12 text-blush-rose/50" />
      <StarDoodle className="absolute right-[8%] top-24 h-7 w-7 -rotate-12 text-bubblegum-pop/40" />
      <SparkleDoodle className="absolute bottom-24 left-[10%] h-6 w-6 text-flavor-maracuya/40" />
      <HeartDoodle className="absolute bottom-40 right-[6%] h-5 w-5 -rotate-6 text-bubblegum-pop/40" />

      <div className="relative mx-auto max-w-280">

        {/* Header */}
        <Reveal className="relative mb-16 text-center">
          <span className="inline-block rounded-pill bg-sticker-blush px-4 py-1.5 font-handwritten-sugar text-xl text-bubblegum-pop">
            ¡súper fácil!
          </span>
          <h2 className="mt-3 font-fondant-display text-4xl font-semibold text-cocoa-ink sm:text-[40px]">
            ¿Cómo <span className="text-caramel-swirl">pedir?</span>
          </h2>
          <SwooshUnderline className="mx-auto mt-2 h-4 w-44 text-bubblegum-pop" />
          <p className="mx-auto mt-4 max-w-md text-pretty text-[17px] leading-relaxed text-cocoa-ink/75">
            En cuatro pasos tienes tus postres en camino.
          </p>
        </Reveal>

        {/* Steps with connecting dotted path */}
        <div className="relative">
          {/* desktop dotted connector */}
          <svg
            viewBox="0 0 1000 60"
            fill="none"
            aria-hidden="true"
            className="absolute left-1/2 top-8 hidden w-[88%] -translate-x-1/2 text-blush-rose lg:block"
            preserveAspectRatio="none"
          >
            <path
              d="M10 40 C 150 5, 280 55, 380 30 S 620 10, 720 35 S 930 50, 990 20"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="1 10"
            />
          </svg>

          <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((step) => (
              <RevealItem key={step.number}>
                <article
                  className={`group relative flex flex-col items-center rounded-card border-2 border-dashed border-cocoa-hairline bg-cream-card px-6 pb-8 pt-12 text-center shadow-soft transition-all duration-300 hover:rotate-0 hover:border-blush-rose hover:shadow-lift ${step.rotate}`}
                >
                  {/* number badge - floats on top edge like a sticker */}
                  <span
                    className={`absolute -top-5 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full font-fondant-display text-lg font-bold text-white shadow-pop ring-4 ring-cream-card ${step.badgeBg}`}
                  >
                    {step.number}
                  </span>

                  {/* icon in tinted scalloped circle */}
                  <div className={`relative mb-5 flex h-20 w-20 items-center justify-center rounded-full ${step.iconBg} ${step.iconColor} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                    {step.icon}
                    <SparkleDoodle className="absolute -right-1 -top-1 h-4 w-4 text-bubblegum-pop opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <h3 className="font-fondant-display text-[19px] font-semibold leading-snug text-cocoa-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-pretty text-[15px] leading-relaxed text-cocoa-ink/70">
                    {step.description}
                  </p>

                  {/* handwritten note */}
                  <span className="mt-4 font-handwritten-sugar text-lg leading-none text-bubblegum-pop">
                    {step.handwritten}
                  </span>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Notes as sticker chips */}
        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-3">
          {NOTES.map((note, i) => (
            <RevealItem key={note.label}>
              <div
                className={`flex items-start gap-4 rounded-2xl bg-sticker-blush px-5 py-4 ${i === 1 ? 'sm:-rotate-1' : i === 2 ? 'sm:rotate-1' : 'sm:rotate-0'}`}
              >
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper-white text-bubblegum-pop shadow-soft">
                  {note.icon}
                </span>
                <div>
                  <p className="font-fondant-display text-[15px] font-semibold text-cocoa-ink">
                    {note.label}
                  </p>
                  <p className="mt-0.5 text-pretty text-[13.5px] leading-relaxed text-cocoa-ink/70">
                    {note.text}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* CTA */}
        <Reveal className="mt-12 flex flex-col items-center gap-2">
          <span className="font-handwritten-sugar text-2xl text-caramel-swirl">
            ¿ya sabes qué vas a pedir?
          </span>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Marose, quiero hacer un pedido')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-pill bg-[#25D366] px-8 py-4 font-fondant-display text-[17px] font-semibold text-white shadow-pop transition-transform duration-200 hover:scale-105 active:scale-100"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Hacer mi pedido
          </a>
        </Reveal>

      </div>
    </section>
  )
}
