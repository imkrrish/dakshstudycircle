import Image from "next/image"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { ActionButton } from "@/components/shared/action-button"
import { DetailsList } from "@/components/shared/details-list"
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type {
  ResolvedResultsBoardSection,
  SectionOf,
} from "@/lib/content-schema"

import { ResultsBoardIndicator, ResultsBoardTabs } from "./results-board-tabs"

type Item = ResolvedResultsBoardSection["years"][number]["items"][number]

// An honour-board row: native <details>, so the marks and photo stay in the
// HTML while closed and it works without JavaScript (DetailsList animates it).
// Line one is name, dotted leader, score; line two is the muted meta. The
// leaders are CSS pseudo-elements (`leader`), so no dot characters are in the
// text and nothing extra is read out. The summary's accessible name is its
// content: name, score, meta and the hidden "show ..." hint.
function ResultRow({ item }: { item: Item }) {
  return (
    <li>
      <details className="group">
        <summary className="flex min-h-11 w-full cursor-pointer list-none flex-col gap-0.5 py-3.5 focus-ring marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="flex flex-wrap items-baseline gap-x-1.5 sm:flex-nowrap sm:gap-x-3">
            <span className="flex min-w-0 flex-1 items-baseline gap-2 after:leader after:min-w-2 after:flex-1 sm:after:min-w-4">
              <h3 className="font-heading text-subtitle">{item.name}</h3>
            </span>
            {item.outcome ? (
              <span className="order-last basis-full font-heading text-sm tracking-tight [font-variant-caps:small-caps] sm:order-none sm:basis-auto sm:text-lead sm:tracking-normal sm:whitespace-nowrap">
                {item.outcome.status} · {item.outcome.school}
              </span>
            ) : (
              <span className="min-w-18 text-right font-heading text-title whitespace-nowrap tabular-nums">
                {item.score}
              </span>
            )}
            <span
              aria-hidden="true"
              className="relative size-4 shrink-0 self-center text-foreground before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-px after:origin-center after:bg-current after:transition-transform after:duration-250 after:ease-out group-[[open]:not([data-closing])]:after:scale-y-0 motion-reduce:after:transition-none"
            />
          </span>
          <span className="text-sm text-muted-foreground">{item.meta}</span>
          <span className="sr-only group-open:hidden">
            {item.subjects ? "Show subject marks" : "Show details"}
          </span>
          <span className="sr-only hidden group-open:inline">
            {item.subjects ? "Hide subject marks" : "Hide details"}
          </span>
        </summary>
        <div data-details-body className="overflow-hidden">
          <div className="flex flex-wrap items-start gap-x-8 gap-y-5 pt-1 pb-5">
            <div className="flex min-w-0 flex-1 basis-56 flex-col gap-4">
              {item.subjects && (
                <dl className="max-w-xs">
                  {item.subjects.map((subject) => (
                    <div
                      key={subject.name}
                      className="flex items-baseline gap-2 py-1"
                    >
                      <dt className="flex min-w-0 flex-1 items-baseline gap-2 text-base after:leader after:min-w-4 after:flex-1">
                        {subject.name}
                      </dt>
                      <dd className="font-heading text-lead tabular-nums">
                        {subject.marks}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              <p className="text-sm text-muted-foreground">
                Course at Daksh ·{" "}
                <span className="text-foreground">{item.course}</span>
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
  const { id, eyebrow, heading, intro, boardTitle, tone, years, actions } =
    section

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
          align="center"
        />
        {/* The board: a thin double rule from sm (outer + inner), the inner
            rule alone below it, so the frame stays light on a phone. */}
        <div className="mx-auto w-full max-w-3xl bg-card sm:border sm:border-foreground/20 sm:p-1.5">
          <div className="border border-foreground/20 px-3 py-8 sm:px-8 sm:py-10 md:px-14 md:py-12">
            <ResultsBoardTabs
              defaultValue={String(years[0].year)}
              className="w-full gap-0"
            >
              <p className="text-center font-heading text-subtitle tracking-[0.08em] text-muted-foreground [font-variant-caps:all-small-caps]">
                {boardTitle}
              </p>
              <TabsList
                variant="line"
                activateOnFocus
                aria-label="Results by year"
                className="relative mt-1 h-auto! w-full justify-center gap-0 p-0 has-[[data-slot=results-board-indicator]:not([hidden])]:**:data-[slot=tabs-trigger]:after:hidden"
              >
                {years.map(({ year }) => (
                  <TabsTrigger
                    key={year}
                    value={String(year)}
                    className="h-11! flex-none! rounded-none! px-4! font-heading! text-muted-foreground! tabular-nums not-first:before:absolute not-first:before:top-1/2 not-first:before:left-0 not-first:before:size-1 not-first:before:-translate-x-1/2 not-first:before:-translate-y-1/2 not-first:before:rounded-full not-first:before:bg-muted-foreground/60 group-data-horizontal/tabs:after:inset-x-4! group-data-horizontal/tabs:after:bottom-2! group-data-horizontal/tabs:after:h-px! focus-visible:ring-0! focus-visible:outline-2! focus-visible:outline-offset-2! data-active:text-foreground!"
                  >
                    {/* The size sits on a span: `cn` treats text-subtitle! and
                        the colour class as one conflict and drops one. */}
                    <span className="text-subtitle">{year}</span>
                  </TabsTrigger>
                ))}
                {/* After the triggers, so the first year is :first-child and
                    gets no separator dot before it. */}
                <ResultsBoardIndicator />
              </TabsList>
              {years.map(({ year, items }) => (
                <TabsContent
                  key={year}
                  value={String(year)}
                  data-year={year}
                  className="focus-ring"
                  keepMounted
                >
                  {/* The year, set large between two rules. Decorative: the
                      tab already names the panel. */}
                  <div
                    aria-hidden="true"
                    className="mt-4 mb-6 flex items-center gap-4 md:gap-6"
                  >
                    <span className="h-px flex-1 bg-foreground/20" />
                    <span
                      data-board-year
                      className="font-heading text-display tabular-nums"
                    >
                      {year}
                    </span>
                    <span className="h-px flex-1 bg-foreground/20" />
                  </div>
                  <DetailsList>
                    <ul className="divide-y border-y">
                      {items.map((item) => (
                        <ResultRow key={item.id} item={item} />
                      ))}
                    </ul>
                  </DetailsList>
                </TabsContent>
              ))}
            </ResultsBoardTabs>
          </div>
        </div>
        {actions && actions.length > 0 && (
          <div className="flex justify-center">
            {actions.map((button) => (
              <ActionButton
                key={button.label}
                button={button}
                size="lg"
                className="h-11 sm:h-10"
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}

export { ResultsBoardSection }
