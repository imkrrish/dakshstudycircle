import type { Course } from "@/lib/content-schema"

// Open [CONFIRM] items:
// - Exact subject list
// - Modes (group, online, home, offline) for this course
// - Batch size, timings, duration, fees

export const classes6To8: Course = {
  slug: "classes-6-8",
  title: "Classes 6–8",
  summary:
    "CBSE tuition for the middle years, when subjects grow more detailed. A bridge between primary classes and the board years.",
  classes: ["6", "7", "8"],
  subjects: ["All CBSE school subjects"],
  facultyIds: [],
  order: 2,
  seo: {
    title: "Classes 6–8 Tuition in Delhi Cantt",
    description:
      "CBSE tuition for Classes 6 to 8 in Delhi Cantt, as subjects grow more detailed. Call or WhatsApp Daksh Study Circle, Sadar Bazaar, to ask about batches.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      eyebrow: "Classes 6–8 · CBSE",
      heading: ["Support through Classes 6 to 8"],
      subheading:
        "CBSE tuition for the middle years, when subjects grow more detailed and homework needs more guidance.",
    },
  ],
}
