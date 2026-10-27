"use client"

import { useEffect, useRef, type ComponentProps } from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { animate, cubicBezier, utils, type JSAnimation } from "animejs"
import { cn } from "cn"

import { Tabs } from "@/components/ui/tabs"

const SETTLE = cubicBezier(0.16, 1, 0.3, 1)
const DURATION = 250
const STAGGER = 30
const STAGGER_CAP = 180

// The honour board's tabs, as a small client island around the shadcn Tabs.
// The panels stay mounted and server-rendered (children pass straight
// through), so every year is in the HTML. On a tab change only (never on
// scroll) the new year's numeral swaps in and its rows rise 0.75rem with a
// short stagger. Reduced motion keeps the instant swap.
function ResultsBoardTabs({
  onValueChange,
  ...props
}: ComponentProps<typeof Tabs>) {
  const rootRef = useRef<HTMLDivElement>(null)
  const running = useRef<JSAnimation | null>(null)

  useEffect(
    () => () => {
      running.current?.revert()
    },
    [],
  )

  return (
    <Tabs
      ref={rootRef}
      onValueChange={(value, details) => {
        onValueChange?.(value, details)
        const root = rootRef.current
        if (!root) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return
        }
        const panel = root.querySelector<HTMLElement>(
          `[data-slot="tabs-content"][data-year="${value}"]`,
        )
        if (!panel) return

        // A quick second switch drops the first one's inline styles.
        running.current?.revert()
        const rows = [...panel.querySelectorAll<HTMLElement>(":scope ul > li")]
        const numeral = panel.querySelector<HTMLElement>("[data-board-year]")
        const targets = numeral ? [numeral, ...rows] : rows
        if (targets.length === 0) return

        // Hidden before the panel is shown, so nothing flashes in place.
        utils.set(rows, { opacity: 0, translateY: "0.75rem" })
        if (numeral) utils.set(numeral, { opacity: 0, translateY: "0.25rem" })

        // One timeline-free animation: the numeral takes no delay (its slot is
        // the first), each row waits 30ms more than the last, capped at 180ms.
        running.current = animate(targets, {
          opacity: 1,
          translateY: "0rem",
          duration: DURATION,
          ease: SETTLE,
          delay: (_target?: unknown, index = 0) =>
            Math.min(
              Math.max(index - (numeral ? 1 : 0), 0) * STAGGER,
              STAGGER_CAP,
            ),
          onComplete: () => {
            for (const target of targets) target.removeAttribute("style")
            running.current = null
          },
        })
      }}
      {...props}
    />
  )
}

// The active-year underline: one line that slides between the years (CSS
// transition, settle curve), measured by Base UI. Until it is measured, and
// without JavaScript, the triggers draw their own static underline; the list
// hides those once this indicator is in the DOM.
function ResultsBoardIndicator({
  className,
  ...props
}: TabsPrimitive.Indicator.Props) {
  return (
    <TabsPrimitive.Indicator
      data-slot="results-board-indicator"
      className={cn(
        "pointer-events-none absolute bottom-2 left-0 h-px w-[calc(var(--active-tab-width)-2rem)] translate-x-[calc(var(--active-tab-left)+1rem)] bg-foreground motion-safe:transition-[translate,width] motion-safe:duration-(--dur-base) motion-safe:ease-(--ease-settle)",
        className,
      )}
      {...props}
    />
  )
}

export { ResultsBoardIndicator, ResultsBoardTabs }
