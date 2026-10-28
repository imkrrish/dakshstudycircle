import type { Course } from "@/lib/content-schema"
import { courseCta } from "./shared"

// Open [CONFIRM] items:
// - Hindi / Social Studies for Classes 1–8 (the pamphlet cover says "I–VIII all subjects")
// - Exact fee per class, batch timings
// - Teachers are SAMPLE records (shown in development only): docs/content-requests.md

export const classes6To8: Course = {
  slug: "classes-6-8",
  title: "Classes 6–8",
  summary:
    "CBSE tuition for Classes 6–8 in Maths, Science and English, to build habits before Class 9.",
  cardNote: "Building study habits before Class 9",
  classes: ["Class 6", "Class 7", "Class 8"],
  subjects: ["Maths", "Science", "English"],
  facultyIds: [
    "sample-maths-junior",
    "sample-science-junior",
    "sample-english-teacher",
  ],
  fees: {
    rows: [
      {
        label: "Classes 6–8, all three subjects",
        amount: { from: 25000, to: 30000 },
        per: "course",
        period: "session",
        note: "The amount depends on the class and on when in the session your child joins.",
      },
    ],
  },
  order: 2,
  seo: {
    title: "Classes 6–8 CBSE Tuition, Delhi Cantt",
    description:
      "CBSE tuition for Classes 6 to 8 in Delhi Cantt: Maths, Science and English. Build good study habits before Class 9. Free demo.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        shot: "Science · landscape 3:2 · from the back corner at chest height, students seen from behind at desks · daylight with the lights on, clean board",
      },
      eyebrow: "Classes 6–8 · CBSE",
      heading: ["Good habits for the middle school years"],
      subheading:
        "Maths, Science and English for Classes 6 to 8, with regular tests and steady revision, in Delhi Cantt.",
      facts: {
        items: [
          { label: "Classes", value: "{classes}" },
          { label: "Subjects", value: "{subjectCount}" },
          { label: "Batch size", value: "{batchSize}" },
          { label: "Free demo", value: "{freeDemo}" },
        ],
      },
    },
    {
      id: "subjects",
      type: "subjects",
      eyebrow: "Subjects",
      heading: "Three subjects for Classes 6 to 8",
      intro:
        "Maths, Science and English, the base your child will need in Class 9 and later.",
    },
    {
      id: "how-we-teach",
      type: "reason-list",
      tone: "band",
      eyebrow: "How we teach",
      heading: "Preparing for Class 9, one year at a time",
      items: [
        {
          title: "Syllabus finished early",
          body: "We complete the syllabus early, which leaves time to go over it again.",
        },
        {
          title: "Revision through the year",
          body: "Revision runs through the whole year, so your child builds the habit of going back to old topics.",
        },
        {
          title: "Regular tests",
          body: "Regular tests help your child get used to tests and see what needs more work.",
        },
        {
          title: "Study material",
          body: "Study material is part of the tuition.",
        },
      ],
    },
    {
      id: "fees",
      type: "fees",
      eyebrow: "Fees",
      heading: "Fees for Classes 6 to 8",
    },
    {
      id: "faq",
      type: "faq",
      eyebrow: "Questions",
      heading: "Questions about Classes 6–8",
      intro:
        "Short answers for parents and students. If yours is not here, call or WhatsApp us on {phones}.",
      items: [
        {
          question: "Which subjects are taught?",
          answer: "Maths, Science and English.",
        },
        {
          question: "Will this help my child get ready for Class 9?",
          answer:
            "Yes. Classes 6 to 8 build the base for Class 9. We do not promise marks or results.",
        },
        {
          question: "Can my child attend a demo class?",
          answer:
            "Yes. Offline demo classes are held at the centre, {address}. They are free until your child is satisfied and ready to join.",
        },
        {
          question: "How many students are in a batch?",
          answer: "About 10 to 20.",
        },
        {
          question: "Are online classes or home tuition available?",
          answer:
            "Yes. You can choose offline classes at the centre, online classes or home tuition. The free demo is for offline classes only.",
        },
        {
          question: "What are the fees?",
          answer:
            "Rs 25,000 to 30,000 per session for all three subjects together. The exact fee depends on the class and on when in the session your child joins. Call or WhatsApp us on {phones}.",
        },
      ],
    },
    courseCta,
  ],
}
