import type { Course } from "@/lib/content-schema"

// DEVELOPMENT DATA from research, not final copy. RMS CET admits to Classes 6 and 9; RIMC admits
// to Class 8 (written test + viva-voce, boys and girls); AISSEE (Sainik Schools, NTA) admits to
// Classes 6 and 9. Age limits and papers change yearly: verify against the official notifications
// before publishing any specifics.
//
// Open [CONFIRM] items:
// - Batch timings
// - Entry classes actually prepared for
// - Batch size, duration, fees
// - Faculty (facultyIds)

export const rmsRimcSainik: Course = {
  slug: "rms-rimc-sainik",
  title: "RMS, RIMC and Sainik School",
  summary:
    "Entrance preparation for RMS, RIMC and Sainik Schools in a separate batch, with interview preparation.",
  cardNote: "Entrance prep for admission to Class 6, 8 or 9",
  classes: ["Class 5", "Class 7", "Class 8"],
  subjects: ["Entrance exam preparation", "Interview preparation"],
  facultyIds: [],
  order: 7,
  seo: {
    title: "RMS, RIMC & Sainik School Coaching",
    description:
      "RMS, RIMC and Sainik School entrance coaching in Delhi Cantt. Separate batch, demo classes and interview preparation for Class 6, 8 or 9 admission.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      eyebrow: "Defence school entrance",
      heading: ["Entrance preparation for defence schools"],
      subheading:
        "A separate batch, demo classes and interview practice for admission to Class 6, 8 or 9.",
    },
  ],
}
