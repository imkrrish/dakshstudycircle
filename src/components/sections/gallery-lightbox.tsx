"use client"

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react"
import Image, { getImageProps } from "next/image"
import { animate, cubicBezier } from "animejs"

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
import type { ResolvedGalleryPhoto } from "@/lib/content"

type LightboxPhoto = Pick<
  ResolvedGalleryPhoto,
  "id" | "src" | "width" | "height" | "alt"
>

const SETTLE = cubicBezier(0.16, 1, 0.3, 1)

// Same warm ink scrim as the result popup, no blur.
const OVERLAY =
  "contact-scrim bg-foreground/30 supports-backdrop-filter:backdrop-blur-none motion-reduce:animate-none! motion-reduce:transition-none"

// A swipe is at least this far sideways and clearly more sideways than down.
const SWIPE_DISTANCE = 48
const SWIPE_DOMINANCE = 1.5

// The popup's open motion, as in the result popup: it rises 0.5rem and eases up
// from 0.98 over 250ms. Runs once per open, never when moving between photos.
// Reduced motion: nothing runs and the popup simply appears.
function OpenSettle() {
  const ref = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const popup = ref.current?.closest<HTMLElement>(
      '[data-slot="gallery-lightbox"]',
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

// What the browser is told about the photo's width: its real pixel width, or
// the space the stage leaves it, whichever is smaller. Mirrors the mat maths in
// `Stage` (stage heights and the mat's own width included).
function lightboxSizes(photo: LightboxPhoto, desktop: boolean) {
  const ratio = (photo.width / photo.height).toFixed(3)
  return desktop
    ? `min(${photo.width}px, calc((100vh - 12.9rem) * ${ratio}), calc(100vw - 8rem), 68rem)`
    : `min(${photo.width}px, calc((100vh - 16.7rem) * ${ratio}), calc(100vw - 4.2rem))`
}

function imageProps(photo: LightboxPhoto, desktop: boolean) {
  return {
    src: photo.src,
    alt: photo.alt,
    fill: true,
    sizes: lightboxSizes(photo, desktop),
  }
}

// The photo, whole and uncropped, in the same mat as the prints in the grid.
// The stage has a fixed size, so Previous and Next never move; the mat inside
// it takes the photo's exact ratio, never more than its real pixel size and
// never more than the stage allows. Its plate is the paper tone until the
// picture arrives. Phones: a sideways swipe moves between photos; the stage
// hands horizontal drags to us (data-base-ui-swipe-ignore), so the drawer only
// answers to vertical ones.
function Stage({
  photo,
  desktop,
  onStep,
}: {
  photo: LightboxPhoto
  desktop: boolean
  onStep: (delta: number) => void
}) {
  const ratio = photo.width / photo.height
  const start = useRef<{ x: number; y: number } | null>(null)

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType === "mouse") return
    start.current = { x: event.clientX, y: event.clientY }
  }
  const onPointerUp = (event: PointerEvent) => {
    const from = start.current
    start.current = null
    if (!from) return
    const dx = event.clientX - from.x
    const dy = event.clientY - from.y
    if (
      Math.abs(dx) >= SWIPE_DISTANCE &&
      Math.abs(dx) > Math.abs(dy) * SWIPE_DOMINANCE
    ) {
      onStep(dx < 0 ? 1 : -1)
    }
  }

  return (
    <div
      data-base-ui-swipe-ignore="x"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        start.current = null
      }}
      className={
        desktop
          ? "[container-type:size] grid h-[calc(100dvh-12rem)] touch-pan-y place-items-center [--mat:0.875rem]"
          : "[container-type:size] grid h-[min(calc(100dvh-16rem),calc((100vw-3.5rem)*4/3))] touch-pan-y place-items-center [--mat:0.625rem] sm:[--mat:0.875rem]"
      }
    >
      <div
        key={photo.id}
        className="rounded-lg border bg-card p-1 sm:rounded-xl sm:p-1.5"
        style={{
          width: `min(calc(${photo.width}px + var(--mat)), 100cqw, calc((100cqh - var(--mat)) * ${ratio} + var(--mat)))`,
        }}
      >
        <div
          className="relative overflow-clip rounded-sm bg-muted sm:rounded-lg"
          style={{ aspectRatio: ratio }}
        >
          <Image
            {...imageProps(photo, desktop)}
            loading="eager"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}

const stepButton =
  "h-11 px-4 md:h-10 aria-disabled:pointer-events-none aria-disabled:opacity-50"

// Previous, the counter and Next. At either end the button is dimmed and does
// nothing but stays focusable, so focus is not thrown out of the dialog when
// the last photo is reached from the keyboard.
function Steps({
  index,
  total,
  onStep,
  className,
  buttonClassName,
}: {
  index: number
  total: number
  onStep: (delta: number) => void
  className?: string
  buttonClassName?: string
}) {
  return (
    <div className={className}>
      <Button
        variant="outline"
        focusableWhenDisabled
        disabled={index === 0}
        onClick={() => onStep(-1)}
        className={`${stepButton} ${buttonClassName ?? ""}`}
      >
        Previous
      </Button>
      <p className="text-sm text-muted-foreground tabular-nums">
        {index + 1} of {total}
      </p>
      <Button
        variant="outline"
        focusableWhenDisabled
        disabled={index === total - 1}
        onClick={() => onStep(1)}
        className={`${stepButton} ${buttonClassName ?? ""}`}
      >
        Next
      </Button>
    </div>
  )
}

// One shared lightbox for the gallery. It is mounted only while open, so
// nothing is requested before the first open. Desktop: a centred dialog. Phone:
// a bottom sheet (swipe down, tap outside, or Close). The page's prints are
// real links to the original files; a plain click on one opens the lightbox at
// that photo instead, while a modified click (new tab, new window) keeps the
// link's own behaviour.
function GalleryLightbox({
  photos,
  children,
}: {
  photos: LightboxPhoto[]
  children: ReactNode
}) {
  // `index` stays set after closing, so the content survives the exit animation.
  const [state, setState] = useState<{ index: number | null; open: boolean }>({
    index: null,
    open: false,
  })
  const opener = useRef<HTMLElement | null>(null)
  const preloaded = useRef<Set<HTMLImageElement>>(new Set())
  const isDesktop = useIsDesktop()
  const total = photos.length

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    const link = (event.target as Element).closest<HTMLAnchorElement>(
      "a[data-gallery-index]",
    )
    if (!link) return
    const index = Number(link.dataset.galleryIndex)
    if (!Number.isInteger(index) || index < 0 || index >= total) return
    event.preventDefault()
    opener.current = link
    setState({ index, open: true })
  }

  const step = (delta: number) =>
    setState((s) =>
      s.index === null
        ? s
        : {
            ...s,
            index: Math.min(total - 1, Math.max(0, s.index + delta)),
          },
    )

  const index = state.index
  const photo = index === null ? undefined : photos[index]

  // Only the photos either side of the current one are fetched ahead, with the
  // same srcset and sizes as the real image, so the browser reuses the file
  // when we get there.
  useEffect(() => {
    if (index === null) return
    for (const neighbour of [photos[index - 1], photos[index + 1]]) {
      if (!neighbour) continue
      const { props } = getImageProps(imageProps(neighbour, isDesktop))
      const image = new window.Image()
      image.sizes = props.sizes ?? ""
      image.srcset = props.srcSet ?? ""
      image.src = props.src
      preloaded.current.add(image)
    }
  }, [index, isDesktop, photos])

  const onOpenChange = (open: boolean) => {
    if (!open) setState((s) => ({ ...s, open: false }))
  }
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      step(-1)
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      step(1)
    }
  }
  // Focus returns to the print that opened the lightbox.
  const finalFocus = () => opener.current ?? true

  return (
    <div
      data-slot="gallery-lightbox-scope"
      className="contents"
      onClick={onClick}
    >
      {children}
      {photo &&
        index !== null &&
        (isDesktop ? (
          <Dialog open={state.open} onOpenChange={onOpenChange}>
            <DialogContent
              data-slot="gallery-lightbox"
              finalFocus={finalFocus}
              overlayClassName={OVERLAY}
              showCloseButton={false}
              onKeyDown={onKeyDown}
              className="w-[min(calc(100vw-4rem),72rem)] max-w-none gap-6 rounded-xl p-8 motion-reduce:animate-none! sm:max-w-none data-open:animate-none!"
            >
              <OpenSettle />
              <DialogTitle className="sr-only">{photo.alt}</DialogTitle>
              <Stage photo={photo} desktop onStep={step} />
              <div className="flex items-center justify-between gap-4">
                <Steps
                  index={index}
                  total={total}
                  onStep={step}
                  className="flex items-center gap-4"
                />
                <DialogClose
                  render={<Button variant="outline" className="h-10 px-4" />}
                >
                  Close
                </DialogClose>
              </div>
              <p className="sr-only" aria-live="polite">
                {photo.alt}
              </p>
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={state.open} onOpenChange={onOpenChange}>
            <DrawerContent
              data-slot="gallery-lightbox"
              finalFocus={finalFocus}
              overlayClassName={OVERLAY}
              onKeyDown={onKeyDown}
              className="motion-reduce:transition-none"
            >
              <div className="flex flex-col gap-4 px-5 pt-6">
                <DrawerTitle className="sr-only">{photo.alt}</DrawerTitle>
                <Stage photo={photo} desktop={false} onStep={step} />
                <Steps
                  index={index}
                  total={total}
                  onStep={step}
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-3"
                  buttonClassName="w-full"
                />
                <p className="sr-only" aria-live="polite">
                  {photo.alt}
                </p>
              </div>
              <div className="p-5 pt-3">
                <DrawerClose
                  render={
                    <Button variant="outline" className="h-11 w-full px-4" />
                  }
                >
                  Close
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        ))}
    </div>
  )
}

export { GalleryLightbox }
