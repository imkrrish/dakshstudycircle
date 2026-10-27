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
    fontFamily: "EB Garamond, serif"
    fontSize: "clamp(2.5rem, 9.4vw, 4.75rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  display-wide:
    fontFamily: "EB Garamond, serif"
    fontSize: "clamp(2.5rem, 7.2vw, 4.75rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  page-title:
    fontFamily: "EB Garamond, serif"
    fontSize: "clamp(2.25rem, 1.8rem + 2vw, 3.375rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.018em"
  heading:
    fontFamily: "EB Garamond, serif"
    fontSize: "clamp(2rem, 1.7rem + 1.4vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "EB Garamond, serif"
    fontSize: "1.625rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  subtitle:
    fontFamily: "EB Garamond, serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.005em"
  lead:
    fontFamily: "Nunito Sans, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.5
  intro:
    fontFamily: "Nunito Sans, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Nunito Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  eyebrow:
    fontFamily: "Nunito Sans, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
  label:
    fontFamily: "Nunito Sans, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.875rem"
  pill: "1.95rem"
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
- EB Garamond for headings, Nunito Sans for everything else.
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

**Headings:** EB Garamond at weight 500 (carried by the size tokens, so `font-heading text-heading` is enough); the face is light with a small x-height, so 500 and slightly negative tracking keep presence without getting loud. Lining figures (`"lnum"`) are set once on `--font-heading`, so class ranges, percentages and counters in serif never turn old-style; add `tabular-nums` where figures align (scores, list counters, phone numbers, hours). **Body:** Nunito Sans 400, with 500 for buttons, nav links and eyebrows and 600 for names and FAQ questions. Nunito's x-height is large, so body is 1rem, not 1.0625rem. Both are variable fonts loaded through `next/font/google` (latin, `display: swap`).

### Scale (Tailwind tokens; size, line height, weight, tracking)

| Token               | Size                      | LH   | Weight | Tracking | Use                                                                                                                  |
| ------------------- | ------------------------- | ---- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `text-display`      | clamp 2.5–4.75rem (9.4vw) | 1.04 | 500    | -0.02em  | Hero h1, below `sm`; honour-board year numeral                                                                       |
| `text-display-wide` | clamp 2.5–4.75rem (7.2vw) | 1.04 | 500    | -0.02em  | Hero h1 from `sm` (two fixed lines)                                                                                  |
| `text-page-title`   | clamp 2.25–3.375rem       | 1.08 | 500    | -0.018em | Compact hero h1 on inner pages (36px at 375, 44 at 768, 54 at 1280); always above the h2, never near the home h1    |
| `text-heading`      | clamp 2–2.75rem           | 1.1  | 500    | -0.015em | Section h2; result card score from `md`                                                                              |
| `text-title`        | 1.625rem                  | 1.2  | 500    | -0.01em  | Card h3 from `md`, reason h3 from `md`, dialog title, result score below `md`                                        |
| `text-subtitle`     | 1.375rem                  | 1.25 | 500    | -0.005em | Serif titles in list rows below `md` (course, reason), player and playlist titles, honour-board names and year index |
| `text-lead`         | 1.1875rem                 | 1.5  | 400    | 0        | Hero supporting line from `md`; FAQ question and result name from `md` (Nunito Sans, 600)                            |
| `text-intro`        | clamp 1–1.125rem          | 1.6  | 400    | 0        | Section intro under the h2                                                                                           |
| `text-base`         | 1rem                      | 1.65 | 400    | 0        | Body (default on `<body>`), answers, quotes, reason lines                                                            |
| `text-eyebrow`      | 0.9375rem                 | 1.4  | 500    | 0.02em   | Section and hero eyebrows, course group labels                                                                       |
| `text-sm`           | 0.9375rem                 | 1.5  | 400    | 0        | Smallest text: meta, captions, bylines, course notes, proof line, hours                                              |

At 1280: h1 76 → h2 44 → title 26 → subtitle 22 → lead 19 → intro 18 → body 16 → small 15. Do not set `font-normal`, `tracking-*` or `leading-*` on a headed role; the token carries them.

### Named Rules

**The Heading Weight Rule.** Headings are EB Garamond 500 through the size tokens. No bold, no italic, no faux weights.
**The Heading Level Rule.** `h1` only in the hero, `h2` for sections, `h3` for cards. Section headings are h2 in EB Garamond. Footer and utility headings may be h2 styled as small Nunito Sans labels.
**The Floor Rule.** Minimum text size is 0.9375rem. Do not use `text-xs` or arbitrary sizes.
**The Figures Rule.** Serif numerals are lining (set on `--font-heading`); figures that align or change are also `tabular-nums`.
**The Wrap Rule.** `h1`–`h3` use `text-wrap: balance`; `p`, `li`, `blockquote`, `figcaption` use `text-wrap: pretty` (both in `globals.css`). Where that cannot save a lone word in a narrow card, join the last words with a no-break space in the copy (`\u00a0`, e.g. course notes "8 or 9", "usually June–August").
**Line length.** Intro paragraphs cap at `max-w-prose`; hero supporting line at `max-w-xl`.

## Layout

- **Container:** `Container` is `max-w-6xl`, gutters `px-4` (1rem), `md:px-6`. Hero and navbar use the same width.
- **Section rhythm:** `Section` is `py-20 md:py-28`, `scroll-mt` equals `--navbar-height` (4rem). Alternate with `tone="muted"` (home: the results section, between the paper why-daksh and the paper testimonials). For a section that needs a visible edge against its neighbours (the director), use `tone="band"` (`bg-secondary`, paper tint): full-bleed, normal padding. At most one band among adjacent sections (the director and videos bands are separated by the paper why-daksh). On a band use `outline` (paper) or `quiet` buttons, never `secondary` (same tint). Headings sit above content via `SectionHeading` (`gap-3`; eyebrow, h2, intro).
- **Hero:** every page starts with one (`getPage()` throws otherwise). It runs behind the transparent navbar, so its top padding is navbar height plus `--hero-pad` (1.5rem, 2.5rem from `md`). `large`: below `md` it sizes to its content (`pb-12`, and the next section's `pt-12`, so the next section's eyebrow and heading sit fully at the bottom of a 375×812 first screen, never half a card). From `md` it fills the first screen: `min-h-svh`, content centred vertically (`pb` = navbar height, so the centre sits just below the navbar), so no part of the next section shows on the first screen at 768×1024, 1280×800, 1440×900 or 1920×1080. The next section then takes `md:pt-16` instead of `md:pt-28` (the hero's own empty space already separates them); the home courses section, which carries the course path, takes `md:pt-48` (see Motion). The flame wash is anchored to the content block from `md` (`data-anchor="content"`: reaches up by navbar + padding, full viewport width, also fades in at the top) so the light stays behind the emblem wherever the content centres. Emblem 4.5rem (5rem from `md`). `compact` (every inner page): a reading intro, so it is left-aligned in `Container` (same edges as the navbar). Top padding is navbar + 2rem (3rem from `md`), `pb-10 md:pb-14`. No wash and no glow (the flame belongs to the home emblem). Order: breadcrumbs, eyebrow (plain muted `text-eyebrow`, no side rules, `mt-6` under the trail), h1 in `text-page-title` (`mt-3`, `max-w-4xl`, one or two lines), subheading in `text-intro` muted at `max-w-prose` (`mt-5`). Actions, if any, are left-aligned at `mt-8`.
- **Mobile first:** design at 375px. Buttons stack full width below `sm`, sit in a row from `sm`.
- **Units:** Tailwind scale first, `rem` for arbitrary values. `px` only for hairlines, shadows, image `sizes`/`width`/`height`, and shadcn `ui/` internals.

## Elevation & Depth

Flat. Depth comes from paper tone (raised card on paper) and hairline borders, not shadows. The only shadow is `shadow-sm` on the scrolled navbar pill. Dialog and drawer sit on a warm ink scrim (`bg-foreground/30`), never black. The hero wash is layered radial gradients (yellow core, amber, orange edges) fading into paper with a mask. No `filter: blur`.

**The Calm Decoration Rule.** Decoration never sits behind text and is never louder than the heading. The hero wash is the only background effect on a page, and it fades out before the content below the hero.

**The Flame Glow Rule.** The flame glow is used only behind the hero emblem: it is the diya's light. Never use it as a separator, a section edge or a background elsewhere (the dark CTA band's own glow is a diya lit in a dark room, a separate case). The hero flows into the next section through space and the course ribbon (see Motion), never through light or a line. Portraits carry no glow, shadow or mask.

## Shapes

Soft, friendly, not bubbly. Base radius `--radius` 0.625rem; scale `sm` 0.6×, `md` 0.8×, `lg` 1×, `xl` 1.4×. Buttons, the scrolled navbar and the skip link are fully pill-shaped (`rounded-4xl`). Cards and wells use `lg`/`xl`. Borders are 1px hairlines.

## Components

### Buttons

Pill, Nunito Sans 500 at `text-sm`. Hierarchy (data variant → look): `primary` = red fill, white text; `secondary` = paper tint; `outline` = paper with hairline border. Hover: primary darkens, others shift to `muted`. Focus: `focus-ring` (2px solid `ring`, 2px offset). Never hard-code behaviour; use `ActionButton` with `link`, `contact-dialog`, `directions` or `social` actions. `directions` opens the site's `mapUrl` in a new tab (`rel="noopener noreferrer"`) with a Location icon. `social` (`{ type: "social", platform }`) opens that platform's `site.socials` url the same way, with the platform icon; the build fails if the platform is not in `site.socials`. A social button is never platform-coloured (YouTube is not red here); use `outline`. Data variant `quiet` maps to `ghost` (ink text, no fill, not red): the content-level replacement for a text link.

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

Desktop (`useIsDesktop`) uses a centred Dialog; mobile uses a bottom Drawer. Same content, three clear levels: title in EB Garamond `text-title` (26px), phone numbers in EB Garamond `text-subtitle` with lining and tabular figures, hours as a muted `text-sm` line under the title. Then the phone list with Call, WhatsApp and Copy actions, each `h-11` with `text-base`. Spacing: title to hours `mt-1`, header to list `gap-6`, number to its actions `gap-3`, rows divided by a hairline with `py-5`. Close button is `size-11` on `secondary`. Focus returns to the opener. Scrim is warm ink at 30%.

### Breadcrumbs

A quiet trail inside the compact hero, above the eyebrow (`HeroBreadcrumbs`, wrapping shadcn `Breadcrumb`; items come from the hero's `breadcrumbs` data: label, plus `href` on every item but the last). `text-sm` muted, chevron separators, links `link-draw` with a `hit-area` (≥ 2.75rem target) and the usual focus ring; the current page is plain ink text with `aria-current="page"`. No red. The large hero has none.

### CTA band (dark)

The page's one dark band, the last section, directly above the footer (`cta-band`, `variant: "dark"`; a second one fails the build). Warm ink (`foreground` value) with a faint flame glow from the top centre (`.cta-glow`: `flame-light`, `flame`, `saffron` radial gradients masked to fade out before the buttons), like a diya lit in a dark room. No blur. Its one motion: the glow warms from 35% to full opacity as the band scrolls in (`CtaGlow`, anime.js `onScroll` with `sync`, linear, no easing or inertia; 0 when the band's top meets the bottom of the screen, 1 when its bottom does), so it stops the moment scrolling stops. It starts after window load and idle, and only the glow moves: the text and buttons are always fully visible and never animate. Without JS and under reduced motion it rests at full strength. Centred: one short message and two actions close the page on a single focal point, and the glow sits over the centre. `data-surface="ink"` re-maps the tokens (`background`, `foreground`, `primary`, `muted`, `input`, `ring`), so `ActionButton` and `focus-ring` restyle themselves with no new button variants. "Talk to us" is data `primary`, which becomes a solid paper button with ink text (never red on dark); "Get directions" is `outline` with a paper border. The focus ring turns light (`flame-light`, 13.4:1 on ink). Buttons are `h-11` below `lg` and stack full width on mobile. Office hours come from site data (`showHours`), under the buttons in muted `text-sm`. The band runs flush into the footer: `main` drops its bottom hairline when the ink band is its last child, so the edge is one tonal step, ink to footer paper.

### Footer

Quiet tonal block (`bg-footer`), no red. Three groups: contact, visit, and Explore plus Courses columns (two-up at every width). Column titles are muted `text-sm`; links are ink with underline on hover/focus. Tagline in EB Garamond. Social icons sit in `size-11` targets. The wordmark is decorative, tone on tone (`footer-mark`), its lower third clipped by the footer edge.

### Portrait (split section)

Portraits are rounded rectangles (`rounded-xl`), head-and-shoulders, `aspect-4/5`, `object-cover`, no glow, shadow or mask. The face fills about 45–50% of the frame height and the crop never cuts the forehead; crop the source file, do not zoom in CSS. Size: `max-w-80` (20rem) on mobile, centred above the text; `md:max-w-100` (25rem) on desktop. Lazy `next/image` with a `sizes` that matches.

### Cards

`card` paper, hairline border, `lg`/`xl` radius, no shadow. Title is an `h3` in `text-title`.

### Course grid

Courses grouped under muted `text-eyebrow` labels (a `<p>`, not a heading; no rule beside them, the page already has plenty of lines). Below `md` each group is one raised `card` panel of full-width rows (min `4rem`, hairline dividers, title `text-subtitle`, note, chevron). From `md` the panel dissolves into cards (`rounded-xl`, 2 columns); from `lg` every group shares one column grid (largest group, up to 4). Each course is a stretched link (`<h3><a>` with `after:inset-0`), so its accessible name is the title only. Hover (pointer devices only) is `muted`, a soft flame glow rising from the card's bottom edge and a 0.25rem arrow nudge; pressed is `accent` with the same glow and nudge, instantly. The glow is a `::before` radial gradient (`flame` 40%, `saffron` 12%, in the bottom half only), kept faint so `muted-foreground` text stays at 5:1 or better over it; it never covers the title. Under reduced motion the glow still appears (a static colour change) but nothing moves. The Classes 11–12 stream card is not a link and has no glow; its chips keep their own states. Groups with fewer than three items (Entrance and skills) use two wider columns from `lg` (`max-w-3xl`) so long titles keep to two lines. Focus is the 2px ring on the whole row or card. A stream group (Classes 11–12) is not a link: its stream chips are `h-11` outline links (`px-3.5`, `gap-1.5`, so three fit in at most two rows at 768 and 1280) with a hidden group prefix. No red in the section.

**Full variant** (`variant: "full"`, the `/courses` page): each course card also shows its summary under the note (`text-base`, ink at 80%). Chevron and title align to the top. Columns follow each group so summaries are never squeezed: from `md` two columns, with an odd last card spanning both (no orphan card); from `lg` a four-card group is 2×2, a three-card group three across, a group of fewer than three keeps the two wider columns. The scroll-synced ribbon and path are home-only, so the full grid has none, and the section uses the plain `pt-12 md:pt-16`. Everything else (groups, stream chips, whole-card links, flame hover) is the same.

### Reason list

A ruled `<ol>` of 3–8 reasons (`reason-list`). Numerals are CSS counters (EB Garamond, `text-muted-foreground`, tabular figures, fixed 2.5rem column, empty alt text so screen readers hear the list, not the number). Each row: `h3` title (`text-subtitle`, `text-title` from `md`) and one line of muted `text-base`; hairline rules between rows only (`py-5`, `md:py-6`). No icons, cards, hover, links, chevrons, red or motion. Mobile: heading, list, then the figure (`h-56` photo, `rounded-xl`, caption). From `md`: 12-column grid by named areas; heading and figure in columns 1–5 (figure bottom aligned with the last row), list in 6–12. Default paper tone, no divider.

### Results honour board

Home results (`results-board`, from `src/content/results.ts`). A printed honour board in warm paper, like the boards in school halls: a framed sheet with a lettered title, a year index and rows of name, dotted leader and score. Section tone `muted`; heading centred (`SectionHeading align="center"`) so heading, board and "See all results" share one axis. `getPage()` builds one tab per year present in the data (newest first, default the newest); within a year, highlights first, then higher percentage, entrance results last, at most `perYear` (6) rows. The full list belongs to `/results` (`results-grid`, below).

**Frame.** One board, centred, `max-w-3xl` (48rem), `bg-card` (paper raised on the muted section), square corners (printed, a deliberate exception to the card radii). From `sm` a thin double rule like a certificate border: an outer `foreground/20` hairline, 0.375rem of paper, an inner one. Below `sm` the board is full width with the inner rule only, a lighter frame. Padding `px-4 py-8`, `sm:px-8 sm:py-10`, `md:px-14 md:py-12`. Tokens only, no new colours.

**Lockup.** `boardTitle` ("Honour Board", page data) in EB Garamond `text-subtitle`, all small caps, `tracking-[0.08em]`, muted. Below it the year index: shadcn `Tabs` (Base UI), `variant="line"`, years in EB Garamond `text-subtitle`, tabular, `h-11`, centred, separated by small muted dots (a `::before` shape, not a character, so the tab names stay clean). Active year is ink with a 1px ink underline under the numeral only; inactive is muted. No pill, no full-width bar, no red. Arrow keys move between tabs (`activateOnFocus`). Every panel is `keepMounted` (inactive ones `hidden`, in the HTML), so all years are crawlable. The size sits on an inner span because `cn` treats a `text-subtitle!` and a colour class as one conflict. In each panel the year is set again, large (`text-display`, tabular), between two `foreground/20` rules, `aria-hidden` (the tab already names the panel).

**Row.** A native `<details>`; hairline rules between rows and at both ends. The `summary` (min `2.75rem`, `py-3.5`, `focus-ring`) has two lines. Line one: the student's name, a dotted leader, the score, a plus. Line two: one muted `text-sm` meta line ("Class 12 · Science", entrance "Entrance · AISSEE"). The course taken is not in the summary any more.

- Name: `h3` in EB Garamond `text-subtitle`. This reverses the Nunito Sans 600 name rule for this section only (a lettered board sets names in the serif); the FAQ and results grid keep theirs.
- Score: EB Garamond `text-title`, lining + tabular figures, one decimal ("93.0%", so figures line up), `whitespace-nowrap`, right-aligned in a `min-w-18` column.
- Admission: EB Garamond small caps (`font-variant-caps: small-caps`), `text-lead` from `sm`, `text-sm` below, never wraps: "Admitted · Sainik School" ("Selected · RIMC" for a selection). `status` defaults to "Admitted"; the school is `outcome.school`, falling back to `outcome.title`.
- Expand mark: a CSS plus (two 1px bars, ink, `size-4`, `aria-hidden`) that becomes a minus when open (the vertical bar scales out, 250ms, instant with reduced motion). No chevron and no medallion. A visually hidden "Show subject marks" ("Show details" with no marks) completes the summary's accessible name: name, score, meta, hint; `aria-expanded` is native.

**The Leader Rule.** Dotted leaders are the `leader` utility (`globals.css`) on an `::after` with `flex-1` (`after:leader after:flex-1 after:min-w-4`): a repeating radial-gradient on `currentColor` at 70% muted, 0.25rem tall, sitting on the baseline. Never dot characters in the text, so nothing is read out and the leader shortens by itself on narrow rows (a stub stays).

**Expanded body.** Subject marks as a `dl` (`max-w-xs`): subject, leader, mark (EB Garamond, tabular), no hairlines. Then "Course at Daksh · Classes 9–10 tuition" in muted `text-sm`, then the photo when the result has one (`w-28`, `aspect-4/5`, `rounded-lg`, lazy). Development data has no photos.

**Mobile (375).** Same board, full width, inner rule only. Rows keep scores and admissions on one line; the name wraps only if it must.

**Motion.** `DetailsList` (`src/components/shared/details-list.tsx`, shared with the FAQ): the same 250ms height and opacity animation, reduced-motion and no-double-toggle behaviour; the body is marked `data-details-body`. Without JS or under reduced motion the native toggle applies.

**Year switch** (`ResultsBoardTabs`, a client island around the tabs; the panels stay mounted, so every year is in the HTML). The active-year underline is one line (Base UI `Tabs.Indicator`) that slides between the years (`--dur-base`, settle); until it is shown, and without JS, the triggers draw their own static underline. On a tab change only, never on scroll, the new year's numeral fades in (`--dur-base`, settle, rising 0.25rem) and its rows rise 0.75rem with a 30ms stagger capped at 180ms (anime.js). A quick second switch takes over. Reduced motion: the swap and the underline are instant.

**Action.** "See all results" (`quiet`, from section data) sits once under the board, centred. No red.

### Results grid

Not on home any more: the card grid is kept for the `/results` page. Recent results (`results-grid`, from `src/content/results.ts`, resolved to `{ name, photo, headline, meta }`; highlights only, newest year first). Tone is `muted`: why-daksh above and testimonials below are paper, so the results get their own surface and the raised cards lift off it with a hairline. One markup for every width; cards are not links and have no hover or motion.

Card: photo `aspect-4/5`, `rounded-xl`, no effects (initials in EB Garamond when there is no photo, decorative `alt=""` because the name sits beside it). Then the score or admission (`headline`: "96.2%", or the school's short name, "Sainik", "RMS", "RIMC", so it stays on one line in a five-across card) in EB Garamond with lining tabular figures, `text-title` on mobile and `text-heading` from `md`; then the student's name as an `h3`; then a muted `text-sm` meta line ("Class 12 · Science · CBSE 2026 · Classes 11–12 tuition" or "Admitted · AISSEE 2026 · RMS/RIMC/Sainik prep"). The meta line breaks only between its parts, never inside one. DOM order is name, score, meta; the score is shown first. The student name is an `h3` in Nunito Sans 600 (`text-base`, `text-lead` from `md`), not EB Garamond: with the score set in the serif at heading size, a second serif line would compete with it. This is a deliberate exception to "h3 is EB Garamond", like the FAQ questions. Subject marks are not shown on home (`variant: "compact"`).

Layout: below `md`, one raised `card` panel of rows (4.5rem photo left, hairline dividers). At `md`, six columns with cards spanning two, so 3 + 2 with the short row centred (structural `nth-` selectors, no per-count markup). At `lg`, five equal cards in one row. From `md` each card is a four-row subgrid (photo, score, name, meta), so a percentage card and an admission card line up even when "Rashtriya Military School" wraps. No red.

### Testimonial grid

Reviews on home (`testimonial-grid`, `layout: "carousel"`, `show: "featured"`): every testimonial with `featured: true`, sorted by `order`, at most 12, resolved by `getPage()` to `{ name, byline, text, photo, source }`. `layout: "grid"` (three columns from `md`, no arrows) is for the results page. Default paper tone: results above are muted, the videos band below.

**Header row.** The usual `SectionHeading` on the left. On the right a Google rating badge and previous/next arrows (`size-11` outline round buttons). The badge is a pill link, `h-11`: "4.8 ★ · 197 Google reviews" (rating in 600 with tabular figures, the star `saffron` and decorative, the text "Google" only, no logo). It opens `site.googleReviews.url` in a new tab; its accessible name adds "see them on Google (opens in a new tab)". It is hidden when `site.googleReviews` is missing. Below `md` the badge and arrows share one row under the heading (badge left, arrows right).

**Carousel.** shadcn Carousel (embla): no autoplay, no loop, `align: "start"`, snaps to cards, drag or swipe on touch, arrows, and ArrowLeft/ArrowRight while focus is inside. Visible: one card at `85%` width so the next peeks in below `md`, two at `md`, three at `lg`. The arrows disable at the ends and keep focus (`focusableWhenDisabled`). Root is a named region with `aria-roledescription="carousel"`; each slide is a group labelled "n of N". All slides are in the server HTML. Without JavaScript (`scripting: none`) the row scrolls natively and snaps.

**Paper card** (`TestimonialCard`): `card` surface, hairline border, `rounded-xl`, `p-6`, no shadow. The quote is verbatim in Nunito Sans `text-base` (not EB Garamond: quotes run 50+ words, and the serif's small x-height reads worse at card width), no quote glyph, no italic. The `<figcaption>` is pinned to the bottom (`mt-auto`) so attributions align across a row of equal-height cards: 3rem avatar (photo, else initials on `muted`), name in 600, muted `text-sm` byline. A `source: "google"` card adds "Google review" to the byline line. At rest cards alternate a 0.5° tilt (right, left); they straighten to 0° (`--dur-base`, settle) on hover (pointer devices only) and, in the carousel, when their slide is the snapped one; a card held by the pointer (while dragging) also straightens and presses to 0.985. The marks (`data-snapped`, `data-held` on the slide) come from `TestimonialCarouselMotion` through Embla events, and the card reads them in CSS. Under reduced motion no mark is set, the tilt stays and nothing animates. No red.

### Lesson player

Free YouTube playlists as a player with a playlist list (`video-player`, videos from `src/content/videos.ts`, `defaultVideo` chosen in the section data, resolved to `items: { id, title, href, embedSrc, thumbnail, meta }`; the playlist and embed URLs are built only in `content.ts`). It replaced the earlier card grid (`video-grid`, removed). The section is a Server Component; one client island (`LessonPlayer`) holds the selection and play state. Thumbnails go through `next/image` (`i.ytimg.com` in `remotePatterns`), full colour (no filter), lazy, decorative (`alt=""`).

**Player.** A click-to-play facade: the selected playlist's thumbnail in a 16:9 `rounded-xl` box with a centred round play button (`size-16`, `size-20` from `md`, paper disc, ink Hugeicons `PlayIcon`, no red) over a faint ink scrim. The facade is a real link to the playlist (`target="_blank"`, accessible name "Play Class 10 Maths lessons"); with JavaScript a plain click swaps it for an iframe (`youtube-nocookie.com/embed/videoseries?list=…&autoplay=1`, descriptive `title`, `allow` list, `referrerPolicy`) and moves focus into it. Nothing is requested from YouTube before that click. Under it: the playlist title (`text-subtitle`) and an "Open on YouTube" link (new tab, underlined, arrow icon, `hit-area`).

**List.** One row per playlist in a raised panel (`card`, hairline, `rounded-xl`, rules between rows): 4.5rem 16:9 thumbnail, title (`text-subtitle`), muted `text-sm` meta ("Playlist"). Each row is a real `<a href>` to the playlist (works without JavaScript and for crawlers); a plain click is intercepted to select it (modifier-clicks open the link). Selecting shows that playlist's facade and never autoplays. Selected row: `aria-current="true"`, a flame-tinted fill, a ring around its thumbnail and the meta reads "Now showing" (so state is never colour alone). No coloured side stripe. Rows are at least 4rem tall; hover fill on pointer devices only, `accent` while pressed, and while pressed the row's content (not the row) scales to 0.985, so the fill stays flush with the panel border; focus ring is drawn inside the row.

**Layout.** `lg`: player in columns 1–7, list in 8–12, the list stretching to the player column's height with equal rows so both sides balance. Below `lg` (including `md`): player full width, list below; at 768 the player would be about 22rem wide beside a list, too tight, so `md` stacks. Tone is `band` (why-daksh above is paper; the band gives the section its own edge and steps tint → ink into the CTA). The action is `outline` (never `secondary` on a band), no red.

Motion: only the play button's scale and the scrim tint (200ms, hover/press); both off under reduced motion.

### FAQ

Questions parents ask before they call (`faq`, items `{ question, answer }`). Text may use `{address}`, `{phones}` and `{hours}`; `getPage()` fills them from site data and an unknown name fails the build. No buttons: the dark CTA band follows.

Layout: below `md` a single column. From `md` a 12-column grid like the reason list: heading block in columns 1–5, sticky under the navbar, questions in 6–12, so nine questions do not become one long narrow centred scroll. Default paper tone (the videos band is above, the dark CTA below). Hairline rules between items and at the top and bottom of the list. All closed by default; several can be open.

Each question is a `<details>` with a full-width `<summary>` (min `2.75rem`, `focus-ring`, default marker removed). The question is an `h3` in Nunito Sans 600 (`text-base`, `text-lead` from `md`), not EB Garamond: nine serif lines in a row read as display text and compete with the h2, while Nunito Sans semibold scans as a list. This is a deliberate exception to "h3 is EB Garamond". A Hugeicons chevron (`aria-hidden`, muted) rotates 180° when open (a plus would read as "close"). The answer is muted `text-base`, `max-w-prose`.

Motion: a small client island (`DetailsList`, anime.js, shared with the results board) wraps the list. A click on a summary (mouse, Enter, Space) is intercepted and the answer's height and opacity animate over 250ms, with `open` set before opening and removed after closing; the chevron turns in sync (CSS, keyed to `[open]:not([data-closing])`). A click mid-animation takes over from the current height. Items the browser opens itself (find-in-page) are left alone. Without JS, and under reduced motion, the native instant toggle applies. No red.

**The Native Details Exception.** The FAQ uses native `<details>`/`<summary>`, not a shadcn (Base UI) accordion, on purpose: it needs no JavaScript, every answer stays in the HTML while closed (search engines, find-in-page, no-JS), and keyboard and screen-reader behaviour is built in. An accordion would add a client island for nothing here.

## Motion

**Motion vocabulary** (CSS custom properties on `:root` in `globals.css`; use these, not ad hoc values).

| Token                                 | Value                           | Use                                                      |
| ------------------------------------- | ------------------------------- | -------------------------------------------------------- |
| `--ease-settle`                       | `cubic-bezier(0.16, 1, 0.3, 1)` | arrivals, returns, press release, underline draw, dialog |
| `--ease-out`                          | `ease-out`                      | plain fades (scrim)                                      |
| `--ease-scroll`                       | `linear`                        | scroll-synced motion only (ribbon, path)                 |
| `--dur-press`                         | 120ms                           | press feedback, check pop                                |
| `--dur-base`                          | 250ms                           | state changes, underline draw, nudges                    |
| `--dur-slow`                          | 450ms                           | overlays (dialog, drawer)                                |
| `--dur-base-exit` / `--dur-slow-exit` | 150ms / 270ms                   | exits, about 60% of the entrance                         |

Animate `transform` and `opacity` only (scale, translate, fade); colour changes are the one exception and stay quick. Reduced motion: no scale, nudge or pop; colour changes and underlines appear instantly; the dialog still fades.

- **Press and hover family** (`globals.css`, keyed on `data-slot`, because `src/components/ui/` is not edited): `button` and `action-button` scale to 0.96 while pressed (120ms) and return with settle; carousel arrows 0.94. A trailing button icon (`data-icon="inline-end"`) nudges 0.25rem on hover (pointer devices only). Course cards and rows and playlist rows scale to 0.985 while pressed (classes on the item). Hero buttons get press and hover only, never an entrance.
- **Link underline draw:** `link-draw` (a link's own text) and `link-draw-label` (a span inside a quiet button or the Google badge, reacting to the control): a 1px line grows left to right on hover and `focus-visible` over `--dur-base`, settle. Used by quiet buttons (`ActionButton` wraps their label), footer links, "Open on YouTube" (over its resting hairline underline) and the Google badge.
- **Contact dialog and drawer:** desktop popup arrives from scale 0.96 plus fade (450ms, settle) and leaves in 270ms; the scrim fades in 200ms and out in 270ms, ending with the popup so the close is one movement (`.contact-scrim` on both overlays; exit animations use fill-mode forwards so nothing snaps back before unmount). The mobile drawer keeps its native slide on the same curve; its exit is 270ms scaled by swipe strength. **Copy:** the icon swaps to a check with a 120ms pop for 1.5s and the label stays "Copy" (a longer "Copied" overflowed the drawer at 375); the `aria-live` announcement reads "Copied" and the buttons are `px-3` so the three actions fit down to 360px.
- CSS for simple transitions (≤300ms; state changes use `--dur-base` with settle, plain fades `ease-out`): the year underline, the testimonial straighten. anime.js for sequences, loops and scroll sync (the nav highlight, the hero ornament fade-up, the flame flicker, the honour board's row rise, the CTA glow, the course ribbon and path).
- **Emblem flame flicker** (hero `large` only, `EmblemFlame`): a cropped copy of the emblem's flame (`daksh-emblem-flame.png`, the region x 215–430, y 0–290 of the emblem file) is laid exactly over the flame, with two loops: a vertical breath (`scaleY` 1 to 1.06, 5.2s, from the flame's base) and a sway (±1° and opacity 0.9 to 1, 3.7s), both ease-in-out and alternating. Nothing renders or loads before the window has loaded and the browser is idle; the loops pause while the emblem is off screen or the tab is hidden. Without JS and under reduced motion the emblem is still.
- Content is always visible without JavaScript. Hidden-until-revealed states exist only under `@media (scripting: enabled)` with a CSS fallback timer.
- **Never animate the hero headline, supporting line or buttons** (LCP). Only the emblem may enter (and, after load and idle, its flame may flicker).
- **Course ribbon and path** (`course-ribbon` below `md`, `course-path` from `md`; the `ribbon` flag on the home course grid): the course titles in section order, EB Garamond 500 (`text-subtitle`, `text-title` from `md`, always smaller than the h2), `text-muted-foreground`, separated by small dots, full-bleed with both ends masked to paper. The left fade is exactly the container gutter wide (`--ribbon-start`), so the first title is fully opaque at rest; the right fade is 3rem. Both are `aria-hidden`, not focusable, no hover state, no stroke, no glow, no line. The gap is set, not squeezed: the courses section takes `pt-20` (5rem) below `md` and `md:pt-48` (12rem) from `md`, so the old "no added height" limit no longer applies.
  - **Ribbon (below `md`):** a straight line in the gap between the proof line and the eyebrow, about 2.75rem below the proof line and 3.5rem above the eyebrow. Its position is tied to scroll progress only (anime.js `onScroll` with `sync`, `translateX` only, right to left, at most one viewport width of travel, linear, so it stops the moment scrolling stops).
  - **Path (from `md`):** the same titles set on one gentle ease-out curve (`<text><textPath>` in an SVG), rising about 3rem over the four school stages (Classes 1–5 to 11–12) and then level, so the side offerings sit on the flat tail. It sits at the top of the courses section, below the first screen (the hero still fills it alone), 6rem tall, about 100px from its lowest letters to the eyebrow. The SVG is drawn at 1:1 (no `viewBox` scaling), so the text keeps its token size and never drops below the type floor. Scroll sync moves `startOffset` back along the path (anime.js `onScroll` with `sync`, linear, travel no more than the window's scroll distance and no more than one viewport width), so later stages arrive from the right onto the high, level part. Moving forward was tried and rejected: it breaks the static rest state and pushes the later stages off screen.
  - There is no autoplay. Without JavaScript, before hydration and under reduced motion both are static with the first title on the container edge, the same place they start from, so nothing shifts. The section stays a Server Component; `CourseRibbon` and `CoursePath` are the only client islands.
- `prefers-reduced-motion` means static: wash settle and ornament entrance are off, the flame flicker is not rendered, the nav highlight jumps, navbar transitions are disabled, the course ribbon stays at rest, the board swaps years instantly, testimonial tilts stay, the CTA glow rests at full strength.

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
- **Do** keep headings EB Garamond 500 (via the size tokens) and body Nunito Sans 400/500/600.
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
