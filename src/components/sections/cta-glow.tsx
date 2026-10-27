"use client"

import { useEffect, useRef, type ComponentProps } from "react"
import { animate, onScroll, type JSAnimation } from "animejs"

import { afterLoadIdle } from "@/lib/after-idle"

// The dark band's glow (see .cta-glow). As the band scrolls in, the glow warms
// from 35% to full strength, tied to scroll position only (linear, no easing
// or inertia), so it stops the moment scrolling stops. Only the glow moves:
// the text and buttons are never touched. Without JS and under reduced motion
// the glow rests at full strength, its static look.
function CtaGlow(props: ComponentProps<"div">) {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    const band = glow?.parentElement
    if (!glow || !band) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let animation: JSAnimation | null = null
    const cancel = afterLoadIdle(() => {
      animation = animate(glow, {
        opacity: [0.35, 1],
        ease: "linear",
        // 0 when the band's top meets the bottom of the screen, 1 when its
        // bottom does: the whole band is in view.
        autoplay: onScroll({
          target: band,
          enter: "bottom top",
          leave: "bottom bottom",
          sync: true,
        }),
      })
    })

    return () => {
      cancel()
      animation?.revert()
    }
  }, [])

  return (
    <div
      data-slot="cta-glow"
      ref={glowRef}
      aria-hidden="true"
      className="cta-glow"
      {...props}
    />
  )
}

export { CtaGlow }
