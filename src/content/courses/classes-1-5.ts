import type { Course } from "@/lib/content-schema"
import { courseCta } from "./shared"

// Open [CONFIRM] items:
// - Hindi / Social Studies for Classes 1–8 (the pamphlet cover says "I–VIII all subjects")
// - Exact fee per class, batch timings
// - Teachers are SAMPLE records (shown in development only): docs/content-requests.md

export const classes1To5: Course = {
  slug: "classes-1-5",
  title: "Classes 1–5",
  summary:
    "CBSE tuition for Classes 1–5 in Maths, Science and English, taught in small batches.",
  cardNote: "Maths, Science and English for young learners",
  classes: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
  subjects: ["Maths", "Science", "English"],
  facultyIds: [
    "sample-maths-junior",
    "sample-science-junior",
    "sample-english-teacher",
  ],
  fees: {
    rows: [
      {
        label: "Classes 1–5, all three subjects",
        amount: { from: 25000, to: 30000 },
        per: "course",
        period: "session",
        note: "The amount depends on the class and on when in the session your child joins.",
      },
    ],
  },
  order: 1,
  seo: {
    title: "Classes 1–5 CBSE Tuition, Delhi Cantt",
    description:
      "CBSE tuition for Classes 1 to 5 in Delhi Cantt: Maths, Science and English in small batches. Free demo at the centre.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        shot: "Maths · landscape 3:2 · from the side at child's eye level, a small group at a table with notebooks · soft daylight, tidy room",
      },
      eyebrow: "Classes 1–5 · CBSE",
      heading: ["A steady base for young learners"],
      subheading:
        "Maths, Science and English for Classes 1 to 5, taught in small batches in Delhi Cantt.",
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
      heading: "Three subjects for Classes 1 to 5",
      intro:
        "Maths, Science and English, taught together so your child builds a steady base.",
    },
    {
      id: "how-we-teach",
      type: "reason-list",
      tone: "band",
      eyebrow: "How we teach",
      heading: "Small steps, taken regularly",
      items: [
        {
          title: "Syllabus finished early",
          body: "We complete the syllabus early, so there is time to go over it again.",
        },
        {
          title: "Revision all year",
          body: "Revision runs through the whole year, so what your child learns stays fresh.",
        },
        {
          title: "Regular tests",
          body: "Regular tests show what is clear and what needs more work.",
        },
        {
          title: "Study material",
          body: "Study material is part of the tuition, so your child has material to work from.",
        },
      ],
    },
    {
      id: "fees",
      type: "fees",
      eyebrow: "Fees",
      heading: "Fees for Classes 1 to 5",
    },
    {
      id: "faq",
      type: "faq",
      eyebrow: "Questions",
      heading: "Questions about Classes 1–5",
      intro:
        "Short answers for parents and students. If yours is not here, call or WhatsApp us on {phones}.",
      items: [
        {
          question: "Which subjects are taught?",
          answer: "Maths, Science and English.",
        },
        {
          question: "How many children are in a batch?",
          answer: "Batches are about 10 to 20 children.",
        },
        {
          question: "Can my child attend a demo class?",
          answer:
            "Yes. Offline demo classes are held at the centre, {address}. They are free until your child is satisfied and ready to join.",
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
        {
          question: "Are there regular tests and study material?",
          answer: "Yes. Both are part of the tuition.",
        },
      ],
    },
    courseCta,
  ],
}
