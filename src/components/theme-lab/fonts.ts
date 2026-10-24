import {
  DM_Serif_Display,
  EB_Garamond,
  Figtree,
  Fraunces,
  Hind,
  Mukta,
  Nunito_Sans,
  Plus_Jakarta_Sans,
  Source_Sans_3,
  Source_Serif_4,
  Young_Serif,
} from "next/font/google"

// next/font needs each loader as its own const with literal options.
// Variables match `cssVar` in themes.ts. Only the site's own Mukta / Young Serif
// are preloaded (in layout.tsx); everything here downloads when first used.
const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-young-serif",
})
const mukta = Mukta({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-mukta",
})
const fraunces = Fraunces({
  axes: ["opsz"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-fraunces",
})
const figtree = Figtree({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-figtree",
})
const sourceSerif = Source_Serif_4({
  axes: ["opsz"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-source-serif",
})
const sourceSans = Source_Sans_3({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-source-sans",
})
const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-dm-serif",
})
const hind = Hind({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-hind",
})
const ebGaramond = EB_Garamond({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-eb-garamond",
})
const nunito = Nunito_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-nunito",
})
const jakarta = Plus_Jakarta_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-jakarta",
})

const fontVariables = [
  youngSerif,
  mukta,
  fraunces,
  figtree,
  sourceSerif,
  sourceSans,
  dmSerif,
  hind,
  ebGaramond,
  nunito,
  jakarta,
]
  .map((f) => f.variable)
  .join(" ")

export { fontVariables }
