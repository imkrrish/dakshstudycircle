import type { Course } from "@/lib/content-schema"

// Open [CONFIRM] items:
// - Which subjects belong to which stream (split proposed, not confirmed by the owner)
// - Batch timings, duration, fees
// - Faculty per subject (facultyIds)

export const class11To12Science: Course = {
  slug: "class-11-12-science",
  title: "Class 11–12 Science",
  summary:
    "CBSE Science for Classes 11–12 in batches of about 10–20, with Maths taught by our director, Anil\u00a0Kumar.",
  cardNote: "Physics, Chemistry, Maths, Biology and more",
  classes: ["Class 11", "Class 12"],
  subjects: [
    "Physics",
    "Chemistry",
    "Maths",
    "Biology",
    "English",
    "C++ (Computer Science)",
    "Informatics Practices",
  ],
  facultyIds: [],
  order: 4,
  seo: {
    title: "Science Tuition (11–12), Delhi Cantt",
    description:
      "Class 11 and 12 science tuition in Sadar Bazaar, Delhi Cantt: Physics, Chemistry, Maths. Small batches, regular tests and a free demo class.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        shot: "Class 11–12 science batch, a worked problem on the board · landscape 3:2 · from the back corner at chest height, students seen from behind · daylight with the lights on, clean board",
      },
      eyebrow: "Science stream · Classes 11–12",
      heading: ["Science for Classes 11 and 12"],
      subheading:
        "Physics, Chemistry, Maths and Biology, plus English, Computer Science (C++) and Informatics Practices, to the CBSE syllabus.",
    },
  ],
}
