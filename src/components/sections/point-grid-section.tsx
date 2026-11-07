import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import type { SectionOf } from "@/lib/content"
import { SettleIn } from "./settle-in"

function PointGridSection({ section }: { section: SectionOf<"point-grid"> }) {
  const { id, heading, tone, items } = section

  return (
    <Section
      data-slot="point-grid-section"
      id={id}
      tone={tone}
      className="[--section-y:4rem] md:[--section-y-md:6rem]"
      aria-labelledby={`${id}-heading`}
    >
      <Container>
        <SectionHeading
          id={`${id}-heading`}
          title={heading}
          className="max-w-2xl"
        />
        {/* One column on phones; two equal columns from md. The points are
            parallel, so a list, not an ordered one. */}
        <SettleIn className="mt-12 grid gap-x-16 gap-y-10 md:mt-16 md:grid-cols-2 md:gap-y-12 lg:gap-x-24 lg:gap-y-14">
          {items.map((item) => (
            <li key={item.title} className="flex flex-col gap-2 md:gap-3">
              <h3 className="font-heading text-title">{item.title}</h3>
              <p className="max-w-md text-base text-foreground/80">
                {item.body}
              </p>
            </li>
          ))}
        </SettleIn>
      </Container>
    </Section>
  )
}

export { PointGridSection }
