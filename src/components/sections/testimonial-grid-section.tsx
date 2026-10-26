import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { GoogleRatingBadge } from "@/components/shared/google-rating-badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { SectionOf } from "@/lib/content-schema"

import { TestimonialCard } from "./testimonial-card"

const tiltFor = (i: number) => (i % 2 === 0 ? "right" : "left")

// Arrows are 2.75rem targets in the header row, not overlaid on the cards.
const arrowClass = "static inset-auto my-0 size-11"

function TestimonialGridSection({
  section,
}: {
  section: SectionOf<"testimonial-grid">
}) {
  const { id, eyebrow, heading, intro, tone, layout, rating, items } = section
  const headingId = `${id}-heading`

  const headingBlock = (
    <SectionHeading
      id={headingId}
      eyebrow={eyebrow}
      title={heading}
      intro={intro}
    />
  )
  const badge = rating && (
    <GoogleRatingBadge
      href={rating.url}
      rating={rating.rating}
      count={rating.count}
    />
  )

  return (
    <Section
      data-slot="testimonial-grid-section"
      id={id}
      tone={tone}
      aria-labelledby={headingId}
    >
      <Container>
        {layout === "carousel" ? (
          <Carousel
            opts={{ align: "start" }}
            aria-label="Testimonials"
            className="flex flex-col gap-8 md:gap-10"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
              {headingBlock}
              <div className="flex shrink-0 items-center justify-between gap-4">
                {badge}
                <div className="ml-auto flex gap-2">
                  <CarouselPrevious
                    className={arrowClass}
                    focusableWhenDisabled
                  />
                  <CarouselNext className={arrowClass} focusableWhenDisabled />
                </div>
              </div>
            </div>
            {/* Clips 0.75rem outside the row so tilted card corners (and the
                hover straighten) are not cut. The padding is cancelled by the
                negative margin, and embla still measures the inner viewport, so
                snapping stays flush with the container edge. */}
            <div className="-m-3 overflow-hidden p-3 [&>[data-slot=carousel-content]]:overflow-visible">
              <CarouselContent className="py-2">
                {items.map((item, i) => (
                  <CarouselItem
                    key={item.id}
                    aria-label={`${i + 1} of ${items.length}`}
                    className="basis-[85%] md:basis-1/2 lg:basis-1/3"
                  >
                    <TestimonialCard item={item} tilt={tiltFor(i)} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
          </Carousel>
        ) : (
          <div className="flex flex-col gap-8 md:gap-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
              {headingBlock}
              {badge}
            </div>
            <ul className="grid gap-6 py-2 md:grid-cols-3">
              {items.map((item, i) => (
                <li key={item.id}>
                  <TestimonialCard item={item} tilt={tiltFor(i)} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </Section>
  )
}

export { TestimonialGridSection }
