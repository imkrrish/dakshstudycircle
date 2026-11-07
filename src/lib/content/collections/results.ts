import { z } from "zod"
import { ImageSchema, sampleField } from "../shared"

// A result photo may carry a CSS object-position ("50% 20%") for the 4:5 frame;
// without it the frame keeps the top of the photo.
export const ResultPhotoSchema = ImageSchema.extend({
  position: z.string().min(1).optional(),
})

const RESULT_CLASSES = ["Class 10", "Class 12", "Entrance"] as const

export const ResultSchema = z.strictObject({
  id: z.string().min(1),
  studentName: z.string().min(1),
  year: z.number().int().min(2000).max(2100),
  class: z.enum(RESULT_CLASSES),
  // Board or entrance exam: "CBSE", "AISSEE", "RMS CET", "RIMC".
  exam: z.string().min(1),
  // Class 12 only.
  stream: z.enum(["Science", "Commerce", "Humanities"]).optional(),
  percentage: z.number().min(0).max(100).optional(),
  subjects: z
    .array(
      z.strictObject({
        name: z.string().min(1),
        marks: z.number().min(0).max(100),
      }),
    )
    .optional(),
  // Entrance results: title is the school, note the status, e.g.
  // { title: "Sainik School", note: "Admitted · AISSEE" }.
  // The honour board sets it as "{status} · {school}": `school` is the full
  // name (falls back to `title`), `status` defaults to "Admitted".
  outcome: z
    .strictObject({
      title: z.string().min(1),
      note: z.string().min(1),
      school: z.string().min(1).optional(),
      status: z.enum(["Admitted", "Selected"]).optional(),
    })
    .optional(),
  // Entrance results only: the class the student entered (RMS and Sainik 6 or
  // 9, RIMC 8). Checked against `exam` when the content loads.
  entryClass: z.union([z.literal(6), z.literal(8), z.literal(9)]).optional(),
  // Slug of the Daksh course the student took (checked against the courses);
  // the page prints the course's title.
  course: z.string().min(1),
  // Without a photo the card shows the student's initials.
  photo: ResultPhotoSchema.optional(),
  // Shown on the home page.
  highlight: z.boolean().optional(),
  ...sampleField,
})

export type Result = z.infer<typeof ResultSchema>

