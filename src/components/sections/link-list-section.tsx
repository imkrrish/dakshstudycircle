import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import type { SectionOf } from "@/lib/content-schema"

const isExternal = (href: string) => /^https?:\/\//.test(href)

// Official links as a ruled list: label, one line on what is there. Outside
// links open in a new tab and say so.
function LinkListSection({ section }: { section: SectionOf<"link-list"> }) {
  const { id, eyebrow, heading, intro, items } = section

  return (
    <Section
      data-slot="link-list-section"
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-x-12 lg:gap-x-16">
          <SectionHeading
            id={`${id}-heading`}
            eyebrow={eyebrow}
            title={heading}
            intro={intro}
            className="md:col-span-5"
          />
          <ul className="divide-y rounded-xl border bg-card px-4 md:col-span-7 md:px-6">
            {items.map((item) => {
              const external = isExternal(item.href)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group/link flex items-start justify-between gap-4 py-4 focus-ring focus-visible:-outline-offset-2"
                  >
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="font-heading text-subtitle group-hover/link:underline">
                        {item.label}
                        {external && (
                          <span className="sr-only"> (opens in a new tab)</span>
                        )}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {item.purpose}
                      </span>
                    </span>
                    {external && (
                      <HugeiconsIcon
                        icon={ArrowUpRight01Icon}
                        aria-hidden="true"
                        className="mt-1 size-5 shrink-0 text-muted-foreground"
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </Section>
  )
}

export { LinkListSection }
