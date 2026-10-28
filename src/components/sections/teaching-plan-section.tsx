import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import type { SectionOf } from "@/lib/content-schema"

// How a course runs. The steps sit side by side from md (numbered with a CSS
// counter, so the numeral is not read out); below them a printed notice of
// label, dotted leader, value rows. Below sm a row stacks label over value,
// because a long value would squeeze the leader away.
function TeachingPlanSection({
  section,
}: {
  section: SectionOf<"teaching-plan">
}) {
  const { id, eyebrow, heading, intro, steps, details } = section

  return (
    <Section
      data-slot="teaching-plan-section"
      id={id}
      tone="band"
      aria-labelledby={`${id}-heading`}
    >
      <Container className="flex flex-col gap-8 md:gap-12">
        <SectionHeading
          id={`${id}-heading`}
          eyebrow={eyebrow}
          title={heading}
          intro={intro}
        />
        <ol className="grid gap-8 [counter-reset:step] md:grid-cols-3 md:gap-10">
          {steps.map((step) => (
            <li
              key={step.title}
              className="flex flex-col gap-2 [counter-increment:step] before:font-heading before:text-heading before:text-muted-foreground before:tabular-nums before:content-[counter(step)_/_'']"
            >
              <h3 className="font-heading text-title">{step.title}</h3>
              <p className="max-w-prose text-base text-foreground/80">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        <dl className="grid gap-x-16 rounded-xl border bg-card px-5 py-3 md:px-8 md:py-5 lg:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="flex flex-col py-2 sm:flex-row sm:items-baseline sm:gap-3"
            >
              <dt className="text-sm text-muted-foreground sm:flex sm:min-w-0 sm:flex-1 sm:items-baseline sm:gap-3 sm:text-base sm:after:leader sm:after:min-w-4 sm:after:flex-1">
                {detail.label}
              </dt>
              <dd className="text-base text-foreground sm:text-right">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}

export { TeachingPlanSection }
