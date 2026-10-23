import type { Course } from "@/lib/content-schema"

// Open [CONFIRM] items:
// - Whether Geography, Psychology, Sociology, English are offered
// - Modes (group, online, home, offline) for this course
// - Batch size, timings, duration, fees
// - Faculty per subject (facultyIds)

export const class11To12Humanities: Course = {
  slug: "class-11-12-humanities",
  title: "Class 11–12 Humanities",
  summary:
    "History and Political Science for humanities students in Classes 11 and 12, taught to the CBSE syllabus.",
  cardNote: "History and Political Science",
  classes: ["Class 11", "Class 12"],
  subjects: ["History", "Political Science"],
  facultyIds: [],
  order: 6,
  seo: {
    title: "Class 11–12 Humanities, Delhi Cantt",
    description:
      "History and Political Science for Class 11 and 12 humanities students in Delhi Cantt. Call or WhatsApp Daksh Study Circle, Sadar Bazaar.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      eyebrow: "Humanities stream · Classes 11–12",
      heading: ["Humanities for Classes 11 and 12"],
      subheading:
        "For students who choose humanities: History and Political Science, with CBSE tuition.",
    },
  ],
}
