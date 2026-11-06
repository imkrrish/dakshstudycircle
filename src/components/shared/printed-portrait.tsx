import Image from "next/image"
import { cn } from "cn"

import type { Image as ImageData } from "@/lib/content"

// A 4:5 portrait in a printed-photo mat: card paper with a hairline edge, the
// same as the hero photo. Without a photo the mat holds an empty tone.
function PrintedPortrait({
  photo,
  sizes,
  priority = false,
  decorative = false,
  className,
}: {
  photo?: ImageData
  sizes: string
  // Preload the image (above-the-fold portraits only).
  priority?: boolean
  // alt="" when the person's name sits right beside the photo.
  decorative?: boolean
  className?: string
}) {
  return (
    <div
      data-slot="printed-portrait"
      className={cn("rounded-xl border bg-card p-1.5", className)}
    >
      <div className="relative aspect-4/5 overflow-clip rounded-lg bg-muted">
        {photo && (
          <Image
            src={photo.src}
            alt={decorative ? "" : photo.alt}
            fill
            preload={priority}
            sizes={sizes}
            className="object-cover"
          />
        )}
      </div>
    </div>
  )
}

export { PrintedPortrait }
