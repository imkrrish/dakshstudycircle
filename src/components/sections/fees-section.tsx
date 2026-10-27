import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import type { SectionOf } from "@/lib/content-schema"

// Fee rows as a printed notice: label, dotted leader, amount, basis beneath.
function FeesSection({ section }: { section: SectionOf<"fees"> }) {
  const { id, eyebrow, heading, intro, rows, note } = section

  return (
    <Section data-slot="fees-section" id={id} aria-labelledby={`${id}-heading`}>
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-x-12 lg:gap-x-16">
          <SectionHeading
            id={`${id}-heading`}
            eyebrow={eyebrow}
            title={heading}
            intro={intro}
            className="md:col-span-5"
          />
          <div className="flex flex-col gap-4 md:col-span-7">
            <dl className="divide-y rounded-xl border bg-card px-4 md:px-6">
              {rows.map((row) => (
                <div key={row.label} className="py-4">
                  {/* The leader is the amount's own ::before, bottom-aligned, so a
                      label that wraps onto several lines still keeps its dots
                      (the amount never shrinks; the label gives way). */}
                  <div className="flex items-end gap-3">
                    <dt className="min-w-0 font-heading text-subtitle">
                      {row.label}
                    </dt>
                    <dd className="flex shrink-0 grow items-end gap-3 font-heading text-title whitespace-nowrap tabular-nums before:leader before:min-w-8 before:flex-1">
                      {row.amount}
                    </dd>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {row.basis}
                  </p>
                </div>
              ))}
            </dl>
            {note && <p className="text-sm text-muted-foreground">{note}</p>}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { FeesSection }
