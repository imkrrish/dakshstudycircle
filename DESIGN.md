---
name: Daksh Study Circle
description: Warm paper lit by the flame. Calm, trustworthy, specific to Daksh.
colors:
  paper: "oklch(0.985 0.008 85)"
  paper-raised: "oklch(0.995 0.004 85)"
  paper-muted: "oklch(0.96 0.012 80)"
  paper-tint: "oklch(0.945 0.025 75)"
  paper-footer: "oklch(0.965 0.016 78)"
  paper-footer-mark: "oklch(0.93 0.03 75)"
  ink: "oklch(0.23 0.02 45)"
  ink-muted: "oklch(0.46 0.025 50)"
  primary: "oklch(0.55 0.22 27)"
  primary-hover: "oklch(0.5 0.2 27)"
  primary-foreground: "oklch(1 0 0)"
  destructive: "oklch(0.49 0.18 8)"
  hairline: "oklch(0.89 0.015 80)"
  field-border: "oklch(0.62 0.02 70)"
  focus-ring: "oklch(0.5 0.13 60)"
  flame-light: "oklch(0.92 0.13 95)"
  flame: "oklch(0.8 0.165 72.3)"
  saffron: "oklch(0.71 0.177 50.9)"
typography:
  display:
    fontFamily: "Young Serif, serif"
    fontSize: "clamp(2.25rem, 8.5vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.08
  display-wide:
    fontFamily: "Young Serif, serif"
    fontSize: "clamp(2.25rem, 6.4vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.08
  heading:
    fontFamily: "Young Serif, serif"
    fontSize: "clamp(1.875rem, 1.5rem + 1.6vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.12
  title:
    fontFamily: "Young Serif, serif"
    fontSize: "1.625rem"
    fontWeight: 400
    lineHeight: 1.25
  lead:
    fontFamily: "Mukta, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Mukta, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Mukta, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.875rem"
  pill: "1.625rem"
spacing:
  section-y: "5rem"
  section-y-md: "7rem"
  gutter: "1rem"
  gutter-md: "1.5rem"
  navbar: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "2.5rem"
    padding: "0 1rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  button-secondary:
    backgroundColor: "{colors.paper-tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
---

# Design System: Daksh Study Circle

## Overview

**Creative North Star: "Warm paper lit by the flame"**

Warm cream paper and brown-black ink, lit from one point by the flame in the logo. Calm, trustworthy, warm, specific to Daksh. It is never a loud coaching poster. Navy is not a brand colour.

Parents on mid-range phones decide here. The page earns trust by being quiet, legible and fast, and the flame is the only glow. Tokens live in `src/app/globals.css` (`:root`, `@theme inline`). Dark tokens exist under `.dark`, but no toggle ships.

**Key characteristics**

- Warm neutrals only; one red (`primary`) for actions; flame colours for light, never text.
- One serif weight for headings, Mukta for everything else.
- Flat surfaces, hairline borders, almost no shadow.
- Static by default; motion is decoration and optional.

## Colors

Always use tokens (`bg-primary`, `text-muted-foreground`). No hard-coded colours. Contrast figures are computed from the values above (WCAG ratios, approximate).

### Primary

- **Primary red** (`primary`, ≈#D40C1A): the single action colour. White text on it is 5.4:1 (AA). Hover is `primary-hover`, always darker (6.7:1 with white), never lighter. Red on paper is 5.2:1, but red is never used for body or footer text.
- **Logo red #EF1A26** is artwork only: the logo and wordmark. It is not a token and must not be used on buttons. White on it fails AA, which is why buttons use `primary`.

### Neutral

- **Paper** (`background`): page. **Paper raised** (`card`, `popover`): cards and dialogs, lighter than the page so they lift with a hairline. **Paper muted** (`muted`): alternate section tone. **Paper tint** (`secondary`, `accent`): secondary buttons, hover wells. **Paper footer** (`footer`) with the wordmark one step darker (`footer-mark`, tone on tone, 1.1:1 on purpose because it is decoration).
- **Ink** (`foreground`): text, 16.3:1 on paper. **Ink muted** (`muted-foreground`): eyebrows, captions, footer headings, 6.9:1 on paper, 6.5:1 on footer.
- **Hairline** (`border`): decorative dividers only (1.3:1). **Field border** (`input`): 3.5:1, meets the 3:1 non-text minimum for controls.
- **Focus ring** (`ring`, ≈#974D00): 6:1 on paper.
- **Destructive**: errors only; 6.6:1 on paper.

### Flame (decoration only)

`flame-light` (yellow), `flame` (amber), `saffron` (orange). They form the hero wash and nothing else. Never text, never icons that carry meaning.

### Named Rules

**The One Red Rule.** Navbar CTA: outline while the hero CTA is visible, primary after; never two red buttons on one screen.
**The Quiet Red Rule.** Red is never body text or footer text. Eyebrows are muted, never red.
**The Darker Hover Rule.** `primary-hover` is darker than `primary`, never lighter.
**The Warm Paper Rule.** The cream palette is the direction, so the detector's `cream-palette` rule is ignored on purpose (`.impeccable/config.json`).

## Typography

**Headings:** Young Serif, weight 400 only (`font-heading font-normal`). **Body:** Mukta 400 and 500 (500 for buttons and nav links). Both load through `next/font` with `display: swap`.

### Scale (Tailwind tokens, ratio ≈1.25)

| Token               | Size                       | Line height | Use                                                                                                                             |
| ------------------- | -------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `text-display`      | clamp 2.25–4.25rem (8.5vw) | 1.08        | Hero h1, below `sm`                                                                                                             |
| `text-display-wide` | clamp 2.25–4.25rem (6.4vw) | 1.08        | Hero h1 from `sm` (two fixed lines)                                                                                             |
| `text-heading`      | clamp 1.875–2.5rem         | 1.12        | Section h2                                                                                                                      |
| `text-title`        | 1.625rem                   | 1.25        | Card h3, dialog title                                                                                                           |
| `text-lead`         | 1.3125rem                  | 1.55        | Hero supporting line from `md`; course titles in mobile course rows and reason-list titles below `md` (the list-row exceptions) |
| `text-base`         | 1.0625rem                  | 1.6         | Body (default on `<body>`)                                                                                                      |
| `text-sm`           | 0.9375rem                  | 1.5         | Smallest text: eyebrows, captions, nav, buttons                                                                                 |

### Named Rules

**The One Weight Rule.** Headings are Young Serif `font-normal`. No bold, no italic, no faux weights.
**The Heading Level Rule.** `h1` only in the hero, `h2` for sections, `h3` for cards. Section headings are h2 in Young Serif. Footer and utility headings may be h2 styled as small Mukta labels.
**The Floor Rule.** Minimum text size is 0.9375rem. Do not use `text-xs` or arbitrary smaller sizes.
**Line length.** Intro paragraphs cap at `max-w-prose`; hero supporting line at `max-w-xl`.

## Layout

- **Container:** `Container` is `max-w-6xl`, gutters `px-4` (1rem), `md:px-6`. Hero and navbar use the same width.
- **Section rhythm:** `Section` is `py-20 md:py-28`, `scroll-mt` equals `--navbar-height` (4rem). Alternate with `tone="muted"` (home: the results section, between the paper why-daksh and the paper testimonials). For a section that needs a visible edge against its neighbours (the director), use `tone="band"` (`bg-secondary`, paper tint): full-bleed, normal padding. At most one band among adjacent sections (the director and videos bands are separated by the paper why-daksh). On a band use `outline` (paper) or `quiet` buttons, never `secondary` (same tint). Headings sit above content via `SectionHeading` (`gap-3`; eyebrow, h2, intro).
- **Hero:** every page starts with one (`getPage()` throws otherwise). It runs behind the transparent navbar, so its top padding is navbar height plus `--hero-pad` (1.5rem, 2.5rem from `md`). `large`: below `md` it sizes to its content (`pb-12`, and the next section's `pt-12`, so the next section's eyebrow and heading sit fully at the bottom of a 375×812 first screen, never half a card). From `md` it fills the first screen: `min-h-svh`, content centred vertically (`pb` = navbar height, so the centre sits just below the navbar), so no part of the next section shows on the first screen at 768×1024, 1280×800, 1440×900 or 1920×1080. The next section then takes `md:pt-16` instead of `md:pt-28` (the hero's own empty space already separates them). The flame wash is anchored to the content block from `md` (`data-anchor="content"`: reaches up by navbar + padding, full viewport width, also fades in at the top) so the light stays behind the emblem wherever the content centres. Emblem 4.5rem (5rem from `md`). `compact`: `pt` navbar + 3rem, `pb-12 md:pb-16`. Content is centred, headline `max-w-5xl`.
- **Mobile first:** design at 375px. Buttons stack full width below `sm`, sit in a row from `sm`.
- **Units:** Tailwind scale first, `rem` for arbitrary values. `px` only for hairlines, shadows, image `sizes`/`width`/`height`, and shadcn `ui/` internals.

## Elevation & Depth

Flat. Depth comes from paper tone (raised card on paper) and hairline borders, not shadows. The only shadow is `shadow-sm` on the scrolled navbar pill. Dialog and drawer sit on a warm ink scrim (`bg-foreground/30`), never black. The hero wash is layered radial gradients (yellow core, amber, orange edges) fading into paper with a mask. No `filter: blur`.

**The Calm Decoration Rule.** Decoration never sits behind text and is never louder than the heading. The hero wash is the only background effect, and it fades out before the content below the hero. Portraits carry no glow, shadow or mask.

## Shapes

Soft, friendly, not bubbly. Base radius `--radius` 0.625rem; scale `sm` 0.6×, `md` 0.8×, `lg` 1×, `xl` 1.4×. Buttons, the scrolled navbar and the skip link are fully pill-shaped (`rounded-4xl`). Cards and wells use `lg`/`xl`. Borders are 1px hairlines.

## Components

### Buttons

Pill, Mukta 500 at `text-sm`. Hierarchy (data variant → look): `primary` = red fill, white text; `secondary` = paper tint; `outline` = paper with hairline border. Hover: primary darkens, others shift to `muted`. Focus: `focus-ring` (2px solid `ring`, 2px offset). Never hard-code behaviour; use `ActionButton` with `link`, `contact-dialog`, `directions` or `social` actions. `directions` opens the site's `mapUrl` in a new tab (`rel="noopener noreferrer"`) with a Location icon. `social` (`{ type: "social", platform }`) opens that platform's `site.socials` url the same way, with the platform icon; the build fails if the platform is not in `site.socials`. A social button is never platform-coloured (YouTube is not red here); use `outline`. Data variant `quiet` maps to `ghost` (ink text, no fill, not red): the content-level replacement for a text link.

- **Sizes and variants:** do not use the `xs` size or the `link` variant from `ui/button.tsx`; they break the type floor and the red-text rule.
- **Touch targets:** primary actions at least 2.75rem (44px) below `lg` (touch screens); at least 2.25rem on desktop. Mobile hero CTAs are `h-11`. The visible size may be smaller (e.g. 2.25rem) when an invisible hit area brings the target to at least 2.75rem; the navbar CTA and menu toggle do this with the `hit-area` utility.
- Only one primary per screen (see The One Red Rule). The first primary in a hero carries `data-hero-cta`.

### Navbar

- **Top:** transparent, `h-16` (4rem), no border, logo `size-11`. Links centred on `lg` in a three-column grid; CTA and menu button right.
- **Scrolled:** a near-opaque pill (about 90% background) with backdrop blur: `h-12`, `mt-2`, `max-w-4xl`, `rounded-4xl`, hairline border, `bg-background/90`, `backdrop-blur-md`, `shadow-sm`. The layout box stays 4rem so nothing jumps.
- **Links:** `text-sm` 500, `text-foreground/80` rising to full ink on hover and on the current page. A single highlight pill slides between hovered links.
- **CTA:** always visible and focusable, `h-9` with `hit-area`. Outline while the hero CTA (`data-hero-cta`) is on screen, primary once it scrolls out of view; pages without a hero CTA are primary from the start. Both tones have the same size; colours transition over 300ms (instant with reduced motion). Without JS the hero page stays outline.
- **Mobile (below `lg`):** logo left; CTA then a round `size-9` secondary menu toggle at the far right, each with a `hit-area` (no overlap, `gap-3`). The toggle is concentric with the pill end: `--nav-inset` = (pill height − toggle height − border) / 2 on top, bottom and right. Menu rows `min-h-11`; the CTA also appears in the menu as an outline button.

### Contact dialog ("Talk to us")

Desktop (`useIsDesktop`) uses a centred Dialog; mobile uses a bottom Drawer. Same content: title in Young Serif `text-title`, hours as description, then the phone list with Call, WhatsApp and Copy actions, each `h-11` with `text-base`. Close button is `size-11` on `secondary`. Focus returns to the opener. Scrim is warm ink at 30%.

### CTA band (dark)

The page's one dark band, the last section, directly above the footer (`cta-band`, `variant: "dark"`; a second one fails the build). Warm ink (`foreground` value) with a faint flame glow from the top centre (`.cta-glow`: `flame-light`, `flame`, `saffron` radial gradients masked to fade out before the buttons), like a diya lit in a dark room. No blur, no motion. Centred: one short message and two actions close the page on a single focal point, and the glow sits over the centre. `data-surface="ink"` re-maps the tokens (`background`, `foreground`, `primary`, `muted`, `input`, `ring`), so `ActionButton` and `focus-ring` restyle themselves with no new button variants. "Talk to us" is data `primary`, which becomes a solid paper button with ink text (never red on dark); "Get directions" is `outline` with a paper border. The focus ring turns light (`flame-light`, 13.4:1 on ink). Buttons are `h-11` below `lg` and stack full width on mobile. Office hours come from site data (`showHours`), under the buttons in muted `text-sm`. The band runs flush into the footer: `main` drops its bottom hairline when the ink band is its last child, so the edge is one tonal step, ink to footer paper.

### Footer

Quiet tonal block (`bg-footer`), no red. Three groups: contact, visit, and Explore plus Courses columns (two-up at every width). Column titles are muted `text-sm`; links are ink with underline on hover/focus. Tagline in Young Serif. Social icons sit in `size-11` targets. The wordmark is decorative, tone on tone (`footer-mark`), its lower third clipped by the footer edge.

### Portrait (split section)

Portraits are rounded rectangles (`rounded-xl`), head-and-shoulders, `aspect-4/5`, `object-cover`, no glow, shadow or mask. The face fills about 45–50% of the frame height and the crop never cuts the forehead; crop the source file, do not zoom in CSS. Size: `max-w-80` (20rem) on mobile, centred above the text; `md:max-w-100` (25rem) on desktop. Lazy `next/image` with a `sizes` that matches.

### Cards

`card` paper, hairline border, `lg`/`xl` radius, no shadow. Title is an `h3` in `text-title`.

### Course grid

Courses grouped under muted `text-sm` labels (a `<p>`, not a heading) with a hairline rule running right. Below `md` each group is one raised `card` panel of full-width rows (min `4rem`, hairline dividers, title `text-lead`, note, chevron). From `md` the panel dissolves into cards (`rounded-xl`, 2 columns); from `lg` every group shares one column grid (largest group, up to 4). Each course is a stretched link (`<h3><a>` with `after:inset-0`), so its accessible name is the title only. Hover (pointer devices only) is `muted`, a soft flame glow rising from the card's bottom edge and a 0.25rem arrow nudge; pressed is `accent` with the same glow and nudge, instantly. The glow is a `::before` radial gradient (`flame` 40%, `saffron` 12%, in the bottom half only), kept faint so `muted-foreground` text stays at 5:1 or better over it; it never covers the title. Under reduced motion the glow still appears (a static colour change) but nothing moves. The Classes 11–12 stream card is not a link and has no glow; its chips keep their own states. Groups with fewer than three items (Entrance and skills) use two wider columns from `lg` (`max-w-3xl`) so long titles keep to two lines. Focus is the 2px ring on the whole row or card. A stream group (Classes 11–12) is not a link: its stream chips are `h-11` outline links with a hidden group prefix. No red in the section.

### Reason list

A ruled `<ol>` of 3–8 reasons (`reason-list`). Numerals are CSS counters (Young Serif `font-normal`, `text-muted-foreground`, tabular figures, fixed 2.5rem column, empty alt text so screen readers hear the list, not the number). Each row: `h3` title (`text-lead`, `text-title` from `md`) and one line of muted `text-base`; hairline rules between rows only (`py-5`, `md:py-6`). No icons, cards, hover, links, chevrons, red or motion. Mobile: heading, list, then the figure (`h-56` photo, `rounded-xl`, caption). From `md`: 12-column grid by named areas; heading and figure in columns 1–5 (figure bottom aligned with the last row), list in 6–12. Default paper tone, no divider.

### Results grid

Recent results on home (`results-grid`, from `src/content/results.ts`, resolved to `{ name, photo, headline, meta }`; highlights only, newest year first). Tone is `muted`: why-daksh above and testimonials below are paper, so the results get their own surface and the raised cards lift off it with a hairline. One markup for every width; cards are not links and have no hover or motion.

Card: photo `aspect-4/5`, `rounded-xl`, no effects (initials in Young Serif when there is no photo, decorative `alt=""` because the name sits beside it). Then the score or admission (`headline`: "96.2%", or the school) in Young Serif `font-normal` with tabular figures, `text-title` on mobile and `text-heading` from `md`; then the student's name as an `h3`; then a muted `text-sm` meta line ("Class 12 · Science · CBSE 2026 · Classes 11–12 tuition" or "Admitted · AISSEE 2026 · RMS/RIMC/Sainik prep"). The meta line breaks only between its parts, never inside one. DOM order is name, score, meta; the score is shown first. The student name is an `h3` in Mukta 500 (`text-base`, `text-lead` from `md`), not Young Serif: with the score set in the serif at heading size, a second serif line would compete with it. This is a deliberate exception to "h3 is Young Serif", like the FAQ questions. Subject marks are not shown on home (`variant: "compact"`).

Layout: below `md`, one raised `card` panel of rows (4.5rem photo left, hairline dividers). At `md`, six columns with cards spanning two, so 3 + 2 with the short row centred (structural `nth-` selectors, no per-count markup). At `lg`, five equal cards in one row. From `md` each card is a four-row subgrid (photo, score, name, meta), so a percentage card and an admission card line up even when "Rashtriya Military School" wraps. No red.

### Testimonial grid

Three testimonials on home (`testimonial-grid`, ids resolved to `{ name, byline, text, photo }`). Not cards: each is a `<figure>` under a hairline rule, three columns from `md`, stacked on mobile. The quote is the visitor's own words, verbatim, in Mukta `text-base` in ink (`<blockquote>`); no quote glyph, no italic, no Young Serif. The `<figcaption>` holds a 3rem circular avatar (`object-cover object-top`, initials on `muted` when there is no photo) beside the name (Mukta 500) and a muted `text-sm` byline (the context, else "Student" or "Parent"). Default paper tone: results above are muted, the videos band below. No motion, no red.

### Video grid

Free YouTube playlists (`video-grid`, videos from `src/content/videos.ts`, resolved to `{ title, href, thumbnail, meta }`; the playlist URL is built only in `content.ts`). Cards link out: no iframe, no YouTube script, and thumbnails go through `next/image` (`i.ytimg.com` in `remotePatterns`), so the browser contacts YouTube only after a click. Each card is a stretched link (`<h3><a target="_blank" rel="noopener noreferrer">`, `after:inset-0`) with accessible name "Class 10 Maths playlist on YouTube (opens in a new tab)". Thumbnails are 16:9 (`maxresdefault`), `rounded-md`/`lg`, decorative (`alt=""`), lazy. Meta line is muted `text-sm` ("Playlist · YouTube"); a Hugeicons `ArrowUpRight01Icon` (aria-hidden) nudges diagonally on hover and press.

Layout: all playlists are equal cards (no lead card). Below `md`, compact rows (6rem thumbnail, title `text-lead`, meta, arrow) in one raised panel, like the course grid; chosen over a horizontal scroll row because a swipe row hides three or four playlists and stacked 16:9 cards run over 1,300px. From `md`, cards wrap in a centred flex row: 3 per row at `md` (3 + 2, the short row centred, so no orphan at the edge) and 5 per row at `lg` (about 13rem wide at 1280, so every title stays on one line). The arrow sits on the meta line, not beside the title. Thumbnails are 16:9, uncropped (`object-cover` in a 16:9 box), so no thumbnail text is cut.

Thumbnails rest calm: `saturate(0.6) sepia(0.12)` so the bright YouTube art sits in the warm palette. On hover (pointer devices only) and while pressed they return to full colour (`saturate(1) sepia(0)`, 300ms) together with the course grid's flame glow (`card-styles.ts`) and a `muted`/`accent` fill. Under reduced motion the colour change is instant (`transition-none`) and the arrow does not move. Tone is `band`: why-daksh above is paper, so a paper videos section would run on without an edge; the band gives it its own surface and steps tint → ink into the CTA. The action is `outline` (never `secondary` on a band), no red.

### FAQ

Questions parents ask before they call (`faq`, items `{ question, answer }`). Text may use `{address}`, `{phones}` and `{hours}`; `getPage()` fills them from site data and an unknown name fails the build. No buttons: the dark CTA band follows.

Layout: below `md` a single column. From `md` a 12-column grid like the reason list: heading block in columns 1–5, sticky under the navbar, questions in 6–12, so nine questions do not become one long narrow centred scroll. Default paper tone (the videos band is above, the dark CTA below). Hairline rules between items and at the top and bottom of the list. All closed by default; several can be open.

Each question is a `<details>` with a full-width `<summary>` (min `2.75rem`, `focus-ring`, default marker removed). The question is an `h3` in Mukta 500 (`text-base`, 1.1875rem from `md`, one step under `text-lead` so nine rows stay calm), not Young Serif: nine serif lines in a row read as display text and compete with the h2, while Mukta medium scans as a list. This is a deliberate exception to "h3 is Young Serif". A Hugeicons chevron (`aria-hidden`, muted) rotates 180° when open (a plus would read as "close"). The answer is muted `text-base`, `max-w-prose`.

Motion: a small client island (`FaqList`, anime.js) wraps the list. A click on a summary (mouse, Enter, Space) is intercepted and the answer's height and opacity animate over 250ms, with `open` set before opening and removed after closing; the chevron turns in sync (CSS, keyed to `[open]:not([data-closing])`). A click mid-animation takes over from the current height. Items the browser opens itself (find-in-page) are left alone. Without JS, and under reduced motion, the native instant toggle applies. No red.

**The Native Details Exception.** The FAQ uses native `<details>`/`<summary>`, not a shadcn (Base UI) accordion, on purpose: it needs no JavaScript, every answer stays in the HTML while closed (search engines, find-in-page, no-JS), and keyboard and screen-reader behaviour is built in. An accordion would add a client island for nothing here.

## Motion

- CSS for simple transitions (≤300ms, `ease-out`); anime.js for sequences (the nav highlight, the hero ornament fade-up).
- Content is always visible without JavaScript. Hidden-until-revealed states exist only under `@media (scripting: enabled)` with a CSS fallback timer.
- **Never animate the hero headline, supporting line or buttons** (LCP). Only the emblem may enter.
- `prefers-reduced-motion` means static: wash settle and ornament entrance are off, the nav highlight jumps, navbar transitions are disabled.

## Imagery

Real photos of the institute and people only. Never AI-generated people. Decorative illustration is allowed under The Calm Decoration Rule. The classroom photo in the reason list is an AI placeholder (like the director portrait) until a real photo replaces it.

## Accessibility

- WCAG AA: text 4.5:1, controls and focus 3:1 (values in Colors).
- One focus style everywhere (`focus-ring`). Skip link is first in the tab order. `main` is focusable (`#main`).
- Full keyboard use; the navbar CTA is always in the tab order.
- Decorative images and icons use `alt=""` / `aria-hidden`.
- Content rules: no unverified claims ("best", "top", results) per `PRODUCT.md`. Mock data is marked `MOCK`, missing facts `PLACEHOLDER`.

## Do's and Don'ts

### Do

- **Do** use the primary token for buttons and `primary-hover` for hover.
- **Do** keep headings Young Serif `font-normal` and body Mukta 400/500.
- **Do** use `text-sm` (0.9375rem) as the smallest size.
- **Do** keep primary actions at 2.75rem below `lg` (visible size or invisible `hit-area`) and 2.25rem on desktop.
- **Do** start every page with a hero.

### Don't

- **Don't** use #EF1A26 outside logo artwork.
- **Don't** use red, or any flame colour, for text.
- **Don't** show two red buttons in one viewport.
- **Don't** put a red button on the dark CTA band; use the paper button there.
- **Don't** use navy, pure white or pure black surfaces, or hard-coded colours.
- **Don't** use bold or italic headings, or `h1` outside the hero.
- **Don't** put decoration behind text or animate LCP elements.
- **Don't** use AI-generated people.
