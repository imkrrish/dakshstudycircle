# Theme switcher proposal: palettes and font pairings

Palettes reworked: primary red fixed, six second-colour families. Data: `themes.ts` (same folder). Contrast figures are computed from the OKLCH values (WCAG 2.x); the checker reproduces DESIGN.md's published numbers for palette 1 (16.3, 6.9, 5.4, 6.7, 3.5, 6.0).

## Fixed constraints
- The primary red never changes: `--primary` is `0.55 0.22 27` and `--primary-hover` is `0.5 0.2 27` in every palette (white text on it 5.4:1; hover 6.7:1). The logo and emblem image are never recoloured. `--destructive` is also shared.
- Palette 1 is today's site, token for token. Palettes 2–7 each rotate everything else around one "second colour" family (a single OKLCH hue per palette; chroma is scaled per family, then clamped to sRGB).
- The family drives: the hero wash, the tinted bands (`secondary`, `muted`), muted text, footer and wordmark tint, border/input undertone, the focus ring (a deep shade of the family, never red), a faint undertone in paper and ink, the dark closing band (a deep shade of the family) and its glow, and the accent tints (`flame-light`, `flame`, `saffron`: used by the card hover glow, never text).
- Rules kept in every palette: the dark band is the only dark surface; primary on the band is the paper button; hover is darker; focus ring is never red.
- `.dark` tokens are out of scope (no toggle ships).

## 1. Palettes

| # | Name | Family hue | Mood | Background | Primary |
|---|---|---|---|---|---|
| 1 | **Warm Paper** | flame (amber/saffron) | The current look: cream paper, brown-black ink, one red. | #fdfaf4 | #d40c1a |
| 2 | **Heritage Navy** | 255 | Deep navy ink and cool blue-tinted paper: formal, trusted, with the red as the only warmth. | #f5fbff | #d40c1a |
| 3 | **Peacock** | 200 | Teal and peacock blue-green: fresh and lively, with a lagoon-dark closing band. | #f3fcfc | #d40c1a |
| 4 | **Forest** | 152 | Deep green: grounded and growing, with leaf-tinted paper and a forest-dark closing band. | #f6fcf7 | #d40c1a |
| 5 | **Plum** | 330 | Aubergine: warm, rich and a little regal, with blush-lilac paper and a plum-dark closing band. | #fef8fd | #d40c1a |
| 6 | **Slate** | 232 (low chroma) | Cool grey-blue: calm, modern and restrained; the greyest palette of the set. | #f8fafc | #d40c1a |
| 7 | **Indigo** | 292 | Indigo dye: violet-blue and traditional-crafted, with lavender-tinted paper and an indigo-dark closing band. | #faf9ff | #d40c1a |

Direction notes
- **2 Heritage Navy**: the bluest and most formal; blue-tinted paper, navy-black ink, deep navy band with a blue glow.
- **3 Peacock**: aqua/teal wash and bands (hue 200, between blue and green); lagoon-dark band. The freshest and lightest-feeling.
- **4 Forest**: leaf-green tint on paper and bands, forest-dark band; calm and grounded.
- **5 Plum**: pink-lilac bands (hue 330) with an aubergine band; the warmest of the cool families. Sits well away from the red (hue 27).
- **6 Slate**: the greyest palette (chroma scale 0.4): near-neutral paper and bands with a steel-blue cast and a charcoal-blue band. The quietest.
- **7 Indigo**: violet-blue (hue 292) bands and a deep indigo band; more violet than Navy and bluer than Plum.

### Token values (every token; remaining ones are derived, see below)

| Token | 1 Warm Paper | 2 Heritage Navy | 3 Peacock | 4 Forest | 5 Plum | 6 Slate | 7 Indigo |
|---|---|---|---|---|---|---|---|
| `--background` | `0.985 0.008 85` | `0.985 0.0108 255` | `0.985 0.0092 200` | `0.985 0.0092 152` | `0.985 0.0092 330` | `0.985 0.0032 232` | `0.985 0.0108 292` |
| `--foreground` | `0.23 0.02 45` | `0.23 0.0473 255` | `0.23 0.0403 200` | `0.23 0.0403 152` | `0.23 0.0403 330` | `0.23 0.014 232` | `0.23 0.0473 292` |
| `--card` | `0.995 0.004 85` | `0.997 0.0041 255` | `0.997 0.0034 200` | `0.997 0.0034 152` | `0.997 0.0034 330` | `0.997 0.0012 232` | `0.997 0.0041 292` |
| `--primary` | `0.55 0.22 27` | `0.55 0.22 27` | `0.55 0.22 27` | `0.55 0.22 27` | `0.55 0.22 27` | `0.55 0.22 27` | `0.55 0.22 27` |
| `--primary-hover` | `0.5 0.2 27` | `0.5 0.2 27` | `0.5 0.2 27` | `0.5 0.2 27` | `0.5 0.2 27` | `0.5 0.2 27` | `0.5 0.2 27` |
| `--primary-foreground` | `1 0 0` | `1 0 0` | `1 0 0` | `1 0 0` | `1 0 0` | `1 0 0` | `1 0 0` |
| `--secondary` | `0.945 0.025 75` | `0.942 0.0325 255` | `0.942 0.0345 200` | `0.942 0.0345 152` | `0.942 0.0345 330` | `0.942 0.012 232` | `0.942 0.0345 292` |
| `--muted` | `0.96 0.012 80` | `0.962 0.0189 255` | `0.962 0.0161 200` | `0.962 0.0161 152` | `0.962 0.0161 330` | `0.962 0.0056 232` | `0.962 0.0189 292` |
| `--muted-foreground` | `0.46 0.025 50` | `0.46 0.0607 255` | `0.46 0.0517 200` | `0.46 0.0517 152` | `0.46 0.0517 330` | `0.46 0.018 232` | `0.46 0.0607 292` |
| `--destructive` | `0.49 0.18 8` | `0.49 0.18 8` | `0.49 0.18 8` | `0.49 0.18 8` | `0.49 0.18 8` | `0.49 0.18 8` | `0.49 0.18 8` |
| `--border` | `0.89 0.015 80` | `0.89 0.0297 255` | `0.89 0.0253 200` | `0.89 0.0253 152` | `0.89 0.0253 330` | `0.89 0.0088 232` | `0.89 0.0297 292` |
| `--input` | `0.62 0.02 70` | `0.6 0.0473 255` | `0.6 0.0403 200` | `0.6 0.0403 152` | `0.6 0.0403 330` | `0.6 0.014 232` | `0.6 0.0473 292` |
| `--ring` | `0.5 0.13 60` | `0.48 0.162 255` | `0.48 0.104 200` | `0.48 0.138 152` | `0.48 0.138 330` | `0.48 0.048 232` | `0.48 0.162 292` |
| `--footer` | `0.965 0.016 78` | `0.958 0.025 255` | `0.958 0.023 200` | `0.958 0.023 152` | `0.958 0.023 330` | `0.958 0.008 232` | `0.958 0.025 292` |
| `--footer-mark` | `0.93 0.03 75` | `0.925 0.0413 255` | `0.925 0.0403 200` | `0.925 0.0403 152` | `0.925 0.0403 330` | `0.925 0.014 232` | `0.925 0.0433 292` |
| `--flame-light` | `0.92 0.13 95` | `0.93 0.0385 255` | `0.93 0.0805 200` | `0.93 0.0805 152` | `0.93 0.0645 330` | `0.93 0.028 232` | `0.93 0.0405 292` |
| `--flame` | `0.8 0.165 72.3` | `0.8 0.1065 255` | `0.8 0.1265 200` | `0.8 0.1265 152` | `0.8 0.1265 330` | `0.8 0.044 232` | `0.8 0.1145 292` |
| `--saffron` | `0.71 0.177 50.9` | `0.66 0.1755 255` | `0.66 0.1235 200` | `0.66 0.1495 152` | `0.66 0.1495 330` | `0.66 0.052 232` | `0.66 0.1755 292` |
| `--wash-core` | `0.92 0.13 95` | `0.9 0.054 255` | `0.9 0.092 200` | `0.9 0.092 152` | `0.9 0.092 330` | `0.9 0.032 232` | `0.9 0.058 292` |
| `--wash-mid` | `0.8 0.165 72.3` | `0.78 0.118 255` | `0.78 0.138 200` | `0.78 0.138 152` | `0.78 0.138 330` | `0.78 0.048 232` | `0.78 0.126 292` |
| `--wash-edge` | `0.71 0.177 50.9` | `0.68 0.1755 255` | `0.68 0.1275 200` | `0.68 0.1495 152` | `0.68 0.1495 330` | `0.68 0.052 232` | `0.68 0.1755 292` |
| `--glow-inner` | `0.8 0.165 72.3` | `0.74 0.14 255` | `0.74 0.134 200` | `0.74 0.138 152` | `0.74 0.138 330` | `0.74 0.048 232` | `0.74 0.152 292` |
| `--glow-outer` | `0.71 0.177 50.9` | `0.58 0.1755 255` | `0.58 0.1135 200` | `0.58 0.1495 152` | `0.58 0.1495 330` | `0.58 0.052 232` | `0.58 0.1755 292` |
| **Dark band (`[data-surface="ink"]`)** ||||||||
| ink `--background` | `0.23 0.02 45` | `0.23 0.0743 255` | `0.23 0.0633 200` | `0.23 0.0633 152` | `0.23 0.0633 330` | `0.23 0.022 232` | `0.23 0.0743 292` |
| ink `--foreground` | `0.97 0.01 85` | `0.97 0.0135 255` | `0.97 0.0115 200` | `0.97 0.0115 152` | `0.97 0.0115 330` | `0.97 0.004 232` | `0.97 0.0135 292` |
| ink `--primary` | `0.97 0.01 85` | `0.97 0.0135 255` | `0.97 0.0115 200` | `0.97 0.0115 152` | `0.97 0.0115 330` | `0.97 0.004 232` | `0.97 0.0135 292` |
| ink `--primary-hover` | `0.91 0.02 80` | `0.91 0.027 255` | `0.91 0.023 200` | `0.91 0.023 152` | `0.91 0.023 330` | `0.91 0.008 232` | `0.91 0.027 292` |
| ink `--primary-foreground` | `0.23 0.02 45` | `0.23 0.0743 255` | `0.23 0.0633 200` | `0.23 0.0633 152` | `0.23 0.0633 330` | `0.23 0.022 232` | `0.23 0.0743 292` |
| ink `--muted` | `0.31 0.025 50` | `0.31 0.0675 255` | `0.31 0.0575 200` | `0.31 0.0575 152` | `0.31 0.0575 330` | `0.31 0.02 232` | `0.31 0.0675 292` |
| ink `--muted-foreground` | `0.82 0.02 75` | `0.84 0.0405 255` | `0.84 0.0345 200` | `0.84 0.0345 152` | `0.84 0.0345 330` | `0.84 0.012 232` | `0.84 0.0405 292` |
| ink `--input` | `0.97 0.01 85 /55%` | `0.97 0.0135 255 /55%` | `0.97 0.0115 200 /55%` | `0.97 0.0115 152 /55%` | `0.97 0.0115 330 /55%` | `0.97 0.004 232 /55%` | `0.97 0.0135 292 /55%` |
| ink `--ring` | `0.92 0.13 95` | `0.9 0.054 255` | `0.9 0.092 200` | `0.9 0.092 152` | `0.9 0.092 330` | `0.9 0.032 232` | `0.9 0.058 292` |

Derived tokens (same relationships as today's globals.css): `card-foreground`, `popover-foreground`, `secondary-foreground`, `accent-foreground`, `sidebar-foreground`, `sidebar-accent-foreground` = foreground; `popover` = card; `accent`, `sidebar-accent` = secondary; `sidebar` = muted; `sidebar-primary` = primary; `sidebar-primary-foreground` = primary-foreground; `sidebar-border` = border; `sidebar-ring` = ring; `chart-1..5` = primary, flame, saffron, ring, muted-foreground. Palette 1 resolves to exactly today's :root.

### Contrast (WCAG 2.x; all 7 palettes pass all 29 rows)
Text rows need 4.5:1; non-text (input border, ring, outline border, primary edge) need 3:1.

| Pair | 1 | 2 | 3 | 4 | 5 | 6 | 7 | Needs |
|---|---|---|---|---|---|---|---|---|
| Body text · foreground on background | 16.2 | 16.2 | 16.0 | 16.0 | 16.3 | 16.2 | 16.3 | 4.5 |
| Body text · foreground on card | 16.7 | 16.7 | 16.6 | 16.6 | 16.9 | 16.7 | 16.9 | 4.5 |
| Body text · foreground on muted section | 15.1 | 15.1 | 15.0 | 15.0 | 15.2 | 15.1 | 15.2 | 4.5 |
| Muted text · muted-foreground on background | 6.9 | 6.8 | 6.7 | 6.7 | 7.0 | 6.8 | 6.9 | 4.5 |
| Muted text · on card | 7.1 | 7.0 | 6.9 | 6.9 | 7.2 | 7.0 | 7.2 | 4.5 |
| Muted text · on muted section | 6.4 | 6.4 | 6.3 | 6.3 | 6.5 | 6.4 | 6.5 | 4.5 |
| Muted text · on secondary band | 6.1 | 6.0 | 5.9 | 5.9 | 6.1 | 6.0 | 6.1 | 4.5 |
| Muted text · on footer | 6.5 | 6.3 | 6.2 | 6.2 | 6.4 | 6.3 | 6.4 | 4.5 |
| Button text · primary-foreground on primary | 5.4 | 5.4 | 5.4 | 5.4 | 5.4 | 5.4 | 5.4 | 4.5 |
| Button text · on primary-hover | 6.7 | 6.7 | 6.7 | 6.7 | 6.7 | 6.7 | 6.7 | 4.5 |
| Outline/secondary button text · foreground on secondary | 14.4 | 14.2 | 14.2 | 14.3 | 14.3 | 14.3 | 14.3 | 4.5 |
| Error text · destructive on background | 6.6 | 6.6 | 6.7 | 6.7 | 6.6 | 6.6 | 6.6 | 4.5 |
| Input border · input on background (3:1) | 3.5 | 3.8 | 3.7 | 3.7 | 3.8 | 3.8 | 3.8 | 3 |
| Input border · input on card (3:1) | 3.6 | 3.9 | 3.8 | 3.8 | 4.0 | 3.9 | 4.0 | 3 |
| Focus ring · ring on background (3:1) | 6.0 | 6.3 | 5.8 | 5.8 | 6.7 | 6.2 | 6.7 | 3 |
| Focus ring · ring on card (3:1) | 6.1 | 6.6 | 6.0 | 6.0 | 7.0 | 6.4 | 6.9 | 3 |
| Primary button edge · primary on background (3:1) | 5.2 | 5.2 | 5.2 | 5.2 | 5.2 | 5.2 | 5.2 | 3 |
| Body text over hero wash peak (mid 34%) | 13.1 | 13.1 | 12.7 | 13.1 | 13.0 | 13.2 | 13.1 | 4.5 |
| Muted text over hero wash peak | 5.6 | 5.5 | 5.3 | 5.5 | 5.5 | 5.5 | 5.6 | 4.5 |
| Muted text over hero wash core (core 34%) | 6.4 | 6.3 | 6.1 | 6.2 | 6.3 | 6.3 | 6.4 | 4.5 |
| Dark band · foreground on ink background | 15.6 | 15.6 | 14.9 | 15.2 | 15.7 | 15.4 | 15.7 | 4.5 |
| Dark band · muted-foreground on ink background | 9.7 | 10.4 | 10.1 | 10.3 | 10.4 | 10.3 | 10.4 | 4.5 |
| Dark band · button text on paper button | 15.6 | 15.6 | 14.9 | 15.2 | 15.7 | 15.4 | 15.7 | 4.5 |
| Dark band · button text on paper button hover | 13.0 | 13.0 | 12.5 | 12.8 | 13.1 | 12.9 | 13.1 | 4.5 |
| Dark band · outline border (55%) on ink (3:1) | 5.5 | 5.5 | 5.4 | 5.4 | 5.5 | 5.5 | 5.5 | 3 |
| Dark band · focus ring on ink (3:1) | 13.4 | 12.6 | 12.4 | 12.7 | 12.3 | 12.6 | 12.6 | 3 |
| Dark band · foreground over glow peak | 12.5 | 13.2 | 12.6 | 12.8 | 13.6 | 13.1 | 13.5 | 4.5 |
| Dark band · muted-foreground over glow peak | 7.8 | 8.9 | 8.5 | 8.6 | 9.0 | 8.8 | 9.0 | 4.5 |

Columns: 1 Warm Paper, 2 Heritage Navy, 3 Peacock, 4 Forest, 5 Plum, 6 Slate, 7 Indigo. Wash/glow rows composite the layer at its CSS alpha over the background (the worst point of the gradient); input/outline alpha is composited over the surface.

## 2. Font pairings (Google Fonts, via next/font)

Widths below are measured from the font files (advance widths, no kerning; variable fonts at their default instance, so treat as ±3%). Reference: today's hero line 1 "Every child learns differently." is 15.1 em in Young Serif and fits its two-line layout with almost no slack (about 14 em after kerning against a 6.4vw size), so any heading face wider than Young Serif needs a scale below 1. Body ratio = a 95-character paragraph vs Mukta Regular.

| # | Pairing | Heading | Body | Hero line 1 vs current | Body vs Mukta |
|---|---|---|---|---|---|
| 1 | **Young Serif + Mukta** (current) | Young Serif 400 | Mukta 400, 500 | 1.00 | 1.00 |
| 2 | **Fraunces + Figtree** | Fraunces 500 (opsz, SOFT axes) | Figtree 400, 500 | about 1.0 (1.02 at opsz 9; narrower at display sizes) | 1.06 |
| 3 | **Source Serif 4 + Source Sans 3** | Source Serif 4 500 (opsz axis) | Source Sans 3 400, 500 | 0.88 | 0.95 |
| 4 | **DM Serif Display + Hind** | DM Serif Display 400 | Hind 400, 500 | 0.88 | 1.02 |
| 5 | **EB Garamond + Nunito Sans** | EB Garamond 500 | Nunito Sans 400, 500 | 0.74 | 1.05 |
| 6 | **Plus Jakarta Sans** (one family) | Plus Jakarta Sans 600 | Plus Jakarta Sans 400, 500 | 0.89 at 400, roughly 0.93 at 600 | 1.11 |

**1 Young Serif + Mukta.** Baseline. Sturdy and friendly; Mukta's large x-height keeps phone text open. Logo (a bold black sans-serif wordmark on an arc, a flat red open book, a gradient flame): a chunky serif holds its own against the heavy wordmark. Risk: none.

**2 Fraunces + Figtree.** Why: Fraunces is a warm "soft" old-style with gentle wonk; with SOFT axis around 50 it feels hand-cut, close in warmth to Young Serif but lighter and more current. Figtree is friendly geometric, clean at small sizes. Logo: Fraunces' soft, curved terminals echo the flame; Figtree's round geometry sits comfortably beside the logo's bold sans wordmark. Risk: Fraunces at small opsz can be as wide as Young Serif, so hero line 1 may wrap to three lines around 640–1000px; use headingScale 0.94 and let opsz auto. Figtree body is 6% wider, so paragraphs gain about one line in six and nav/button labels grow about 6%; check the 375px course rows. No tabular figures in Fraunces (results scores are proportional).

**3 Source Serif 4 + Source Sans 3.** Why: the neutral, institutional choice; very legible, calm, nothing trendy, which suits parents comparing institutes. Logo: restrained, so the logo stays the only expressive thing on the page; its sans body echoes the wordmark's plainness. Risk: headings are 12% narrower, so the hero looks smaller unless scaled (headingScale 1.06 keeps it under the current width). Source Sans 3 has a smaller x-height than Mukta, so 17px body reads like about 16px; it is narrower, so buttons and nav shrink slightly. Safest swap overall.

**4 DM Serif Display + Hind.** Why: high-contrast display serif gives headlines an editorial, confident voice; Hind (from the same Indian Type Foundry family as Mukta) keeps body metrics within 2% of today, so the only change you see is the headline. Logo: thin hairlines contrast with the logo's heavy strokes; reads premium and slightly more formal. Risk: DM Serif Display has one weight and no tabular figures; hairlines get thin at 1.625rem card titles on low-density phones; headings 12% narrower (use 1.06).

**5 EB Garamond + Nunito Sans.** Why: the heritage pairing; a classical Garamond for headlines with Nunito Sans's rounded terminals to keep it warm, not stuffy. Logo: the biggest contrast with the heavy, blocky wordmark; the flame is the only curved, tapering shape, and Garamond echoes it. Risk: biggest metric change. Garamond is 26% narrower with a small x-height, so at the same size the hero looks undersized and the hero's two lines fall short of full width; headingScale 1.2 (display max 4.25rem → 5.1rem) fixes it but check the heading in section rows. Use weight 500: 400 is spindly on mid-range phones. Nunito Sans is 5% wider than Mukta.

**6 Plus Jakarta Sans (one family).** Why: modern, friendly, one font file (the lightest option for mobile data). Weight 600 headings make the site feel like an ed-tech product, the least "heritage" and the most contemporary look. Pairs with Slate or Peacock. Logo: the closest relative of the bold sans wordmark, so page and logo read as one system. Risk: widest body (+11%): nav, buttons and the 375px course rows and results meta line will wrap earlier, and tabular `tnum` is available but `lnum` is not. Breaks DESIGN.md's One Weight Rule (headings 600); acceptable for a demo, flag it to the director as a different system.

Suggested default matches: 1 with Warm Paper or Forest; 2 with Plum or Peacock; 3 with Heritage Navy or Slate; 4 with Indigo or Plum; 5 with Plum or Indigo; 6 with Slate or Peacock. The switcher should still allow any combination.

## 3. Data shape (`themes.ts`)

- `palettes: Palette[]`, each `{ id, name, mood, themeColor, tokens, ink }`. `tokens` has the 23 values that differ; `resolveTokens()` expands to all 41 CSS variables. `ink` has the 9 values of the dark band.
- `fontPairings: FontPairing[]`, each `{ id, name, mood, heading, body, headingScale, risk }` with the next/font export name, weights, axes, CSS variable and fallback per face.
- `applyPalette(p)` sets the variables on `<html>`, writes one `<style id="theme-switcher-ink">` with the `[data-surface="ink"]` rule (the band re-declares its own tokens, so inherited variables can't reach it) and updates `<meta name="theme-color">`.
- `applyFonts(f)` sets `--font-serif`, `--font-sans`, `--heading-weight`, `--heading-scale`.
- `paletteToCss(p)` returns the ready-to-paste `:root` block plus the ink block; `fontsToText(f)` returns the font names and the `next/font` calls; `exportTheme(p, f)` joins them.
- Type-checks under `tsc --strict`.

### One-time CSS/layout hooks the switcher needs (not done; proposal only)
1. globals.css wash: replace `var(--flame-light)` with `var(--wash-core)`, `var(--flame)` with `var(--wash-mid)`, `var(--saffron)` (the two side lobes) with `var(--wash-edge)`; in `.cta-glow` use `var(--glow-inner)` and `var(--glow-outer)`. Palette 1 gives identical output.
2. `h1, h2 { font-weight: var(--heading-weight, 400) }` (replaces `font-normal`); the display/heading size tokens multiplied by `var(--heading-scale, 1)`; other Young Serif spots (h3 titles, results scores, numerals, footer tagline) follow `--font-heading` already.
3. layout.tsx mounts all eleven next/font loaders with `preload: false` for the non-default ones, so only fonts actually in use are downloaded. `theme-colors.ts` and the manifest keep a static paper colour, which is fine for a demo (the meta tag is updated live).
4. A non-warm palette also changes the web manifest/PWA colour only after a rebuild; ignore for a demo.
