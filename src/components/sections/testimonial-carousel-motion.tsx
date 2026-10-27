"use client"

import { useEffect } from "react"

import { useCarousel, type CarouselApi } from "@/components/ui/carousel"

type Embla = NonNullable<CarouselApi>

// Renders nothing. Marks the snapped slide `data-snapped` and, while a card is
// held (pointer down, dragging), `data-held`; the cards read those from CSS
// (straighten to 0deg, and press to 0.985 when held). The marks are only
// attributes, so the cards stay server-rendered. Under reduced motion no mark
// is set and the resting tilt stays.
function TestimonialCarouselMotion() {
  const { api } = useCarousel()

  useEffect(() => {
    if (!api) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    function markSnapped(embla: Embla) {
      // The first slide of the selected snap, so a trimmed last snap marks the
      // card at its leading edge.
      const snap =
        embla.internalEngine().slideRegistry[embla.selectedScrollSnap()]
      const snapped = snap ? embla.slideNodes()[snap[0]] : undefined
      for (const slide of embla.slideNodes()) {
        slide.toggleAttribute("data-snapped", slide === snapped)
      }
    }

    function release() {
      for (const slide of api!.slideNodes()) slide.removeAttribute("data-held")
    }

    // Embla's pointerDown event does not carry the DOM event, so the card
    // under the pointer is found with a native listener on the same root.
    // Embla's pointerUp ends the hold (a drag that Embla ends is a pointer up).
    const root = api.rootNode()
    function hold(event: PointerEvent) {
      const held =
        event.target instanceof Element
          ? event.target.closest("[data-slot=carousel-item]")
          : null
      held?.setAttribute("data-held", "")
    }

    markSnapped(api)
    api.on("select", markSnapped).on("reInit", markSnapped)
    api.on("pointerUp", release)
    root.addEventListener("pointerdown", hold)
    window.addEventListener("pointercancel", release)

    return () => {
      api.off("select", markSnapped).off("reInit", markSnapped)
      api.off("pointerUp", release)
      root.removeEventListener("pointerdown", hold)
      window.removeEventListener("pointercancel", release)
      for (const slide of api.slideNodes()) {
        slide.removeAttribute("data-snapped")
        slide.removeAttribute("data-held")
      }
    }
  }, [api])

  return null
}

export { TestimonialCarouselMotion }
