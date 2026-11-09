"use client"

import { useEffect, useRef, type ComponentProps } from "react"
import { animate, cubicBezier, utils, type JSAnimation } from "animejs"
import { cn } from "cn"

const SETTLE = cubicBezier(0.16, 1, 0.3, 1)
const DISC_DURATION = 450
const CURVE_DURATION = 600
const STEP = 350

// The route's one moment, the first time it enters the view: each disc settles
// up a few pixels and the curve after it grows out of that disc towards the
// next (scaleX from lg, scaleY on phones, so the non-scaling stroke keeps its
// thickness). Nothing is hidden before it runs, so the route is complete
// without JavaScript. Reduced motion: nothing runs.
function ContactRouteMotion({
  className,
  children,
  ...props
}: ComponentProps<"ol">) {
  const ref = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = ref.current
    if (!list) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!("IntersectionObserver" in window)) return

    const running: JSAnimation[] = []
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        const discs = [
          ...list.querySelectorAll<HTMLElement>("[data-route-disc]"),
        ]
        // Only the curve that is displayed at this width.
        const curves = [
          ...list.querySelectorAll<SVGElement>("[data-route-curve]"),
        ].filter((curve) => getComputedStyle(curve).display !== "none")

        utils.set(discs, { translateY: "0.375rem" })
        for (const curve of curves) {
          const axis = curve.dataset.routeCurve === "row" ? "scaleX" : "scaleY"
          utils.set(curve, { [axis]: 0 })
        }

        running.push(
          animate(discs, {
            translateY: "0rem",
            duration: DISC_DURATION,
            ease: SETTLE,
            delay: (_target?: unknown, index = 0) => index * STEP,
            onComplete: () => {
              for (const disc of discs) disc.removeAttribute("style")
            },
          }),
        )
        curves.forEach((curve, index) => {
          const axis = curve.dataset.routeCurve === "row" ? "scaleX" : "scaleY"
          running.push(
            animate(curve, {
              [axis]: 1,
              duration: CURVE_DURATION,
              ease: SETTLE,
              delay: index * STEP + 200,
              onComplete: () => curve.removeAttribute("style"),
            }),
          )
        })
      },
      { rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(list)

    return () => {
      observer.disconnect()
      for (const animation of running) animation.revert()
    }
  }, [])

  return (
    <ol
      ref={ref}
      data-slot="contact-route-motion"
      className={cn(className)}
      {...props}
    >
      {children}
    </ol>
  )
}

export { ContactRouteMotion }
