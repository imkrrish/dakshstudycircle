// Browser chrome and the web manifest need literal colours, not CSS tokens.
// `paper` mirrors `--background` (oklch(0.985 0.008 85)) in src/app/globals.css.
export const themeColors = {
  paper: "#fdfaf4",
} as const
