"use client"

import { useEffect, useRef, useState } from "react"
import { MapsLocation01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import type { ContactVisitMap } from "@/lib/content/sections/contact-visit"

// A click-to-load map. The panel is a printed mat (as the hero photo) with a
// fixed 4:3 box, so nothing shifts when the map arrives. Nothing is requested
// from Google until the visitor taps "Show map": then the iframe takes the
// box's place and gets focus. Without JavaScript the panel is hidden and
// "Get directions" is the way in.
function MapFacade({
  embedUrl,
  title,
  showMapLabel,
  className,
}: ContactVisitMap & { className?: string }) {
  const [loaded, setLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (loaded) iframeRef.current?.focus()
  }, [loaded])

  return (
    <div
      data-slot="map-facade"
      className={cn(
        "rounded-xl border bg-card p-1.5 noscript:hidden",
        className,
      )}
    >
      <div className="relative aspect-4/3 overflow-clip rounded-lg bg-muted">
        {loaded ? (
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title={title}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 size-full border-0 focus-ring"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <HugeiconsIcon
              icon={MapsLocation01Icon}
              strokeWidth={1.5}
              aria-hidden="true"
              className="size-12 text-muted-foreground"
            />
            <Button
              variant="outline"
              size="lg"
              className="h-11 focus-ring lg:h-10"
              onClick={() => setLoaded(true)}
            >
              {showMapLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export { MapFacade }
