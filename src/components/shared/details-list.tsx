"use client"

import { useEffect, useRef, type ComponentProps } from "react"
import { animate, type JSAnimation } from "animejs"

const DURATION = 250

// Enhances a server-rendered list of <details> (FAQ, results board): a click on
// a summary animates the body's height and opacity instead of toggling
// instantly. The body is the element marked `data-details-body`. The `open`
// attribute is set before opening and removed after closing, so the body is
// always in the DOM and everything still works without JavaScript. While an
// item closes it carries `data-closing`, so the icon (CSS) turns back at once.
// Reduced motion keeps the native instant toggle.
function DetailsList({ children, ...props }: ComponentProps<"div">) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const running = new Map<HTMLDetailsElement, JSAnimation>()
    // The `open` value this island last set on an item. The browser reports it
    // with an async `toggle` event, which must not be mistaken for an outside
    // change.
    const expected = new Map<HTMLDetailsElement, boolean>()

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    function setOpen(details: HTMLDetailsElement, open: boolean) {
      expected.set(details, open)
      details.open = open
    }

    function resetStyles(details: HTMLDetailsElement) {
      const body = details.querySelector<HTMLElement>("[data-details-body]")
      body?.style.removeProperty("height")
      body?.style.removeProperty("opacity")
    }

    function toggle(details: HTMLDetailsElement) {
      const body = details.querySelector<HTMLElement>("[data-details-body]")
      if (!body) return

      // A click during an animation takes over from where it stopped.
      running.get(details)?.cancel()
      const opening = !details.open || details.hasAttribute("data-closing")

      const fromHeight = details.open ? body.getBoundingClientRect().height : 0
      const fromOpacity = details.open
        ? Number(getComputedStyle(body).opacity)
        : 0

      if (opening) {
        setOpen(details, true)
        details.removeAttribute("data-closing")
      } else {
        details.setAttribute("data-closing", "")
      }

      // Heights are measured layout pixels, so they stay in px.
      const animation = animate(body, {
        height: [`${fromHeight}px`, `${opening ? body.scrollHeight : 0}px`],
        opacity: [fromOpacity, opening ? 1 : 0],
        duration: DURATION,
        ease: "out(3)",
        onComplete: () => {
          running.delete(details)
          // One synchronous step, so no frame shows a half state: shut the
          // item, drop the inline styles, then the closing marker.
          if (!opening) setOpen(details, false)
          resetStyles(details)
          details.removeAttribute("data-closing")
        },
      })
      running.set(details, animation)
    }

    // One delegated click handler. Reduced motion keeps the native toggle.
    const controller = new AbortController()
    root.addEventListener(
      "click",
      (event) => {
        const summary = (event.target as HTMLElement).closest("summary")
        if (!summary || !root.contains(summary)) return
        if (reduceMotion.matches) return
        event.preventDefault()
        toggle(summary.parentElement as HTMLDetailsElement)
      },
      { signal: controller.signal },
    )

    // `toggle` does not bubble, hence capture. Events caused by this island's
    // own changes are skipped; anything else (find-in-page opening an item) is
    // an outside change, so stop animating that item and let it rest.
    root.addEventListener(
      "toggle",
      (event) => {
        const details = event.target as HTMLDetailsElement
        if (expected.get(details) === details.open) {
          expected.delete(details)
          return
        }
        expected.delete(details)
        running.get(details)?.cancel()
        running.delete(details)
        details.removeAttribute("data-closing")
        resetStyles(details)
      },
      { capture: true, signal: controller.signal },
    )

    return () => {
      controller.abort()
      for (const [details, animation] of running) {
        animation.cancel()
        details.removeAttribute("data-closing")
        resetStyles(details)
      }
      running.clear()
      expected.clear()
    }
  }, [])

  return (
    <div data-slot="details-list" ref={rootRef} {...props}>
      {children}
    </div>
  )
}

export { DetailsList }
