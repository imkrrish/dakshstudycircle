---
name: daksh-design
description: Daksh Study Circle's design system: colors, typography, spacing, dark bands, motifs and decoration rules. Use whenever building or changing anything visual.
paths:
  - "src/app/**"
  - "src/components/**"
---

# Daksh design system

Feel: calm, trustworthy and warm, like a well-printed book. Generous whitespace.
Inspiration is sarvam.ai (clean, minimal, subtle Indian motifs). Inspiration only: never copy its shapes or artwork.

## Color: tokens only, mostly neutral

- Most of every page is neutral: `background`, `card`, `foreground` (navy-ink text).
- `primary` (logo red): main buttons and rare key highlights only. At most one primary button per section.
- `navy`: only as the end of an ink → navy gradient inside a dark band.
- `flame` / `saffron`: gradients and motifs only. Never text.
- Dark band: at most ONE per page (the final call to action). `bg-foreground` fading to `navy`,
  white text, white button. Never a red button on a dark band.
- Eyebrow text is small and `text-muted-foreground`, never red.
- Never invent a new color. If something seems to need one, ask.
- Any new text/background combination must reach 4.5:1 contrast (3:1 for large text and UI shapes).

## Typography

- h1 and h2: Newsreader via `font-heading`, `font-normal` (light and elegant, never bold).
- Everything else, including card titles: Inter (`font-sans`).
- Starting scale: h1 `text-4xl md:text-6xl`, h2 `text-3xl md:text-4xl`, body `text-base md:text-lg`.
- Paragraphs: `leading-relaxed`, max width `max-w-prose`.
- Sentence case everywhere. No ALL CAPS headings, no exclamation marks.

## Layout and spacing

- Content container: `max-w-6xl mx-auto px-4 md:px-6`.
- Sections: `py-20 md:py-28`. Whitespace is the main design tool; when unsure, add space.
- Cards: white `card` on `background`, subtle `border`, padding `p-6 md:p-8`, preset radius.
- Mobile-first. Everything must work at 375px wide.

## Motifs (src/components/motifs/)

- The current set is a placeholder and may be redesigned. Don't create new motifs unless asked.
- Rules for any motif: thin stroke, `fill="none"`, `stroke="currentColor"`, strokeWidth 1.25,
  `vector-effect="non-scaling-stroke"`, each line its own path, `aria-hidden="true"`,
  geometry computed rather than eyeballed, original designs only.
- On light backgrounds use `text-muted-foreground` at reduced opacity; on dark bands `text-white/20`–`/30`.
- At most one or two motif placements per section.
- `flame-blob` stays soft (about 45% → 20% opacity) and is never the most eye-catching thing.

## Decoration rules

- Decoration never sits behind text and never reduces readability.
- The title is always more prominent than any decoration around it.

Animation rules live in `.claude/rules/react-components.md`.

When building or changing a section, read `sections.md` in this skill's folder.
