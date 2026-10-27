import type { ComponentProps } from "react"
import { cn } from "cn"

// Stands in for a photo that has not been taken yet: the brief, set like a
// shot list entry. The brief is "subject · note · note"; the first part leads.
function ShotCard({
  brief,
  className,
  ...props
}: ComponentProps<"div"> & { brief: string }) {
  const [subject, ...notes] = brief.split(" · ")
  return (
    <div
      data-slot="shot-card"
      className={cn(
        "flex flex-col gap-3 rounded-xl border bg-secondary p-4 md:p-5",
        className,
      )}
      {...props}
    >
      <p className="text-eyebrow text-muted-foreground">Photo to come</p>
      <div>
        <p className="font-heading text-subtitle">{subject}</p>
        <ul className="mt-2 flex flex-col gap-0.5 text-sm text-muted-foreground">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { ShotCard }
