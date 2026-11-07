import { cn } from "cn"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import type { ResolvedEntranceResultsSection, SectionOf } from "@/lib/content"

import { NAME, ResultMat } from "./board-result-card"
import { SettleIn } from "./settle-in"

type Group = ResolvedEntranceResultsSection["groups"][number]
type Item = Group["items"][number]

// The same card sizes as the board section's 4-up cards.
const CARD_SIZES = "(min-width: 1024px) 17rem, (min-width: 768px) 15rem, 50vw"

// "Sainik School, Kunjpura": the comma may break the line, but "Sainik School"
// and the place never split inside. A longer head ("Rashtriya Military
// School") has to be allowed to wrap between words.
function SchoolLine({ school }: { school: Item["school"] }) {
  const { head, place } = school
  if (!head) {
    return <span className="whitespace-nowrap">{place}</span>
  }
  const shortHead = head.split(" ").length <= 2
  return (
    <>
      <span className={cn(shortHead && "whitespace-nowrap")}>{head},</span>{" "}
      <span className="whitespace-nowrap">{place}</span>
    </>
  )
}

// The name and the quiet line under the picture ("Admitted · Class 6 · 2026"),
// pinned to the bottom so the lines align across a row of unequal chins. The
// line can only break before a dot, never inside "Class 6".
function Chin({ item, showSchool }: { item: Item; showSchool: boolean }) {
  return (
    <div className="flex flex-1 flex-col px-1.5 pt-3 pb-2">
      <p className={NAME}>{item.name}</p>
      {showSchool && (
        <p className="mt-0.5 text-sm text-pretty">
          <SchoolLine school={item.school} />
        </p>
      )}
      <p className="mt-auto pt-2 text-sm text-muted-foreground">
        <span className="whitespace-nowrap">{item.status}</span>{" "}
        <span className="whitespace-nowrap">· {item.entryClass}</span>{" "}
        <span className="whitespace-nowrap">· {item.year}</span>
      </p>
    </div>
  )
}

// A plain card (nothing opens): the board's printed mat with the student's
// name and school in the chin. Without a photo the plate letters the school's
// place where the picture would be, and the chin keeps the name and the quiet
// line, so the name sits in the same place on every card.
function EntranceResultCard({ item }: { item: Item }) {
  const { head, place } = item.school
  return (
    <div data-slot="entrance-result-card" className="flex h-full flex-col">
      <ResultMat
        photo={item.photo}
        sizes={CARD_SIZES}
        chin={<Chin item={item} showSchool />}
        plate={
          <>
            <div className="flex aspect-4/5 flex-col items-center justify-center gap-1 px-1 text-center">
              {head && (
                <p className="text-sm text-balance text-muted-foreground">
                  {head}
                </p>
              )}
              <p className="font-heading text-title whitespace-nowrap md:text-heading">
                {place}
              </p>
            </div>
            <Chin item={item} showSchool={false} />
          </>
        }
      />
    </div>
  )
}

// One exam: its label on the left from md (the first column of the board's
// grid), the cards in the other columns; on a phone the label sits above the
// cards. A group of one card keeps the label beside it on a phone too, so it
// reads as a plaque, not an orphan.
function EntranceGroup({ group }: { group: Group }) {
  const single = group.items.length === 1
  return (
    <div
      data-slot="entrance-group"
      className={cn(
        "md:grid md:grid-cols-3 md:gap-x-3 lg:grid-cols-4",
        single ? "grid grid-cols-2 gap-x-3" : "flex flex-col gap-5",
      )}
    >
      <div className="flex flex-col gap-0.5">
        <h3 className="font-heading text-title text-balance">{group.label}</h3>
        <p className="text-sm whitespace-nowrap text-muted-foreground">
          {group.exam}
        </p>
      </div>
      <SettleIn
        className={cn(
          "flex flex-wrap gap-x-3 gap-y-6 md:col-span-2 md:justify-start lg:col-span-3",
          !single && "justify-center",
        )}
      >
        {group.items.map((item) => (
          <li
            key={item.id}
            className={cn(
              single ? "w-full" : "w-[calc(50%-0.375rem)]",
              "md:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-1.5rem)/3)]",
            )}
          >
            <EntranceResultCard item={item} />
          </li>
        ))}
      </SettleIn>
    </div>
  )
}

// The section stays a Server Component; the only client island is the
// settle-in list. Nothing here is a button or a link.
function EntranceResultsSection({
  section,
}: {
  section: SectionOf<"entrance-results">
}) {
  const { id, heading, empty, tone, groups } = section

  return (
    <Section
      data-slot="entrance-results-section"
      id={id}
      tone={tone}
      aria-labelledby={`${id}-heading`}
    >
      <Container className="flex flex-col gap-10 md:gap-12">
        <SectionHeading id={`${id}-heading`} title={heading} />
        {groups.length > 0 ? (
          <div className="flex flex-col gap-12 md:gap-14">
            {groups.map((group) => (
              <EntranceGroup key={group.exam} group={group} />
            ))}
          </div>
        ) : (
          <p className="text-intro text-muted-foreground">{empty}</p>
        )}
      </Container>
    </Section>
  )
}

export { EntranceResultsSection }
