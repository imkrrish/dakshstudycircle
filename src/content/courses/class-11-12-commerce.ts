import type { Course } from "@/lib/content-schema"
import { courseCta } from "./shared"

// Open [CONFIRM] items:
// - Which subjects belong to which stream (split proposed, not confirmed by the owner)
// - Batch timings, duration, fees
// - Faculty per subject (facultyIds)

export const class11To12Commerce: Course = {
  slug: "class-11-12-commerce",
  title: "Class 11–12 Commerce",
  summary:
    "CBSE Commerce for Classes 11–12 in batches of about 10–20, with regular tests and study\u00a0material.",
  cardNote: "Accountancy, Business Studies, Economics and more",
  classes: ["Class 11", "Class 12"],
  subjects: [
    "Accountancy",
    "Business Studies",
    "Economics",
    "Maths",
    "English",
    "Informatics Practices",
  ],
  facultyIds: [],
  order: 5,
  seo: {
    title: "Commerce Tuition (11–12), Delhi Cantt",
    description:
      "Class 11 and 12 commerce tuition in Sadar Bazaar, Delhi Cantt: Accountancy, Business Studies, Economics. Small batches, regular tests and a free demo class.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        shot: "Class 11–12 commerce batch, an accounts table on the board · landscape 3:2 · from the back corner at chest height, students seen from behind · daylight with the lights on, clean board",
      },
      eyebrow: "Commerce stream · Classes 11–12",
      heading: ["Commerce for Classes 11 and 12"],
      subheading:
        "Accountancy, Business Studies and Economics, plus Maths, English and Informatics Practices, to the CBSE syllabus.",
    },
    courseCta,
  ],
}
