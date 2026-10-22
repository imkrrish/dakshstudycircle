import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import type { SectionOf } from "@/lib/content-schema"

function CtaBandSection({ section }: { section: SectionOf<"cta-band"> }) {
  return (
    <Section
      data-slot="cta-band-section"
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
    >
      <Container>
        <div className="flex flex-col gap-4 rounded-lg border border-dashed p-6">
          <p className="text-sm text-muted-foreground">
            cta-band · #{section.id} · {section.variant}
          </p>
          <SectionHeading
            id={`${section.id}-heading`}
            title={section.heading}
            intro={section.body}
          />
        </div>
      </Container>
    </Section>
  )
}

export { CtaBandSection }
