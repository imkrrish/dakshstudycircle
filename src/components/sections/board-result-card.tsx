import Image from "next/image"
import { cn } from "cn"

import type { BoardResultItem } from "@/lib/content/sections/board-results"

import { ResultSheetButton } from "./board-results-sheet"
import { HonourRow } from "./honour-row"

// The newest year's card: a printed mat (card paper, hairline edge, the
// picture at 4:5 inside) with the percentage and name lettered in the chin
// under the picture, and the stream in a quiet line for Class 12. A student
// with subject marks gets a text cue, "View marksheet", on a button stretched
// over the whole card; one without has neither cue nor button.
//
// Without a photo the inside of the mat is one paper plate with the same
// footprint: the percentage large and the name on it. On a phone `rowOnPhone`
// turns the card into an honour row below md (the mat is hidden there).
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
      className="mt-auto cursor-pointer self-start pt-2 text-left text-sm whitespace-nowrap text-muted-foreground transition-colors duration-(--dur-base) group-hover/card:text-foreground after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring motion-reduce:transition-none"
    >
      View marksheet
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
              <p className="font-heading text-lead whitespace-nowrap">
                {item.name}
              </p>
              {item.stream && (
                <p className="text-sm whitespace-nowrap text-muted-foreground">
                  {item.stream}
                </p>
              )}
              <Cue item={item} />
            </div>
          </>
        ) : (
          <>
            <div className="relative flex-1 rounded-lg bg-background">
              <div className="aspect-4/5" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-1 text-center">
                <p className="font-heading text-heading whitespace-nowrap tabular-nums">
                  {item.score}
                </p>
                <p className="font-heading text-lead whitespace-nowrap">
                  {item.name}
                </p>
                {item.stream && (
                  <p className="text-sm whitespace-nowrap text-muted-foreground">
                    {item.stream}
                  </p>
                )}
              </div>
            </div>
            {item.hasSheet && (
              <div className="flex flex-col px-1.5 pt-1 pb-2">
                <Cue item={item} />
              </div>
            )}
          </>
        )}
      </div>
      {rowOnPhone && <HonourRow item={item} className="md:hidden" />}
    </div>
  )
}

export { BoardResultCard }
