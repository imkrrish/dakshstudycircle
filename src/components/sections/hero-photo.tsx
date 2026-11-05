import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import Image from "next/image"

import type { Image as ImageData } from "@/lib/content"

// A printed photo: a thin paper mat with a hairline edge around the picture.
// The frame has a fixed ratio (2:1 strip, 5:2 from md, 3:2 from lg), so nothing shifts as it
// loads. It is the page's LCP element, so it is preloaded. Nothing is laid over
// it and it gets no filter. Faces sit between 35% and 75% of the photo's
// height, so the crop is anchored below the middle.
// `split` is the photo-split hero (no facts tile): half the width from lg, shown
// at the photo's own 4:3 so nothing is cropped away.
const heroPhotoVariants = cva("relative overflow-hidden rounded-lg bg-muted", {
  variants: {
    layout: {
      strip: "aspect-2/1 md:aspect-5/2 lg:aspect-3/2",
      split: "aspect-4/3",
    },
  },
  defaultVariants: { layout: "strip" },
})

function HeroPhoto({
  image,
  layout,
  className,
  ...props
}: ComponentProps<"figure"> &
  VariantProps<typeof heroPhotoVariants> & { image: ImageData }) {
  return (
    <figure
      data-slot="hero-photo"
      className={cn("m-0 rounded-xl border bg-card p-1.5", className)}
      {...props}
    >
      <div className={heroPhotoVariants({ layout })}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          preload
          sizes={
            layout === "split"
              ? "(min-width: 1152px) 34rem, (min-width: 1024px) 45vw, (min-width: 768px) calc(100vw - 3rem), calc(100vw - 2rem)"
              : "(min-width: 1280px) 22rem, (min-width: 1024px) 25rem, (min-width: 768px) calc(100vw - 3rem), calc(100vw - 2rem)"
          }
          className="object-cover object-[50%_55%]"
        />
      </div>
    </figure>
  )
}

export { HeroPhoto }
