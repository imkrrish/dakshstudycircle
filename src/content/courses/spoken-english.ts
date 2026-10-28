import type { Course } from "@/lib/content-schema"
import { courseCta } from "./shared"

// Open [CONFIRM] items:
// - Level, start months, daily timing, certificate (docs/content-requests.md)
// - The teacher is a SAMPLE record (shown in development only)
// - `classes` is empty on purpose: the course is by age (under 20), not class.

export const spokenEnglish: Course = {
  slug: "spoken-english",
  title: "Spoken English",
  summary:
    "A 3-month Spoken English course for students under 20, with five classes a week.",
  cardNote: "3 months · 5 classes a week · Rs 9,000",
  classes: [],
  subjects: ["Spoken English"],
  facultyIds: ["sample-english-teacher"],
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
    title: "Spoken English Course, Delhi Cantt",
    description:
      "A 3-month Spoken English course in Delhi Cantt for students under 20. Five classes a week. Fee Rs 9,000. Call us to know more.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        shot: "Spoken English · landscape 3:2 · from the side at desk height, two students talking with the teacher nearby · warm daylight, no clutter",
      },
      eyebrow: "Spoken English",
      heading: ["Speak English with more confidence"],
      subheading:
        "A 3-month course in Delhi Cantt for students under 20, with five classes every week.",
      facts: {
        items: [
          { label: "Course", value: "3 months" },
          { label: "Classes", value: "5 a week" },
          { label: "Age", value: "Under 20" },
          { label: "Fee", value: "Rs 9,000" },
        ],
      },
    },
    {
      id: "subjects",
      type: "subjects",
      eyebrow: "Subjects",
      heading: "Spoken English for students under 20",
      intro: "A 3-month course, with five classes a week.",
    },
    {
      id: "how-we-teach",
      type: "reason-list",
      tone: "band",
      eyebrow: "The course",
      heading: "The course at a glance",
      items: [
        { title: "3 months", body: "A course of three months." },
        { title: "5 classes a week", body: "Classes run five days a week." },
        { title: "Under 20", body: "For students below 20 years of age." },
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
      eyebrow: "Questions",
      heading: "Questions about Spoken English",
      intro:
        "Short answers for parents and students. If yours is not here, call or WhatsApp us on {phones}.",
      items: [
        { question: "How long is the course?", answer: "Three months." },
        { question: "How many classes are there in a week?", answer: "Five." },
        { question: "Who can join?", answer: "Students under 20." },
        {
          question: "What is the fee?",
          answer: "Rs 9,000 for the 3-month course.",
        },
        {
          question: "What about batch timings and mode?",
          answer: "Please call us on {phones}. We are open {hours}.",
        },
        {
          question: "How do I join?",
          answer:
            "Call or WhatsApp us on {phones}, or visit the centre at {address}.",
        },
      ],
    },
    courseCta,
  ],
}
