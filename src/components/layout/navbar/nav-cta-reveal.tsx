"use client"

import { useEffect, useRef, type ComponentProps } from "react"
import { usePathname } from "next/navigation"
import { cn } from "cn"

// Hides the navbar's call to action while the page's own hero CTA
// ([data-hero-cta]) is on screen, so only one red button shows at a time.
// The CSS that hides it lives in globals.css and applies only on pages with a
// hero CTA; this effect just flips data-revealed once the hero CTA scrolls out
// of view (IntersectionObserver, no scroll listeners).
function NavCtaReveal({ className, ...props }: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const root = ref.current
    const target = document.querySelector("[data-hero-cta]")
    if (!root) return
    if (!target) {
      root.setAttribute("data-revealed", "")
      return
    }
    // The fixed header covers the top of the viewport, so a button behind it
    // counts as out of view.
    const header = root.closest("header")
    const observer = new IntersectionObserver(
      ([entry]) => {
        root.toggleAttribute("data-revealed", !entry.isIntersecting)
      },
      { rootMargin: `-${header?.offsetHeight ?? 64}px 0px 0px 0px` },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [pathname])

  return (
    <div
      data-slot="nav-cta-reveal"
      ref={ref}
      className={cn(
        "transition-[opacity,visibility] duration-300 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  )
}

export { NavCtaReveal }
