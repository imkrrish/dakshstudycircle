import Image from "next/image"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import type {
  ResolvedTestimonialGridSection,
  SectionOf,
} from "@/lib/content-schema"
import { initials } from "@/lib/utils"

type Item = ResolvedTestimonialGridSection["items"][number]

// A hairline-topped block, not a card: the quote verbatim in ink, then who
// said it. The avatar is decorative (the name sits beside it).
function TestimonialItem({ item }: { item: Item }) {
  return (
    <li>
      <figure className="flex h-full flex-col gap-6 border-t pt-6">
        <blockquote className="text-base text-foreground">
          <p>{item.text}</p>
        </blockquote>
        <figcaption className="mt-auto flex items-center gap-3">
          <span className="relative size-12 shrink-0 overflow-clip rounded-full bg-muted">
            {item.photo ? (
              <Image
                src={item.photo.src}
                alt=""
                fill
                sizes="3rem"
                className="object-cover object-top"
              />
            ) : (
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center text-sm font-medium text-muted-foreground"
              >
                {initials(item.name)}
              </span>
            )}
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="font-medium">{item.name}</span>
            <span className="text-sm text-muted-foreground">{item.byline}</span>
          </span>
        </figcaption>
      </figure>
    </li>
  )
}

function TestimonialGridSection({
  section,
}: {
  section: SectionOf<"testimonial-grid">
}) {
  const { id, eyebrow, heading, intro, tone, items } = section

  return (
    <Section
      data-slot="testimonial-grid-section"
      id={id}
      tone={tone}
      aria-labelledby={`${id}-heading`}
    >
      <Container className="flex flex-col gap-10 md:gap-12">
        <SectionHeading
          id={`${id}-heading`}
          eyebrow={eyebrow}
          title={heading}
          intro={intro}
        />
        <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
          {items.map((item) => (
            <TestimonialItem key={item.id} item={item} />
          ))}
        </ul>
      </Container>
    </Section>
  )
}

export { TestimonialGridSection }
