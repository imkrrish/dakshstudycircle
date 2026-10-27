import type { Course } from "@/lib/content-schema"

// Open [CONFIRM] items:
// - Whether personality development is part of the course (not in the owner's facts)
// - Batch size, timings, fees
// - Faculty (facultyIds)

export const spokenEnglish: Course = {
  slug: "spoken-english",
  title: "Spoken English",
  summary:
    "A Spoken English course for school students, to help them speak English with more\u00a0confidence.",
  cardNote: "A 3-month course for Classes 1–12, usually June–August",
  classes: [
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
  ],
  subjects: ["Spoken English"],
  facultyIds: [],
  order: 8,
  seo: {
    title: "Spoken English Classes, Delhi Cantt",
    description:
      "A 3-month Spoken English course for school students (Classes 1–12) in Sadar Bazaar, Delhi Cantt, usually held June to August each year.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        shot: "A Spoken English batch practising conversation in pairs · landscape 3:2 · from the side at chest height, students seen from behind · daylight with the lights on",
      },
      eyebrow: "Spoken English, Classes 1–12",
      heading: ["Speak English with more confidence"],
      subheading:
        "A 3-month course for school students, usually held June to August each year.",
    },
  ],
}
