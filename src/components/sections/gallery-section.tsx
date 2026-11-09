import Image from "next/image"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import type { GalleryPhoto, SectionOf } from "@/lib/content"

const FOCUS_CLASS: Record<NonNullable<GalleryPhoto["focus"]>, string> = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
}

// Plain layout for now: each group is an h2 and a wrapping list of photos.
function GallerySection({ section }: { section: SectionOf<"gallery"> }) {
  const { id, heading, intro, groups } = section
  return (
    <Section
      data-slot="gallery-section"
      tone={section.tone}
      id={id}
      aria-labelledby={heading ? `${id}-heading` : undefined}
    >
      <Container className="flex flex-col gap-10 md:gap-12">
        {heading && (
          <SectionHeading id={`${id}-heading`} title={heading} intro={intro} />
        )}
        {groups.map(({ group, heading: groupHeading, photos }) => (
          <div key={group} className="flex flex-col gap-6">
            <h2 className="font-heading text-heading">{groupHeading}</h2>
            <ul className="flex flex-wrap gap-4">
              {photos.map((photo) => (
                <li key={photo.id} className="w-full sm:w-[45%] lg:w-80">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, calc(100vw - 2rem)"
                    className={`h-auto w-full ${photo.focus ? FOCUS_CLASS[photo.focus] : ""}`}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </Section>
  )
}

export { GallerySection }
