# Marose — Style Reference
> a kawaii recipe card come to life — hand-lettered bakery warmth, pillowy rounded surfaces, dusty-rose hearts and a bubblegum-pink pop. Cookies & postres artesanales, hechos frescos y con amor para compartir.

**Theme:** light

Marose is a cute, hand-drawn artisan bakery from Cartagena. The brand lives in the world of its mascot: a soft little cloud-of-dough baker in a chef's hat, holding a whisk, surrounded by tiny hearts. The whole identity is warm, feminine and huggable — a blush-cream canvas, chocolate-brown hand-lettering, dusty-rose heart doodles, and a single bubblegum-pink "pop" reserved for hero product moments and packaging photography. Nothing is sharp or corporate: every card, button and photo is **rounded and pillowy**, elevation is done with soft, warm-tinted shadows (never hard lines), and hand-drawn accents — hearts, sparkles, stars, a stray whisk — scatter lightly across the page like the doodles on the real packaging. The design should feel like an Instagram-first, WhatsApp-ordering neighborhood dessert brand: appetizing, playful, and unmistakably *hecho con amor*. Where Alison Roman is a flat printed cookbook, Marose is a fresh-baked, cushioned, rounded little world.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Cocoa Ink | `#4a3121` | `--color-cocoa-ink` | Primary text, headings, mascot line-art, and the fill of the primary "Pedir" button — the warm dark chocolate that anchors every screen and stays readable on all cream surfaces |
| Caramel Swirl | `#a3652f` | `--color-caramel-swirl` | The "Marose" wordmark brown — a warmer caramel used for brand emphasis, secondary headings, prices, and playful accent words |
| Blush Rose | `#e0a6a1` | `--color-blush-rose` | Dusty rose from the logo hearts — hand-drawn heart/sparkle doodles, soft underlines, decorative dividers and gentle accents |
| Bubblegum Pop | `#e783b0` | `--color-bubblegum-pop` | The hot-pink product-photography background — used for hero/feature backgrounds, the packaging seal, and one energetic secondary CTA. The single high-energy color; use with intent, never as body text |
| Blush Canvas | `#faf0ec` | `--color-blush-canvas` | Page background — the soft blush-cream from the logo that sets the whole mood; every screen starts here |
| Cream Card | `#fffaf4` | `--color-cream-card` | Card and product-tile surfaces — a warm step up from the canvas, the base for elevated content |
| Sticker Blush | `#f7e0e2` | `--color-sticker-blush` | Pale rose used for flavor pills, badges, highlight bands and the circular mascot "sticker" — the packaging-label tone |
| Cocoa Hairline | `#ecdccd` | `--color-cocoa-hairline` | Warm hairline for the rare border or divider — always warm brown-cream, never a cool gray |
| Paper White | `#ffffff` | `--color-paper-white` | Reverse text on dark/pink fills and the highest surface lift |

### Flavor Accents (optional)
Tiny food-derived hues for differentiating flavors on pills, dots or menu tags. Never used for UI chrome — only as small flavor cues that echo the real product.

| Flavor | Value | Token |
|--------|-------|-------|
| Limón (lime zest) | `#a7c94a` | `--color-flavor-lime` |
| Maracuyá (passionfruit) | `#f0b429` | `--color-flavor-maracuya` |
| Arequipe (dulce de leche) | `#d98a3d` | `--color-flavor-arequipe` |
| Nutella / cacao | `#6b4226` | `--color-flavor-cocoa` |

## Tokens — Typography

### Fondant Display — Rounded display face for headlines, section titles, product names and hero copy from 24px up to 88px. A soft, friendly, geometric-rounded sans that echoes the plump hand-lettered "Marose" wordmark without trying to imitate a script. This is the cute-but-legible headline voice. Substitute with **Baloo 2** or **Fredoka** (both Google Fonts). · `--font-fondant-display`
- **Substitute:** Baloo 2, Fredoka
- **Weights:** 500, 600, 700
- **Sizes:** 24px, 28px, 40px, 60px, 88px
- **Line height:** 1.05, 1.10, 1.20
- **Letter spacing:** -0.01em at display sizes, 0 at 24–28px
- **Role:** Rounded display face for headlines, section titles, product names and hero copy. Soft, friendly and plump — the headline personality of the brand.

### Sugar Sans — Rounded humanist face for all body copy, descriptions, buttons, nav links, prices and UI. Set in ALL-CAPS with +0.08em tracking it becomes the packaging-label voice ("MAROSE", "NUEVO"). The dependable workhorse that lets Fondant Display stay playful. Substitute with **Nunito** or **Quicksand** (Google Fonts). · `--font-sugar-sans`
- **Substitute:** Nunito, Quicksand
- **Weights:** 400, 600, 700
- **Sizes:** 15px, 17px, 21px, 24px
- **Line height:** 1.40, 1.60
- **Letter spacing:** 0 for running text, +0.08em for uppercase labels
- **Role:** Body, button, card, nav and label sans. Rounded and warm; uppercase+tracked for sticker-style labels.

### Handwritten Sugar — Hand-lettered accent for doodle-style call-outs, flavor labels, captions and tiny flourishes (e.g. "arequipe", "Nutella", "hecho con amor", "¡nuevo!"). Mirrors the white handwriting on the real story posts. Used sparingly — never for body copy or anything that must be scanned quickly. Substitute with **Caveat**, **Gochi Hand** or **Shantell Sans** (Google Fonts). · `--font-handwritten-sugar`
- **Substitute:** Caveat, Gochi Hand, Shantell Sans
- **Weights:** 400, 600
- **Sizes:** 21px, 28px, 40px
- **Line height:** 1.10, 1.30
- **Letter spacing:** 0
- **Role:** Handwritten flourish for accent words, flavor doodles and captions. Decorative, sparing, always paired with a rounded sans for the real information.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| body-sm | 15px | 1.6 | 0 | `--text-body-sm` |
| body | 17px | 1.6 | 0 | `--text-body` |
| label | 14px | 1.2 | +0.08em (uppercase) | `--text-label` |
| subheading | 21px | 1.4 | 0 | `--text-subheading` |
| subheading-lg | 24px | 1.4 | -0.005em | `--text-subheading-lg` |
| heading-sm | 28px | 1.2 | -0.01em | `--text-heading-sm` |
| heading | 40px | 1.15 | -0.01em | `--text-heading` |
| heading-lg | 60px | 1.1 | -0.01em | `--text-heading-lg` |
| display | 88px | 1.05 | -0.01em | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 8px

**Density:** comfortable / cozy

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 80 | 80px | `--spacing-80` |
| 96 | 96px | `--spacing-96` |
| 128 | 128px | `--spacing-128` |

### Border Radius

Rounded geometry is the brand's signature — the opposite of a flat editorial system. Everything is soft and pillowy.

| Element | Value | Token |
|---------|-------|-------|
| pills / flavor tags | 999px | `--radius-pill` |
| buttons | 999px | `--radius-button` |
| cards / product tiles | 28px | `--radius-card` |
| images | 20px | `--radius-image` |
| mascot badge / seal | 999px | `--radius-badge` |

### Shadows

Soft, diffuse, warm-tinted — never a hard line. Elevation reads like a cushioned marshmallow, not a UI card.

| Name | Value | Token |
|------|-------|-------|
| soft | `0 10px 30px -12px rgba(74, 49, 33, 0.16)` | `--shadow-soft` |
| lift (hover) | `0 18px 44px -14px rgba(74, 49, 33, 0.22)` | `--shadow-lift` |
| pop (on pink) | `0 14px 36px -12px rgba(231, 131, 176, 0.35)` | `--shadow-pop` |

### Layout

- **Page max-width:** 1120px
- **Section gap:** 72–96px
- **Card padding:** 24–32px
- **Element gap:** 20px
- **Product grid:** 2 columns mobile-up, 3 columns desktop, 24–32px gap

## Components

### Primary "Pedir por WhatsApp" Button
**Role:** Main action for ordering a product

Pill shape (`--radius-button`), Cocoa Ink (`#4a3121`) fill, Paper White text in Sugar Sans 17px weight 600, WhatsApp glyph 20px to the left with 8px gap, 14px vertical / 24px horizontal padding, `--shadow-soft`. On hover: `--shadow-lift` and a gentle `translateY(-2px)` + `scale(1.02)`. The default primary action across the whole site — ordering is always one warm brown pill away.

### Bubblegum CTA (secondary)
**Role:** Energetic alternate action — "Ver menú", hero call-to-action, promos

Pill shape, Bubblegum Pop (`#e783b0`) fill, Paper White text in Sugar Sans 17px weight 700, same padding as the primary, `--shadow-pop`. Used at most once per section; it is the loud sibling of the brown button, never both competing in the same block.

### Product Card
**Role:** Showcase one dessert with photo, flavors, price and order action

Cream Card (`#fffaf4`) surface, 28px radius, `--shadow-soft`. Product photo at top filling the width, 20px radius, warm and appetizing. Below: product name in Fondant Display 24–28px weight 600 Cocoa Ink; a row of flavor pills; a short description in Sugar Sans 15–17px; the price in Caramel Swirl weight 700; and the primary WhatsApp button. 24–32px inner padding. On hover the whole card lifts with `--shadow-lift`. No border — the soft shadow and cream step do the separating.

### Flavor Pill / Tag
**Role:** Flavor and status labels — "Limón", "Maracuyá", "Nuevo", "Relleno de Nutella"

Pill shape, Sticker Blush (`#f7e0e2`) background, Cocoa Ink text in Sugar Sans 14px weight 600, 6px vertical / 14px horizontal padding. Optional 8px flavor-accent dot on the left (lime, maracuyá, arequipe or cocoa). Multiple pills wrap in a tidy row under the product name.

### Hero Banner
**Role:** Page-level welcome — mascot + tagline + first CTA

A Bubblegum Pop or Blush Canvas panel with generously rounded corners. The Marose mascot/logo sits as the focal artifact; the headline in Fondant Display 60–88px weight 600 Cocoa Ink; the tagline "hecho fresco y con amor para compartir" in Handwritten Sugar Caramel Swirl; a primary WhatsApp CTA. A hero product photo (rounded 20px) sits alongside, and light doodle accents (hearts, sparkles) drift around the edges — never over the text. 80–96px vertical padding.

### Doodle Accent Layer
**Role:** Hand-drawn atmosphere — the "sticker" energy of the real posts

Loose SVG doodles in Paper White or Blush Rose: hearts, four-point sparkles, stars, a tiny whisk or cloud. Scattered at low density around headings, corners and hero art. Decorative only — keep them clear of any text they'd make harder to read, and never let them touch a legibility-critical area. Respect reduced-motion; if they animate, only a slow, subtle float.

### Mascot Badge / Seal
**Role:** Circular packaging-style stamp used as a section marker, footer seal or "featured" badge

A round Sticker Blush (`#f7e0e2`) disc containing the mascot line-art in Cocoa Ink with "MAROSE" in Sugar Sans uppercase +0.08em tracking beneath — exactly like the sticker on the kraft bowls. Sits on the canvas with `--shadow-soft`. A signature recurring element; use it to sign off sections and the footer.

### Section Heading
**Role:** Title above a group of products or content

Fondant Display 40px weight 600 Cocoa Ink, optionally with one accent word in Caramel Swirl or Handwritten Sugar. A hand-drawn Blush Rose underline swoosh and a single small heart doodle may sit beneath — one flourish, not a cluster.

### Nav Bar
**Role:** Top navigation

A soft, floating rounded bar (Blush Canvas or translucent cream) with `--shadow-soft`. Mascot logo left; text links in Sugar Sans 15px weight 600 Cocoa Ink center/right; a Bubblegum or Cocoa WhatsApp pill CTA at the far right. Rounded corners, no hard border-bottom.

### Footer
**Role:** Bottom sign-off and contact

A Sticker Blush band with rounded top corners. Mascot badge, "Hecho con amor · Cartagena" in Handwritten Sugar, and links to Instagram + WhatsApp as small pills. Warm, quiet, huggable close.

## Do's and Don'ts

### Do
- Start every page on Blush Canvas (`#faf0ec`); layer Cream Card (`#fffaf4`) for tiles and Sticker Blush (`#f7e0e2`) for pills and badges.
- Round everything: pills and buttons fully (999px), cards at 28px, images at 20px. The soft geometry IS the brand.
- Use soft, warm-tinted shadows for elevation (`--shadow-soft` / `--shadow-lift`); let surfaces feel pillowy, not stacked with lines.
- Keep Cocoa Ink (`#4a3121`) as the primary text and primary button fill — it's the readable anchor everywhere.
- Reserve Bubblegum Pop (`#e783b0`) for hero backgrounds, the mascot seal, and one energetic CTA per section — an accent, never a text color.
- Let the mascot and hand-drawn doodles (hearts, sparkles, stars) carry the "hecho con amor" personality — scattered lightly, always clear of text.
- Set headlines in Fondant Display (Baloo 2 / Fredoka) and use Handwritten Sugar (Caveat) only for small flourishes and flavor labels.
- Make product photography the star: warm, bright, appetizing, shot on blush or bubblegum backgrounds with rounded corners.

### Don't
- Don't use 0px / sharp corners anywhere — the flat editorial look is the wrong brand; soft rounding is mandatory.
- Don't flood the page with Bubblegum Pop; it's a pop, not a base. Keep large surfaces cream/blush.
- Don't set body copy, buttons or anything scannable in Handwritten Sugar — the script is decoration only.
- Don't use cool grays for borders or shadows; every neutral leans warm brown-cream.
- Don't crowd a heading with more than one doodle flourish, or let doodles overlap text.
- Don't reach for corporate/geometric sans like Inter or Helvetica for headings — the rounded Fondant Display is the identity.
- Don't add hard 1px borders where a soft shadow and a cream surface step already do the separating.
- Don't let flavor-accent colors (lime, maracuyá, arequipe, cocoa) leak into UI chrome — they only cue flavor.

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 1 | Blush Canvas | `#faf0ec` | Default page background — every screen starts here |
| 2 | Cream Card | `#fffaf4` | Product tiles and card surfaces, softly lifted above the canvas |
| 3 | Sticker Blush | `#f7e0e2` | Pills, badges, highlight bands and the mascot seal |
| 4 | Bubblegum Pop | `#e783b0` | Hero/feature panels and the packaging seal — the energetic surface |
| 5 | Cocoa Ink | `#4a3121` | Darkest surface — primary buttons and any dark inversion block |

## Elevation

Marose is intentionally soft and cushioned — the opposite of a flat editorial system. Elevation is built from warm-tinted, diffuse shadows (`rgba(74,49,33,…)` on cream, `rgba(231,131,176,…)` on pink) and from cream-to-card surface steps, never from hard hairlines. Cards and buttons feel like plush little pillows that lift gently on hover. Borders are rare and, when present, a warm Cocoa Hairline (`#ecdccd`). No cool-gray shadows, no harsh outlines — the whole page should feel bakeable and huggable.

## Imagery

Imagery is warm, bright, appetizing dessert photography plus the hand-drawn mascot world. Product shots are taken on blush-cream or bubblegum-pink backgrounds — hero crops (a spoon lifting pavé over a kraft bowl) and top-down flat-lays (mini cookies in a dish, dip cups). All photos get rounded corners (20px) and a soft shadow; never sharp, never full-bleed to a hard edge. Over and around photos, light hand-drawn doodles — hearts, sparkles, stars, handwritten flavor labels ("arequipe", "Nutella") — recreate the Instagram-story energy of the real brand. The mascot (the little dough-cloud baker) recurs as a friendly guide: as the logo, the packaging seal, and small spot illustrations. Photography is the appetite; the mascot and doodles are the love.

## Layout

Max-width 1120px, centered, with generous but cozy spacing. The page opens with a rounded hero pairing the mascot + tagline with a hero product photo and a WhatsApp CTA. Products live in a soft grid of rounded Cream Cards — 2 columns on mobile-up, 3 on desktop — each a self-contained little tile with photo, flavor pills, price and order button. Sections are separated by 72–96px of blush whitespace and a single doodle flourish, never by hard rules or alternating color bands (the cream canvas stays continuous). The mascot seal recurs to sign off sections and the footer. Rhythm is warm and Instagram-native: big rounded headings, short friendly copy, one clear action (order) per product, and hand-drawn accents drifting at the margins. Navigation is a soft floating bar; the footer is a rounded Sticker Blush band with the seal and social links.

## Agent Prompt Guide

**Quick Color Reference**
- background: #faf0ec (Blush Canvas)
- card/surface: #fffaf4 (Cream Card)
- pill/badge surface: #f7e0e2 (Sticker Blush)
- text / primary action: #4a3121 (Cocoa Ink)
- brand accent / price: #a3652f (Caramel Swirl)
- doodle / heart accent: #e0a6a1 (Blush Rose)
- pop / hero / secondary CTA: #e783b0 (Bubblegum Pop)
- warm hairline (rare): #ecdccd (Cocoa Hairline)

**3 Example Component Prompts**

1. Build a hero banner on a #faf0ec canvas with a large rounded (28px) Bubblegum Pop (#e783b0) panel. Place the Marose mascot logo as the focal image, a headline in Baloo 2 (Fondant Display) 72px weight 600 in #4a3121 reading "Cookies & postres artesanales", and a tagline in Caveat (Handwritten Sugar) 32px in #a3652f reading "hecho fresco y con amor para compartir". Add a pill-shaped primary CTA: #4a3121 fill, white text in Nunito 17px weight 600 with a WhatsApp glyph, 14px/24px padding, soft warm shadow. Scatter a few white and #e0a6a1 hand-drawn heart and sparkle SVGs around the edges, clear of the text.

2. Build a product card. Cream Card (#fffaf4) surface, 28px radius, soft warm shadow (0 10px 30px -12px rgba(74,49,33,0.16)), 28px padding. Top: an appetizing dessert photo at 20px radius. Then the name in Baloo 2 26px weight 600 #4a3121 ("Pavé"), a row of pill flavor tags (Sticker Blush #f7e0e2 background, Nunito 14px weight 600 #4a3121, with a small lime and maracuyá accent dot), a short description in Nunito 16px #4a3121, a price in Nunito 18px weight 700 #a3652f, and a full-width pill WhatsApp button (#4a3121 fill, white text). The whole card lifts on hover.

3. Build a flavor pill. Pill shape (999px radius), Sticker Blush (#f7e0e2) background, an 8px flavor-accent dot on the left (#a7c94a for limón, #f0b429 for maracuyá), and a label in Nunito 14px weight 600 #4a3121, 6px vertical / 14px horizontal padding. No border, no shadow.

## Similar Brands

- **Milk Bar** — playful, hand-drawn dessert energy with soft pastel surfaces and rounded, appetite-first product photography
- **Flour Shop** — maximal-cute pastel palette, doodle accents, and a mascot-driven, Instagram-native personality
- **Momofuku Milk Bar (packaging)** — warm cream + candy-pink pop, rounded friendly type, and a cookie-and-pie forward menu
- **Kawaii café / repostería aesthetic (LatAm Instagram)** — mascot line-art, blush-and-brown warmth, handwritten flavor labels, WhatsApp-first ordering

## Menu Reference (content)

For layout and copy, the initial Marose menu is:
- **Pavé** — flavors: Limón, Maracuyá
- **Bowl de 8 mini cookies** — served with a Dip de Nutella (dips also available: arequipe, Nutella)
- **Cookie pie** — relleno de Nutella
- **Torta de zanahoria**

Tagline: *"Hecho fresco y con amor para compartir."* · Location: Cartagena.

## Quick Start

### Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&family=Nunito:wght@400;600;700&family=Caveat:wght@400;600&display=swap" rel="stylesheet">
```

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-cocoa-ink: #4a3121;
  --color-caramel-swirl: #a3652f;
  --color-blush-rose: #e0a6a1;
  --color-bubblegum-pop: #e783b0;
  --color-blush-canvas: #faf0ec;
  --color-cream-card: #fffaf4;
  --color-sticker-blush: #f7e0e2;
  --color-cocoa-hairline: #ecdccd;
  --color-paper-white: #ffffff;

  /* Flavor accents (optional) */
  --color-flavor-lime: #a7c94a;
  --color-flavor-maracuya: #f0b429;
  --color-flavor-arequipe: #d98a3d;
  --color-flavor-cocoa: #6b4226;

  /* Typography — Font Families */
  --font-fondant-display: 'Baloo 2', 'Fredoka', ui-rounded, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-sugar-sans: 'Nunito', 'Quicksand', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-handwritten-sugar: 'Caveat', 'Gochi Hand', 'Shantell Sans', cursive;

  /* Typography — Scale */
  --text-body-sm: 15px;   --leading-body-sm: 1.6;
  --text-body: 17px;      --leading-body: 1.6;
  --text-label: 14px;     --leading-label: 1.2;   --tracking-label: 0.08em;
  --text-subheading: 21px;    --leading-subheading: 1.4;
  --text-subheading-lg: 24px; --leading-subheading-lg: 1.4; --tracking-subheading-lg: -0.005em;
  --text-heading-sm: 28px;    --leading-heading-sm: 1.2;  --tracking-heading-sm: -0.01em;
  --text-heading: 40px;       --leading-heading: 1.15;    --tracking-heading: -0.01em;
  --text-heading-lg: 60px;    --leading-heading-lg: 1.1;  --tracking-heading-lg: -0.01em;
  --text-display: 88px;       --leading-display: 1.05;    --tracking-display: -0.01em;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 8px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-96: 96px;
  --spacing-128: 128px;

  /* Layout */
  --page-max-width: 1120px;
  --section-gap: 96px;
  --card-padding: 28px;
  --element-gap: 20px;

  /* Radii */
  --radius-pill: 999px;
  --radius-button: 999px;
  --radius-card: 28px;
  --radius-image: 20px;
  --radius-badge: 999px;

  /* Shadows */
  --shadow-soft: 0 10px 30px -12px rgba(74, 49, 33, 0.16);
  --shadow-lift: 0 18px 44px -14px rgba(74, 49, 33, 0.22);
  --shadow-pop: 0 14px 36px -12px rgba(231, 131, 176, 0.35);

  /* Surfaces */
  --surface-blush-canvas: #faf0ec;
  --surface-cream-card: #fffaf4;
  --surface-sticker-blush: #f7e0e2;
  --surface-bubblegum-pop: #e783b0;
  --surface-cocoa-ink: #4a3121;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-cocoa-ink: #4a3121;
  --color-caramel-swirl: #a3652f;
  --color-blush-rose: #e0a6a1;
  --color-bubblegum-pop: #e783b0;
  --color-blush-canvas: #faf0ec;
  --color-cream-card: #fffaf4;
  --color-sticker-blush: #f7e0e2;
  --color-cocoa-hairline: #ecdccd;
  --color-paper-white: #ffffff;
  --color-flavor-lime: #a7c94a;
  --color-flavor-maracuya: #f0b429;
  --color-flavor-arequipe: #d98a3d;
  --color-flavor-cocoa: #6b4226;

  /* Typography */
  --font-fondant-display: 'Baloo 2', 'Fredoka', ui-rounded, system-ui, sans-serif;
  --font-sugar-sans: 'Nunito', 'Quicksand', ui-sans-serif, system-ui, sans-serif;
  --font-handwritten-sugar: 'Caveat', 'Gochi Hand', 'Shantell Sans', cursive;

  /* Typography — Scale */
  --text-body-sm: 15px;
  --text-body: 17px;
  --text-label: 14px;
  --text-subheading: 21px;
  --text-subheading-lg: 24px;
  --text-heading-sm: 28px;
  --text-heading: 40px;
  --text-heading-lg: 60px;
  --text-display: 88px;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-96: 96px;
  --spacing-128: 128px;

  /* Radii */
  --radius-pill: 999px;
  --radius-button: 999px;
  --radius-card: 28px;
  --radius-image: 20px;
  --radius-badge: 999px;

  /* Shadows */
  --shadow-soft: 0 10px 30px -12px rgba(74, 49, 33, 0.16);
  --shadow-lift: 0 18px 44px -14px rgba(74, 49, 33, 0.22);
  --shadow-pop: 0 14px 36px -12px rgba(231, 131, 176, 0.35);
}
```
