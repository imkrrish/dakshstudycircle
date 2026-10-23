import { cn } from "cn"
import Image from "next/image"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { ActionButton } from "@/components/shared/action-button"
import type {
  ResolvedResultsGridSection,
  SectionOf,
} from "@/lib/content-schema"
import { initials } from "@/lib/utils"
import { itemClass } from "./card-styles"

type Item = ResolvedResultsGridSection["items"][number]

// Below md: the course on its own line, the rest run on with " · ". From md
// every part gets its own line and the dots go, so no separator is stranded
// at a line end.
function Meta({ text }: { text: string }) {
  const parts = text.split(" · ")
  const last = parts.pop()
  return (
    <>
      <span className="block md:contents">
        {parts.map((part, i) => (
          <span key={part} className="md:block">
            {i > 0 && <span className="md:hidden"> · </span>}
            <span className="whitespace-nowrap">{part}</span>
          </span>
        ))}
      </span>
      <span className="block">{last}</span>
    </>
  )
}

// One markup for every width. Below md: a row in a raised panel (photo left).
// From md: a card whose four rows (photo, score or outcome, name, meta) are
// subgrid rows of the list, so a percentage card and an admission card line
// up whatever wraps. DOM order is name, score, meta; the score is shown first.
function ResultItem({ item }: { item: Item }) {
  return (
    <li
      className={cn(
        itemClass,
        "flex min-w-0 items-start gap-4 px-4 py-3",
        "md:col-span-2 md:row-span-4 md:grid md:grid-cols-[minmax(0,1fr)] md:grid-rows-subgrid md:gap-y-0 md:p-3 lg:col-span-1",
        // A short last row is centred: two left over start at column 2,
        // one left over at column 3. Five across at lg needs neither.
        "max-lg:last:nth-[3n+1]:col-start-3 max-lg:nth-last-2:nth-[3n+1]:col-start-2",
      )}
    >
      <div className="relative aspect-4/5 w-18 shrink-0 overflow-clip rounded-xl bg-muted md:row-start-1 md:w-full">
        {item.photo ? (
          <Image
            src={item.photo.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 13rem, (min-width: 768px) 30vw, 4.5rem"
            className="object-cover object-top"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center font-heading text-title text-muted-foreground"
          >
            {initials(item.name)}
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-col md:contents">
        <h3 className="order-2 text-base font-medium md:row-start-3 md:px-1 md:pt-1 md:text-lead">
          {item.name}
        </h3>
        <p className="order-1 font-heading text-title leading-tight break-words tabular-nums md:row-start-2 md:px-1 md:pt-4 md:text-heading">
          {item.headline}
        </p>
        <p className="order-3 text-sm text-muted-foreground md:row-start-4 md:px-1 md:pt-1 md:pb-1">
          <Meta text={item.meta} />
        </p>
        {item.subjects && (
          <p className="order-4 text-sm text-muted-foreground md:px-1">
            {item.subjects}
          </p>
        )}
      </div>
    </li>
  )
}

function ResultsGridSection({
  section,
}: {
  section: SectionOf<"results-grid">
}) {
  const { id, eyebrow, heading, intro, tone, items, actions } = section

  return (
    <Section
      data-slot="results-grid-section"
      id={id}
      tone={tone}
      aria-labelledby={`${id}-heading`}
    >
      <Container className="flex flex-col gap-10 md:gap-12">
        <SectionHeading
          id={`${id}-heading`}
          eyebrow={eyebrow}
          title={heading}
          intro={intro}
        />
        <ul className="divide-y rounded-xl border bg-card md:grid md:grid-cols-[repeat(6,minmax(0,1fr))] md:gap-4 md:divide-y-0 md:rounded-none md:border-0 md:bg-transparent lg:grid-cols-[repeat(5,minmax(0,1fr))]">
          {items.map((item) => (
            <ResultItem key={item.id} item={item} />
          ))}
        </ul>
        {actions && actions.length > 0 && (
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            {actions.map((button) => (
              <ActionButton
                key={button.label}
                button={button}
                size="lg"
                className="h-11 w-full sm:h-10 sm:w-auto"
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}

export { ResultsGridSection }
