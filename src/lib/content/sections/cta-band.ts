import { z } from "zod"
import { ButtonSchema, sectionBase } from "../shared"

export const CtaBandSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("cta-band"),
  variant: z.enum(["dark", "light"]),
  heading: z.string(),
  body: z.string().optional(),
  actions: z.array(ButtonSchema),
  // Shows the site.contact.hours rows under the buttons.
  showHours: z.boolean().optional(),
})

