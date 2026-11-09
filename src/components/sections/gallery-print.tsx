import Image from "next/image"

import type { GalleryPhoto, ResolvedGalleryPhoto } from "@/lib/content"

const FOCUS_CLASS: Record<NonNullable<GalleryPhoto["focus"]>, string> = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
}

// Row heights the list sets (--row-h, rem) at each breakpoint: base, sm, md, lg.
// Keep in step with `gallery-section.tsx`. A print grows past its row height
// when its row is stretched to fill the width: up to about 1.6x on larger
// screens and, on phones where a single wide print can fill a row, 2.2x.
const ROW_HEIGHTS = { base: 6.25, sm: 9, md: 10.5, lg: 12 }
const GROWTH = { base: 2.2, wide: 1.6 }

function printSizes(ratio: number) {
  const width = (rowHeight: number, growth: number) =>
    `${Math.round(ratio * rowHeight * growth)}rem`
  return [
    `(min-width: 1024px) ${width(ROW_HEIGHTS.lg, GROWTH.wide)}`,
    `(min-width: 768px) ${width(ROW_HEIGHTS.md, GROWTH.wide)}`,
    `(min-width: 640px) ${width(ROW_HEIGHTS.sm, GROWTH.wide)}`,
    `min(calc(100vw - 2rem), ${width(ROW_HEIGHTS.base, GROWTH.base)})`,
  ].join(", ")
}

// One print in a justified row: a printed-photo mat (the same card paper and
// hairline as the hero photo) around a plate whose ratio is set from the data,
// so nothing shifts while it loads. The item grows in proportion to its ratio
// from a basis of row height × ratio, which puts every print in a row at one
// height. It never grows past the photo's real pixel width plus the mat, so a
// small photo is never enlarged and the row closes up around it. The mat is a
// plain div inside a link to the original file: without JavaScript the link
// opens the photo itself; with it, GalleryLightbox catches the click (it finds
// the link by `data-gallery-index`) and opens the lightbox at that photo.
function GalleryPrint({
  photo,
  index,
}: {
  photo: ResolvedGalleryPhoto
  index: number
}) {
  const { ratio, width, height } = photo
  return (
    <li
      data-slot="gallery-print"
      style={{
        flexGrow: ratio,
        flexBasis: `calc(var(--row-h) * ${ratio} + var(--mat))`,
        maxWidth: `calc(${width}px + var(--mat))`,
      }}
    >
      <a
        href={photo.src}
        data-gallery-index={index}
        aria-label={`Open photo: ${photo.alt}`}
        className="focus-ring block rounded-lg sm:rounded-xl"
      >
        <div
          data-slot="gallery-print-mat"
          className="rounded-lg border bg-card p-1 sm:rounded-xl sm:p-1.5"
        >
          <div
            className="overflow-clip rounded-sm bg-muted sm:rounded-lg"
            style={{ aspectRatio: ratio }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={width}
              height={height}
              loading="lazy"
              sizes={printSizes(ratio)}
              className={`size-full object-cover ${photo.focus ? FOCUS_CLASS[photo.focus] : ""}`}
            />
          </div>
        </div>
      </a>
    </li>
  )
}

export { GalleryPrint }
