import type { ComponentProps } from "react"
import { cn } from "cn"

import type { BoardResultItem } from "@/lib/content/sections/board-results"

import { ResultSheetButton } from "./board-results-sheet"

// Honour-board rows: name, quiet stream, dotted leader, percentage. The leader
// is the only line. The stream stays on the name's line ("Sanya Kohli ·
// Science") so rows line up. A student with subject marks gets a row that is
// one button (the whole row opens the result card); one without is plain.
function HonourRow({
  item,
  className,
  ...props
}: ComponentProps<"span"> & { item: BoardResultItem }) {
  const content = (
    <>
      <span className="flex min-w-0 flex-1 items-baseline gap-2 after:leader after:min-w-4 after:flex-1">
        <span className="font-heading text-subtitle whitespace-nowrap">
          {item.name}
        </span>
        {item.stream && (
          <span className="text-sm whitespace-nowrap text-muted-foreground">
            · {item.stream}
          </span>
        )}
      </span>
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
          "-mx-2 flex w-[calc(100%+1rem)] cursor-pointer items-baseline gap-x-3 rounded-md px-2 py-1.5 text-left focus-ring transition-colors duration-(--dur-base) hover:bg-secondary/60 active:bg-accent motion-reduce:transition-none",
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
      className={cn("flex items-baseline gap-x-3 py-1.5", className)}
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
