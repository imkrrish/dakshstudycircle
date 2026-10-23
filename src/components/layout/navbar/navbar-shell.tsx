"use client"

import { useEffect, useState, type ComponentProps } from "react"
import { cn } from "cn"

// Scroll state only. A sentinel at the top of the page leaves the viewport
// once the page is scrolled; the header exposes that as `data-scrolled` and
// the bar's resize is plain CSS driven by it. Children stay server-rendered.
// The header overlays the page (fixed, no space reserved); each hero adds the
// navbar height to its own top padding.
function NavbarShell({ className, ...props }: ComponentProps<"header">) {
  const [sentinel, setSentinel] = useState<HTMLDivElement | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!sentinel) return
    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting)
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [sentinel])

  return (
    <>
      <div
        ref={setSentinel}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-4"
      />
      <header
        data-slot="navbar-shell"
        data-scrolled={scrolled ? "" : undefined}
        className={cn(
          "group/navbar fixed inset-x-0 top-0 z-40 h-(--navbar-height)",
          className,
        )}
        {...props}
      />
    </>
  )
}

export { NavbarShell }
