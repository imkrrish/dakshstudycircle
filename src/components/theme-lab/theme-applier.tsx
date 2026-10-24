"use client"

import { useEffect } from "react"

import { fontVariables } from "./fonts"
import { DEFAULT_FONT_ID, DEFAULT_PALETTE_ID, useThemeLab } from "./store"
import {
  applyFonts,
  applyPalette,
  clearTheme,
  fontPairings,
  palettes,
} from "./themes"

function ThemeApplier() {
  const paletteId = useThemeLab((s) => s.paletteId)
  const fontId = useThemeLab((s) => s.fontId)

  useEffect(() => {
    document.documentElement.classList.add(...fontVariables.split(" "))
    void useThemeLab.persist.rehydrate()
  }, [])

  useEffect(() => {
    const palette = palettes.find((p) => p.id === paletteId)
    const font = fontPairings.find((f) => f.id === fontId)
    // The defaults leave the site exactly as shipped (no inline overrides).
    clearTheme()
    if (palette && paletteId !== DEFAULT_PALETTE_ID) applyPalette(palette)
    if (font && fontId !== DEFAULT_FONT_ID) applyFonts(font)
  }, [paletteId, fontId])

  return null
}

export { ThemeApplier }
