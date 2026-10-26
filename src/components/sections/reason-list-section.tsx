import Image from "next/image"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import type { SectionOf } from "@/lib/content-schema"

function ReasonListSection({ section }: { section: SectionOf<"reason-list"> }) {
  const { id, eyebrow, heading, intro, tone, items, figure } = section

  return (
    <Section
      data-slot="reason-list-section"
      id={id}
      tone={tone}
      aria-labelledby={`${id}-heading`}
    >
      <Container>
        {/* Mobile: heading, list, figure stacked. md+: heading and figure in
            the left 5 columns, list in the right 7, placed by grid areas. */}
        <div className="grid gap-10 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-12 md:[grid-template-areas:'head_head_head_head_head_list_list_list_list_list_list_list''fig_fig_fig_fig_fig_list_list_list_list_list_list_list'] lg:gap-x-16">
          <SectionHeading
            id={`${id}-heading`}
            eyebrow={eyebrow}
            title={heading}
            intro={intro}
            className="md:[grid-area:head]"
          />
          <ol className="divide-y [counter-reset:reason] md:[grid-area:list]">
            {items.map((item) => (
              <li
                key={item.title}
                className="grid grid-cols-[2.5rem_1fr] gap-y-1 py-5 [counter-increment:reason] before:font-heading before:text-subtitle before:text-muted-foreground before:tabular-nums before:content-[counter(reason)_/_''] first:pt-0 last:pb-0 md:py-6 md:before:text-title"
              >
                <h3 className="font-heading text-subtitle md:text-title">
                  {item.title}
                </h3>
                <p className="col-start-2 text-base text-muted-foreground">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
          {figure && (
            <figure className="flex flex-col gap-3 md:self-end md:[grid-area:fig]">
              <div className="h-56 overflow-clip rounded-xl md:aspect-3/2 md:h-auto">
                <Image
                  src={figure.image.src}
                  alt={figure.image.alt}
                  width={figure.image.width}
                  height={figure.image.height}
                  sizes="(min-width: 1152px) 36rem, (min-width: 768px) 42vw, calc(100vw - 2rem)"
                  className="size-full object-cover"
                />
              </div>
              <figcaption className="text-sm text-muted-foreground">
                {figure.caption}
              </figcaption>
            </figure>
          )}
        </div>
      </Container>
    </Section>
  )
}

export { ReasonListSection }
