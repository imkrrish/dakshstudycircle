import { cn } from "cn"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ResolvedBoardResultsSection, SectionOf } from "@/lib/content"

import { BoardResultCard } from "./board-result-card"
import { BoardResultsSheet } from "./board-results-sheet"
import { HonourList } from "./honour-row"
import { SettleIn } from "./settle-in"

type YearData = ResolvedBoardResultsSection["earlier"][number]
type Item = YearData["class10"][number]

// On a phone only the first four cards of a class stay cards; the rest of the
// class turns into honour rows, so the newest year is never a wall of cards.
// From md every record is a card.
const CARDS_ON_PHONE = 4
const CARD_SIZES = "(min-width: 1024px) 17rem, (min-width: 768px) 15rem, 50vw"

// No-break spaces, so "Class 12" never splits across lines.
const CLASS_10 = "Class 10"
const CLASS_12 = "Class 12"

// The newest year for one class: every record as a card.
function ClassCards({ label, items }: { label: string; items: Item[] }) {
  if (items.length === 0) return null
  return (
    <div className="flex flex-col gap-5">
      <h4 className="font-heading text-title">{label}</h4>
      {/* No row gap on a phone: the cards carry their own bottom margin, so the
        rows after them keep the honour-board rhythm of the earlier years. */}
      <SettleIn className="flex flex-wrap justify-center gap-x-3 md:justify-start md:gap-y-6">
        {items.map((item, i) => (
          <li
            key={item.id}
            className={cn(
              i < CARDS_ON_PHONE
                ? "w-[calc(50%-0.375rem)] max-md:mb-6"
                : "w-full",
              "md:w-[calc((100%-1.5rem)/3)] lg:w-[calc((100%-2.25rem)/4)]",
            )}
          >
            <BoardResultCard
              item={item}
              sizes={CARD_SIZES}
              rowOnPhone={i >= CARDS_ON_PHONE}
            />
          </li>
        ))}
      </SettleIn>
    </div>
  )
}

// One class of an earlier year: every student, stream on the name's line.
function ClassRows({ label, items }: { label: string; items: Item[] }) {
  if (items.length === 0) return null
  return (
    <div className="flex flex-col gap-1.5">
      <h4 className="text-eyebrow text-muted-foreground">{label}</h4>
      <HonourList items={items} />
    </div>
  )
}

// Earlier years: year tabs, newest first. Every panel is kept mounted (hidden
// when inactive), so all years are in the HTML. Each panel is a two-column
// honour board, Class 10 | Class 12, stacked on a phone. The tab strip is the
// home board's year index: Garamond, ink when active, muted otherwise, a 1px
// underline under the active year, left-aligned and allowed to wrap.
function EarlierYears({ years }: { years: YearData[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-heading text-title">Earlier years</h3>
      <Tabs defaultValue={String(years[0].year)} className="w-full gap-0">
        <TabsList
          variant="line"
          activateOnFocus
          aria-label="Earlier board results by year"
          className="-ml-3 h-auto! w-full flex-wrap justify-start gap-x-1 p-0"
        >
          {years.map(({ year }) => (
            <TabsTrigger
              key={year}
              value={String(year)}
              className="h-11! flex-none! rounded-none! px-3! font-heading! text-muted-foreground! tabular-nums group-data-horizontal/tabs:after:inset-x-3! group-data-horizontal/tabs:after:bottom-2! group-data-horizontal/tabs:after:h-px! focus-visible:ring-0! focus-visible:outline-2! focus-visible:outline-offset-2! data-active:text-foreground!"
            >
              {/* The size sits on a span: `cn` treats text-subtitle! and the
                colour class as one conflict and drops one. */}
              <span className="text-subtitle">{year}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {years.map(({ year, class10, class12 }) => (
          <TabsContent
            key={year}
            value={String(year)}
            keepMounted
            className="grid gap-10 pt-6 focus-ring md:grid-cols-2 md:gap-x-12"
          >
            <ClassRows label={CLASS_10} items={class10} />
            <ClassRows label={CLASS_12} items={class12} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

// The section stays a Server Component. Cards, rows and tab panels are all
// server-rendered; the client islands are the tabs, the settle-in list, the
// buttons and the one shared result card (BoardResultsSheet), which is filled
// from `sheets` only when opened.
function BoardResultsSection({
  section,
}: {
  section: SectionOf<"board-results">
}) {
  const { id, heading, empty, tone, latest, earlier, sheets, issuer } = section

  return (
    <Section
      data-slot="board-results-section"
      id={id}
      tone={tone}
      aria-labelledby={`${id}-heading`}
    >
      <Container className="flex flex-col gap-10 md:gap-12">
        <SectionHeading id={`${id}-heading`} title={heading} />
        {latest ? (
          <BoardResultsSheet sheets={sheets} issuer={issuer}>
            <div className="flex flex-col gap-12 md:gap-14">
              <div className="flex flex-col gap-8">
                <h3 className="font-heading text-display tabular-nums">
                  {latest.year}
                </h3>
                <div className="flex flex-col gap-10 md:gap-12">
                  <ClassCards label={CLASS_10} items={latest.class10} />
                  <ClassCards label={CLASS_12} items={latest.class12} />
                </div>
              </div>
              {earlier.length > 0 && <EarlierYears years={earlier} />}
            </div>
          </BoardResultsSheet>
        ) : (
          <p className="text-intro text-muted-foreground">{empty}</p>
        )}
      </Container>
    </Section>
  )
}

export { BoardResultsSection }
