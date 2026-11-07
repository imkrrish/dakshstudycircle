import { z } from "zod"
import { sectionBase } from "../shared"

// A short piece of reading text: one heading and one to four paragraphs, set
// as a single left-aligned column (no eyebrow, image, list or action). For a
// story or a statement of values that should simply be read.
export const ProseSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("prose"),
  heading: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1).max(4),
  // Set the first paragraph as a larger serif lead, like the opening of a
  // printed booklet. The other paragraphs stay body text.
  leadParagraph: z.boolean().optional(),
})
