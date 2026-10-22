"use client"

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { animate, createScope, stagger } from "animejs"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import type { NavItem } from "@/lib/content-schema"
import { useDialogStore } from "@/lib/stores/dialog-store"
import { isActiveLink } from "./is-active-link"

// Below lg: toggle + dropdown panel under the bar. `cta` is rendered by the
// server (ActionButton) and passed in as a slot.
function MobileMenu({
  items,
  cta,
  className,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  items: NavItem[]
  cta: ReactNode
}) {
  const pathname = usePathname()
  const panelId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  // Open for one pathname only, so a route change closes the menu.
  const [openFor, setOpenFor] = useState<string | null>(null)
  const open = openFor === pathname

  // Esc closes and returns focus to the toggle; so does a press outside.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpenFor(null)
      toggleRef.current?.focus()
    }
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (panelRef.current?.contains(target)) return
      if (toggleRef.current?.contains(target)) return
      setOpenFor(null)
    }
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [open])

  // Any dialog opening closes the menu so they never stack. If the dialog was
  // opened from inside the menu, hand focus-return to the toggle (the panel
  // is hidden by then).
  useEffect(
    () =>
      useDialogStore.subscribe((state) => {
        if (state.activeDialog === null) return
        setOpenFor(null)
        if (panelRef.current?.contains(state.returnFocusTo)) {
          useDialogStore.setState({ returnFocusTo: toggleRef.current })
        }
      }),
    [],
  )

  // Subtle staggered entrance; skipped with reduced motion.
  useEffect(() => {
    if (!open) return
    const scope = createScope({
      root: panelRef,
      mediaQueries: { reduceMotion: "(prefers-reduced-motion: reduce)" },
    }).add((self) => {
      if (!self || self.matches.reduceMotion) return
      animate("[data-menu-item]", {
        opacity: [0, 1],
        y: ["-0.375rem", "0rem"],
        delay: stagger(40),
        duration: 220,
        ease: "out(3)",
      })
    })
    return () => scope.revert()
  }, [open])

  return (
    <div
      data-slot="mobile-menu"
      className={cn("lg:hidden", className)}
      {...props}
    >
      <Button
        ref={toggleRef}
        variant="ghost"
        size="icon"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpenFor(open ? null : pathname)}
      >
        <HugeiconsIcon
          icon={open ? Cancel01Icon : Menu01Icon}
          aria-hidden="true"
        />
      </Button>
      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full mt-2 animate-in rounded-2xl border bg-popover p-2 shadow-lg fade-in-0 motion-reduce:animate-none"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.href} data-menu-item>
                <Link
                  href={item.href}
                  aria-current={
                    isActiveLink(pathname, item.href) ? "page" : undefined
                  }
                  onClick={() => setOpenFor(null)}
                  className="block rounded-xl px-3 py-2.5 text-base text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 aria-[current=page]:bg-muted aria-[current=page]:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div data-menu-item className="p-1 pt-2">
          {cta}
        </div>
      </div>
    </div>
  )
}

export { MobileMenu }
