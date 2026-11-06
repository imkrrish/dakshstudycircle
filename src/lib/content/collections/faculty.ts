import { z } from "zod"
import { ImageSchema, sampleField } from "../shared"

export const FacultySchema = z.strictObject({
  id: z.string().min(1),
  // Full name as the teacher wants it printed.
  name: z.string(),
  // Job title, e.g. "Director", "Senior Physics teacher".
  role: z.string(),
  // Subjects as named in the course data (e.g. "Maths", "Science"). A subject row
  // shows this teacher when the subject matches and a class overlaps.
  subjects: z.array(z.string()),
  // "Class 9" … "Class 12" the teacher takes.
  classes: z.array(z.string()),
  // Degrees and certificates, one line, e.g. "M.Sc. Physics, B.Ed.".
  qualification: z.string().optional(),
  // Year the teacher started teaching (anywhere). Experience is worked out from
  // it with `yearsOfTeaching()`, so it never goes stale.
  teachingSince: z.number().int().min(1980).max(2026).optional(),
  // Year the teacher joined the institute (it started in 2005).
  joinedYear: z.number().int().min(2005).max(2026).optional(),
  // Two or three sentences in the teacher's own style; facts only.
  bio: z.string().optional(),
  photo: ImageSchema.optional(),
  // The brief for the photo this record needs, until `photo` exists.
  photoShot: z.string().optional(),
  isDirector: z.boolean(),
  order: z.number(),
  ...sampleField,
})

export type Faculty = z.infer<typeof FacultySchema>


// Whole years of teaching as of `now` (build time by default).
export function yearsOfTeaching(
  teachingSince: number,
  now: number = new Date().getFullYear(),
): number {
  return Math.max(0, now - teachingSince)
}
