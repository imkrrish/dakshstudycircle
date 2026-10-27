import type { Course } from "@/lib/content-schema"
import { courseCta } from "./shared"

// Open [CONFIRM] items:
// - Batch timings, duration, fees
// - Faculty per subject (facultyIds)

export const classes6To8: Course = {
  slug: "classes-6-8",
  title: "Classes 6–8",
  summary:
    "CBSE tuition for Classes 6–8, with the syllabus finished early and the rest of the year kept for\u00a0revision.",
  cardNote: "Maths, Science and English through the middle years",
  classes: ["Class 6", "Class 7", "Class 8"],
  subjects: ["Maths", "Science", "English"],
  facultyIds: [],
  order: 2,
  seo: {
    title: "Classes 6–8 CBSE Tuition, Delhi Cantt",
    description:
      "CBSE tuition in Maths, Science and English for Classes 6–8 in Sadar Bazaar, Delhi Cantt. Batches of about 10–20, regular tests and revision.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        shot: "Middle-school batch writing in notebooks, teacher walking between the desks · landscape 3:2 · from the back corner at chest height · daylight with the lights on",
      },
      eyebrow: "Classes 6–8 · CBSE",
      heading: ["Support through Classes 6 to 8"],
      subheading:
        "CBSE tuition in Maths, Science and English for the middle years, when subjects grow more detailed and homework needs more guidance.",
    },
    courseCta,
  ],
}
