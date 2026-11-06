import type { Course } from "@/lib/content"
import { courseCta } from "./shared"

// Open [CONFIRM] items (docs/content-requests.md):
// - Level, start months, daily timing, certificate
// - Whether batch size (about 10–20) and study material apply to this course
// - The teacher is an invented record (sample: true, development only)
// - `classes` is empty on purpose: the course is by age (under 20), not class.
// Course pages render only the types in COURSE_TEMPLATE (src/lib/content/page.ts):
// the fees section below is kept but not shown.

export const spokenEnglish: Course = {
  slug: "spoken-english",
  title: "Spoken English",
  summary:
    "A 3-month Spoken English course for students under 20, with five classes a week.",
  cardNote: "3 months · 5 classes a week",
  classes: [],
  subjects: ["Spoken English"],
  facultyIds: [
    "anjali-malhotra",
  ],
  fees: {
    rows: [
      {
        label: "Spoken English, 3-month course",
        amount: 9000,
        per: "course",
        period: "course",
      },
    ],
  },
  order: 8,
  seo: {
    title: "Spoken English Classes, Delhi Cantt",
    description:
      "A 3-month Spoken English course in Delhi Cantt for students under 20. Five classes a week and free offline demo classes.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        image: {
          src: "/images/classroom/classroom-test-day.avif",
          alt: "Students writing a test at their desks in a Daksh Study Circle classroom",
          width: 1280,
          height: 958,
        },
        shot: "Spoken English · landscape 3:2 · from the side at desk height, two students talking with the teacher nearby · warm daylight, no clutter",
      },
      eyebrow: "Spoken English · Delhi Cantt",
      heading: ["Practise speaking English, five days a week"],
      subheading: "A 3-month course for students under 20.",
    },
    {
      id: "subjects",
      type: "subjects",
      heading: "How the course works",
      entries: [
        {
          title: "For students under 20",
          text: "The course is open to students below 20 years of age.",
        },
        {
          title: "Three months",
          text: "The course runs for three months.",
        },
        {
          title: "Five classes a week",
          text: "Classes are held five days every week.",
        },
      ],
    },
    {
      id: "fees",
      type: "fees",
      eyebrow: "Fees",
      heading: "Fee for Spoken English",
    },
    {
      id: "faq",
      type: "faq",
      heading: "Questions parents ask",
      intro: "Short answers to what parents ask most.",
      items: [
        { question: "Who can join?", answer: "Students under 20." },
        {
          question: "How long is the course?",
          answer: "Three months, with five classes every week.",
        },
        {
          question: "Can my child attend a demo class?",
          answer:
            "Yes. For offline classes, your child can attend free demo classes until you are satisfied. Then you decide.",
        },
        {
          question: "How many students are in a batch?",
          answer:
            "About 10 to 20 students, so every child gets attention in class.",
        },
        {
          question: "What are the fees?",
          answer:
            "Fees depend on the class and course. Please call or WhatsApp us on {phones}, and we will share the details.",
        },
      ],
    },
    courseCta,
  ],
}
