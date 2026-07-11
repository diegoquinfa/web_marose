import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { NotFound } from '../components/not-found'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Marose · Cookies & postres artesanales — Cartagena',
      },
      {
        name: 'description',
        content: 'Marose es una repostería artesanal de Cartagena. Cookies, pavé, cookie pie y torta de zanahoria hechos frescos y con amor para compartir. Pide por WhatsApp.',
      }
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/webp',
        href: '/logos/logo192.webp',
      },
    ],
    scripts: [
      {
        src: "https://analytics.ahrefs.com/analytics.js",
        async: true,
        "data-key": "lI2sfaqZ/EGYIIBK8/m9xg",
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className='bg-blush-canvas'>
      <head>
        <HeadContent />
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
      </head>
      <body className='antialiased'>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
