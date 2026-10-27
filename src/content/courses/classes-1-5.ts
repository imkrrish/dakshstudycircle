import type { Course } from "@/lib/content-schema"

// Open [CONFIRM] items:
// - Batch timings, duration, fees
// - Faculty per subject (facultyIds)

export const classes1To5: Course = {
  slug: "classes-1-5",
  title: "Classes 1–5",
  summary:
    "CBSE tuition for Classes 1–5 in Maths, Science and English, in batches of about 10–20, so young learners get the attention they need.",
  cardNote: "Maths, Science and English, building a strong base",
  classes: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
  subjects: ["Maths", "Science", "English"],
  facultyIds: [],
  order: 1,
  seo: {
    title: "Classes 1–5 CBSE Tuition, Delhi Cantt",
    description:
      "Maths, Science and English tuition for CBSE Classes 1–5 in Sadar Bazaar, Delhi Cantt. Small batches, early syllabus completion and a free demo class.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        shot: "Younger students at their desks, teacher helping one child · landscape 3:2 · from the side at chest height, students seen from behind · daylight with the lights on",
      },
      eyebrow: "Classes 1–5 · CBSE",
      heading: ["A steady start in Classes 1 to 5"],
      subheading:
        "CBSE tuition in Maths, Science and English for young learners, in Delhi Cantt.",
    },
  ],
}
