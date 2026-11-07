import type { ComponentProps } from "react"
import { cn } from "cn"

import type { BoardResultItem } from "@/lib/content/sections/board-results"

import { ResultSheetButton } from "./board-results-sheet"

// Honour-board rows: name, quiet stream, dotted leader, percentage. The leader
// is the only line. The stream stays glued to the name's last word ("Sanya
// Kohli · Science") so rows line up. A student with subject marks gets a row that is
// one button (the whole row opens the result card); one without is plain.
function HonourRow({
  item,
  className,
  ...props
}: ComponentProps<"span"> & { item: BoardResultItem }) {
  // The name may wrap between its words (balanced) when it cannot fit, never
  // inside a word. The last word and the stream are one no-break group, so the
  // stream never starts a line. The row aligns on the last line's baseline, so
  // the leader and the percentage stay on the name's last line.
  const words = item.name.split(" ")
  const last = words.pop()
  const content = (
    <>
      <span className="min-w-0 font-heading text-subtitle text-balance">
        {words.length > 0 && `${words.join(" ")} `}
        <span className="whitespace-nowrap">
          {last}
          {item.stream && (
            <span className="ml-2 font-sans text-sm text-muted-foreground">
              · {item.stream}
            </span>
          )}
        </span>
      </span>
      <span aria-hidden className="leader min-w-4 flex-1" />
      <span className="font-heading text-title whitespace-nowrap tabular-nums">
        {item.score}
      </span>
    </>
  )

  if (item.hasSheet) {
    return (
      <ResultSheetButton
        sheetId={item.id}
        data-slot="honour-row"
        className={cn(
          "-mx-2 flex w-[calc(100%+1rem)] cursor-pointer items-baseline-last gap-x-3 rounded-md px-2 py-1.5 text-left focus-ring transition-colors duration-(--dur-base) hover:bg-secondary/60 active:bg-accent motion-reduce:transition-none",
          className,
        )}
      >
        {content}
        <span className="sr-only">View marksheet</span>
      </ResultSheetButton>
    )
  }

  return (
    <span
      data-slot="honour-row"
      className={cn("flex items-baseline-last gap-x-3 py-1.5", className)}
      {...props}
    >
      {content}
    </span>
  )
}

function HonourList({
  items,
  className,
}: {
  items: BoardResultItem[]
  className?: string
}) {
  return (
    <ol data-slot="honour-list" className={cn("flex flex-col", className)}>
      {items.map((item) => (
        <li key={item.id}>
          <HonourRow item={item} />
        </li>
      ))}
    </ol>
  )
}

export { HonourList, HonourRow }
