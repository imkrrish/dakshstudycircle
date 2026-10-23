import { ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import type { SectionOf } from "@/lib/content-schema"
import { FaqList } from "./faq-list"

// Native <details>: every answer stays in the HTML while closed and it works
// without JavaScript; FaqList only adds the open/close animation. Questions are Mukta 500 (not Young Serif) so nine in a row read as a
// list to scan and do not compete with the section's h2.
function FaqSection({ section }: { section: SectionOf<"faq"> }) {
  const { id, eyebrow, heading, intro, tone, items } = section

  return (
    <Section
      data-slot="faq-section"
      id={id}
      tone={tone}
      aria-labelledby={`${id}-heading`}
    >
      <Container>
        {/* Mobile: heading then list. md+: heading in the left 5 columns
            (sticky), list in the right 7. */}
        <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-x-12 lg:gap-x-16">
          <SectionHeading
            id={`${id}-heading`}
            eyebrow={eyebrow}
            title={heading}
            intro={intro}
            className="md:sticky md:top-[calc(var(--navbar-height)+2rem)] md:col-span-5"
          />
          <FaqList className="divide-y border-y md:col-span-7">
            {items.map((item) => (
              <details key={item.question} className="group">
                <summary className="flex min-h-11 w-full cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-4 focus-ring marker:content-none [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-medium md:text-[1.1875rem]">
                    {item.question}
                  </h3>
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="size-5 shrink-0 text-muted-foreground transition-transform duration-250 ease-out group-[[open]:not([data-closing])]:rotate-180 motion-reduce:transition-none"
                  />
                </summary>
                <div data-faq-answer className="overflow-hidden">
                  <p className="max-w-prose pb-5 text-base text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </FaqList>
        </div>
      </Container>
    </Section>
  )
}

export { FaqSection }
