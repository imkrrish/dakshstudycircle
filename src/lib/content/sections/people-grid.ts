import { z } from "zod"
import { sectionBase, type LoadedContent } from "../shared"
import { resolvePerson, type ResolvedPerson } from "../faculty-display"

const peopleGridBase = {
  ...sectionBase,
  type: z.literal("people-grid"),
  heading: z.string().min(1),
  intro: z.string().optional(),
}

// Which people to list, in the collection's `order`.
//   "all":            everyone
//   "all-but-leads":  everyone except those marked as the director
export const PeopleGridSectionSchema = z.strictObject({
  ...peopleGridBase,
  show: z.enum(["all", "all-but-leads"]),
})

export type PeopleGridSection = z.infer<typeof PeopleGridSectionSchema>
export type ResolvedPeopleGridSection = Omit<PeopleGridSection, "show"> & {
  items: ResolvedPerson[]
}

// ---------- Resolving ----------

// undefined when nobody is left (e.g. only sample records, in production), so
// the section, heading included, is dropped.
export function resolvePeopleGrid(
  section: PeopleGridSection,
  content: LoadedContent,
): ResolvedPeopleGridSection | undefined {
  const { show, ...rest } = section
  const items = content.faculty
    .filter((f) => show === "all" || !f.isDirector)
    .map(resolvePerson)
  return items.length > 0 ? { ...rest, items } : undefined
}
