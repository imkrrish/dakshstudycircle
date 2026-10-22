import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

import type { SectionOf } from "@/lib/content-schema"

function HeroSection({ section }: { section: SectionOf<"hero"> }) {
  return (
    <Section
      data-slot="hero-section"
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
    >
      <Container>
        <div className="flex flex-col gap-4 rounded-lg border border-dashed p-6">
          <p className="text-sm text-muted-foreground">hero · #{section.id}</p>
          <h1
            id={`${section.id}-heading`}
            className="font-heading text-4xl font-normal md:text-6xl"
          >
            {section.heading}
          </h1>
        </div>
      </Container>
    </Section>
  )
}

export { HeroSection }
