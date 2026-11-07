import { z } from "zod"
import { sectionBase } from "../shared"

// A short set of equal points, set as a two-column spread of titles and one
// line each (no markers, rules or images). The points are parallel, not a
// sequence. An even count keeps the two-column grid free of an orphan.
export const PointGridSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("point-grid"),
  heading: z.string().min(1),
  items: z
    .array(
      z.strictObject({ title: z.string().min(1), body: z.string().min(1) }),
    )
    .min(2)
    .max(6)
    .refine((items) => items.length % 2 === 0, {
      message: "point-grid needs an even number of items (2, 4 or 6)",
    }),
})
