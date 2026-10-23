"use client"

import { useEffect, useRef, type ComponentProps } from "react"
import { animate, createScope } from "animejs"

// Decoration-only entrance: the ornament fades up. Never touches the heading, subheading or buttons (LCP). Without JS or with
// reduced motion everything is already in its final state (see globals.css).
function HeroEntrance({ children, ...props }: ComponentProps<"div">) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scope = createScope({
      root: rootRef,
      mediaQueries: { reduceMotion: "(prefers-reduced-motion: reduce)" },
    }).add((self) => {
      if (!self || self.matches.reduceMotion) return
      animate("[data-hero-ornament]", {
        opacity: [0, 1],
        translateY: ["0.5rem", "0rem"],
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
