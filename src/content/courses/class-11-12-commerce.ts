import type { Course } from "@/lib/content-schema"

// Open [CONFIRM] items:
// - Whether Business Studies, Maths, English are offered
// - Modes (group, online, home, offline) for this course
// - Batch size, timings, duration, fees
// - Faculty per subject (facultyIds)

export const class11To12Commerce: Course = {
  slug: "class-11-12-commerce",
  title: "Class 11–12 Commerce",
  summary:
    "Class 11 and 12 commerce students can study Accounts and Economics here, to the CBSE syllabus.",
  cardNote: "Accounts and Economics",
  classes: ["Class 11", "Class 12"],
  subjects: ["Accounts", "Economics"],
  facultyIds: [],
  order: 5,
  seo: {
    title: "Class 11–12 Commerce, Delhi Cantt",
    description:
      "Accounts and Economics for Class 11 and 12 commerce students in Delhi Cantt. Call or WhatsApp Daksh Study Circle, Sadar Bazaar, about batches.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      eyebrow: "Commerce stream · Classes 11–12",
      heading: ["Commerce for Classes 11 and 12"],
      subheading:
        "Accounts and Economics for commerce students, with CBSE-syllabus tuition in Delhi Cantt.",
    },
  ],
}
