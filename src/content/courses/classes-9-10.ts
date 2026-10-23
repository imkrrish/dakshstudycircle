import type { Course } from "@/lib/content-schema"

// Open [CONFIRM] items:
// - Exact subject list
// - Modes (group, online, home, offline) for this course
// - Batch size, timings, duration, fees
// - Faculty per subject (facultyIds)

export const classes9To10: Course = {
  slug: "classes-9-10",
  title: "Classes 9–10",
  summary:
    "CBSE tuition across subjects for Classes 9 and 10, the two years that lead to the Class 10 board exam.",
  cardNote: "All subjects, leading up to the Class 10 boards",
  classes: ["Class 9", "Class 10"],
  subjects: ["All CBSE school subjects"],
  facultyIds: [],
  order: 3,
  seo: {
    title: "Classes 9–10 Tuition in Delhi Cantt",
    description:
      "CBSE tuition for Classes 9 and 10 in Delhi Cantt, leading up to the Class 10 board exam. Call or WhatsApp Daksh Study Circle, Sadar Bazaar.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      eyebrow: "Classes 9–10 · CBSE",
      heading: ["Getting ready for the Class 10 boards"],
      subheading:
        "CBSE tuition for Classes 9 and 10 in Delhi Cantt, across subjects.",
    },
  ],
}
