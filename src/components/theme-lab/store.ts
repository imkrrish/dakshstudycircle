import { create } from "zustand"
import { persist } from "zustand/middleware"

const DEFAULT_PALETTE_ID = "warm-paper"
const DEFAULT_FONT_ID = "young-serif-mukta"

type ThemeLabState = {
  paletteId: string
  fontId: string
  setPalette: (id: string) => void
  setFont: (id: string) => void
  reset: () => void
}

// skipHydration: the server and first client render both use the defaults;
// ThemeApplier rehydrates from localStorage after mount.
const useThemeLab = create<ThemeLabState>()(
  persist(
    (set) => ({
      paletteId: DEFAULT_PALETTE_ID,
      fontId: DEFAULT_FONT_ID,
      setPalette: (paletteId) => set({ paletteId }),
      setFont: (fontId) => set({ fontId }),
      reset: () =>
        set({ paletteId: DEFAULT_PALETTE_ID, fontId: DEFAULT_FONT_ID }),
    }),
    {
      name: "theme-lab",
      skipHydration: true,
      partialize: ({ paletteId, fontId }) => ({ paletteId, fontId }),
    },
  ),
)

export { DEFAULT_FONT_ID, DEFAULT_PALETTE_ID, useThemeLab }
