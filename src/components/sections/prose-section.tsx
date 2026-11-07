import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import type { SectionOf } from "@/lib/content"

function ProseSection({ section }: { section: SectionOf<"prose"> }) {
  const { id, heading, tone, paragraphs } = section

  return (
    <Section
      data-slot="prose-section"
      id={id}
      tone={tone}
      aria-labelledby={`${id}-heading`}
    >
      <Container>
        {/* One reading column at the container's left edge; static. */}
        <SectionHeading
          id={`${id}-heading`}
          title={heading}
          className="max-w-prose"
        />
        <div className="mt-6 flex max-w-prose flex-col gap-5 md:mt-8 md:gap-6">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lead text-foreground/80">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export { ProseSection }
