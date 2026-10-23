"use client"

import { useEffect, useRef, type ComponentProps } from "react"
import { usePathname } from "next/navigation"

// Sets the navbar call to action's tone so only one red button shows at a time:
// outline while the page's own hero CTA ([data-hero-cta]) is on screen,
// primary once it scrolls out of view (or if the page has none). The outline
// look lives in globals.css and applies only on pages with a hero CTA; this
// effect just flips data-solid (IntersectionObserver, no scroll listeners).
function NavCtaTone(props: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const root = ref.current
    const target = document.querySelector("[data-hero-cta]")
    if (!root) return
    if (!target) {
      root.setAttribute("data-solid", "")
      return
    }
    // The fixed header covers the top of the viewport, so a button behind it
    // counts as out of view.
    const header = root.closest("header")
    const observer = new IntersectionObserver(
      ([entry]) => {
        root.toggleAttribute("data-solid", !entry.isIntersecting)
      },
      { rootMargin: `-${header?.offsetHeight ?? 64}px 0px 0px 0px` },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [pathname])

  return <div data-slot="nav-cta-tone" ref={ref} {...props} />
}

export { NavCtaTone }
