import type { Course } from "@/lib/content-schema"
import { courseCta } from "./shared"

// Open [CONFIRM] items:
// - B.Sc.? (DU SOL has only B.Sc. (Hons) Computer Science), IGNOU or other universities
// - Subjects, mode, timings, fee (docs/content-requests.md)
// - The teacher is a SAMPLE record (shown in development only)

export const collegeClasses: Course = {
  slug: "college-classes",
  title: "College classes",
  summary:
    "Classes for B.A. and B.Com students of open and distance degrees such as DU SOL.",
  cardNote: "B.A. and B.Com · DU SOL and similar",
  classes: ["College"],
  subjects: ["B.A.", "B.Com."],
  facultyIds: ["sample-college-teacher"],
  order: 9,
  seo: {
    title: "DU SOL B.A. & B.Com Classes, Delhi Cantt",
    description:
      "Classes for B.A. and B.Com students of open and distance degrees such as DU SOL, in Delhi Cantt. Call us for details.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        shot: "College study · landscape 3:2 · over the shoulder of a student with textbooks at a desk · daylight from a window",
      },
      eyebrow: "College classes",
      heading: ["Support for open and distance degrees"],
      subheading:
        "For students of degrees such as DU SOL (School of Open Learning, University of Delhi). B.A. and B.Com.",
      facts: {
        items: [
          { label: "Degrees", value: "B.A., B.Com." },
          { label: "Suited to", value: "Open and distance students" },
        ],
      },
    },
    {
      id: "subjects",
      type: "subjects",
      eyebrow: "Subjects",
      heading: "Degrees we support",
      intro: "Open and distance degrees such as DU SOL.",
    },
    {
      id: "official-links",
      type: "link-list",
      eyebrow: "Official links",
      heading: "Official DU SOL links",
      intro:
        "Admission forms and dates are on the official sites. Please check them there. We do not offer admission help.",
      items: [
        {
          label: "DU SOL official website",
          href: "https://sol.du.ac.in",
          purpose:
            "Programmes, forms and notices from the School of Open Learning",
        },
        {
          label: "Delhi University exams website",
          href: "https://exam.du.ac.in",
          purpose: "Date sheets and exam notices",
        },
      ],
    },
    {
      id: "faq",
      type: "faq",
      eyebrow: "Questions",
      heading: "Questions about college classes",
      intro:
        "Short answers for parents and students. If yours is not here, call or WhatsApp us on {phones}.",
      items: [
        {
          question: "Who are these classes for?",
          answer: "Students of open and distance degrees such as DU SOL.",
        },
        { question: "Which degrees?", answer: "B.A. and B.Com." },
        {
          question: "Do you help with admission?",
          answer:
            "No. For forms and dates, please see the official DU SOL websites.",
        },
        {
          question: "Which subjects are covered?",
          answer: "Please call us on {phones}.",
        },
        {
          question: "What are the timings and mode?",
          answer: "Please call us on {phones}. We are open {hours}.",
        },
        { question: "What is the fee?", answer: "Please call us on {phones}." },
      ],
    },
    courseCta,
  ],
}
