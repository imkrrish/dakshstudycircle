"use client"

import { useEffect, useState, type CSSProperties } from "react"
import {
  Copy01Icon,
  PaintBoardIcon,
  RefreshIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { useThemeLab } from "./store"
import { exportTheme, fontPairings, palettes, type Palette } from "./themes"

const optionClass =
  "group relative flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-3 text-left transition-colors hover:bg-muted has-checked:border-foreground has-checked:ring-1 has-checked:ring-foreground has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring"

function CheckMark() {
  return (
    <span
      aria-hidden
      className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-background opacity-0 group-has-checked:opacity-100"
    >
      <HugeiconsIcon icon={Tick02Icon} strokeWidth={3} className="size-3" />
    </span>
  )
}

function swatches(p: Palette) {
  return [
    ["Paper", p.tokens.background],
    ["Ink", p.tokens.foreground],
    ["Primary", p.tokens.primary],
    ["Accent", p.tokens.flame],
    ["Dark band", p.ink.background],
  ] as const
}

function ThemeLabPanel() {
  const paletteId = useThemeLab((s) => s.paletteId)
  const fontId = useThemeLab((s) => s.fontId)
  const setPalette = useThemeLab((s) => s.setPalette)
  const setFont = useThemeLab((s) => s.setFont)
  const reset = useThemeLab((s) => s.reset)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const palette = palettes.find((p) => p.id === paletteId) ?? palettes[0]
  const font = fontPairings.find((f) => f.id === fontId) ?? fontPairings[0]

  async function copyTheme() {
    await navigator.clipboard.writeText(exportTheme(palette, font))
    setCopied(true)
  }

  return (
    <Sheet>
      <SheetTrigger
        aria-label="Customise theme"
        className="theme-lab-neutral fixed right-4 bottom-4 z-40 flex size-12 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-lg outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/40"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <HugeiconsIcon
          icon={PaintBoardIcon}
          strokeWidth={1.75}
          className="size-6"
        />
      </SheetTrigger>
      <SheetContent className="theme-lab-neutral theme-lab-sheet gap-0">
        <SheetHeader className="border-b border-border pr-14">
          <SheetTitle className="text-lg">Theme lab</SheetTitle>
          <SheetDescription>
            Demo only. Pick a palette and a font pairing; they apply live.
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto p-6">
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-sm font-semibold">Palette</legend>
            {palettes.map((p) => (
              <label key={p.id} className={optionClass}>
                <input
                  type="radio"
                  name="theme-lab-palette"
                  value={p.id}
                  checked={p.id === paletteId}
                  onChange={() => setPalette(p.id)}
                  className="sr-only"
                />
                <span className="flex min-w-0 flex-col gap-2">
                  <span className="text-sm font-semibold">{p.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {p.mood}
                  </span>
                  <span className="flex gap-1.5" aria-hidden>
                    {swatches(p).map(([label, color]) => (
                      <span
                        key={label}
                        title={label}
                        className="size-6 rounded-full border border-black/15"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </span>
                </span>
                <CheckMark />
              </label>
            ))}
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-sm font-semibold">Fonts</legend>
            {fontPairings.map((f) => (
              <label key={f.id} className={cn(optionClass, "items-start")}>
                <input
                  type="radio"
                  name="theme-lab-font"
                  value={f.id}
                  checked={f.id === fontId}
                  onChange={() => setFont(f.id)}
                  className="sr-only"
                />
                <span className="flex min-w-0 flex-col gap-1.5">
                  <span
                    data-font-preview
                    className="text-2xl leading-tight"
                    style={
                      {
                        "--preview-font": `var(${f.heading.cssVar}), ${f.heading.fallback}`,
                        "--preview-weight": f.heading.weight,
                      } as CSSProperties
                    }
                  >
                    Every child learns differently.
                  </span>
                  <span
                    data-font-preview
                    className="text-base"
                    style={
                      {
                        "--preview-font": `var(${f.body.cssVar}), ${f.body.fallback}`,
                      } as CSSProperties
                    }
                  >
                    Small batches, patient teachers, steady progress.
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {f.name}
                  </span>
                </span>
                <CheckMark />
              </label>
            ))}
          </fieldset>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-border p-4">
          <Button
            type="button"
            onClick={copyTheme}
            className="h-11 flex-1 px-4"
          >
            <HugeiconsIcon
              icon={copied ? Tick02Icon : Copy01Icon}
              strokeWidth={2}
              data-icon="inline-start"
            />
            <span aria-live="polite">{copied ? "Copied" : "Copy theme"}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={reset}
            className="h-11 px-4"
          >
            <HugeiconsIcon
              icon={RefreshIcon}
              strokeWidth={2}
              data-icon="inline-start"
            />
            Reset to default
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { ThemeLabPanel }
