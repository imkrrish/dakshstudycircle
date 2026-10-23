"use client"

import { useEffect, useRef, type ComponentProps } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { animate, createScope, utils, type Scope } from "animejs"
import { cn } from "cn"

import type { NavItem } from "@/lib/content-schema"
import { isActiveLink } from "./is-active-link"

// Desktop links. One highlight pill slides between hovered links (anime.js);
// with reduced motion it jumps instead.
function NavLinks({
  items,
  className,
  ...props
}: ComponentProps<"nav"> & { items: NavItem[] }) {
  const pathname = usePathname()
  const listRef = useRef<HTMLUListElement>(null)
  const highlightRef = useRef<HTMLSpanElement>(null)
  const scopeRef = useRef<Scope | null>(null)

  useEffect(() => {
    let shown = false
    const scope = createScope({
      root: listRef,
      mediaQueries: { reduceMotion: "(prefers-reduced-motion: reduce)" },
    }).add((self) => {
      const highlight = highlightRef.current
      if (!self || !highlight) return
      const duration = self.matches.reduceMotion ? 0 : 250

      self.add("moveTo", (el: unknown) => {
        const link = el as HTMLElement
        const target = { x: link.offsetLeft, width: link.offsetWidth }
        if (!shown) {
          // First hover: appear in place rather than sliding in from the left.
          utils.set(highlight, target)
          shown = true
        } else {
          animate(highlight, { ...target, duration, ease: "out(3)" })
        }
        animate(highlight, { opacity: 1, duration, ease: "out(3)" })
      })

      self.add("hide", () => {
        shown = false
        animate(highlight, { opacity: 0, duration, ease: "out(3)" })
      })
    })
    scopeRef.current = scope
    return () => scope.revert()
  }, [])

  return (
    <nav
      data-slot="nav-links"
      aria-label="Main"
      className={cn("hidden lg:block", className)}
      {...props}
    >
      <ul
        ref={listRef}
        className="relative flex items-center gap-1"
        onPointerLeave={() => scopeRef.current?.methods.hide()}
      >
        <span
          ref={highlightRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-full rounded-4xl bg-muted opacity-0"
        />
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={
                isActiveLink(pathname, item.href) ? "page" : undefined
              }
              onPointerEnter={(event) => {
                if (event.pointerType !== "mouse") return
                scopeRef.current?.methods.moveTo(event.currentTarget)
              }}
              className="relative block rounded-4xl px-3.5 py-2 text-sm font-medium text-foreground/80 focus-ring transition-colors hover:text-foreground aria-[current=page]:text-foreground motion-reduce:transition-none"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { NavLinks }
