import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import type { SectionOf } from "@/lib/content-schema"

function SplitSection({ section }: { section: SectionOf<"split"> }) {
  return (
    <Section
      data-slot="split-section"
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
    >
      <Container>
        <div className="flex flex-col gap-4 rounded-lg border border-dashed p-6">
          <p className="text-sm text-muted-foreground">split · #{section.id}</p>
          <SectionHeading
            id={`${section.id}-heading`}
            eyebrow={section.eyebrow}
            title={section.heading}
          />
        </div>
      </Container>
    </Section>
  )
}

export { SplitSection }
