import type { Course } from "@/lib/content-schema"

// Open [CONFIRM] items:
// - Who it is for (children only, or adults too); classes is "All ages" until known
// - What each of spoken English and personality development covers
// - Course duration, batch size, timings, fees
// - Faculty (facultyIds)

export const spokenEnglish: Course = {
  slug: "spoken-english",
  title: "Spoken English",
  summary:
    "A course in spoken English and personality development, for learners of all ages who want to speak more confidently.",
  classes: ["All ages"],
  subjects: ["Spoken English", "Personality development"],
  facultyIds: [],
  order: 8,
  seo: {
    title: "Spoken English Course in Delhi Cantt",
    description:
      "A spoken English and personality development course at Daksh Study Circle, Sadar Bazaar, Delhi Cantt. Call or WhatsApp to ask about batches.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      eyebrow: "Spoken English and personality development",
      heading: ["Speak English with more confidence"],
      subheading:
        "A spoken English and personality development course at Daksh Study Circle, Delhi Cantt.",
    },
  ],
}
