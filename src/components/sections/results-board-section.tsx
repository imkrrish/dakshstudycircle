import {
  ArrowDown01Icon,
  CheckmarkBadge01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { ActionButton } from "@/components/shared/action-button"
import { DetailsList } from "@/components/shared/details-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type {
  ResolvedResultsBoardSection,
  SectionOf,
} from "@/lib/content-schema"
import { initials } from "@/lib/utils"

type Item = ResolvedResultsBoardSection["years"][number]["items"][number]

// An honour-board row: native <details>, so the marks and photo stay in the
// HTML while closed and it works without JavaScript (DetailsList animates it).
// The summary is a four-column grid (medallion, name block, score, chevron);
// the score column has a fixed minimum width and is right-aligned, so lining
// tabular figures line up down the board.
function ResultRow({ item }: { item: Item }) {
  return (
    <li>
      <details className="group">
        <summary className="grid min-h-11 w-full cursor-pointer list-none grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-x-3 rounded-sm py-4 focus-ring marker:content-none md:gap-x-4 [&::-webkit-details-marker]:hidden">
          <span
            aria-hidden="true"
            className="row-span-2 grid size-11 place-items-center rounded-full bg-secondary font-heading text-subtitle text-muted-foreground ring-1 ring-foreground/15 ring-inset md:size-12"
          >
            {initials(item.name)}
          </span>
          {/* Below md the name sits beside the score and the meta lines run
              under both, so a long line is not squeezed by the score column. */}
          <span className="contents md:col-start-2 md:row-span-2 md:flex md:min-w-0 md:flex-col">
            <h3 className="col-start-2 row-start-1 text-base font-semibold md:text-lead">
              {item.name}
            </h3>
            <span className="col-span-2 col-start-2 row-start-2 flex flex-col text-sm text-muted-foreground md:contents">
              <span>{item.meta}</span>
              <span>{item.course}</span>
            </span>
          </span>
          {item.outcome ? (
            <span className="col-start-3 row-start-1 flex min-w-18 flex-col items-end md:row-span-2 md:min-w-24">
              <span className="font-heading text-title">
                {item.outcome.title}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <HugeiconsIcon
                  icon={CheckmarkBadge01Icon}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="size-4 shrink-0"
                />
                Admission
              </span>
            </span>
          ) : (
            <span className="col-start-3 row-start-1 min-w-18 text-right font-heading text-title tabular-nums md:row-span-2 md:min-w-24">
              {item.score}
            </span>
          )}
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            strokeWidth={2}
            aria-hidden="true"
            className="col-start-4 row-start-1 size-5 shrink-0 text-muted-foreground transition-transform duration-250 ease-out group-[[open]:not([data-closing])]:rotate-180 motion-reduce:transition-none md:row-span-2"
          />
        </summary>
        <div data-details-body className="overflow-hidden">
          <div className="flex flex-wrap items-start gap-x-8 gap-y-5 pt-1 pb-5 pl-14 md:pl-16">
            <div className="flex min-w-0 flex-1 basis-56 flex-col gap-4">
              {item.subjects && (
                <div className="max-w-72">
                  <p className="text-sm text-muted-foreground">Subject marks</p>
                  <dl className="mt-1 divide-y border-b">
                    {item.subjects.map((subject) => (
                      <div
                        key={subject.name}
                        className="flex items-baseline justify-between gap-4 py-1.5 first:border-t"
                      >
                        <dt className="text-base">{subject.name}</dt>
                        <dd className="text-base font-semibold tabular-nums">
                          {subject.marks}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              <p className="text-base">
                <span className="text-sm text-muted-foreground">
                  Course at Daksh
                </span>
                <br />
                {item.course}
              </p>
            </div>
            {item.photo && (
              <div className="relative aspect-4/5 w-28 shrink-0 overflow-clip rounded-lg bg-muted">
                <Image
                  src={item.photo.src}
                  alt={item.photo.alt}
                  fill
                  sizes="7rem"
                  className="object-cover object-top"
                />
              </div>
            )}
          </div>
        </div>
      </details>
    </li>
  )
}

// The section stays a Server Component. Tabs is a client island, but every
// panel is kept mounted (hidden when inactive), so all years' rows and marks
// are in the server HTML.
function ResultsBoardSection({
  section,
}: {
  section: SectionOf<"results-board">
}) {
  const { id, eyebrow, heading, intro, tone, years, actions } = section

  return (
    <Section
      data-slot="results-board-section"
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
        <Tabs
          defaultValue={String(years[0].year)}
          className="w-full max-w-3xl gap-6"
        >
          <TabsList
            variant="line"
            activateOnFocus
            aria-label="Results by year"
            className="h-auto! w-full justify-start gap-2 border-b p-0"
          >
            {years.map(({ year }) => (
              <TabsTrigger
                key={year}
                value={String(year)}
                className="h-11! flex-none! rounded-none! px-4! font-heading! text-subtitle! text-muted-foreground! tabular-nums group-data-horizontal/tabs:after:bottom-0! focus-visible:ring-0! focus-visible:outline-2! focus-visible:outline-offset-2! data-active:text-foreground!"
              >
                {year}
              </TabsTrigger>
            ))}
          </TabsList>
          {years.map(({ year, items }) => (
            <TabsContent key={year} value={String(year)} keepMounted>
              <DetailsList>
                <ul className="divide-y border-y">
                  {items.map((item) => (
                    <ResultRow key={item.id} item={item} />
                  ))}
                </ul>
              </DetailsList>
              {actions && actions.length > 0 && (
                <div className="mt-6 flex">
                  {actions.map((button) => (
                    <ActionButton
                      key={button.label}
                      button={button}
                      size="lg"
                      className="-ml-3 h-11 sm:h-10"
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  )
}

export { ResultsBoardSection }
