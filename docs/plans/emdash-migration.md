# Migration Plan — TanStack Start → EmDash CMS on Cloudflare

> Status: IN PROGRESS (P0–P5, P7, P8 executed on `feat/emdash-migration`; P6 deploy pending confirmation) · Owner: Diego · Created: 2026-10-14
>
> Execution notes (2026-10-14):
> - Admin locale code is `es-419` (`es` does not exist; the build lists `es-419` and `es-ES`).
> - `wrangler@4.151.0` / `@cloudflare/vite-plugin@1.64.0` depend on an unpublished `miniflare` beta. They are pinned to `4.150.0` / `1.63.2` via `pnpm-workspace.yaml` overrides.
> - P7 done early: `src/plugins/marose-email.ts` wraps `createCloudflareEmailDeliver` with the brand layout.
> - WhatsApp `573014023272` confirmed as the only business number. JSON-LD now uses it too.
> - `marosectg.com` already uses Cloudflare nameservers (proxied).
> Source of truth for the content inventory: subagent report (Engram `marose/emdash-migration/plan`).

## 0. Goal and non-goals

**Goal.** Rebuild marosectg.com as an Astro + EmDash site on Cloudflare Workers (D1 + R2). Non-technical Marose staff edit every visible section from `/_emdash/admin` using page blocks with simple, Spanish-labelled forms. The site keeps the same look (DESIGN.md dark rebrand), the same cart → WhatsApp ordering flow, and the same SEO.

**Non-goals (this migration).**
- No online payments, no order database. Ordering stays WhatsApp-based.
- No visual redesign. Pixel parity with the current site is the bar.
- No multi-language site (Spanish only, no `i18n` block).

## 1. Key decisions

| # | Decision | Why |
|---|---|---|
| D1 | Migrate **in place** on branch `feat/emdash-migration`, using `@emdash-cms/template-marketing-cloudflare` as the *reference* for the wiring files (scaffolded outside the repo, files copied in). | Keeps git history, issues, and the public repo, which seed media URLs depend on. The marketing template already ships the `blocks` pattern we need. |
| D2 | One `pages` collection with a `sections` **blocks** field. Home = entry `inicio`, rendered at `/`. | Editors reorder, hide, and duplicate sections without a developer. |
| D3 | Products, reviews, and business info live in **their own collections**, not inside blocks. | Blocks cannot hold `reference` fields (EmDash docs). Products need to be reusable and sortable, so the `menu_grid` block *queries* the `products` collection. |
| D4 | Colors that editors pick come from a **select of named brand flavors** (Limón, Maracuyá, Nutella…), not a hex text field. Code maps the name to a hex value. | Easy for a human to fill, and it stays on-brand. |
| D5 | React stays only as **islands**: cart (trigger + drawer + store), product card + carousel + flavor dialog. Everything else becomes static `.astro`. | Minimal JS. Existing React code is reused almost verbatim. |
| D6 | Replace `motion` reveal with a ~20-line `IntersectionObserver` script plus the same `data-reveal` CSS. | Removes a client-side dependency for a purely decorative effect. Reduced-motion and noscript behavior are preserved. |
| D7 | Native Cloudflare email via `cloudflareEmail()` and a `send_email` binding. Branded HTML for system emails is **optional phase P7** (custom `email:deliver` provider). | System auth emails skip `email:beforeSend` (docs: hooks reference), so a hook alone cannot brand them. |
| D8 | No sandboxed plugins, so no `LOADER` binding and no `sandboxRunner`. | Smaller attack surface. Add them later if a marketplace plugin is needed. |
| D9 | Cache: Workers Cache with `routeRules` for `/` (`maxAge 300, swr 86400`) + `Astro.cache.set(cacheHint)` + KV object cache. D1 `session` stays `"disabled"` + Targeted Placement near D1. | Follows EmDash Cloudflare guidance. Publishing purges by tag. |
| D10 | Admin language: Spanish (`admin.locales: ["es"]`) **if available**. The build fails loudly on an unknown code, so it is verified in P1. | Editors are Spanish speakers. |

## 2. Cloudflare resources (naming convention `marose-web-*`)

| Resource | Name | Binding | Notes |
|---|---|---|---|
| Worker | `marose-web` | — | Custom domain `marosectg.com` (+ `www` → apex redirect) |
| D1 | `marose-web-db` | `DB` | Created by the first `wrangler deploy` |
| R2 | `marose-web-media` | `MEDIA` | Media library (product photos, logos uploaded by editors) |
| KV | `marose-web-cache` | `CACHE` | EmDash object cache (`kvCache`) |
| KV | `marose-web-session` | `SESSION` | Astro Cloudflare adapter sessions (auto-provisioned on deploy) |
| Email Sending | sender domain `marosectg.com` | `EMAIL` | `send_email` binding |
| Images | — | `IMAGES` | Image transforms (auto-added by the adapter; declared explicitly) |
| Cron | `* * * * *` | — | Scheduled publishing + maintenance |
| D1 (preview) | `marose-web-db-preview` | `DB` | `previews` block, never shared with prod |
| R2 (preview) | `marose-web-media-preview` | `MEDIA` | |
| KV (preview) | `marose-web-session-preview` | `SESSION` | Required by `wrangler preview` |

`wrangler.jsonc` target:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "marose-web",
  "main": "./src/worker.ts",
  "compatibility_date": "2026-10-01",
  "compatibility_flags": ["nodejs_compat"],
  "d1_databases": [{ "binding": "DB", "database_name": "marose-web-db" }],
  "r2_buckets": [{ "binding": "MEDIA", "bucket_name": "marose-web-media" }],
  "kv_namespaces": [{ "binding": "CACHE" /* id written by `wrangler kv namespace create marose-web-cache` */ }],
  "send_email": [{ "name": "EMAIL" }],
  "images": { "binding": "IMAGES" },
  "triggers": { "crons": ["* * * * *"] },
  "vars": { "EMDASH_SITE_URL": "https://marosectg.com" },
  "placement": { "mode": "targeted", "region": "<D1 primary region>" },
  "routes": [{ "pattern": "marosectg.com", "custom_domain": true }],
  "previews": { /* *-preview resources, EMAIL, vars */ }
}
```

Do **not** set `siteUrl` in `astro.config.mjs`. It would break passkeys on previews. Use `EMDASH_SITE_URL` instead.

## 3. Target architecture

```text
astro.config.mjs          # cloudflare adapter, react(), emdash({...}), cacheCloudflare, routeRules, tailwind vite plugin
wrangler.jsonc
emdash-env.d.ts           # generated by EmDash from the model
seed/seed.json            # content model + initial content (see §4)
public/
  _headers                # immutable cache for /fonts/* /brand/* (replaces Nitro routeRules)
  fonts/**                # unchanged
  brand/                  # admin-logo.webp, favicon, og image (static, non-editable assets)
  robots.txt → removed    # EmDash Settings → SEO serves robots.txt; sitemap is built in
src/
  worker.ts               # handler + createScheduledHandler + PluginBridge
  live.config.ts          # _emdash live collection
  styles/global.css       # ported verbatim from src/styles.css (@theme tokens, @font-face)
  layouts/Base.astro      # <html lang="es">, EmDashHead, fonts preload, JSON-LD, Ahrefs, reveal script
  pages/
    index.astro           # getEmDashEntry("pages","inicio") → <PageSections/>
    [slug].astro          # other pages (future: /catering, /eventos…)
    404.astro             # entry "no-encontrado"
  components/
    Navbar.astro  Footer.astro  PageSections.astro  SectionHeading.astro  Swoosh.astro  Icon.astro
    blocks/  Hero.astro MenuGrid.astro Reviews.astro HowToOrder.astro About.astro CtaBanner.astro TextBlock.astro ErrorMessage.astro
  islands/                # React, client-side only
    cart/ (cart-trigger, cart-drawer, cart-view, cart-line-item, details-view)
    product-card.tsx  product-image-carousel.tsx  ui/*  stores/cart-store.ts
  lib/  format.ts  whatsapp-order.ts  flavor-colors.ts  relative-time.ts  business.ts
```

Data flow: an Astro page fetches the entry and its blocks, `business_info`, the `primary` menu, and site settings in parallel, passes plain serializable props to the islands, then calls `Astro.cache.set(cacheHint)`.

## 4. Content model (the editor experience)

All labels, descriptions, and options are in **Spanish** because editors read them. Slugs are English (they are code). Every block gets an `anchor` field ("ID de sección") so the navbar menu can link to `#menu`, `#nosotros`, and so on.

### 4.1 Site settings (built-in, `Settings → General / SEO`)
`title` "Marose", `tagline` "Hay momentos que merecen algo dulce.", `logo` (logo-2), `favicon`, `url`, `timezone` `America/Bogota`, `seo.defaultImage` (og_logo), and robots content.

### 4.2 Collection `business_info` — "Información del negocio" (single entry by convention)
`icon: storefront`, `routable: false`, `admin.quickCreate: false`, `supports: [revisions]`. The template reads the first published entry. The editor guide says "edit, never create a second one".

| slug | label (ES) | type | notes |
|---|---|---|---|
| `whatsapp_number` | Número de WhatsApp para pedidos | string, required, pattern `^57\d{10}$` | Help text: "con 57 adelante, sin + ni espacios" |
| `whatsapp_default_message` | Mensaje inicial de WhatsApp | string | "Hola Marose, quiero hacer un pedido" |
| `order_greeting` | Saludo del pedido del carrito | string | "Hola Marose 🤎" |
| `phone_display` | Teléfono visible / Google | string | JSON-LD `telephone` |
| `city` / `region` / `country` | Ciudad / Departamento / País | string | Cartagena de Indias / Bolívar / CO |
| `delivery_note` | Nota de domicilio | string | Cart footer "+ Domicilio" hint |
| `instagram_url` / `tiktok_url` | Instagram / TikTok | url | Footer + JSON-LD `sameAs` |
| `footer_tagline` | Frase del pie de página (cursiva) | string, maxLength 40 | "Hecho con amor · Cartagena" |
| `footer_legal` | Texto legal del pie | string | "Repostería artesanal" |
| `price_range` / `cuisine` | Rango de precio / Tipo de cocina | string | JSON-LD |

### 4.3 Collection `products` — "Productos" / "Producto"
`icon: cookie`, `routable: false`, `supports: [drafts, revisions, search]`, `titleField: name`, `admin.listColumns: [price, badge, available, sort_order]`.

| slug | label (ES) | type | notes |
|---|---|---|---|
| `name` | Nombre | string, required, searchable | |
| `description` | Descripción | text, required, maxLength 300 | |
| `price` | Precio (COP, sin puntos) | integer, required, min 0 | Rendered with `formatCOP` |
| `photos` | Fotos | repeater (min 1, max 6): `image` (image, required), `alt` (string, "Describe la foto") | The first photo is the cart thumbnail |
| `badge` | Etiqueta | select (required, default "Sin etiqueta"): Sin etiqueta, Favorito, Nuevo, Edición limitada, Agotado | An optional select cannot be cleared in the admin, so "Sin etiqueta" is the explicit empty value. "Agotado" disables the add-to-cart button |
| `requires_flavor` | ¿El cliente debe elegir sabor? | boolean | Opens the flavor dialog |
| `flavors` | Sabores u opciones | repeater (max 8): `label` (string, req), `color` (select: Limón, Maracuyá, Nutella, Arequipe, Chocolate, Fresa, Canela, Neutro), `image` (image, "Foto de este sabor", optional) | `lib/flavor-colors.ts` maps names to hex |
| `available` | Disponible | boolean, default true, indexed | Hidden from the menu when off |
| `sort_order` | Orden en el menú | integer, indexed | Lower numbers appear first |

### 4.4 Collection `reviews` — "Opiniones" / "Opinión"
`icon: chat-circle-text`, `routable: false`, `supports: [drafts]`, `admin.listColumns: [review_date, source, featured]`.

| slug | label (ES) | type |
|---|---|---|
| `comment` | Comentario | text, required, maxLength 240 |
| `author` | Nombre del cliente (opcional) | string |
| `review_date` | Fecha | datetime, indexed. Rendered as "hace 2 días" with `Intl.RelativeTimeFormat('es')` |
| `source` | ¿Dónde lo dijo? | select: WhatsApp, Instagram, TikTok, Google |
| `featured` | Mostrar en la página | boolean, default true, indexed |

### 4.5 Block types (category "Secciones Marose")
All blocks share `anchor` (string, "ID de sección, ej: menu"). Rule from DESIGN.md: **one script phrase per section**, so each block exposes at most one `*_script` field, capped at 30 characters.

| slug | Label (ES) | Fields (slug — label — type) |
|---|---|---|
| `hero` | Portada | `eyebrow` Texto pequeño superior · `heading` Título · `heading_script` Frase en cursiva (max 30) · `subtitle` Descripción (text) · `image` Imagen principal (image) · `cta_label` Texto del botón de WhatsApp · `cta_message` Mensaje de WhatsApp · `secondary_label` Texto del botón secundario · `secondary_href` Enlace del botón secundario (default `#menu`) |
| `menu_grid` | Menú de productos | `heading` Título · `heading_accent` Palabra resaltada · `subtitle` Descripción · `show_unavailable` Mostrar productos agotados (boolean). Products are queried: `available=true`, order `sort_order asc` |
| `reviews` | Opiniones de clientes | `heading` · `subtitle` · `max_items` Cuántas mostrar (integer, default 8) · `speed` Velocidad (select: Lenta, Normal, Rápida). Reviews queried: `featured=true`, newest first |
| `how_to_order` | Cómo pedir | `badge` Etiqueta · `heading` · `subtitle` · `steps` Pasos (repeater max 6: `title`, `description` text, `note` Nota corta, `icon` select: Antojo, Mensaje, Confirmación, Regalo, Entrega, Calendario) · `notes` Avisos (repeater max 4: `label`, `text`, `icon` select: Calendario, Reloj, Ubicación, Corazón) · `cta_script` Frase en cursiva · `cta_label` Texto del botón · `cta_message` Mensaje de WhatsApp. Card tilt alternates automatically (not editable). |
| `about` | Nosotros | `heading` · `heading_accent` · `body` Texto (portableText: bold, italic, link only) · `signoff_script` Firma en cursiva · `image` Imagen (circle) |
| `cta_banner` | Llamado a la acción | `heading` · `text` · `cta_label` · `cta_message` |
| `text_block` | Texto libre | `heading` · `body` (portableText) |
| `error_message` | Mensaje de error (404) | `code` · `heading` · `heading_script` · `body` · `home_label` · `cta_label` · `cta_message` |

### 4.6 Collection `pages` — "Páginas" / "Página"
`icon: browsers`, `urlPattern: "/{slug}"`, `supports: [drafts, revisions, preview, seo]`, fields: `title` Título (string, required), `sections` Secciones (blocks, `allowedTypes` in the order above, `maxItems 20`).
Seeded entries:
- `inicio`: hero → menu_grid → reviews → how_to_order → about (exact current copy).
- `no-encontrado`: error_message (current 404 copy).

### 4.7 Menu `primary` — "Menú principal"
Custom links: Menú `/#menu`, Nosotros `/#nosotros`, Contacto `/#contacto`.

### 4.8 Seed content and media
- The seed file contains the **exact current copy** (inventory §1) for all blocks, 7 products, 8 reviews (dates computed back from the "hace N días" labels), and `business_info`.
- Images use `$media` with **raw GitHub URLs pinned to a commit SHA**, for example `https://raw.githubusercontent.com/diegoquinfa/web_marose/<sha>/public/food/pave.webp`. The repo is public, verified. EmDash downloads them into R2 during setup. After setup, `public/food/` is deleted from the repo.
- `emdash seed --validate` must pass before any deploy.
- Reminder: the seed only applies to an **empty** database. After go-live, schema changes go through the admin UI and an exported seed.

## 5. Component mapping

| Current (TanStack) | New | Kind |
|---|---|---|
| `routes/__root.tsx` head | `layouts/Base.astro` + `EmDashHead` + JSON-LD built from `business_info` | static |
| `navbar.tsx` | `Navbar.astro` (menu `primary`, logo from settings) + `<CartTrigger client:load/>` | static + island |
| `hero.tsx` | `blocks/Hero.astro` | static |
| `menu.tsx` + `product-card.tsx` + carousel | `blocks/MenuGrid.astro` → `<ProductCard client:visible/>` per product | island |
| `reviews-section.tsx` + `review-card.tsx` | `blocks/Reviews.astro` (CSS marquee, duplicated track) | static |
| `how-to-order.tsx` | `blocks/HowToOrder.astro` + `Icon.astro` (icon name → inline SVG) | static |
| `about.tsx` | `blocks/About.astro` | static |
| `footer.tsx` | `Footer.astro` (business_info) | static |
| `not-found.tsx` | `pages/404.astro` → `blocks/ErrorMessage.astro` | static |
| `cart/*`, `stores/cart-store.ts`, `ui/*` | `islands/**` (unchanged logic; WhatsApp number + greeting arrive as props) | island |
| `motion/reveal.tsx` | `data-reveal` + inline IO script in `Base.astro` | vanilla |
| `whatsapp-button.tsx` | `WhatsappButton.astro` (number from `business_info`) | static |
| `lib/whatsapp-order.ts` | same, but the number and greeting become parameters | lib |

Note: the cart persists in localStorage under key `marose-cart-v1`. Keep the same key so carts survive the cutover.

## 6. Admin branding (Marose instead of EmDash)

```js
emdash({
  admin: {
    siteName: "Marose",                         // sidebar header + browser window title
    logo: "/brand/admin-logo.webp",             // login page + sidebar
    favicon: "/brand/favicon.webp",
    footerLabel: "Marose · Repostería artesanal",
    locales: ["es"],                            // verify code exists in P1; build fails if unknown
  },
})
```

- `admin-logo.webp`: wordmark derived from `banner-2.webp`, legible on both light and dark admin themes. Check both.
- Spanish collection labels, `labelSingular`, descriptions, and Phosphor icons (§4) make the sidebar read "Páginas, Productos, Opiniones, Información del negocio".
- Group the collections: `group: "Contenido del sitio"` for pages/products/reviews and `group: "Configuración"` for business_info.
- Admin theme colors are **not** a documented option. Do not hack CSS into the admin bundle; it would break on EmDash updates.

## 7. Email (Cloudflare Email Sending)

1. **Manual (Diego):** in the Cloudflare dashboard, onboard and verify the sender domain `marosectg.com` (or a subdomain such as `mail.marosectg.com`). Cloudflare adds SPF/DKIM. Add a DMARC record.
2. Optional: enable Email Routing so `hola@marosectg.com` forwards to the owner's inbox. It becomes the `replyTo`.
3. Code:

```js
import { cloudflareEmail } from "@emdash-cms/cloudflare/plugins";
emdash({
  plugins: [
    cloudflareEmail({
      from: { email: "no-reply@marosectg.com", name: "Marose" },
      replyTo: "hola@marosectg.com",
    }),
  ],
});
```

4. Add `send_email: [{ name: "EMAIL" }]` to `wrangler.jsonc` and to the `previews` block.
5. Verify with **Settings → Email → Send test email**, then a magic-link sign-in, then a user invite.
6. Optional P7, **branded system emails**: a small native plugin `plugins/marose-mailer` that registers an exclusive `email:deliver` hook, wraps `message.text`/`html` in a Marose HTML template (logo, cocoa/rose palette, footer), and sends through the same `EMAIL` binding. It replaces `cloudflareEmail()`. This is the only way to brand magic-link and invite emails, because they bypass `email:beforeSend`.

## 8. SEO, performance, and parity

- `EmDashHead` + `createPublicPageContext` handle title, description, OG, canonical, and favicon. The `pages` `seo` panel lets editors override the home page title and description.
- Bakery JSON-LD is generated from `business_info`, so the same data feeds the footer and Google.
- Keep the Ahrefs analytics script with its `data-key`.
- Fonts: same preload list, `_headers` immutable caching.
- Hero image: `<Image priority>` from `emdash/ui` (R2 + IMAGES transforms). The Images free tier covers 5,000 unique transforms per month, far above Marose's needs.
- Targets: Lighthouse mobile ≥ 95 for performance, accessibility, and SEO. Same CLS behavior as today.

## 9. Execution phases and workers

Legend: 🧑 = main session (orchestrator) · 🤖 = subagent. Parallel lanes have **disjoint file ownership**. The field slugs in §4 are the shared contract, so lanes do not wait on each other.

| Phase | Who | Owns (files) | Work | Exit gate |
|---|---|---|---|---|
| **P0 Prep** | 🧑 + Diego | — | Resolve open questions (§12). `git checkout -b feat/emdash-migration`. Scaffold `template-marketing-cloudflare` into `../_emdash-ref` (outside repo, reference only). `pnpm wrangler login`. Diego onboards the email sender domain. | Answers recorded |
| **P1 Foundation** | 🤖 `gentle-ai-worker` | `package.json`, `astro.config.mjs`, `wrangler.jsonc`, `tsconfig.json`, `src/worker.ts`, `src/live.config.ts`, `src/styles/global.css`, `src/layouts/Base.astro`, `public/_headers`, `biome.json` | Swap deps (remove TanStack/Nitro/Vite-only plugins; add astro, @astrojs/cloudflare, @astrojs/react, emdash, @emdash-cms/cloudflare, wrangler). Port styles verbatim. Minimal seed placeholder. Verify `admin.locales: ["es"]` and the React Compiler setup with Astro docs. | `pnpm build` ok · `astro dev` → `/_emdash/admin` setup wizard renders · `pnpm emdash doctor` scheduler check passes |
| **P2a Content model** | 🤖 `gentle-ai-worker` | `seed/**` | Write `seed/seed.json` per §4 with exact copy and pinned `$media` URLs. Validate. | `emdash seed --validate` clean · local setup applies the seed · admin shows Spanish forms |
| **P2b Static sections** | 🤖 `gentle-ai-worker` | `src/components/**` (non-island), `src/lib/flavor-colors.ts`, `src/lib/relative-time.ts` | Port Navbar, Footer, and all `blocks/*.astro`, `PageSections.astro` (`defineBlockComponents`), `Icon.astro`, `WhatsappButton.astro`. Classes copied 1:1 from the current TSX. | Biome clean · each block renders with seed data |
| **P2c Islands** | 🤖 `gentle-ai-worker` | `src/islands/**`, `src/lib/format.ts`, `src/lib/whatsapp-order.ts` | Move cart, store, product card, carousel, and ui. Adapt `Product` to the CMS shape (`photos[]`, `flavors[].color` name→hex, `badge`, `available`). Parametrize the WhatsApp number and greeting. Remove TanStack `Link`. Keep the localStorage key. | Islands typecheck · cart flow works in `astro dev` |
| **P3 Integration** | 🧑 | `src/pages/**`, `src/lib/business.ts` | Pages, 404, data loading, JSON-LD, `cacheHint`, routeRules, reveal script. Regenerate `emdash-env.d.ts`. | Full home page matches current prod side by side (desktop + mobile) |
| **P4 Admin & email** | 🤖 `gentle-ai-worker` | `public/brand/**`, emdash `admin` + `plugins` config block | Branding (§6), `cloudflareEmail` (§7), collection groups and icons. | Admin shows the Marose logo and window title · local console email works |
| **P5 Verify** | 🤖 `gentle-ai-verify` (+ optional Judgment Day: `jd-judge-a` / `jd-judge-b`) | read-only | Visual parity screenshots, Lighthouse, WCAG contrast pairs from DESIGN.md, editor walkthrough: (1) change hero text, (2) add a product with 2 flavors, (3) mark a product as Agotado, (4) reorder sections, (5) publish → visible within the cache window, (6) WhatsApp message format byte-identical to today. | All checks pass, or findings fixed by `jd-fix-agent` |
| **P6 Deploy & cutover** | 🧑 + Diego | `wrangler.jsonc` ids | Create KV `marose-web-cache` + preview resources. `pnpm build && pnpm wrangler deploy` (provisions `marose-web-db` + `marose-web-media`). Run the setup wizard on `*.workers.dev` immediately (the first visitor becomes admin). Seed applies and media lands in R2. Send a test email. Invite editors. Add the custom domain route. Move DNS. Keep the old host running for 7 days. | Prod checklist §10 green |
| **P7 Branded emails (optional)** | 🤖 `gentle-ai-worker` | `plugins/marose-mailer/**` | Exclusive `email:deliver` provider with the Marose HTML template (§7.6). | Test email + magic link arrive branded, SPF/DKIM pass |
| **P8 Cleanup & docs** | 🤖 `gentle-ai-worker` | old `src/routes`, `src/router.tsx`, `vite.config.ts`, `Dockerfile`, `public/food`, `README.md`, `docs/guia-editor.md` | Delete the TanStack stack. Update the README. Write an illustrated **Spanish editor guide** for staff. | Repo builds clean, no dead files |

**Review slicing (chained PRs, each ≤ ~400 changed lines where possible):** PR1 foundation (P1) → PR2 content model (P2a) → PR3 sections (P2b) → PR4 islands + integration (P2c + P3) → PR5 admin, email, deploy config (P4/P6) → PR6 cleanup + editor guide (P8). Each PR uses work-unit commits.

## 10. Production checklist and rollback

- [ ] `https://marosectg.com/` renders, with HTML served from Workers Cache (check the `cf-cache-status` header).
- [ ] `/_emdash/admin` loads with Marose branding. Passkey sign-in works on the custom domain.
- [ ] Media upload from the admin → visible on the site (R2 + IMAGES transform).
- [ ] Settings → Email test passes. Magic link received.
- [ ] `pnpm wrangler tail` shows the cron `Ok` every minute.
- [ ] Editing hero text and publishing shows the change on `/` within ~5 min (or immediately after the tag purge).
- [ ] Cart → WhatsApp opens with the correct number and message.
- [ ] Search Console: sitemap resubmitted, rich results test passes for Bakery JSON-LD.
- [ ] D1 backup: confirm the EmDash scheduled backups, plus a manual `wrangler d1 export marose-web-db` before DNS cutover.

**Rollback:** revert DNS to the previous host (kept alive 7 days). The Worker and data stay untouched for a retry.

## 11. How editors will use it (summary for the staff guide)

- **Cambiar textos de la página:** Páginas → Inicio → open a section → edit → Publicar.
- **Agregar o quitar un producto:** Productos → Nuevo → fill name, price, photos, flavors → Publicar. Use "Disponible" to hide one temporarily, and "Orden en el menú" to reorder.
- **Agregar una opinión:** Opiniones → Nueva → paste the comment and date.
- **Cambiar WhatsApp o redes:** Información del negocio → edit the only entry.
- **Reordenar secciones:** Páginas → Inicio → drag blocks in "Secciones".

## 12. Open questions (blocking P0)

1. ~~Phone numbers~~ → resolved: `573014023272` is the only number.
2. **Domain:** `marosectg.com` uses Cloudflare nameservers. Still to confirm: is it in the *same* account as the Worker, and where does the current origin run (rollback target)?
3. **Email:** sender address (`no-reply@marosectg.com`?) and the real inbox for replies.
4. **Editors:** who gets access (emails) and with which role (Admin vs Editor)?

## 13. Risks

| Risk | Mitigation |
|---|---|
| `es` admin locale missing | Build fails early in P1. Fall back to English admin while keeping Spanish labels in the model. |
| A second `business_info` entry created by mistake | `quickCreate: false`, editor guide, template reads the oldest published entry. |
| First visitor of an empty deploy becomes admin | Run the setup wizard immediately after the first deploy, or protect `*.workers.dev` with Cloudflare Access during setup. |
| Cached page served to editors without the toolbar | Documented behavior. Editors use Preview links. |
| Seed media URLs break if the repo goes private | URLs are pinned to a SHA and only used once at setup. Fallback is the REST multipart upload script. |
| D1 latency for distant visitors | Workers Cache serves most hits. Targeted Placement near D1. |

## 14. Post-execution adjustments (2026-10-14)

- **Content locale:** `i18n: { defaultLocale: "es", locales: ["es"] }` in `astro.config.mjs` (no routing block, because prefixing breaks the admin) plus `defaultLocale: "es"` in the seed. Without an `i18n` block EmDash defaults content to `en`.
- **Site URL from the environment:** `src/lib/site-url.ts` reads `EMDASH_SITE_URL` at runtime via `cloudflare:workers`. It drives canonical URLs, SEO, JSON-LD, and the email sender domain (`no-reply@<domain>`), logo, and links. Nothing hardcodes the domain.
- **Email:** no `replyTo`.
- **Empty select values:** `products.badge` uses "Sin etiqueta", `reviews.source` uses "No especificado", and `flavors.color` defaults to "Neutro". Optional selects cannot be cleared in the admin once set.
