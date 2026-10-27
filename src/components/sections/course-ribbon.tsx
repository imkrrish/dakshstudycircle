"use client"

import { useEffect, useRef } from "react"
import { animate, onScroll, type JSAnimation } from "animejs"

// A quiet line of course titles that reads along as the visitor scrolls from
// the hero into the courses. Decorative (the courses are listed right below),
// so it is hidden from assistive tech. Its position is tied to scroll
// progress only: it never moves on its own and stops the moment scrolling
// does. Without JavaScript, before hydration and under reduced motion it is
// static, with the first title on the container edge.
function CourseRibbon({ titles }: { titles: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    if (!root || !track) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let animation: JSAnimation | null = null

    function stop() {
      animation?.revert()
      animation = null
    }

    function start() {
      stop()
      if (reduceMotion.matches || !root || !track) return
      // Move just far enough for the last title to reach the right gutter,
      // but never more than one screen width.
      const gutter = parseFloat(getComputedStyle(track).paddingLeft)
      const overflow = track.scrollWidth - root.clientWidth + gutter
      const travel = Math.min(overflow, root.clientWidth)
      if (travel <= 0) return
      animation = animate(track, {
        x: -travel,
        ease: "linear",
        autoplay: onScroll({
          target: root,
          // "container target": progress is 0 until the ribbon's top reaches
          // 70% of the screen height (below where it sits on first load, so
          // nothing jumps) and 1 when its bottom reaches 5%, under the navbar.
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
      data-slot="course-ribbon"
      className="course-ribbon pointer-events-none absolute inset-x-0 -top-2 h-6 overflow-x-clip select-none md:top-0 md:h-7"
    >
      <div
        ref={trackRef}
        className="course-ribbon-track flex h-full w-max items-center whitespace-nowrap font-heading text-subtitle text-muted-foreground will-change-transform md:text-title"
      >
        {titles.map((title) => (
          <span
            key={title}
            className="flex items-center after:mx-5 after:size-1 after:rounded-full after:bg-muted-foreground/60 after:content-[''] last:after:hidden md:after:mx-6"
          >
            {title}
          </span>
        ))}
      </div>
    </div>
  )
}

export { CourseRibbon }
