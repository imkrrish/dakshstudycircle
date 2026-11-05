import { z } from "zod"
import { ImageSchema } from "../shared"

export const TestimonialSchema = z.strictObject({
  id: z.string().min(1),
  name: z.string().min(1),
  // Required for "institute" testimonials; a Google reviewer's role is unknown.
  role: z.enum(["student", "parent"]).optional(),
  // e.g. "Class 12, 2025" or "Parent of a Class 8 student".
  context: z.string().min(1).optional(),
  text: z.string().min(1),
  photo: ImageSchema.optional(),
  // "google" cards carry a small "Google review" label.
  source: z.enum(["institute", "google"]),
  // Shown on home. Sorted by `order`; entries without one go last.
  featured: z.boolean().optional(),
  order: z.number().optional(),
})

export type Testimonial = z.infer<typeof TestimonialSchema>

