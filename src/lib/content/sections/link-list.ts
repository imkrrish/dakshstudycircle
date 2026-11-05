import { z } from "zod"
import { sectionBase } from "../shared"

// A short list of outside links (official sites, circulars). External links
// open in a new tab with rel="noopener noreferrer" and are marked as external.
export const LinkListSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("link-list"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  items: z
    .array(
      z.strictObject({
        label: z.string().min(1),
        href: z.string().min(1),
        // One line: what the visitor finds there.
        purpose: z.string().min(1),
      }),
    )
    .min(1),
})

