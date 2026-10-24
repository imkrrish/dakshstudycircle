// Theme switcher data (proposal). Nothing here is imported by the site yet.
//
// A palette stores the ~30 tokens that actually differ; `resolveTokens()` fills
// the rest with the same relationships globals.css already uses (card/popover
// text = foreground, accent = secondary, sidebar = muted/primary/..., chart-1..5
// = primary / flame / saffron / ring / muted-foreground). The exported :root block
// therefore contains EVERY token.
//
// All colours are OKLCH. Contrast was computed per palette (see the proposal).

export type PaletteTokens = {
  background: string
  foreground: string
  card: string
  primary: string
  "primary-hover": string
  "primary-foreground": string
  secondary: string
  muted: string
  "muted-foreground": string
  destructive: string
  border: string
  input: string
  ring: string
  footer: string
  "footer-mark": string
  /** Accent tints (warm flame in Warm Paper, the family colour elsewhere): decoration only, never text. */
  "flame-light": string
  flame: string
  saffron: string
  /** Hero wash layers (opaque; globals.css applies the 34% / 34% / 10% alphas). */
  "wash-core": string
  "wash-mid": string
  "wash-edge": string
  /** CTA band glow layers (opaque; globals.css applies 14% -> 6% alphas). */
  "glow-inner": string
  "glow-outer": string
}

/** The dark CTA band: `[data-surface="ink"]` remaps these page tokens. */
export type InkTokens = {
  background: string
  foreground: string
  primary: string
  "primary-hover": string
  "primary-foreground": string
  muted: string
  "muted-foreground": string
  input: string
  ring: string
}

export type Palette = {
  id: string
  name: string
  mood: string
  /** Literal hex of `background`, for <meta name="theme-color"> and the manifest. */
  themeColor: string
  tokens: PaletteTokens
  ink: InkTokens
}

export const palettes: Palette[] = [
  {
    id: "warm-paper",
    name: "Warm Paper",
    mood: "The current look: cream paper, brown-black ink, one red.",
    themeColor: "#fdfaf4",
    tokens: {
      background: "oklch(0.985 0.008 85)",
      foreground: "oklch(0.23 0.02 45)",
      card: "oklch(0.995 0.004 85)",
      primary: "oklch(0.55 0.22 27)",
      "primary-hover": "oklch(0.5 0.2 27)",
      "primary-foreground": "oklch(1 0 0)",
      secondary: "oklch(0.945 0.025 75)",
      muted: "oklch(0.96 0.012 80)",
      "muted-foreground": "oklch(0.46 0.025 50)",
      destructive: "oklch(0.49 0.18 8)",
      border: "oklch(0.89 0.015 80)",
      input: "oklch(0.62 0.02 70)",
      ring: "oklch(0.5 0.13 60)",
      footer: "oklch(0.965 0.016 78)",
      "footer-mark": "oklch(0.93 0.03 75)",
      "flame-light": "oklch(0.92 0.13 95)",
      flame: "oklch(0.8 0.165 72.3)",
      saffron: "oklch(0.71 0.177 50.9)",
      "wash-core": "oklch(0.92 0.13 95)",
      "wash-mid": "oklch(0.8 0.165 72.3)",
      "wash-edge": "oklch(0.71 0.177 50.9)",
      "glow-inner": "oklch(0.8 0.165 72.3)",
      "glow-outer": "oklch(0.71 0.177 50.9)",
    },
    ink: {
      background: "oklch(0.23 0.02 45)",
      foreground: "oklch(0.97 0.01 85)",
      primary: "oklch(0.97 0.01 85)",
      "primary-hover": "oklch(0.91 0.02 80)",
      "primary-foreground": "oklch(0.23 0.02 45)",
      muted: "oklch(0.31 0.025 50)",
      "muted-foreground": "oklch(0.82 0.02 75)",
      input: "oklch(0.97 0.01 85 / 55%)",
      ring: "oklch(0.92 0.13 95)",
    },
  },
  {
    id: "heritage-navy",
    name: "Heritage Navy",
    mood: "Deep navy ink and cool blue-tinted paper: formal, trusted, with the red as the only warmth.",
    themeColor: "#f5fbff",
    tokens: {
      background: "oklch(0.985 0.0108 255)",
      foreground: "oklch(0.23 0.0473 255)",
      card: "oklch(0.997 0.0041 255)",
      primary: "oklch(0.55 0.22 27)",
      "primary-hover": "oklch(0.5 0.2 27)",
      "primary-foreground": "oklch(1 0 0)",
      secondary: "oklch(0.942 0.0325 255)",
      muted: "oklch(0.962 0.0189 255)",
      "muted-foreground": "oklch(0.46 0.0607 255)",
      destructive: "oklch(0.49 0.18 8)",
      border: "oklch(0.89 0.0297 255)",
      input: "oklch(0.6 0.0473 255)",
      ring: "oklch(0.48 0.162 255)",
      footer: "oklch(0.958 0.025 255)",
      "footer-mark": "oklch(0.925 0.0413 255)",
      "flame-light": "oklch(0.93 0.0385 255)",
      flame: "oklch(0.8 0.1065 255)",
      saffron: "oklch(0.66 0.1755 255)",
      "wash-core": "oklch(0.9 0.054 255)",
      "wash-mid": "oklch(0.78 0.118 255)",
      "wash-edge": "oklch(0.68 0.1755 255)",
      "glow-inner": "oklch(0.74 0.14 255)",
      "glow-outer": "oklch(0.58 0.1755 255)",
    },
    ink: {
      background: "oklch(0.23 0.0743 255)",
      foreground: "oklch(0.97 0.0135 255)",
      primary: "oklch(0.97 0.0135 255)",
      "primary-hover": "oklch(0.91 0.027 255)",
      "primary-foreground": "oklch(0.23 0.0743 255)",
      muted: "oklch(0.31 0.0675 255)",
      "muted-foreground": "oklch(0.84 0.0405 255)",
      input: "oklch(0.97 0.0135 255 / 55%)",
      ring: "oklch(0.9 0.054 255)",
    },
  },
  {
    id: "peacock",
    name: "Peacock",
    mood: "Teal and peacock blue-green: fresh and lively, with a lagoon-dark closing band.",
    themeColor: "#f3fcfc",
    tokens: {
      background: "oklch(0.985 0.0092 200)",
      foreground: "oklch(0.23 0.0403 200)",
      card: "oklch(0.997 0.0034 200)",
      primary: "oklch(0.55 0.22 27)",
      "primary-hover": "oklch(0.5 0.2 27)",
      "primary-foreground": "oklch(1 0 0)",
      secondary: "oklch(0.942 0.0345 200)",
      muted: "oklch(0.962 0.0161 200)",
      "muted-foreground": "oklch(0.46 0.0517 200)",
      destructive: "oklch(0.49 0.18 8)",
      border: "oklch(0.89 0.0253 200)",
      input: "oklch(0.6 0.0403 200)",
      ring: "oklch(0.48 0.104 200)",
      footer: "oklch(0.958 0.023 200)",
      "footer-mark": "oklch(0.925 0.0403 200)",
      "flame-light": "oklch(0.93 0.0805 200)",
      flame: "oklch(0.8 0.1265 200)",
      saffron: "oklch(0.66 0.1235 200)",
      "wash-core": "oklch(0.9 0.092 200)",
      "wash-mid": "oklch(0.78 0.138 200)",
      "wash-edge": "oklch(0.68 0.1275 200)",
      "glow-inner": "oklch(0.74 0.134 200)",
      "glow-outer": "oklch(0.58 0.1135 200)",
    },
    ink: {
      background: "oklch(0.23 0.0633 200)",
      foreground: "oklch(0.97 0.0115 200)",
      primary: "oklch(0.97 0.0115 200)",
      "primary-hover": "oklch(0.91 0.023 200)",
      "primary-foreground": "oklch(0.23 0.0633 200)",
      muted: "oklch(0.31 0.0575 200)",
      "muted-foreground": "oklch(0.84 0.0345 200)",
      input: "oklch(0.97 0.0115 200 / 55%)",
      ring: "oklch(0.9 0.092 200)",
    },
  },
  {
    id: "forest",
    name: "Forest",
    mood: "Deep green: grounded and growing, with leaf-tinted paper and a forest-dark closing band.",
    themeColor: "#f6fcf7",
    tokens: {
      background: "oklch(0.985 0.0092 152)",
      foreground: "oklch(0.23 0.0403 152)",
      card: "oklch(0.997 0.0034 152)",
      primary: "oklch(0.55 0.22 27)",
      "primary-hover": "oklch(0.5 0.2 27)",
      "primary-foreground": "oklch(1 0 0)",
      secondary: "oklch(0.942 0.0345 152)",
      muted: "oklch(0.962 0.0161 152)",
      "muted-foreground": "oklch(0.46 0.0517 152)",
      destructive: "oklch(0.49 0.18 8)",
      border: "oklch(0.89 0.0253 152)",
      input: "oklch(0.6 0.0403 152)",
      ring: "oklch(0.48 0.138 152)",
      footer: "oklch(0.958 0.023 152)",
      "footer-mark": "oklch(0.925 0.0403 152)",
      "flame-light": "oklch(0.93 0.0805 152)",
      flame: "oklch(0.8 0.1265 152)",
      saffron: "oklch(0.66 0.1495 152)",
      "wash-core": "oklch(0.9 0.092 152)",
      "wash-mid": "oklch(0.78 0.138 152)",
      "wash-edge": "oklch(0.68 0.1495 152)",
      "glow-inner": "oklch(0.74 0.138 152)",
      "glow-outer": "oklch(0.58 0.1495 152)",
    },
    ink: {
      background: "oklch(0.23 0.0633 152)",
      foreground: "oklch(0.97 0.0115 152)",
      primary: "oklch(0.97 0.0115 152)",
      "primary-hover": "oklch(0.91 0.023 152)",
      "primary-foreground": "oklch(0.23 0.0633 152)",
      muted: "oklch(0.31 0.0575 152)",
      "muted-foreground": "oklch(0.84 0.0345 152)",
      input: "oklch(0.97 0.0115 152 / 55%)",
      ring: "oklch(0.9 0.092 152)",
    },
  },
  {
    id: "plum",
    name: "Plum",
    mood: "Aubergine: warm, rich and a little regal, with blush-lilac paper and a plum-dark closing band.",
    themeColor: "#fef8fd",
    tokens: {
      background: "oklch(0.985 0.0092 330)",
      foreground: "oklch(0.23 0.0403 330)",
      card: "oklch(0.997 0.0034 330)",
      primary: "oklch(0.55 0.22 27)",
      "primary-hover": "oklch(0.5 0.2 27)",
      "primary-foreground": "oklch(1 0 0)",
      secondary: "oklch(0.942 0.0345 330)",
      muted: "oklch(0.962 0.0161 330)",
      "muted-foreground": "oklch(0.46 0.0517 330)",
      destructive: "oklch(0.49 0.18 8)",
      border: "oklch(0.89 0.0253 330)",
      input: "oklch(0.6 0.0403 330)",
      ring: "oklch(0.48 0.138 330)",
      footer: "oklch(0.958 0.023 330)",
      "footer-mark": "oklch(0.925 0.0403 330)",
      "flame-light": "oklch(0.93 0.0645 330)",
      flame: "oklch(0.8 0.1265 330)",
      saffron: "oklch(0.66 0.1495 330)",
      "wash-core": "oklch(0.9 0.092 330)",
      "wash-mid": "oklch(0.78 0.138 330)",
      "wash-edge": "oklch(0.68 0.1495 330)",
      "glow-inner": "oklch(0.74 0.138 330)",
      "glow-outer": "oklch(0.58 0.1495 330)",
    },
    ink: {
      background: "oklch(0.23 0.0633 330)",
      foreground: "oklch(0.97 0.0115 330)",
      primary: "oklch(0.97 0.0115 330)",
      "primary-hover": "oklch(0.91 0.023 330)",
      "primary-foreground": "oklch(0.23 0.0633 330)",
      muted: "oklch(0.31 0.0575 330)",
      "muted-foreground": "oklch(0.84 0.0345 330)",
      input: "oklch(0.97 0.0115 330 / 55%)",
      ring: "oklch(0.9 0.092 330)",
    },
  },
  {
    id: "slate",
    name: "Slate",
    mood: "Cool grey-blue: calm, modern and restrained; the greyest palette of the set.",
    themeColor: "#f8fafc",
    tokens: {
      background: "oklch(0.985 0.0032 232)",
      foreground: "oklch(0.23 0.014 232)",
      card: "oklch(0.997 0.0012 232)",
      primary: "oklch(0.55 0.22 27)",
      "primary-hover": "oklch(0.5 0.2 27)",
      "primary-foreground": "oklch(1 0 0)",
      secondary: "oklch(0.942 0.012 232)",
      muted: "oklch(0.962 0.0056 232)",
      "muted-foreground": "oklch(0.46 0.018 232)",
      destructive: "oklch(0.49 0.18 8)",
      border: "oklch(0.89 0.0088 232)",
      input: "oklch(0.6 0.014 232)",
      ring: "oklch(0.48 0.048 232)",
      footer: "oklch(0.958 0.008 232)",
      "footer-mark": "oklch(0.925 0.014 232)",
      "flame-light": "oklch(0.93 0.028 232)",
      flame: "oklch(0.8 0.044 232)",
      saffron: "oklch(0.66 0.052 232)",
      "wash-core": "oklch(0.9 0.032 232)",
      "wash-mid": "oklch(0.78 0.048 232)",
      "wash-edge": "oklch(0.68 0.052 232)",
      "glow-inner": "oklch(0.74 0.048 232)",
      "glow-outer": "oklch(0.58 0.052 232)",
    },
    ink: {
      background: "oklch(0.23 0.022 232)",
      foreground: "oklch(0.97 0.004 232)",
      primary: "oklch(0.97 0.004 232)",
      "primary-hover": "oklch(0.91 0.008 232)",
      "primary-foreground": "oklch(0.23 0.022 232)",
      muted: "oklch(0.31 0.02 232)",
      "muted-foreground": "oklch(0.84 0.012 232)",
      input: "oklch(0.97 0.004 232 / 55%)",
      ring: "oklch(0.9 0.032 232)",
    },
  },
  {
    id: "indigo",
    name: "Indigo",
    mood: "Indigo dye: violet-blue and traditional-crafted, with lavender-tinted paper and an indigo-dark closing band.",
    themeColor: "#faf9ff",
    tokens: {
      background: "oklch(0.985 0.0108 292)",
      foreground: "oklch(0.23 0.0473 292)",
      card: "oklch(0.997 0.0041 292)",
      primary: "oklch(0.55 0.22 27)",
      "primary-hover": "oklch(0.5 0.2 27)",
      "primary-foreground": "oklch(1 0 0)",
      secondary: "oklch(0.942 0.0345 292)",
      muted: "oklch(0.962 0.0189 292)",
      "muted-foreground": "oklch(0.46 0.0607 292)",
      destructive: "oklch(0.49 0.18 8)",
      border: "oklch(0.89 0.0297 292)",
      input: "oklch(0.6 0.0473 292)",
      ring: "oklch(0.48 0.162 292)",
      footer: "oklch(0.958 0.025 292)",
      "footer-mark": "oklch(0.925 0.0433 292)",
      "flame-light": "oklch(0.93 0.0405 292)",
      flame: "oklch(0.8 0.1145 292)",
      saffron: "oklch(0.66 0.1755 292)",
      "wash-core": "oklch(0.9 0.058 292)",
      "wash-mid": "oklch(0.78 0.126 292)",
      "wash-edge": "oklch(0.68 0.1755 292)",
      "glow-inner": "oklch(0.74 0.152 292)",
      "glow-outer": "oklch(0.58 0.1755 292)",
    },
    ink: {
      background: "oklch(0.23 0.0743 292)",
      foreground: "oklch(0.97 0.0135 292)",
      primary: "oklch(0.97 0.0135 292)",
      "primary-hover": "oklch(0.91 0.027 292)",
      "primary-foreground": "oklch(0.23 0.0743 292)",
      muted: "oklch(0.31 0.0675 292)",
      "muted-foreground": "oklch(0.84 0.0405 292)",
      input: "oklch(0.97 0.0135 292 / 55%)",
      ring: "oklch(0.9 0.058 292)",
    },
  },
]

// ---------------------------------------------------------------- fonts

export type FontSpec = {
  /** Export name in `next/font/google`, e.g. "Young_Serif". */
  nextFont: string
  weights: readonly string[]
  /** Variable-font axes to request, if any (e.g. ["opsz", "SOFT"]). */
  axes?: readonly string[]
  /** CSS variable each next/font loader is given (`variable:` option). */
  cssVar: string
  /** Generic fallback appended after the loaded font. */
  fallback: "serif" | "sans-serif"
}

export type FontPairing = {
  id: string
  name: string
  mood: string
  heading: FontSpec & { weight: number }
  body: FontSpec
  /**
   * Multiplier for the display/heading size tokens, so a narrower or wider
   * face keeps the hero's two fixed lines filling (or fitting) the same width.
   * Needs the two CSS hooks listed in the proposal.
   */
  headingScale: number
  /** One-line metric warning shown next to the pairing in the switcher. */
  risk: string
}

export const fontPairings: FontPairing[] = [
  {
    id: "young-serif-mukta",
    name: "Young Serif + Mukta",
    mood: "Current: sturdy, friendly serif with a warm, open sans.",
    heading: { nextFont: "Young_Serif", weights: ["400"], weight: 400, cssVar: "--font-young-serif", fallback: "serif" },
    body: { nextFont: "Mukta", weights: ["400", "500"], cssVar: "--font-mukta", fallback: "sans-serif" },
    headingScale: 1,
    risk: "Baseline.",
  },
  {
    id: "fraunces-figtree",
    name: "Fraunces + Figtree",
    mood: "Soft, warm and contemporary; the serif has a gentle, hand-cut feel.",
    heading: { nextFont: "Fraunces", weights: ["variable"], axes: ["opsz"], weight: 500, cssVar: "--font-fraunces", fallback: "serif" },
    body: { nextFont: "Figtree", weights: ["400", "500"], cssVar: "--font-figtree", fallback: "sans-serif" },
    headingScale: 0.94,
    risk: "Fraunces can run as wide as Young Serif; hero line 1 has almost no slack. Body is about 6% wider than Mukta.",
  },
  {
    id: "source-serif-source-sans",
    name: "Source Serif 4 + Source Sans 3",
    mood: "Neutral, trustworthy, book-like; the safest alternative.",
    heading: { nextFont: "Source_Serif_4", weights: ["variable"], axes: ["opsz"], weight: 500, cssVar: "--font-source-serif", fallback: "serif" },
    body: { nextFont: "Source_Sans_3", weights: ["400", "500"], cssVar: "--font-source-sans", fallback: "sans-serif" },
    headingScale: 1.06,
    risk: "Headings about 12% narrower; body about 5% narrower with a smaller x-height, so it reads slightly smaller than Mukta.",
  },
  {
    id: "dm-serif-hind",
    name: "DM Serif Display + Hind",
    mood: "Crisp and editorial: high-contrast headlines over a quiet body.",
    heading: { nextFont: "DM_Serif_Display", weights: ["400"], weight: 400, cssVar: "--font-dm-serif", fallback: "serif" },
    body: { nextFont: "Hind", weights: ["400", "500"], cssVar: "--font-hind", fallback: "sans-serif" },
    headingScale: 1.06,
    risk: "Headings about 12% narrower; no tabular figures (results scores are proportional). Hind's metrics are within 2% of Mukta.",
  },
  {
    id: "eb-garamond-nunito",
    name: "EB Garamond + Nunito Sans",
    mood: "Heritage: classical old-style serif with a soft, rounded sans.",
    heading: { nextFont: "EB_Garamond", weights: ["400", "500"], weight: 500, cssVar: "--font-eb-garamond", fallback: "serif" },
    body: { nextFont: "Nunito_Sans", weights: ["400", "500"], cssVar: "--font-nunito", fallback: "sans-serif" },
    headingScale: 1.2,
    risk: "Garamond is about 25% narrower with a small x-height; without the 1.2 scale the hero looks undersized. Body about 5% wider than Mukta.",
  },
  {
    id: "jakarta",
    name: "Plus Jakarta Sans (one family)",
    mood: "Modern and friendly, all sans; one family means one font download.",
    heading: { nextFont: "Plus_Jakarta_Sans", weights: ["400", "500", "600"], weight: 600, cssVar: "--font-jakarta", fallback: "sans-serif" },
    body: { nextFont: "Plus_Jakarta_Sans", weights: ["400", "500", "600"], cssVar: "--font-jakarta", fallback: "sans-serif" },
    headingScale: 1,
    risk: "Widest body here (about 11% wider than Mukta): buttons, nav and card rows wrap earlier. Check the 375px course rows and the nav. Heading weight 600 breaks the One Weight Rule.",
  },
]

// ---------------------------------------------------------------- resolve / apply / export

export type TokenMap = Record<string, string>

/** Every token the site reads, in :root order. */
export function resolveTokens(p: Palette): TokenMap {
  const t = p.tokens
  return {
    background: t.background,
    foreground: t.foreground,
    card: t.card,
    "card-foreground": t.foreground,
    popover: t.card,
    "popover-foreground": t.foreground,
    primary: t.primary,
    "primary-hover": t["primary-hover"],
    "primary-foreground": t["primary-foreground"],
    secondary: t.secondary,
    "secondary-foreground": t.foreground,
    muted: t.muted,
    "muted-foreground": t["muted-foreground"],
    accent: t.secondary,
    "accent-foreground": t.foreground,
    destructive: t.destructive,
    border: t.border,
    input: t.input,
    ring: t.ring,
    "chart-1": t.primary,
    "chart-2": t.flame,
    "chart-3": t.saffron,
    "chart-4": t.ring,
    "chart-5": t["muted-foreground"],
    sidebar: t.muted,
    "sidebar-foreground": t.foreground,
    "sidebar-primary": t.primary,
    "sidebar-primary-foreground": t["primary-foreground"],
    "sidebar-accent": t.secondary,
    "sidebar-accent-foreground": t.foreground,
    "sidebar-border": t.border,
    "sidebar-ring": t.ring,
    footer: t.footer,
    "footer-mark": t["footer-mark"],
    "flame-light": t["flame-light"],
    flame: t.flame,
    saffron: t.saffron,
    "wash-core": t["wash-core"],
    "wash-mid": t["wash-mid"],
    "wash-edge": t["wash-edge"],
    "glow-inner": t["glow-inner"],
    "glow-outer": t["glow-outer"],
  }
}

const INK_STYLE_ID = "theme-switcher-ink"

function inkCss(p: Palette): string {
  const body = Object.entries(p.ink)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join("\n")
  return `[data-surface="ink"] {\n${body}\n}`
}

/**
 * Apply a palette live. Page tokens go on <html> as inline custom properties.
 * The ink band needs a rule of its own (it re-declares the tokens on its
 * element), so it is written into one <style> tag that the next call replaces.
 */
export function applyPalette(p: Palette, root: HTMLElement = document.documentElement): void {
  for (const [k, v] of Object.entries(resolveTokens(p))) root.style.setProperty(`--${k}`, v)
  let el = document.getElementById(INK_STYLE_ID) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement("style")
    el.id = INK_STYLE_ID
    document.head.appendChild(el)
  }
  el.textContent = inkCss(p)
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", p.themeColor)
}

const stack = (f: FontSpec) => `var(${f.cssVar}), ${f.fallback}`

/** Apply a pairing live. Requires every font's next/font loader to be mounted. */
export function applyFonts(f: FontPairing, root: HTMLElement = document.documentElement): void {
  root.style.setProperty("--font-serif", stack(f.heading))
  root.style.setProperty("--font-sans", stack(f.body))
  root.style.setProperty("--heading-weight", String(f.heading.weight))
  root.style.setProperty("--heading-scale", String(f.headingScale))
}

/** Ready-to-paste CSS: the :root block and the ink-band block. */
export function paletteToCss(p: Palette): string {
  const body = Object.entries(resolveTokens(p))
    .map(([k, v]) => `  --${k}: ${v};`)
    .join("\n")
  return `/* ${p.name}: ${p.mood} */\n:root {\n${body}\n}\n\n${inkCss(p)}\n`
}

const camel = (name: string) =>
  name
    .split("_")
    .map((w, i) => (i === 0 ? w.toLowerCase() : w[0] + w.slice(1).toLowerCase()))
    .join("")

/** Heading weight and size multiplier: the two values the CSS hooks read. */
export function typeToCss(f: FontPairing): string {
  const lines = [
    `  --heading-weight: ${f.heading.weight};`,
    `  --heading-scale: ${f.headingScale};`,
  ]
  if (f.heading.nextFont === f.body.nextFont) lines.push("  --font-serif: var(--font-sans);")
  return `/* Type: needs the heading-weight / heading-scale hooks in globals.css */\n:root {\n${lines.join("\n")}\n}\n`
}

/** Font names, the import line and the next/font calls (main's variable names). */
export function fontsToText(f: FontPairing): string {
  const pretty = (s: FontSpec) => s.nextFont.replace(/_/g, " ")
  const same = f.heading.nextFont === f.body.nextFont
  const call = (s: FontSpec, variable: string) => {
    const opts = [
      s.axes ? null : `weight: ${s.weights.length === 1 ? JSON.stringify(s.weights[0]) : JSON.stringify(s.weights)}`,
      s.axes ? `axes: ${JSON.stringify(s.axes)}` : null,
      `subsets: ["latin"]`,
      `display: "swap"`,
      `variable: "${variable}"`,
    ].filter(Boolean)
    return `const ${camel(s.nextFont)} = ${s.nextFont}({ ${opts.join(", ")} })`
  }
  const names = same ? [f.heading.nextFont] : [f.heading.nextFont, f.body.nextFont]
  const lines = [
    `/* ${f.name}. Heading: ${pretty(f.heading)}, weight ${f.heading.weight}. Body: ${pretty(f.body)}${same ? " (same family)" : ""}. */`,
    `import { ${names.join(", ")} } from "next/font/google"`,
    "",
  ]
  if (same) {
    lines.push(call(f.body, "--font-sans"), `// one family: heading uses it too (--font-serif: var(--font-sans) above)`)
  } else {
    lines.push(call(f.heading, "--font-serif"), call(f.body, "--font-sans"))
  }
  return lines.join("\n")
}

export function exportTheme(p: Palette, f: FontPairing): string {
  return `${paletteToCss(p)}\n${typeToCss(f)}\n${fontsToText(f)}\n`
}

/** Clear everything applyPalette / applyFonts set, so the site is unmodified. */
export function clearTheme(root: HTMLElement = document.documentElement): void {
  for (const k of Object.keys(resolveTokens(palettes[0]))) root.style.removeProperty(`--${k}`)
  for (const k of ["font-serif", "font-sans", "heading-weight", "heading-scale"]) root.style.removeProperty(`--${k}`)
  document.getElementById(INK_STYLE_ID)?.remove()
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", palettes[0].themeColor)
}
