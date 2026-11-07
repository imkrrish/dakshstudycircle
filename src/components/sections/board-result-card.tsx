import type { ReactNode } from "react"
import Image from "next/image"
import { cn } from "cn"

import type { BoardResultItem } from "@/lib/content/sections/board-results"

import { ResultSheetButton } from "./board-results-sheet"
import { HonourRow } from "./honour-row"

// The newest year's card: a printed mat (card paper, hairline edge, the
// picture at 4:5 inside) with the percentage and name lettered in the chin
// under the picture, and the stream in a quiet line for Class 12. A student
// with subject marks gets a text cue, "View marksheet", on a
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

type MatPhoto = NonNullable<BoardResultItem["photo"]>

function Photo({ photo, sizes }: { photo: MatPhoto; sizes: string }) {
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

// The printed mat shared by the board and entrance cards: with a photo, the 4:5
// picture and then the `chin`; without one, a paper plate that fills the mat
// and holds `plate`. Either way the card is the same size as its neighbours.
function ResultMat({
  photo,
  sizes,
  chin,
  plate,
  className,
}: {
  photo?: MatPhoto
  sizes: string
  chin: ReactNode
  plate: ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="result-mat"
      className={cn(
        "group/card relative flex flex-1 flex-col rounded-xl border bg-card p-1.5",
        className,
      )}
    >
      {photo ? (
        <>
          <Photo photo={photo} sizes={sizes} />
          {chin}
        </>
      ) : (
        <div className="flex flex-1 flex-col rounded-lg bg-background">
          {plate}
        </div>
      )}
    </div>
  )
}

function Cue({ item }: { item: BoardResultItem }) {
  if (!item.hasSheet) return null
  return (
    <ResultSheetButton
      sheetId={item.id}
      aria-label={`View marksheet, ${item.name}`}
      className="mt-auto inline-flex cursor-pointer items-center self-start pt-2 text-left text-sm font-medium whitespace-nowrap text-foreground/80 transition-colors duration-(--dur-base) group-hover/card:text-foreground after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring motion-reduce:transition-none"
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
      <ResultMat
        photo={item.photo}
        sizes={sizes}
        className={rowOnPhone ? "max-md:hidden" : undefined}
        chin={
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
        }
        plate={
          <>
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
          </>
        }
      />
      {rowOnPhone && <HonourRow item={item} className="md:hidden" />}
    </div>
  )
}

export { BoardResultCard, NAME, ResultMat }
