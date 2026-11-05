import type { CSSProperties } from "react"
import { cn } from "cn"
import { HugeiconsIcon } from "@hugeicons/react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import type { SectionOf } from "@/lib/content"
import { iconRegistry } from "@/lib/icons"

// How a course runs: a few large paper stations in a row (stacked on mobile),
// joined by one soft solid curve. Each disc holds an icon named in the data
// (aria-hidden; the <ol> order carries the sequence). The curve is an aria-hidden SVG per gap, laid out from the
// grid: it runs from one disc's centre to the next, behind the discs, and uses
// a non-scaling stroke so it never thickens when the box stretches.
//
// Below md the stations stack and the curve sways down between them; the
// captions sit on paper so the line passes behind them, not through the text.
// Above md each station sits a little higher than the one before and the
// curve rises in a gentle S between them, like the home course path.

const CURVE =
  "pointer-events-none absolute fill-none stroke-foreground/30 stroke-[1.5] [&_path]:[vector-effect:non-scaling-stroke]"

function TeachingPlanSection({
  section,
}: {
  section: SectionOf<"teaching-plan">
}) {
  const { id, eyebrow, heading, intro, steps, details } = section

  return (
    <Section
      data-slot="teaching-plan-section"
      className="[--caption-bg:var(--background)] data-[tone=band]:[--caption-bg:var(--secondary)] data-[tone=muted]:[--caption-bg:var(--muted)]"
      id={id}
      tone={section.tone}
      aria-labelledby={`${id}-heading`}
    >
      <Container className="flex flex-col gap-12 md:gap-16">
        <SectionHeading
          align="center"
          id={`${id}-heading`}
          eyebrow={eyebrow}
          title={heading}
          intro={intro}
        />
        <ol
          style={{ "--n": steps.length } as CSSProperties}
          className="grid gap-y-(--gap-y) [--disc:7.5rem] [--gap-x:2.5rem] [--gap-y:3.5rem] [--rise:0px] md:grid-cols-[repeat(var(--n),minmax(0,1fr))] md:gap-x-(--gap-x) md:[--disc:8.5rem] md:[--rise:1.5rem] lg:[--disc:10rem] lg:[--gap-x:4rem] lg:[--rise:2rem]"
        >
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-destination={step.destination ? "" : undefined}
              style={
                {
                  "--pad": `calc(${steps.length - 1 - i} * var(--rise))`,
                } as CSSProperties
              }
              className="group relative flex flex-col items-center text-center md:pt-(--pad)"
            >
              {i < steps.length - 1 && (
                <>
                  {/* Below md: disc centre to the next disc centre, swaying. */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className={cn(
                      CURVE,
                      "top-[calc(var(--disc)/2)] left-0 h-[calc(100%+var(--gap-y))] w-full md:hidden",
                    )}
                  >
                    <path
                      d={
                        i % 2 === 0
                          ? "M50 0 C108 25, 108 55, 50 100"
                          : "M50 0 C-8 25, -8 55, 50 100"
                      }
                    />
                  </svg>
                  {/* From md: disc centre to the next disc centre, a gentle S. */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className={cn(
                      CURVE,
                      "top-[calc(var(--pad)-var(--rise)+var(--disc)/2)] left-1/2 hidden h-(--rise) w-[calc(100%+var(--gap-x))] overflow-visible md:block",
                    )}
                  >
                    <path d="M0 100 C50 100, 50 0, 100 0" />
                  </svg>
                </>
              )}
              <div
                aria-hidden="true"
                className={cn(
                  "relative z-10 flex size-(--disc) items-center justify-center rounded-full border bg-card text-muted-foreground shadow-sm",
                  "group-data-destination:border-foreground/25 group-data-destination:bg-footer-mark group-data-destination:text-foreground",
                )}
              >
                <HugeiconsIcon
                  icon={iconRegistry[step.icon]}
                  strokeWidth={1.5}
                  className="size-12 md:size-14"
                />
              </div>
              <p className="relative z-10 mt-6 max-w-72 bg-(--caption-bg) px-2 py-1 text-lead text-muted-foreground md:max-w-xs">
                <span className="block">{step.lead}</span>
                <span className="block font-sans text-title font-semibold text-foreground">
                  {step.title}
                </span>
              </p>
            </li>
          ))}
        </ol>
        {details && (
          <dl className="grid gap-x-16 rounded-xl border bg-card px-5 py-3 md:px-8 md:py-5 lg:grid-cols-2">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="flex flex-col py-2 sm:flex-row sm:items-baseline sm:gap-3"
              >
                <dt className="text-sm text-muted-foreground sm:flex sm:min-w-0 sm:flex-1 sm:items-baseline sm:gap-3 sm:text-base sm:after:leader sm:after:min-w-4 sm:after:flex-1">
                  {detail.label}
                </dt>
                <dd className="text-base text-foreground sm:text-right">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </Section>
  )
}

export { TeachingPlanSection }
