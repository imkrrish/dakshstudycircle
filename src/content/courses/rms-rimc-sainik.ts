import type { Course } from "@/lib/content-schema"

// DEVELOPMENT DATA from research, not final copy. RMS CET admits to Classes 6 and 9; RIMC admits
// to Class 8 (written test + viva-voce, boys and girls); AISSEE (Sainik Schools, NTA) admits to
// Classes 6 and 9. Age limits and papers change yearly: verify against the official notifications
// before publishing any specifics.
//
// Open [CONFIRM] items:
// - Whether Daksh prepares for the interview/viva
// - Batch timings
// - Entry classes actually prepared for
// - Whether it is a separate batch
// - Modes, batch size, duration, fees
// - Faculty (facultyIds)

export const rmsRimcSainik: Course = {
  slug: "rms-rimc-sainik",
  title: "RMS, RIMC and Sainik School",
  summary:
    "Preparation for the RMS, RIMC and Sainik School entrance exams, for admission to Class 6, 8 or 9.",
  cardNote: "Entrance prep for admission to Class 6, 8 or 9",
  classes: ["Class 5", "Class 7", "Class 8"],
  subjects: [
    "Mathematics",
    "English",
    "Intelligence and reasoning",
    "General knowledge",
    "Science and Social Science (Class 9 entry)",
  ],
  facultyIds: [],
  order: 7,
  seo: {
    title: "RMS RIMC Sainik Prep, Delhi Cantt",
    description:
      "Entrance preparation for RMS, RIMC and Sainik School admission in Delhi Cantt. Call or WhatsApp Daksh Study Circle, Sadar Bazaar, to ask about batches.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      eyebrow: "Defence school entrance",
      heading: ["Entrance preparation for defence schools"],
      subheading:
        "Entrance preparation for students aiming for admission to RMS, RIMC and Sainik Schools, at Daksh Study Circle in Delhi Cantt.",
    },
  ],
}
