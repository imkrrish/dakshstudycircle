import type { Course } from "@/lib/content-schema"

// Open [CONFIRM] items:
// - Exact subject list (old site says only "all subjects")
// - Modes (group, online, home, offline) for this course
// - Batch size, timings, duration, fees

export const classes1To5: Course = {
  slug: "classes-1-5",
  title: "Classes 1–5",
  summary:
    "CBSE tuition in school subjects for Classes 1 to 5, to help your child build a steady base before middle school.",
  cardNote: "All school subjects, building a strong base",
  classes: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
  subjects: ["All CBSE school subjects"],
  facultyIds: [],
  order: 1,
  seo: {
    title: "Classes 1–5 Tuition in Delhi Cantt",
    description:
      "CBSE tuition for Classes 1 to 5 at Daksh Study Circle, Sadar Bazaar, Delhi Cantt. Call or WhatsApp to ask about batches and timings.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      eyebrow: "Classes 1–5 · CBSE",
      heading: ["A steady start in Classes 1 to 5"],
      subheading:
        "CBSE subject tuition for young learners, at Daksh Study Circle in Delhi Cantt.",
    },
  ],
}
