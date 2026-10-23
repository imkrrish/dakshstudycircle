import type { Course } from "@/lib/content-schema"

// Open [CONFIRM] items:
// - Whether Computer Science or English are offered
// - Modes (group, online, home, offline) for this course
// - Batch size, timings, duration, fees
// - Faculty per subject (facultyIds)

export const class11To12Science: Course = {
  slug: "class-11-12-science",
  title: "Class 11–12 Science",
  summary:
    "Physics, Chemistry, Maths and Biology for Classes 11 and 12, for students in the science stream.",
  classes: ["11", "12"],
  subjects: ["Physics", "Chemistry", "Maths", "Biology"],
  facultyIds: [],
  order: 4,
  seo: {
    title: "Class 11–12 Science, Delhi Cantt",
    description:
      "Physics, Chemistry, Maths and Biology for Class 11 and 12 at Daksh Study Circle, Sadar Bazaar, Delhi Cantt. Call or WhatsApp to ask about batches.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      eyebrow: "Science stream · Classes 11–12",
      heading: ["Science for Classes 11 and 12"],
      subheading:
        "Physics, Chemistry, Maths and Biology, taught to the CBSE syllabus in Delhi Cantt.",
    },
  ],
}
