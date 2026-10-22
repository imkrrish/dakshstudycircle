import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import type { SectionOf } from "@/lib/content-schema"

function CardGridSection({ section }: { section: SectionOf<"card-grid"> }) {
  return (
    <Section
      data-slot="card-grid-section"
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
    >
      <Container>
        <div className="flex flex-col gap-4 rounded-lg border border-dashed p-6">
          <p className="text-sm text-muted-foreground">
            card-grid · #{section.id} · {section.items.length} items
          </p>
          <SectionHeading
            id={`${section.id}-heading`}
            eyebrow={section.eyebrow}
            title={section.heading}
            intro={section.intro}
          />
        </div>
      </Container>
    </Section>
  )
}

export { CardGridSection }
