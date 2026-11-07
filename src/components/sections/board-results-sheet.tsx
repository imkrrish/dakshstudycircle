"use client"

import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react"
import Image from "next/image"
import { animate, cubicBezier } from "animejs"
import { cn } from "cn"

import { useIsDesktop } from "@/components/shared/contact-dialog/use-is-desktop"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer"
import type { BoardResultSheet } from "@/lib/content/sections/board-results"

const SETTLE = cubicBezier(0.16, 1, 0.3, 1)

type SheetContextValue = {
  open: (id: string, opener: HTMLElement) => void
}

const SheetContext = createContext<SheetContextValue | null>(null)

// The name in the serif at title size. The ui titles set their own size and
// leading, so the tokens go through explicit lengths (as in the contact dialog).
const titleClass =
  "font-heading text-[length:var(--text-title)] leading-(--text-title--line-height) font-medium tracking-(--text-title--letter-spacing) whitespace-nowrap"

// Warm ink scrim, no blur.
const OVERLAY =
  "contact-scrim bg-foreground/30 supports-backdrop-filter:backdrop-blur-none motion-reduce:animate-none! motion-reduce:transition-none"

// Movement only, short: the popup rises 0.5rem and eases up from 0.98. The
// start values are set before paint (layout effect), so there is no flash.
// Reduced motion: nothing runs and the popup simply appears.
function OpenSettle() {
  const ref = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const popup = ref.current?.closest<HTMLElement>(
      '[data-slot="result-sheet"]',
    )
    if (!popup) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const running = animate(popup, {
      opacity: [0, 1],
      translateY: ["0.5rem", "0rem"],
      scale: [0.98, 1],
      duration: 250,
      ease: SETTLE,
      onComplete: () => {
        popup.style.removeProperty("opacity")
        popup.style.removeProperty("transform")
      },
    })
    return () => {
      running.revert()
    }
  }, [])
  return <span ref={ref} hidden />
}

// The institute's own printed result card: lettered issuer line, the print in
// its mat beside the name, class and year, the marks as two aligned columns,
// and the overall percentage on a muted plate. Nothing official-looking.
function SheetBody({
  sheet,
  issuer,
  title,
}: {
  sheet: BoardResultSheet
  issuer: string
  title: ReactNode
}) {
  const { photo } = sheet
  return (
    <div className="flex flex-col gap-6">
      <p className="font-heading text-subtitle tracking-[0.08em] text-muted-foreground [font-variant-caps:all-small-caps]">
        {issuer}
      </p>
      <div
        className={cn(
          "grid gap-x-5 gap-y-6 md:gap-x-8",
          photo
            ? "grid-cols-[6rem_minmax(0,1fr)] md:grid-cols-[10rem_minmax(0,1fr)]"
            : "grid-cols-1",
        )}
      >
        {photo && (
          <div className="self-start rounded-xl border bg-card p-1 md:col-start-1 md:row-span-3 md:row-start-1 md:p-1.5">
            <div className="relative aspect-4/5 overflow-clip rounded-lg bg-muted">
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="10rem"
                className="object-cover object-top"
                style={
                  photo.position
                    ? { objectPosition: photo.position }
                    : undefined
                }
              />
            </div>
          </div>
        )}
        <div className="flex min-w-0 flex-col gap-1 self-center md:col-start-2 md:self-start">
          {title}
          <p className="flex flex-wrap gap-x-2 text-sm text-muted-foreground">
            {sheet.classParts.map((part) => (
              <span key={part} className="whitespace-nowrap">
                {part} ·
              </span>
            ))}
            <span className="whitespace-nowrap tabular-nums">{sheet.year}</span>
          </p>
        </div>
        <dl
          className={cn(
            "grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 md:col-start-2",
            photo && "col-span-2 md:col-span-1",
          )}
        >
          {sheet.subjects.map((subject) => (
            <div key={subject.name} className="contents">
              <dt className="text-base whitespace-nowrap">{subject.name}</dt>
              <dd className="text-right font-heading text-lead whitespace-nowrap tabular-nums">
                {subject.marks}
              </dd>
            </div>
          ))}
        </dl>
        <div
          className={cn(
            "flex items-baseline justify-between gap-4 rounded-lg bg-muted px-4 py-3 md:col-start-2",
            photo && "col-span-2 md:col-span-1",
          )}
        >
          <span className="text-sm text-muted-foreground">Overall</span>
          <span className="font-heading text-heading whitespace-nowrap tabular-nums">
            {sheet.score}
          </span>
        </div>
      </div>
    </div>
  )
}

const closeButton = (
  <Button variant="outline" className="h-11 w-full md:h-10 md:w-auto" />
)

// One shared result card for the whole section. It is mounted only while open
// and filled from `sheets`, so the marks are never in the server HTML. Desktop:
// a centred dialog. Phone: a bottom sheet (swipe down, tap outside, or Close).
function BoardResultsSheet({
  sheets,
  issuer,
  children,
}: {
  sheets: BoardResultSheet[]
  issuer: string
  children: ReactNode
}) {
  // `id` stays set after closing, so the content survives the exit animation.
  const [state, setState] = useState<{ id: string | null; open: boolean }>({
    id: null,
    open: false,
  })
  const opener = useRef<HTMLElement | null>(null)
  const isDesktop = useIsDesktop()

  const value = useMemo<SheetContextValue>(
    () => ({
      open: (id, element) => {
        opener.current = element
        setState({ id, open: true })
      },
    }),
    [],
  )

  const sheet = sheets.find((s) => s.id === state.id)
  const onOpenChange = (open: boolean) => {
    if (!open) setState((s) => ({ ...s, open: false }))
  }
  // Focus returns to the card or row that opened the card.
  const finalFocus = () => opener.current ?? true

  return (
    <SheetContext.Provider value={value}>
      {children}
      {sheet &&
        (isDesktop ? (
          <Dialog open={state.open} onOpenChange={onOpenChange}>
            <DialogContent
              data-slot="result-sheet"
              finalFocus={finalFocus}
              overlayClassName={OVERLAY}
              showCloseButton={false}
              className="flex max-h-[calc(100dvh-4rem)] flex-col gap-0 overflow-y-auto rounded-xl p-8 motion-reduce:animate-none! sm:max-w-xl data-open:animate-none!"
            >
              <OpenSettle />
              <SheetBody
                sheet={sheet}
                issuer={issuer}
                title={
                  <DialogTitle className={titleClass}>{sheet.name}</DialogTitle>
                }
              />
              <div className="mt-8 flex justify-end">
                <DialogClose render={closeButton}>Close</DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={state.open} onOpenChange={onOpenChange}>
            <DrawerContent
              data-slot="result-sheet"
              finalFocus={finalFocus}
              overlayClassName={OVERLAY}
              className="motion-reduce:transition-none"
            >
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-6">
                <SheetBody
                  sheet={sheet}
                  issuer={issuer}
                  title={
                    <DrawerTitle className={titleClass}>
                      {sheet.name}
                    </DrawerTitle>
                  }
                />
              </div>
              <div className="p-5 pt-4">
                <DrawerClose render={closeButton}>Close</DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        ))}
    </SheetContext.Provider>
  )
}

// A real button that opens the shared card. Used for a whole honour row, or
// stretched over a whole mat (see BoardResultCard).
function ResultSheetButton({
  sheetId,
  className,
  onClick,
  ...props
}: Omit<ComponentProps<"button">, "type"> & { sheetId: string }) {
  const context = useContext(SheetContext)
  return (
    <button
      type="button"
      data-slot="result-sheet-button"
      aria-haspopup="dialog"
      className={className}
      onClick={(event) => {
        onClick?.(event)
        context?.open(sheetId, event.currentTarget)
      }}
      {...props}
    />
  )
}

export { BoardResultsSheet, ResultSheetButton }
