# Marose — marosectg.com

Bakery site for Marose (Cartagena). Astro 7 + [EmDash CMS](https://docs.emdashcms.com) on Cloudflare Workers, with D1 for the database and R2 for media. Staff edit all content at `/_emdash/admin`. See [docs/guia-editor.md](docs/guia-editor.md) for the staff guide (Spanish).

## Stack

| Concern | Choice |
|---|---|
| Framework | Astro 7, `output: "server"`, `@astrojs/cloudflare` |
| CMS | EmDash: content model in `seed/seed.json`, admin branded as Marose |
| Interactivity | React 19 islands in `src/islands/` (cart + product cards), Zustand store |
| Styling | Tailwind CSS v4, design tokens in `src/styles/global.css` (see `DESIGN.md`) |
| Email | `src/plugins/marose-email.ts`: Cloudflare Email Sending with the Marose layout |

## Cloudflare resources

| Resource | Name | Binding |
|---|---|---|
| Worker | `marose-web` | — |
| D1 | `marose-web-db` | `DB` |
| R2 | `marose-web-media` | `MEDIA` |
| KV (object cache) | `marose-web-cache` | `CACHE` |
| Email Sending | `marosectg.com` | `EMAIL` |

## Develop

```bash
pnpm install
pnpm dev               # http://localhost:4321, admin at /_emdash/admin
pnpm seed:validate     # validate seed/seed.json
pnpm check             # biome
pnpm build
```

On the first visit to `/_emdash/admin`, the setup wizard applies `seed/seed.json`, which contains the content model and initial content. In development, emails are printed to the terminal.

## Deploy

```bash
pnpm wrangler login
pnpm deploy            # astro build && wrangler deploy (first run provisions D1/R2/KV)
```

After the first deploy, open `/_emdash/admin` **immediately** and finish setup: the first visitor becomes the administrator. Then send a test email from **Settings → Email**.

Full migration plan: [docs/plans/emdash-migration.md](docs/plans/emdash-migration.md).

## Layout

```text
seed/seed.json              content model (collections, block types, menus) + initial content
src/pages/                  index (page "inicio"), [slug], 404 (page "no-encontrado")
src/layouts/Base.astro      head/SEO/JSON-LD, navbar, footer, cart drawer, reveal script
src/components/blocks/      one Astro component per CMS block type
src/islands/                React islands (cart, product card, carousel, ui primitives)
src/lib/                    business info, formatting, WhatsApp order builder, shared types
src/plugins/marose-email.ts branded email provider
```
