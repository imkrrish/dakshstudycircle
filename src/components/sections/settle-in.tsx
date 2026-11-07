"use client"

import { useEffect, useRef, type ComponentProps } from "react"
import { animate, cubicBezier, utils, type JSAnimation } from "animejs"
import { cn } from "cn"

const SETTLE = cubicBezier(0.16, 1, 0.3, 1)
const DURATION = 450
const STAGGER = 40
const STAGGER_CAP = 200

// A list whose items settle up a few pixels the first time it enters the view
// (movement only: nothing is ever hidden, so content is visible without
// JavaScript). The items are server-rendered children. Reduced motion:
// nothing runs.
function SettleIn({ className, children, ...props }: ComponentProps<"ul">) {
  const ref = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const list = ref.current
    if (!list) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!("IntersectionObserver" in window)) return

    let running: JSAnimation | null = null
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        const items = [...list.children] as HTMLElement[]
        utils.set(items, { translateY: "0.375rem" })
        running = animate(items, {
          translateY: "0rem",
          duration: DURATION,
          ease: SETTLE,
          delay: (_target?: unknown, index = 0) =>
            Math.min(index * STAGGER, STAGGER_CAP),
          onComplete: () => {
            for (const item of items) item.removeAttribute("style")
            running = null
          },
        })
      },
      { rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(list)

    return () => {
      observer.disconnect()
      running?.revert()
    }
  }, [])

  return (
    <ul ref={ref} data-slot="settle-in" className={cn(className)} {...props}>
      {children}
    </ul>
  )
}

export { SettleIn }
