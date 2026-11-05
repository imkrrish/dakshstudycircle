import { z } from "zod"
import { ImageSchema, sectionBase } from "../shared"

export const ReasonListSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("reason-list"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  // "band": a deeper warm surface, full-bleed (same as split).
  items: z
    .array(
      z.strictObject({ title: z.string().min(1), body: z.string().min(1) }),
    )
    .min(3)
    .max(8),
  // Photo beside the list; the caption is shown under it (alt must differ).
  figure: z
    .strictObject({ image: ImageSchema, caption: z.string().min(1) })
    .optional(),
})

