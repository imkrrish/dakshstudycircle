"use client"

import { useEffect, useId, useRef } from "react"
import { animate, onScroll, type JSAnimation } from "animejs"

// The course titles, set along a gentle rising curve that levels off: the
// school stages climb, the side offerings sit on the flat tail. Decorative
// (the courses are listed right below), so it is hidden from assistive tech.
// The curve is drawn once at 1:1 scale (no viewBox shrink), so the text keeps
// its token size at every width. Its position is tied to scroll progress
// only: it never moves on its own and stops the moment scrolling does.
// Without JavaScript, before hydration and under reduced motion it is static,
// with the first title on the container edge.

// Path coordinates in px (SVG user units). x = 0 is the container edge; the
// path runs well to the left of it so titles can slide out through the mask
// instead of being cut by the path's start.
const LEAD_IN = 2400
const BASELINE_LOW = 88
const BASELINE_HIGH = 40
const RISE_END = 720
const TAIL_END = 4800

const PATH = [
  `M ${-LEAD_IN} ${BASELINE_LOW}`,
  `H 0`,
  `C 240 ${BASELINE_LOW - 36} 520 ${BASELINE_HIGH} ${RISE_END} ${BASELINE_HIGH}`,
  `H ${TAIL_END}`,
].join(" ")

function CoursePath({ titles }: { titles: string[] }) {
  const pathId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<SVGTextElement>(null)
  const textPathRef = useRef<SVGTextPathElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const text = textRef.current
    const textPath = textPathRef.current
    if (!root || !text || !textPath) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let animation: JSAnimation | null = null

    function rest() {
      textPath?.setAttribute("startOffset", String(LEAD_IN))
    }

    function stop() {
      animation?.revert()
      animation = null
      rest()
    }

    function start() {
      stop()
      // Hidden below md (the straight ribbon is shown there).
      if (reduceMotion.matches || !root || !text || !textPath) return
      if (root.clientWidth === 0) return
      const gutter = parseFloat(
        getComputedStyle(root.firstElementChild as Element).paddingLeft,
      )
      // Move just far enough for the last title to reach the right gutter.
      const box = text.getBBox()
      const overflow = gutter + box.x + box.width + gutter - root.clientWidth
      // Never more than one screen width, and never faster than the scroll
      // (the window below is about 65% of the screen plus the path's height).
      const scrollDistance = window.innerHeight * 0.65 + root.offsetHeight
      const travel = Math.min(overflow, root.clientWidth, scrollDistance)
      if (travel <= 0) return
      const progress = { value: 0 }
      // The text slides back along the path (later stages arrive from the
      // right, onto the high, level tail), starting from the same rest state
      // the static markup has.
      animation = animate(progress, {
        value: 1,
        ease: "linear",
        onUpdate: () =>
          textPath.setAttribute(
            "startOffset",
            String(LEAD_IN - travel * progress.value),
          ),
        autoplay: onScroll({
          target: root,
          enter: "70% top",
          leave: "5% bottom",
          sync: true,
        }),
      })
    }

    start()

    let frame = 0
    const resize = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(start)
    })
    resize.observe(root)
    reduceMotion.addEventListener("change", start)

    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      reduceMotion.removeEventListener("change", start)
      stop()
    }
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-slot="course-path"
      className="course-ribbon pointer-events-none absolute inset-x-0 top-0 hidden h-24 overflow-x-clip select-none md:block"
    >
      <div className="course-ribbon-track h-full">
        <svg
          focusable="false"
          className="h-full w-full overflow-visible"
          // No width/height scaling: 1 user unit is 1 css px.
        >
          <defs>
            <path id={pathId} d={PATH} fill="none" />
          </defs>
          <text
            ref={textRef}
            className="fill-muted-foreground font-heading text-title"
          >
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={LEAD_IN}
            >
              {titles.map((title, index) => (
                <tspan key={title}>
                  {index > 0 && (
                    <tspan dx="1.25rem" className="fill-muted-foreground/60">
                      •
                    </tspan>
                  )}
                  <tspan dx={index > 0 ? "1.25rem" : undefined}>{title}</tspan>
                </tspan>
              ))}
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  )
}

export { CoursePath }
