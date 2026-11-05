import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import type { SectionOf } from "@/lib/content"

type Item = SectionOf<"subjects">["items"][number]

// Column spans on a 6-column grid from md, as literal class names so Tailwind
// finds them. Rows of three cards (span 2); any remainder becomes rows of two
// wider cards (span 3), first: 5 subjects are 3 + 3, then 2 + 2 + 2.
const SPAN = {
  2: "md:col-span-2",
  3: "md:col-span-3",
  6: "md:col-span-6",
} as const

function spanFor(index: number, count: number): keyof typeof SPAN {
  if (count === 1) return 6
  const wide = ((3 - (count % 3)) * 2) % 6
  return index < Math.min(wide, count) ? 3 : 2
}

// Below md the subjects share one paper sheet (no per-subject card, no rules,
// space between them); from md each is its own paper card in the grid, and the
// grid rows stretch so cards in a row are the same height. The summary line
// appears when the data has one.
function SubjectCard({ item, span }: { item: Item; span: keyof typeof SPAN }) {
  return (
    <li className={`md:rounded-xl md:border md:bg-card md:p-6 ${SPAN[span]}`}>
      <h3 className="font-heading text-title">{item.name}</h3>
      {item.summary && (
        <p className="mt-2 max-w-prose text-base text-foreground/80">
          {item.summary}
        </p>
      )}
    </li>
  )
}

function SubjectGrid({ items }: { items: Item[] }) {
  return (
    <ul className="flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm md:grid md:grid-cols-6 md:items-stretch md:gap-4 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none">
      {items.map((item, i) => (
        <SubjectCard
          key={item.name}
          item={item}
          span={spanFor(i, items.length)}
        />
      ))}
    </ul>
  )
}

function SubjectsSection({ section }: { section: SectionOf<"subjects"> }) {
  const { id, eyebrow, heading, intro, items, groups } = section

  return (
    <Section
      data-slot="subjects-section"
      tone={section.tone}
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <Container className="flex flex-col gap-8 md:gap-10">
        <SectionHeading
          id={`${id}-heading`}
          eyebrow={eyebrow}
          title={heading}
          intro={intro}
        />
        {groups ? (
          <div className="flex flex-col gap-8">
            {groups.map((group) => (
              <div key={group.label} className="flex flex-col gap-3">
                <div>
                  <p className="font-heading text-subtitle">{group.label}</p>
                  {group.note && (
                    <p className="text-base text-foreground/80">{group.note}</p>
                  )}
                </div>
                {group.items.length > 0 && <SubjectGrid items={group.items} />}
              </div>
            ))}
          </div>
        ) : (
          <SubjectGrid items={items} />
        )}
      </Container>
    </Section>
  )
}

export { SubjectsSection }
