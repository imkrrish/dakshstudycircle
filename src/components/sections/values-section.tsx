import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { cn } from "cn"
import type { SectionOf } from "@/lib/content"
import { SettleIn } from "./settle-in"

function ValuesSection({ section }: { section: SectionOf<"values"> }) {
  const { id, heading, tone, lines, pullLine } = section

  return (
    <Section
      data-slot="values-section"
      id={id}
      tone={tone}
      aria-labelledby={`${id}-heading`}
    >
      <Container>
        {/* Statements on the left, the saying large on the right from lg
            (stacked below, saying last). With no saying, one column. */}
        <div
          className={cn(
            "grid gap-y-12",
            pullLine && "lg:grid-cols-12 lg:items-center lg:gap-x-8",
          )}
        >
          <div className={cn(pullLine && "lg:col-span-6")}>
            <SectionHeading
              id={`${id}-heading`}
              title={heading}
              className="max-w-prose"
            />
            <SettleIn className="mt-6 flex max-w-prose flex-col gap-5 md:mt-8 md:gap-6">
              {lines.map((line) => (
                <li key={line} className="text-lead text-foreground/80">
                  {line}
                </li>
              ))}
            </SettleIn>
          </div>
          {pullLine && (
            <p className="font-heading text-page-title text-balance lg:col-span-5 lg:col-start-8">
              {pullLine}
            </p>
          )}
        </div>
      </Container>
    </Section>
  )
}

export { ValuesSection }
