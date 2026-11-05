import { z } from "zod"
import { IconSchema, sectionBase } from "../shared"

export const CardGridSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("card-grid"),
  eyebrow: z.string().optional(),
  heading: z.string(),
  intro: z.string().optional(),
  items: z.array(
    z.strictObject({
      title: z.string(),
      body: z.string(),
      icon: IconSchema.optional(),
      href: z.string().optional(),
    }),
  ),
})

