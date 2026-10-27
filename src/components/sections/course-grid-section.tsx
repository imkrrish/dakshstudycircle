import type { CSSProperties } from "react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { ActionButton } from "@/components/shared/action-button"
import { buttonVariants } from "@/components/ui/button"
import { flameGlowClass, itemClass } from "./card-styles"
import { CoursePath } from "./course-path"
import { CourseRibbon } from "./course-ribbon"
import type { ResolvedCourseGridSection, SectionOf } from "@/lib/content-schema"

type Item = ResolvedCourseGridSection["groups"][number]["items"][number]

const titleClass = "font-heading text-subtitle md:text-title"

function CourseItem({ item }: { item: Extract<Item, { kind: "course" }> }) {
  return (
    <li
      className={cn(
        itemClass,
        flameGlowClass,
        "group/item flex min-h-16 items-center gap-3 px-4 py-3 md:min-h-0 md:items-start md:p-6",
        "hover:bg-muted active:bg-accent",
        "motion-safe:transition-[scale] motion-safe:duration-(--dur-base) motion-safe:ease-(--ease-settle) motion-safe:active:scale-[0.985] motion-safe:active:duration-(--dur-press)",
      )}
    >
      <div className="relative flex flex-1 flex-col gap-1">
        <h3 className={titleClass}>
          <Link
            href={item.href}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {item.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{item.note}</p>
      </div>
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        strokeWidth={2}
        aria-hidden="true"
        className="relative size-5 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-hover/item:translate-x-1 group-active/item:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/item:translate-x-0 motion-reduce:group-active/item:translate-x-0 md:mt-1.5"
      />
    </li>
  )
}

function StreamGroupItem({
  item,
}: {
  item: Extract<Item, { kind: "stream-group" }>
}) {
  return (
    <li className={cn(itemClass, "flex flex-col gap-4 px-4 py-4 md:p-6")}>
      <div className="flex flex-col gap-1">
        <h3 className={titleClass}>{item.title}</h3>
        {item.note && (
          <p className="text-sm text-muted-foreground">{item.note}</p>
        )}
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {item.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              data-slot="button"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 px-3.5 focus-ring active:bg-accent",
              )}
            >
              <span className="sr-only">{item.title} </span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

function CourseGridSection({ section }: { section: SectionOf<"course-grid"> }) {
  const { id, eyebrow, heading, intro, groups, actions } = section
  // Every group sits on the same lg column grid: the largest group, up to 4.
  const columns = Math.min(
    Math.max(...groups.map((group) => group.items.length)),
    4,
  )

  return (
    <Section
      data-slot="course-grid-section"
      // With the ribbon: below md it sits 44px under the proof line and 56px
      // above the eyebrow; from md the path (6rem tall) sits at the section top
      // and the eyebrow is 100px below its lowest glyph.
      className={cn(
        "relative",
        section.ribbon ? "pt-20 md:pt-48" : "pt-12 md:pt-16",
      )}
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      {section.ribbon && (
        <>
          <CourseRibbon titles={section.ribbon} />
          <CoursePath titles={section.ribbon} />
        </>
      )}
      <Container
        className="flex flex-col gap-10 md:gap-12"
        style={
          {
            "--course-cols": `repeat(${columns}, minmax(0, 1fr))`,
          } as CSSProperties
        }
      >
        <SectionHeading
          id={`${id}-heading`}
          eyebrow={eyebrow}
          title={heading}
          intro={intro}
        />
        <div className="flex flex-col gap-8 md:gap-10">
          {groups.map((group, index) => {
            const labelId = `${id}-group-${index}`
            return (
              <div key={group.label} className="flex flex-col gap-3 md:gap-4">
                <p id={labelId} className="text-eyebrow text-muted-foreground">
                  {group.label}
                </p>
                <ul
                  aria-labelledby={labelId}
                  className={cn(
                    "divide-y overflow-visible rounded-xl border bg-card md:grid md:grid-cols-2 md:gap-4 md:divide-y-0 md:rounded-none md:border-0 md:bg-transparent",
                    // Short groups get two wider columns so long titles keep to two lines.
                    group.items.length < 3
                      ? "lg:max-w-3xl lg:grid-cols-2"
                      : "lg:grid-cols-(--course-cols)",
                  )}
                >
                  {group.items.map((item) =>
                    item.kind === "course" ? (
                      <CourseItem key={item.href} item={item} />
                    ) : (
                      <StreamGroupItem key={item.title} item={item} />
                    ),
                  )}
                </ul>
              </div>
            )
          })}
        </div>
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

export { CourseGridSection }
