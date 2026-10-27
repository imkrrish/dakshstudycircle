"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { animate, type JSAnimation } from "animejs"

import { afterLoadIdle } from "@/lib/after-idle"

// Trial: a cropped copy of the emblem's flame laid exactly over the flame in
// the hero emblem, with two slow loops (a vertical breath, and a tiny sway with
// a brightness lift). Decoration only. Nothing is rendered or fetched before
// the window has loaded and the browser is idle, so it never touches LCP. The
// loops pause while the emblem is off screen or the tab is hidden. Without JS
// and under reduced motion the emblem is simply still.
//
// The crop is x 215..430, y 0..290 of the 528x601 emblem file; the box below
// is that region as a share of the emblem.
function EmblemFlame() {
  const rootRef = useRef<HTMLSpanElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    return afterLoadIdle(() => setReady(true))
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const image = root?.querySelector("img")
    if (!ready || !root || !image) return

    let cancelled = false
    let loops: JSAnimation[] = []
    let onScreen = false
    const sync = () => {
      const run = onScreen && !document.hidden
      for (const loop of loops) {
        if (run) loop.play()
        else loop.pause()
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      sync()
    })
    document.addEventListener("visibilitychange", sync)

    // Start only once the crop is decoded, so its first frame is already
    // painted and the overlay can never flash in half drawn.
    image
      .decode()
      .catch(() => {})
      .then(() => {
        if (cancelled) return
        loops = [
          animate(root, {
            scaleY: [1, 1.06],
            duration: 5200,
            ease: "inOut(2)",
            loop: true,
            alternate: true,
          }),
          animate(image, {
            rotate: ["-1deg", "1deg"],
            opacity: [0.9, 1],
            duration: 3700,
            ease: "inOut(2)",
            loop: true,
            alternate: true,
          }),
        ]
        observer.observe(root)
        sync()
      })

    return () => {
      cancelled = true
      observer.disconnect()
      document.removeEventListener("visibilitychange", sync)
      for (const loop of loops) loop.revert()
    }
  }, [ready])

  return (
    <span
      ref={rootRef}
      aria-hidden="true"
      data-slot="emblem-flame"
      className="pointer-events-none absolute top-0 left-[40.72%] block h-[48.253%] w-[40.72%] origin-bottom"
    >
      {ready && (
        <Image
          src="/daksh-emblem-flame.png"
          alt=""
          width={215}
          height={290}
          unoptimized
          loading="eager"
          className="size-full origin-bottom"
        />
      )}
    </span>
  )
}

export { EmblemFlame }
