"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import type { ContactVisitMap } from "@/lib/content/sections/contact-visit"

// A click-to-load map. Nothing is requested from Google until the visitor taps
// "Show map": then the button goes, the map opens below the actions in a
// printed mat (the same frame as the hero photo) and the iframe gets focus.
// `children` are the section's own action buttons (Get directions); they stay
// where they are. Without JavaScript "Show map" is hidden and the directions
// button is the way in.
function MapFacade({
  embedUrl,
  title,
  showMapLabel,
  children,
  className,
}: ContactVisitMap & { children?: ReactNode; className?: string }) {
  const [loaded, setLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (loaded) iframeRef.current?.focus()
  }, [loaded])

  return (
    <div
      data-slot="map-facade"
      className={cn("flex flex-col gap-6", className)}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        {!loaded && (
          <Button
            variant="outline"
            size="lg"
            className="h-11 w-full focus-ring sm:w-auto lg:h-10 noscript:hidden"
            onClick={() => setLoaded(true)}
          >
            {showMapLabel}
          </Button>
        )}
        {children}
      </div>
      {loaded && (
        <div className="rounded-xl border bg-card p-1.5">
          <div className="relative aspect-4/3 overflow-clip rounded-lg bg-muted lg:aspect-video">
            <iframe
              ref={iframeRef}
              src={embedUrl}
              title={title}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 size-full border-0 focus-ring"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export { MapFacade }
