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

**The One Red Rule.** One red (primary) button visible per screen. On pages with a hero CTA, the navbar CTA stays hidden until the hero CTA scrolls out of view.
**The Quiet Red Rule.** Red is never body text or footer text. Eyebrows are muted, never red.
**The Darker Hover Rule.** `primary-hover` is darker than `primary`, never lighter.
**The Warm Paper Rule.** The cream palette is the direction, so the detector's `cream-palette` rule is ignored on purpose (`.impeccable/config.json`).

## Typography

**Headings:** Young Serif, weight 400 only (`font-heading font-normal`). **Body:** Mukta 400 and 500 (500 for buttons and nav links). Both load through `next/font` with `display: swap`.

### Scale (Tailwind tokens, ratio ≈1.25)

| Token               | Size                       | Line height | Use                                             |
| ------------------- | -------------------------- | ----------- | ----------------------------------------------- |
| `text-display`      | clamp 2.25–4.25rem (8.5vw) | 1.08        | Hero h1, below `sm`                             |
| `text-display-wide` | clamp 2.25–4.25rem (6.4vw) | 1.08        | Hero h1 from `sm` (two fixed lines)             |
| `text-heading`      | clamp 1.875–2.5rem         | 1.12        | Section h2                                      |
| `text-title`        | 1.625rem                   | 1.25        | Card h3, dialog title                           |
| `text-lead`         | 1.3125rem                  | 1.55        | Hero supporting line from `md`                  |
| `text-base`         | 1.0625rem                  | 1.6         | Body (default on `<body>`)                      |
| `text-sm`           | 0.9375rem                  | 1.5         | Smallest text: eyebrows, captions, nav, buttons |

### Named Rules

**The One Weight Rule.** Headings are Young Serif `font-normal`. No bold, no italic, no faux weights.
**The Heading Level Rule.** `h1` only in the hero, `h2` for sections, `h3` for cards.
**The Floor Rule.** Minimum text size is 0.9375rem. Do not use `text-xs` or arbitrary smaller sizes.
**Line length.** Intro paragraphs cap at `max-w-prose`; hero supporting line at `max-w-xl`.

## Layout

- **Container:** `Container` is `max-w-6xl`, gutters `px-4` (1rem), `md:px-6`. Hero and navbar use the same width.
- **Section rhythm:** `Section` is `py-20 md:py-28`, `scroll-mt` equals `--navbar-height` (4rem). Alternate with `tone="muted"`. Headings sit above content via `SectionHeading` (`gap-3`; eyebrow, h2, intro).
- **Hero:** every page starts with one (`getPage()` throws otherwise). It runs behind the transparent navbar, so its top padding is navbar height plus `--hero-pad` (1.5rem, 2.5rem from `md`). `large`: `min-h-[82svh]`, `pb-10 md:pb-14`, emblem 4.5rem (5rem from `md`). `compact`: `pt` navbar + 3rem, `pb-12 md:pb-16`. Content is centred, headline `max-w-5xl`.
- **Mobile first:** design at 375px. Buttons stack full width below `sm`, sit in a row from `sm`.
- **Units:** Tailwind scale first, `rem` for arbitrary values. `px` only for hairlines, shadows and image `sizes`/`width`/`height`.

## Elevation & Depth

Flat. Depth comes from paper tone (raised card on paper) and hairline borders, not shadows. The only shadow is `shadow-sm` on the scrolled navbar pill. Dialog and drawer sit on a warm ink scrim (`bg-foreground/30`), never black. The hero wash is layered radial gradients (yellow core, amber, orange edges) fading into paper with a mask. No `filter: blur`.

**The Calm Decoration Rule.** Decoration never sits behind text and is never louder than the heading. The wash is the only background effect; it fades out before the content below the hero.

## Shapes

Soft, friendly, not bubbly. Base radius `--radius` 0.625rem; scale `sm` 0.6×, `md` 0.8×, `lg` 1×, `xl` 1.4×. Buttons, the scrolled navbar and the skip link are fully pill-shaped (`rounded-4xl`). Cards and wells use `lg`/`xl`. Borders are 1px hairlines.

## Components

### Buttons

Pill, Mukta 500 at `text-sm`. Hierarchy (data variant → look): `primary` = red fill, white text; `secondary` = paper tint; `outline` = paper with hairline border. Hover: primary darkens, others shift to `muted`. Focus: `focus-ring` (2px solid `ring`, 2px offset). Never hard-code behaviour; use `ActionButton` with `link` or `contact-dialog` actions.

- **Touch targets:** primary actions at least 2.75rem (44px). Mobile hero and navbar CTAs are `h-11`.
- Only one primary per screen (see The One Red Rule). The first primary in a hero carries `data-hero-cta`.

### Navbar

- **Top:** transparent, `h-16` (4rem), no border, logo `size-11`. Links centred on `lg` in a three-column grid; CTA and menu button right.
- **Scrolled:** an opaque pill: `h-12`, `mt-2`, `max-w-4xl`, `rounded-4xl`, hairline border, `bg-background`, `shadow-sm`. The layout box stays 4rem so nothing jumps.
- **Links:** `text-sm` 500, `text-foreground/80` rising to full ink on hover and on the current page. A single highlight pill slides between hovered links.
- **CTA:** hidden until the hero CTA leaves view (`visibility`, so it is also out of tab order). Without JS it always shows.
- **Mobile:** menu button `size-11`, menu rows `min-h-11`; the CTA appears in the menu as an outline button.

### Contact dialog ("Talk to us")

Desktop (`useIsDesktop`) uses a centred Dialog; mobile uses a bottom Drawer. Same content: title in Young Serif `text-title`, hours as description, then the phone list with Call, WhatsApp and Copy actions, each `h-11` with `text-base`. Close button is `size-11` on `secondary`. Focus returns to the opener. Scrim is warm ink at 30%.

### Footer

Quiet tonal block (`bg-footer`), no red. Three groups: contact, visit, and Explore plus Courses columns (two-up at every width). Column titles are muted `text-sm`; links are ink with underline on hover/focus. Tagline in Young Serif. Social icons sit in `size-11` targets. The wordmark is decorative, tone on tone (`footer-mark`), its lower third clipped by the footer edge.

### Cards

`card` paper, hairline border, `lg`/`xl` radius, no shadow. Title is an `h3` in `text-title`.

## Motion

- CSS for simple transitions (≤300ms, `ease-out`); anime.js for sequences (the nav highlight, the hero ornament fade-up).
- Content is always visible without JavaScript. Hidden-until-revealed states exist only under `@media (scripting: enabled)` with a CSS fallback timer.
- **Never animate the hero headline, supporting line or buttons** (LCP). Only the emblem may enter.
- `prefers-reduced-motion` means static: wash settle and ornament entrance are off, the nav highlight jumps, navbar transitions are disabled.

## Imagery

Real photos of the institute and people only. Never AI-generated people. Decorative illustration is allowed under The Calm Decoration Rule.

## Accessibility

- WCAG AA: text 4.5:1, controls and focus 3:1 (values in Colors).
- One focus style everywhere (`focus-ring`). Skip link is first in the tab order. `main` is focusable (`#main`).
- Full keyboard use; the hidden navbar CTA is removed from the tab order.
- Decorative images and icons use `alt=""` / `aria-hidden`.
- Content rules: no unverified claims ("best", "top", results) per `PRODUCT.md`. Mock data is marked `MOCK`, missing facts `PLACEHOLDER`.

## Do's and Don'ts

### Do

- **Do** use the primary token for buttons and `primary-hover` for hover.
- **Do** keep headings Young Serif `font-normal` and body Mukta 400/500.
- **Do** use `text-sm` (0.9375rem) as the smallest size.
- **Do** keep touch targets at 2.75rem for primary actions.
- **Do** start every page with a hero.

### Don't

- **Don't** use #EF1A26 outside logo artwork.
- **Don't** use red, or any flame colour, for text.
- **Don't** show two red buttons in one viewport.
- **Don't** use navy, pure white or pure black surfaces, or hard-coded colours.
- **Don't** use bold or italic headings, or `h1` outside the hero.
- **Don't** put decoration behind text or animate LCP elements.
- **Don't** use AI-generated people.
