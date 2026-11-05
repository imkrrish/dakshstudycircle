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
  // Teaching experience, one line, e.g. "12 years of teaching".
  experience: z.string().optional(),
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

