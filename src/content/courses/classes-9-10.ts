import type { Course } from "@/lib/content-schema"

// Open [CONFIRM] items:
// - Batch timings, duration, fees
// - Faculty per subject (facultyIds)

export const classes9To10: Course = {
  slug: "classes-9-10",
  title: "Classes 9–10",
  summary:
    "CBSE tuition for Classes 9–10 with regular tests, and Maths taught by our director, Anil\u00a0Kumar.",
  cardNote: "Five subjects, leading up to the Class 10 boards",
  classes: ["Class 9", "Class 10"],
  subjects: ["Maths", "Science", "English", "Hindi", "Social Studies"],
  facultyIds: [],
  order: 3,
  seo: {
    title: "Classes 9–10 CBSE Tuition, Delhi Cantt",
    description:
      "Class 9 and 10 CBSE tuition in Delhi Cantt: Maths, Science, English, Hindi, Social Studies. Syllabus finished early, then revision for the boards.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      eyebrow: "Classes 9–10 · CBSE",
      heading: ["Getting ready for the Class 10 boards"],
      subheading:
        "Maths, Science, English, Hindi and Social Studies for Classes 9 and 10, in Delhi Cantt.",
    },
  ],
}
