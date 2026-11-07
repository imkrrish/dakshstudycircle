import { z } from "zod"
import { sectionBase } from "../shared"

// What an institute stands for: a heading, two to four plain statements and,
// optionally, one short saying set large beside them. Type only (no
// eyebrow, image, icon, numeral, rule, card or action). The saying is the
// institute's own line, not a quotation, so it carries no attribution and no
// quote marks.
export const ValuesSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("values"),
  heading: z.string().min(1),
  lines: z
    .array(z.string().min(1))
    .min(2)
    .max(4)
    .refine((lines) => new Set(lines).size === lines.length, {
      message: "values lines must be unique",
    }),
  pullLine: z.string().min(1).optional(),
})
