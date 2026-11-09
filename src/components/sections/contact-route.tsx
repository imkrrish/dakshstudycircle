import { Fragment, type CSSProperties } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"

import { ContactRouteMotion } from "@/components/sections/contact-route-motion"
import type { ResolvedContactVisitSection } from "@/lib/content/sections/contact-visit"
import { iconRegistry } from "@/lib/icons"

// A line that may break only between its parts (after a comma), so a name, a
// day range, "Magenta Line", "about 2 km" or the pincode line never splits.
// `tail` keeps only the last part whole and lets the earlier ones wrap as
// ordinary words (route lines); `all` keeps every part whole (the address).
function Unbroken({
  text,
  keep = "all",
}: {
  text: string
  keep?: "all" | "tail"
}) {
  const parts = text.split(/(?<=,) /)
  return parts.map((part, index) => (
    <Fragment key={part}>
      {index > 0 ? " " : null}
      <span
        className={
          keep === "all" || index === parts.length - 1
            ? "whitespace-nowrap"
            : undefined
        }
      >
        {part}
      </span>
    </Fragment>
  ))
}

// The route to the centre, in the same language as the teaching plan (the
// board year): paper discs with one Hugeicon each, joined by one solid curve
// that rises station to station. The pattern is copied from
// teaching-plan-section.tsx rather than shared: that file is not touched and
// exports nothing reusable. The ol order carries the sequence (no numerals);
// discs and curves are aria-hidden.
//
// From lg the stations sit in a row, centred under their discs, each one
// `--rise` higher than the last, with the stretch label on the curve (the
// curve passes behind it, as behind a board-year caption). Below lg they are a
// vertical sequence: disc on the left, text beside it, the curve swaying in
// the disc column, the stretch label under the station it follows.

const CURVE =
  "pointer-events-none absolute fill-none stroke-foreground/30 stroke-[1.5] [&_path]:[vector-effect:non-scaling-stroke]"

function ContactRoute({
  stations,
}: {
  stations: ResolvedContactVisitSection["route"]["stations"]
}) {
  const last = stations.length - 1

  return (
    <ContactRouteMotion
      style={{ "--n": stations.length } as CSSProperties}
      className="grid gap-y-(--gap-y) [--disc:4.5rem] [--gap-x:4rem] [--gap-y:3rem] [--rise:0px] md:[--disc:6rem] lg:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:gap-x-(--gap-x) lg:gap-y-0 lg:[--disc:8.5rem] lg:[--rise:2rem]"
    >
      {stations.map((station, i) => (
        <li
          key={station.title}
          data-destination={i === last ? "" : undefined}
          style={
            {
              "--pad": `calc(${last - i} * var(--rise))`,
            } as CSSProperties
          }
          className="group relative grid grid-cols-[var(--disc)_minmax(0,1fr)] gap-x-4 md:gap-x-6 lg:flex lg:flex-col lg:items-center lg:gap-x-0 lg:pt-(--pad) lg:text-center"
        >
          {i < last && (
            <>
              {/* Below lg: disc centre to the next disc centre, swaying
                  inside the disc column. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                data-route-curve="column"
                className={cn(
                  CURVE,
                  "top-[calc(var(--disc)/2)] left-0 h-[calc(100%+var(--gap-y))] w-(--disc) origin-top lg:hidden",
                )}
              >
                <path d="M50 0 C95 30, 5 70, 50 100" />
              </svg>
              {/* From lg: disc centre to the next disc centre, a gentle S. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                data-route-curve="row"
                className={cn(
                  CURVE,
                  "top-[calc(var(--pad)-var(--rise)+var(--disc)/2)] left-1/2 hidden h-(--rise) w-[calc(100%+var(--gap-x))] origin-left overflow-visible lg:block",
                )}
              >
                <path d="M0 100 C50 100, 50 0, 100 0" />
              </svg>
            </>
          )}
          <div
            aria-hidden="true"
            data-route-disc=""
            className={cn(
              "relative z-10 flex size-(--disc) items-center justify-center rounded-full border bg-card text-muted-foreground shadow-sm",
              "group-data-destination:border-foreground/25 group-data-destination:bg-footer-mark group-data-destination:text-foreground",
            )}
          >
            <HugeiconsIcon
              icon={iconRegistry[station.icon]}
              strokeWidth={1.5}
              className="size-8 md:size-10 lg:size-14"
            />
          </div>
          <div className="min-w-0 self-center lg:mt-6 lg:self-auto">
            <h3 className="font-heading text-subtitle whitespace-nowrap lg:text-title">
              {station.title}
            </h3>
            <p className="mt-1 text-base text-foreground/80 lg:mx-auto lg:max-w-xs">
              <Unbroken text={station.line} keep="tail" />
            </p>
          </div>
          {station.toNext && (
            <p className="col-start-2 mt-4 max-w-56 text-sm text-muted-foreground lg:absolute lg:top-[calc(var(--pad)-var(--rise)/2+var(--disc)/2)] lg:left-[calc(100%+var(--gap-x)/2)] lg:z-10 lg:mt-0 lg:w-40 lg:-translate-1/2 lg:bg-(--caption-bg) lg:px-2 lg:py-1 lg:text-center">
              <Unbroken text={station.toNext} keep="tail" />
            </p>
          )}
        </li>
      ))}
    </ContactRouteMotion>
  )
}

export { ContactRoute, Unbroken }
