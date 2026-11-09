import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { GalleryLightbox } from "@/components/sections/gallery-lightbox"
import { GalleryPrint } from "@/components/sections/gallery-print"
import type { SectionOf } from "@/lib/content"

// An album: each group is a page of prints in justified rows. Every print in a
// row shares one height and keeps its own shape (see GalleryPrint). The row
// height (--row-h) and the mat's total width (--mat: border plus padding on
// both sides) are the same for every group, so the groups read as one book.
// The last row of a group is not stretched: an empty item with a huge grow
// factor takes up the free space after its prints. Keep --row-h in step with
// ROW_HEIGHTS in gallery-print.tsx (it feeds the image `sizes`).
//
// Clicking a print opens GalleryLightbox, which steps through every photo in
// page order (the groups run on), so each print gets its running index.
function GallerySection({ section }: { section: SectionOf<"gallery"> }) {
  const { id, heading, intro, groups } = section
  const all = groups.flatMap(({ photos }) => photos)
  const indexOf = new Map(all.map((photo, index) => [photo.id, index]))
  return (
    <Section
      data-slot="gallery-section"
      tone={section.tone}
      id={id}
      aria-labelledby={heading ? `${id}-heading` : undefined}
    >
      <GalleryLightbox
        photos={all.map(({ id: photoId, src, width, height, alt }) => ({
          id: photoId,
          src,
          width,
          height,
          alt,
        }))}
      >
        <Container className="flex flex-col gap-16 md:gap-24">
          {heading && (
            <SectionHeading
              id={`${id}-heading`}
              title={heading}
              intro={intro}
            />
          )}
          {groups.map(({ group, heading: groupHeading, photos }) => (
            <div key={group} className="flex flex-col gap-6 md:gap-8">
              <h2 id={`${id}-${group}`} className="font-heading text-heading">
                {groupHeading}
              </h2>
              <ul
                aria-labelledby={`${id}-${group}`}
                className="flex flex-wrap gap-2 [--mat:0.625rem] [--row-h:6.25rem] after:grow-999999 after:basis-0 after:content-[''] sm:[--mat:0.875rem] sm:[--row-h:9rem] md:gap-3 md:[--row-h:10.5rem] lg:[--row-h:12rem]"
              >
                {photos.map((photo) => (
                  <GalleryPrint
                    key={photo.id}
                    photo={photo}
                    index={indexOf.get(photo.id) ?? 0}
                  />
                ))}
              </ul>
            </div>
          ))}
        </Container>
      </GalleryLightbox>
    </Section>
  )
}

export { GallerySection }
