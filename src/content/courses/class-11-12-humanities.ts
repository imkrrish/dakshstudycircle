import type { Course } from "@/lib/content-schema"

// Open [CONFIRM] items:
// - Which subjects belong to which stream (split proposed, not confirmed by the owner)
// - Batch timings, duration, fees
// - Faculty per subject (facultyIds)

export const class11To12Humanities: Course = {
  slug: "class-11-12-humanities",
  title: "Class 11–12 Humanities",
  summary:
    "Humanities subjects for CBSE Classes 11–12, taught in small batches with the syllabus finished early.",
  cardNote: "Political Science, Economics and English",
  classes: ["Class 11", "Class 12"],
  subjects: ["Political Science", "Economics", "English"],
  facultyIds: [],
  order: 6,
  seo: {
    title: "Humanities Tuition (11–12), Delhi Cantt",
    description:
      "Class 11 and 12 humanities tuition in Sadar Bazaar, Delhi Cantt: Political Science, Economics, English. Small batches, regular tests and a free demo class.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      eyebrow: "Humanities stream · Classes 11–12",
      heading: ["Humanities for Classes 11 and 12"],
      subheading:
        "Political Science, Economics and English for humanities students, to the CBSE syllabus.",
    },
  ],
}
