# Marose — Style Reference
> an artisan patisserie after dark — deep cocoa noir, dusty-rose glow, high-contrast editorial serif with a hand-lettered whisper. Pastelería artesanal: elegant, warm, and quietly indulgent.

**Theme:** dark

Marose is an artisan patisserie from Cartagena whose new identity lives in the evening: a deep chocolate-brown canvas where a dusty-pink mascot — a smiling curly-haired baker girl — glows like neon on a bakery window at night. The brand is warm but grown-up: high-contrast editorial serif headlines ("Hay momentos que merecen"), a single flowing calligraphic accent (*algo dulce*), letterspaced caps for labels, and moody, candle-lit dessert photography. The kawaii doodle storm is gone — what remains is one confident pink, generous darkness, and typography that does the flirting. Everything is still softly rounded (the brand is dough, not glass), but the geometry is refined: smaller radii, hairline-warm borders, and elevation that reads as *glow*, not drop-shadow. Where the old Marose was an Instagram story, the new Marose is the moment before the first bite — intimate, elegant, unmistakably *artesanal*.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Cocoa Noir | `#251a13` | `--color-cocoa-noir` | Page background — the deep warm brown of the new logo; every screen starts here and the darkness IS the brand mood |
| Espresso Truffle | `#38271d` | `--color-espresso-truffle` | Card and product-tile surfaces — one warm step up from the noir, the base for elevated content |
| Deep Cocoa | `#1a120d` | `--color-deep-cocoa` | The darkest surface — footer band, inverted blocks, and any place that needs to sink below the canvas |
| Rose Petal | `#e3a4a8` | `--color-rose-petal` | THE brand pink — mascot line-art, wordmark color, primary CTA fill, prices, and the single energetic accent. Use with intent; it glows, so it never needs to shout |
| Rose Glow | `#f0bfc2` | `--color-rose-glow` | Lighter pink for hover states, highlighted accent words, and soft glows around the mascot |
| Dusty Rose | `#b8787d` | `--color-dusty-rose` | Muted rose for secondary accents — dividers, subtle underlines, inactive states, quiet flourishes |
| Blush Cream | `#f7e9e0` | `--color-blush-cream` | Primary text on dark — the warm cream of cake frosting; headlines and body copy that must read effortlessly |
| Rose Mist | `#cfa9a2` | `--color-rose-mist` | Secondary text — descriptions, captions, metadata; softer than Blush Cream, never cool gray |
| Cocoa Hairline | `#4d382c` | `--color-cocoa-hairline` | Warm hairline for the rare border or divider on dark — always warm brown, never a cool gray |
| Paper White | `#ffffff` | `--color-paper-white` | Reserved for fine print on pink fills and the highest-contrast moments |

### Flavor Accents (optional)
Tiny food-derived hues for differentiating flavors on pills, dots or menu tags. Slightly brightened so they stay legible on dark surfaces. Never used for UI chrome — only as small flavor cues that echo the real product.

| Flavor | Value | Token |
|--------|-------|-------|
| Limón (lime zest) | `#b8cf6a` | `--color-flavor-lime` |
| Maracuyá (passionfruit) | `#f2c14e` | `--color-flavor-maracuya` |
| Arequipe (dulce de leche) | `#e09a4f` | `--color-flavor-arequipe` |
| Nutella / cacao | `#a06844` | `--color-flavor-cocoa` |

## Tokens — Typography

### Velvet Serif — High-contrast editorial serif for headlines, section titles and hero copy from 24px up to 88px. The voice of "Hay momentos que merecen" — elegant, warm, a little indulgent. This is the personality of the new brand: patisserie as poetry. Use **Fraunces** (preferred, with soft optical sizing) or **Playfair Display** (Google Fonts). · `--font-velvet-serif`
- **Substitute:** Fraunces, Playfair Display, Cormorant Garamond
- **Weights:** 400, 500, 600 (+ italic for accent words)
- **Sizes:** 24px, 28px, 40px, 60px, 88px
- **Line height:** 1.05, 1.15, 1.25
- **Letter spacing:** -0.01em at display sizes, 0 at 24–28px
- **Role:** Editorial display serif for headlines, section titles and hero copy. High-contrast and warm — the elegance engine of the brand.

### Patisserie Sans — Clean geometric-humanist sans for all body copy, descriptions, buttons, nav links, prices and UI. Set in ALL-CAPS with +0.14em tracking it becomes the packaging-label voice ("MAROSE", "PASTELERÍA ARTESANAL", "NUEVO"). The quiet professional that lets Velvet Serif do the seducing. Use **Jost** or **Montserrat** (Google Fonts). · `--font-patisserie-sans`
- **Substitute:** Jost, Montserrat, Nunito Sans
- **Weights:** 400, 500, 600
- **Sizes:** 15px, 17px, 21px, 24px
- **Line height:** 1.45, 1.65
- **Letter spacing:** 0 for running text, +0.14em for uppercase labels
- **Role:** Body, button, card, nav and label sans. Clean and discreet; uppercase+tracked for the boutique-label voice.

### Dulce Script — Flowing calligraphic accent for one or two words per composition — *algo dulce*, *hecho con amor*, *inolvidables*, flavor whispers ("arequipe", "Nutella"). Mirrors the italic script in the brand photography. Used with extreme restraint: never for body copy, never more than one script phrase per viewport. Use **Allura** or **Pinyon Script** (Google Fonts). · `--font-dulce-script`
- **Substitute:** Allura, Pinyon Script, Great Vibes
- **Weights:** 400
- **Sizes:** 28px, 36px, 48px
- **Line height:** 1.2, 1.4
- **Letter spacing:** 0
- **Role:** Calligraphic whisper for the emotional word in a headline or a flavor flourish. Always paired with Velvet Serif for the real information.

### Wordmark Sans (sparing) — Heavy rounded display that echoes the chunky "MAROSE" wordmark in the new logo. Reserved for product names on cards and short punchy moments where the brand's playful DNA peeks through the elegance. Use **Baloo 2** or **Fredoka** (Google Fonts). · `--font-wordmark-sans`
- **Substitute:** Baloo 2, Fredoka
- **Weights:** 600, 700
- **Sizes:** 21px, 24px, 28px
- **Line height:** 1.15
- **Letter spacing:** 0
- **Role:** Product names and short brand-echo moments only. Never for headlines or body — Velvet Serif owns those.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| body-sm | 15px | 1.65 | 0 | `--text-body-sm` |
| body | 17px | 1.65 | 0 | `--text-body` |
| label | 13px | 1.3 | +0.14em (uppercase) | `--text-label` |
| subheading | 21px | 1.45 | 0 | `--text-subheading` |
| subheading-lg | 24px | 1.4 | -0.005em | `--text-subheading-lg` |
| heading-sm | 28px | 1.25 | -0.01em | `--text-heading-sm` |
| heading | 40px | 1.15 | -0.01em | `--text-heading` |
| heading-lg | 60px | 1.1 | -0.01em | `--text-heading-lg` |
| display | 88px | 1.05 | -0.01em | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 8px

**Density:** comfortable / airy — darkness needs breathing room

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

Rounded geometry is still the brand's signature — dough is soft — but refined: elegant, not inflated.

| Element | Value | Token |
|---------|-------|-------|
| pills / flavor tags | 999px | `--radius-pill` |
| buttons | 999px | `--radius-button` |
| cards / product tiles | 24px | `--radius-card` |
| images | 16px | `--radius-image` |
| mascot badge / seal | 999px | `--radius-badge` |

### Shadows & Glows

On dark, elevation reads as **glow and lift**, not gray drop-shadows. Shadows are deep and warm; the pink moments get a soft rose bloom.

| Name | Value | Token |
|------|-------|-------|
| soft | `0 12px 32px -12px rgba(0, 0, 0, 0.55)` | `--shadow-soft` |
| lift (hover) | `0 20px 48px -14px rgba(0, 0, 0, 0.65)` | `--shadow-lift` |
| rose bloom (on pink) | `0 14px 40px -12px rgba(227, 164, 168, 0.30)` | `--shadow-bloom` |

### Layout

- **Page max-width:** 1120px
- **Section gap:** 88–112px (dark layouts breathe more)
- **Card padding:** 28–32px
- **Element gap:** 20px
- **Product grid:** 2 columns mobile-up, 3 columns desktop, 24–32px gap

## Components

### Primary "Pedir por WhatsApp" Button
**Role:** Main action for ordering a product

Pill shape (`--radius-button`), Rose Petal (`#e3a4a8`) fill, Cocoa Noir (`#251a13`) text in Patisserie Sans 17px weight 600, WhatsApp glyph 20px to the left with 8px gap, 14px vertical / 24px horizontal padding, `--shadow-bloom`. On hover: fill shifts to Rose Glow (`#f0bfc2`) with a gentle `translateY(-2px)`. The pink pill is the signature action — one warm glow per ordering moment.

### Ghost CTA (secondary)
**Role:** Quiet alternate action — "Ver menú", secondary links, promos

Pill shape, transparent fill, 1px Cocoa Hairline (`#4d382c`) border, Blush Cream text in Patisserie Sans 15px weight 500 with +0.08em tracking. On hover: border warms to Dusty Rose and text shifts to Rose Petal. The discreet sibling — never competes with the pink pill; at most one of each per block.

### Product Card
**Role:** Showcase one dessert with photo, flavors, price and order action

Espresso Truffle (`#38271d`) surface, 24px radius, `--shadow-soft`. Product photo at top filling the width, 16px radius — moody, candle-lit, appetizing. Below: product name in Wordmark Sans 24px weight 600 Blush Cream (the playful echo of the MAROSE wordmark); a row of flavor pills; a short description in Patisserie Sans 15–17px Rose Mist; the price in Velvet Serif italic 21px Rose Petal; and the primary WhatsApp pill. 28px inner padding. On hover the card lifts with `--shadow-lift`. No border — the truffle step and soft shadow do the separating.

### Flavor Pill / Tag
**Role:** Flavor and status labels — "Limón", "Maracuyá", "Nuevo", "Relleno de Nutella"

Pill shape, transparent background with a 1px Cocoa Hairline border (or Deep Cocoa fill for a quieter variant), Rose Mist text in Patisserie Sans 13px weight 500 uppercase +0.14em tracking, 6px vertical / 14px horizontal padding. Optional 8px flavor-accent dot on the left (lime, maracuyá, arequipe or cocoa). Multiple pills wrap in a tidy row under the product name.

### Hero Banner
**Role:** Page-level welcome — wordmark + tagline + first CTA

A full-bleed Cocoa Noir panel — no panel color needed, the darkness is the panel. The MAROSE mascot (pink on dark, exactly like the new logo) sits as the focal artifact, optionally with a soft `--shadow-bloom` halo behind it. The headline in Velvet Serif 60–88px Blush Cream ("Hay momentos que merecen…") with ONE emotional phrase in Dulce Script Rose Petal (*algo dulce*). A letterspaced Patisserie Sans label above ("PASTELERÍA ARTESANAL · CARTAGENA") in Dusty Rose. A primary pink WhatsApp CTA plus a ghost "Ver menú". A moody hero product photo (16px radius, `--shadow-soft`) sits alongside. Restraint is the luxury here: no doodle storm, at most one thin Dusty Rose underline flourish. 96–128px vertical padding.

### Mascot Glow
**Role:** The brand's signature lighting effect — the pink neon warmth

A soft radial rose bloom (`radial-gradient(circle, rgba(227,164,168,0.18), transparent 70%)`) placed behind the mascot logo or a hero photo. It is the only "decoration layer" the new brand needs — the glow of a bakery window at night. Never animated aggressively; if it moves, only a slow 8s breathe. Respect reduced-motion.

### Mascot Badge / Seal
**Role:** Circular packaging-style stamp used as a section marker, footer seal or "featured" badge

A round Espresso Truffle disc with a 1px Cocoa Hairline ring, containing the mascot line-art in Rose Petal with "MAROSE · PASTELERÍA ARTESANAL" in Patisserie Sans uppercase +0.14em tracking around or beneath — exactly like the new banner logo compressed into a seal. Sits on the canvas with `--shadow-soft`. Use it to sign off sections and the footer.

### Section Heading
**Role:** Title above a group of products or content

Velvet Serif 40px weight 500 Blush Cream, optionally with one word in italic Rose Petal or Dulce Script. A small letterspaced Dusty Rose label may sit above ("NUESTRO MENÚ"). One thin underline flourish in Dusty Rose at most — elegance is subtraction.

### Nav Bar
**Role:** Top navigation

A floating rounded bar in translucent Deep Cocoa (`rgba(26, 18, 13, 0.8)`, backdrop-blur 12px) with `--shadow-soft`. Mascot logo left (pink on dark); text links in Patisserie Sans 15px weight 500 Blush Cream center/right; a Rose Petal WhatsApp pill CTA at the far right. Fully rounded, no hard border-bottom — it floats above the darkness.

### Footer
**Role:** Bottom sign-off and contact

A Deep Cocoa (`#1a120d`) band — darker than the page, a gentle descent. Mascot seal, *"Hecho con amor · Cartagena"* in Dulce Script Rose Petal, and links to Instagram + WhatsApp as small ghost pills. A thin Cocoa Hairline divider above. Warm, quiet, elegant close.

## Do's and Don'ts

### Do
- Start every page on Cocoa Noir (`#251a13`); layer Espresso Truffle (`#38271d`) for cards and Deep Cocoa (`#1a120d`) for the footer.
- Round everything: pills and buttons fully (999px), cards at 24px, images at 16px. Soft geometry is still the brand — just refined.
- Use glow, not gray: `--shadow-soft` / `--shadow-lift` in warm black, `--shadow-bloom` behind pink moments.
- Keep Blush Cream (`#f7e9e0`) as primary text and Rose Mist for secondary — never cool grays, ever.
- Reserve Rose Petal (`#e3a4a8`) for the CTA, prices, the mascot, and one accent word per headline — it glows, so a little goes a long way.
- Set headlines in Velvet Serif (Fraunces / Playfair Display) and give exactly ONE emotional word to Dulce Script per composition.
- Make photography moody and candle-lit: dark backgrounds, warm side light, glossy textures — the dessert is the jewel in the dark.
- Use the mascot glow behind the logo — the pink-on-dark neon warmth is the signature.

### Don't
- Don't use light/cream page backgrounds — the new brand lives after dark. Blush Cream is text, not canvas.
- Don't scatter doodles (hearts, sparkles, stars) across the page — the kawaii storm is retired; one script word and one glow are enough.
- Don't set body copy, buttons or anything scannable in Dulce Script — calligraphy is a whisper, not a voice.
- Don't use cool grays for text, borders or shadows; every neutral leans warm brown-rose.
- Don't flood a composition with Rose Petal — it's the glow, not the paint. Large surfaces stay dark.
- Don't reach for corporate/geometric sans like Inter or Helvetica for headlines — the high-contrast serif IS the identity.
- Don't add hard 1px bright borders where a Cocoa Hairline or a soft surface step already does the separating.
- Don't let flavor-accent colors (lime, maracuyá, arequipe, cocoa) leak into UI chrome — they only cue flavor.
- Don't shoot product photography on bright pastel backgrounds anymore — dark, warm, moody is the new appetite.

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 1 | Cocoa Noir | `#251a13` | Default page background — every screen starts in the dark |
| 2 | Espresso Truffle | `#38271d` | Product tiles and card surfaces, warmly lifted above the noir |
| 3 | Deep Cocoa | `#1a120d` | Footer band and sunken/inverted blocks — darker than the page |
| 4 | Rose Petal | `#e3a4a8` | CTA fills, the mascot seal accent and tiny glow moments — never a page surface |
| 5 | Mascot Glow | `rgba(227,164,168,0.18)` radial | The bloom behind the mascot — light, not surface |

## Elevation

Marose after dark is lit, not stacked. Elevation is built from deep warm-black shadows (`rgba(0,0,0,0.55–0.65)`), truffle-vs-noir surface steps, and — for the pink moments — a soft rose bloom (`rgba(227,164,168,0.30)`). Cards float like dessert plates under candlelight; buttons glow like the bakery window. Borders are rare and always a warm Cocoa Hairline (`#4d382c`). No cool-gray shadows, no bright outlines — the whole page should feel like the quiet hour when the last cake comes out of the oven.

## Imagery

Imagery is moody, warm, candle-lit dessert photography plus the pink-on-dark mascot. Product shots are taken against dark cocoa or deep neutral backgrounds with warm side lighting — glossy glazes, crumb texture, steam, a linen napkin, scattered hazelnuts. All photos get 16px rounded corners and a soft deep shadow; never full-bleed to a hard edge, never bright pastel sets (that was the old brand). The mascot — the curly-haired baker girl with her bow — appears pink-on-dark exactly as in the new logo: as the nav mark, the footer seal, and occasional spot moments with her rose bloom behind her. Photography is the seduction; the mascot is the smile; the script word is the sigh.

## Layout

Max-width 1120px, centered, with generous dark breathing room (88–112px between sections). The page opens with a full-bleed dark hero: letterspaced label, serif headline with one script word, the glowing mascot, and the pink WhatsApp pill beside a moody product photo. Products live in a grid of Espresso Truffle cards — 2 columns on mobile-up, 3 on desktop — each a self-contained tile with photo, flavor pills, serif-italic price and order button. Sections are separated by darkness and whitespace alone — no alternating color bands, no hard rules; at most a thin Dusty Rose flourish under a heading. The mascot seal signs off the menu and the footer. Rhythm is editorial and intimate: big serif headlines, short warm copy, one glowing action per product. Navigation floats translucent; the footer sinks into Deep Cocoa.

## Agent Prompt Guide

**Quick Color Reference**
- background: #251a13 (Cocoa Noir)
- card/surface: #38271d (Espresso Truffle)
- sunken band / footer: #1a120d (Deep Cocoa)
- primary text: #f7e9e0 (Blush Cream)
- secondary text: #cfa9a2 (Rose Mist)
- brand accent / CTA / price: #e3a4a8 (Rose Petal)
- hover / highlight pink: #f0bfc2 (Rose Glow)
- muted accent / flourish: #b8787d (Dusty Rose)
- warm hairline (rare): #4d382c (Cocoa Hairline)

**3 Example Component Prompts**

1. Build a hero banner on a #251a13 full-bleed canvas. Place the MAROSE mascot logo (pink on dark) with a soft radial rose bloom behind it (rgba(227,164,168,0.18) fading to transparent). Above the headline, a label in Jost 13px uppercase +0.14em tracking #b8787d reading "PASTELERÍA ARTESANAL · CARTAGENA". Headline in Fraunces (Velvet Serif) 72px weight 500 #f7e9e0 reading "Hay momentos que merecen" with the words "algo dulce" in Allura (Dulce Script) 56px #e3a4a8 on the second line. Add a pill primary CTA: #e3a4a8 fill, #251a13 text in Jost 17px weight 600 with a WhatsApp glyph, 14px/24px padding, rose bloom shadow (0 14px 40px -12px rgba(227,164,168,0.30)). Beside it a ghost CTA: 1px #4d382c border, #f7e9e0 text. Alongside, a moody dessert photo at 16px radius with a deep soft shadow. 112px vertical padding. No other decoration.

2. Build a product card. Espresso Truffle (#38271d) surface, 24px radius, deep soft shadow (0 12px 32px -12px rgba(0,0,0,0.55)), 28px padding. Top: a candle-lit dessert photo at 16px radius. Then the name in Baloo 2 (Wordmark Sans) 24px weight 600 #f7e9e0 ("Pavé"), a row of pill flavor tags (transparent, 1px #4d382c border, Jost 13px uppercase +0.14em #cfa9a2, with a small lime and maracuyá accent dot), a short description in Jost 16px #cfa9a2, a price in Fraunces italic 21px #e3a4a8, and a full-width pill WhatsApp button (#e3a4a8 fill, #251a13 text). The whole card lifts on hover.

3. Build a section heading. Small label in Jost 13px uppercase +0.14em #b8787d ("NUESTRO MENÚ"), then a heading in Fraunces 40px weight 500 #f7e9e0 with one word in italic #e3a4a8 ("Postres *inolvidables*"), and a single thin hand-drawn underline flourish in #b8787d beneath. Nothing else — no doodles.

## Similar Brands

- **Cédric Grolet (patisserie)** — dark, jewel-like dessert photography and high-end patisserie elegance
- **Dominique Ansel Bakery** — warm artisan craft presented with editorial restraint
- **Glossier (mood)** — a single confident pink used with discipline on deep neutrals
- **Aesop (typography)** — quiet letterspaced labels and serif headlines that whisper luxury
- **LatAm boutique repostería (Instagram)** — dark feeds, candle-lit cakes, calligraphic captions, WhatsApp-first ordering

## Menu Reference (content)

For layout and copy, the initial Marose menu is:
- **Pavé** — flavors: Limón, Maracuyá
- **Bowl de 8 mini cookies** — served with a Dip de Nutella (dips also available: arequipe, Nutella)
- **Cookie pie** — relleno de Nutella
- **Torta de zanahoria**

Tagline: *"Hay momentos que merecen algo dulce."* · Location: Cartagena.

## Quick Start

### Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@400;500;600&family=Allura&family=Baloo+2:wght@600;700&display=swap" rel="stylesheet">
```

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-cocoa-noir: #251a13;
  --color-espresso-truffle: #38271d;
  --color-deep-cocoa: #1a120d;
  --color-rose-petal: #e3a4a8;
  --color-rose-glow: #f0bfc2;
  --color-dusty-rose: #b8787d;
  --color-blush-cream: #f7e9e0;
  --color-rose-mist: #cfa9a2;
  --color-cocoa-hairline: #4d382c;
  --color-paper-white: #ffffff;

  /* Flavor accents (optional) */
  --color-flavor-lime: #b8cf6a;
  --color-flavor-maracuya: #f2c14e;
  --color-flavor-arequipe: #e09a4f;
  --color-flavor-cocoa: #a06844;

  /* Typography — Font Families */
  --font-velvet-serif: 'Fraunces', 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
  --font-patisserie-sans: 'Jost', 'Montserrat', 'Nunito Sans', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-dulce-script: 'Allura', 'Pinyon Script', 'Great Vibes', cursive;
  --font-wordmark-sans: 'Baloo 2', 'Fredoka', ui-rounded, system-ui, sans-serif;

  /* Typography — Scale */
  --text-body-sm: 15px;   --leading-body-sm: 1.65;
  --text-body: 17px;      --leading-body: 1.65;
  --text-label: 13px;     --leading-label: 1.3;   --tracking-label: 0.14em;
  --text-subheading: 21px;    --leading-subheading: 1.45;
  --text-subheading-lg: 24px; --leading-subheading-lg: 1.4; --tracking-subheading-lg: -0.005em;
  --text-heading-sm: 28px;    --leading-heading-sm: 1.25; --tracking-heading-sm: -0.01em;
  --text-heading: 40px;       --leading-heading: 1.15;    --tracking-heading: -0.01em;
  --text-heading-lg: 60px;    --leading-heading-lg: 1.1;  --tracking-heading-lg: -0.01em;
  --text-display: 88px;       --leading-display: 1.05;    --tracking-display: -0.01em;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

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
  --section-gap: 112px;
  --card-padding: 28px;
  --element-gap: 20px;

  /* Radii */
  --radius-pill: 999px;
  --radius-button: 999px;
  --radius-card: 24px;
  --radius-image: 16px;
  --radius-badge: 999px;

  /* Shadows & Glows */
  --shadow-soft: 0 12px 32px -12px rgba(0, 0, 0, 0.55);
  --shadow-lift: 0 20px 48px -14px rgba(0, 0, 0, 0.65);
  --shadow-bloom: 0 14px 40px -12px rgba(227, 164, 168, 0.30);
  --glow-mascot: radial-gradient(circle, rgba(227, 164, 168, 0.18), transparent 70%);

  /* Surfaces */
  --surface-cocoa-noir: #251a13;
  --surface-espresso-truffle: #38271d;
  --surface-deep-cocoa: #1a120d;
  --surface-rose-petal: #e3a4a8;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-cocoa-noir: #251a13;
  --color-espresso-truffle: #38271d;
  --color-deep-cocoa: #1a120d;
  --color-rose-petal: #e3a4a8;
  --color-rose-glow: #f0bfc2;
  --color-dusty-rose: #b8787d;
  --color-blush-cream: #f7e9e0;
  --color-rose-mist: #cfa9a2;
  --color-cocoa-hairline: #4d382c;
  --color-paper-white: #ffffff;
  --color-flavor-lime: #b8cf6a;
  --color-flavor-maracuya: #f2c14e;
  --color-flavor-arequipe: #e09a4f;
  --color-flavor-cocoa: #a06844;

  /* Typography */
  --font-velvet-serif: 'Fraunces', 'Playfair Display', Georgia, serif;
  --font-patisserie-sans: 'Jost', 'Montserrat', ui-sans-serif, system-ui, sans-serif;
  --font-dulce-script: 'Allura', 'Pinyon Script', cursive;
  --font-wordmark-sans: 'Baloo 2', 'Fredoka', ui-rounded, system-ui, sans-serif;

  /* Typography — Scale */
  --text-body-sm: 15px;
  --text-body: 17px;
  --text-label: 13px;
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
  --radius-card: 24px;
  --radius-image: 16px;
  --radius-badge: 999px;

  /* Shadows & Glows */
  --shadow-soft: 0 12px 32px -12px rgba(0, 0, 0, 0.55);
  --shadow-lift: 0 20px 48px -14px rgba(0, 0, 0, 0.65);
  --shadow-bloom: 0 14px 40px -12px rgba(227, 164, 168, 0.30);
}
```
