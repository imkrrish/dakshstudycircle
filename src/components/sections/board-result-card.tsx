import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { cn } from "cn"

import type { BoardResultItem } from "@/lib/content/sections/board-results"

import { ResultSheetButton } from "./board-results-sheet"
import { HonourRow } from "./honour-row"

// The newest year's card: a printed mat (card paper, hairline edge, the
// picture at 4:5 inside) with the percentage and name lettered in the chin
// under the picture, and the stream in a quiet line for Class 12. A student
// with subject marks gets a text cue, "View marksheet" and an arrow, on a
// button stretched over the whole card; one without has neither cue nor button.
//
// Without a photo the inside of the mat is one paper plate that fills it, so
// it is always the same size as its neighbours: the percentage and name sit in
// a 4:5 area where the picture would be, and the cue sits at the bottom of the
// plate, where a photo card's cue sits. On a phone `rowOnPhone` turns the card
// into an honour row below md (the mat is hidden there).

// The name: Garamond at weight 500 (the lead token carries Nunito's 400). It
// steps up to the subtitle size only where the percentage above it is large
// enough (lg) and a 4-up card is wide enough to hold it.
const NAME =
  "font-heading text-lead font-medium whitespace-nowrap lg:text-subtitle"

function Photo({ item, sizes }: { item: BoardResultItem; sizes: string }) {
  const photo = item.photo
  if (!photo) return null
  return (
    <div className="relative aspect-4/5 overflow-clip rounded-lg bg-muted">
      <Image
        src={photo.src}
        alt=""
        fill
        sizes={sizes}
        className="object-cover object-top transition-transform duration-(--dur-base) ease-(--ease-settle) motion-safe:group-hover/card:scale-103"
        style={photo.position ? { objectPosition: photo.position } : undefined}
      />
    </div>
  )
}

function Cue({ item }: { item: BoardResultItem }) {
  if (!item.hasSheet) return null
  return (
    <ResultSheetButton
      sheetId={item.id}
      aria-label={`View marksheet, ${item.name}`}
      className="mt-auto inline-flex cursor-pointer items-center gap-1 self-start pt-2 text-left text-sm font-medium whitespace-nowrap text-foreground/80 transition-colors duration-(--dur-base) group-hover/card:text-foreground after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring motion-reduce:transition-none"
    >
      View marksheet
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        strokeWidth={2}
        aria-hidden
        className="size-4 transition-transform duration-(--dur-base) ease-(--ease-settle) motion-safe:group-hover/card:translate-x-1 motion-reduce:transition-none"
      />
    </ResultSheetButton>
  )
}

function BoardResultCard({
  item,
  sizes,
  rowOnPhone = false,
  className,
}: {
  item: BoardResultItem
  sizes: string
  rowOnPhone?: boolean
  className?: string
}) {
  return (
    <div
      data-slot="board-result-card"
      className={cn("flex h-full flex-col", className)}
    >
      <div
        className={cn(
          "group/card relative flex flex-1 flex-col rounded-xl border bg-card p-1.5",
          rowOnPhone && "max-md:hidden",
        )}
      >
        {item.photo ? (
          <>
            <Photo item={item} sizes={sizes} />
            <div className="flex flex-1 flex-col px-1.5 pt-3 pb-2">
              <p className="font-heading text-title whitespace-nowrap tabular-nums lg:text-heading">
                {item.score}
              </p>
              <p className={cn("mt-0.5", NAME)}>{item.name}</p>
              {item.stream && (
                <p className="text-sm whitespace-nowrap text-muted-foreground">
                  {item.stream}
                </p>
              )}
              <Cue item={item} />
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col rounded-lg bg-background">
            <div className="flex aspect-4/5 flex-col items-center justify-center gap-1 px-1 text-center">
              <p className="font-heading text-heading whitespace-nowrap tabular-nums">
                {item.score}
              </p>
              <p className={NAME}>{item.name}</p>
              {item.stream && (
                <p className="text-sm whitespace-nowrap text-muted-foreground">
                  {item.stream}
                </p>
              )}
            </div>
            {item.hasSheet && (
              <div className="flex flex-1 flex-col px-1.5 pb-2">
                <Cue item={item} />
              </div>
            )}
          </div>
        )}
      </div>
      {rowOnPhone && <HonourRow item={item} className="md:hidden" />}
    </div>
  )
}

export { BoardResultCard }
