"use client"

import { useEffect, useRef, type ComponentProps } from "react"
import { animate, createScope, stagger, svg } from "animejs"

// Decoration-only entrance: tiles fade/scale in, the ornament draws itself.
// Never touches the heading, subheading or buttons (LCP). Without JS or with
// reduced motion everything is already in its final state (see globals.css).
function HeroEntrance({ children, ...props }: ComponentProps<"div">) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scope = createScope({
      root: rootRef,
      mediaQueries: { reduceMotion: "(prefers-reduced-motion: reduce)" },
    }).add((self) => {
      if (!self || self.matches.reduceMotion) return
      animate(svg.createDrawable("[data-draw]"), {
        draw: ["0 0", "0 1"],
        opacity: [0, 1],
        delay: stagger(70),
        duration: 900,
        ease: "inOut(2)",
      })
      animate("[data-hero-tile]", {
        opacity: [0, 1],
        scale: [0.92, 1],
        delay: stagger(90, { start: 250 }),
        duration: 700,
        ease: "out(3)",
      })
    })
    return () => scope.revert()
  }, [])

  return (
    <div data-slot="hero-entrance" ref={rootRef} {...props}>
      {children}
    </div>
  )
}

export { HeroEntrance }
