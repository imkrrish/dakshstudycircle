import { z } from "zod"
import { ButtonSchema, ImageSchema, sectionBase } from "../shared"

export const SplitSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("split"),
  eyebrow: z.string().optional(),
  heading: z.string(),
  body: z.array(z.string()),
  // Shown under the message: "Name · role" (text before the first " · " is the name).
  attribution: z.string().optional(),
  image: ImageSchema,
  imagePosition: z.enum(["left", "right"]),
  // "band": a deeper warm surface, full-bleed, to separate this section from its neighbours.
  tone: z.enum(["default", "band"]).optional(),
  actions: z.array(ButtonSchema).optional(),
})

