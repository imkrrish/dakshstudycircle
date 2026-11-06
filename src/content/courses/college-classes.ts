import type { Course } from "@/lib/content"
import { courseCta } from "./shared"

// Open [CONFIRM] items (docs/content-requests.md):
// - B.Sc.? (DU SOL has only B.Sc. (Hons) Computer Science), IGNOU or other universities
// - Subjects, mode, timings, fee; batch size and study material for this course
// - Teachers: no faculty record covers these classes yet
// Course pages render only the types in COURSE_TEMPLATE (src/lib/content/page.ts):
// the official-links section below is kept but not shown.

export const collegeClasses: Course = {
  slug: "college-classes",
  title: "College classes",
  summary:
    "Classes for B.A. and B.Com. students of open and distance degrees such as DU SOL.",
  cardNote: "B.A. and B.Com. · DU SOL and similar",
  classes: ["College"],
  subjects: ["B.A.", "B.Com."],
  facultyIds: [],
  order: 9,
  seo: {
    title: "DU SOL B.A. & B.Com. Classes, Delhi Cantt",
    description:
      "B.A. and B.Com. classes in Delhi Cantt for students of open and distance degrees such as DU SOL. Free offline demo classes.",
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
        shot: "College study · landscape 3:2 · over the shoulder of a student with textbooks at a desk · daylight from a window",
      },
      eyebrow: "College classes · DU SOL",
      heading: ["Classes for your B.A. or B.Com."],
      subheading:
        "For open and distance learning students, in Delhi Cantt since 2005.",
    },
    {
      id: "subjects",
      type: "subjects",
      heading: "Who these classes are for",
      entries: [
        {
          title: "Open and distance learners",
          text: "For students in degree programmes such as DU SOL.",
        },
        { title: "B.A.", text: "Classes for B.A. students." },
        { title: "B.Com.", text: "Classes for B.Com. students." },
      ],
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
      heading: "Questions students ask",
      intro: "Short answers to what students ask most.",
      items: [
        {
          question: "Who are these classes for?",
          answer:
            "Students in open or distance degree programmes, such as DU SOL.",
        },
        {
          question: "Which degrees do you teach?",
          answer: "B.A. and B.Com.",
        },
        {
          question: "Which subjects do you cover?",
          answer:
            "Please call or WhatsApp us on {phones} to check your subjects.",
        },
        {
          question: "Can I attend a demo class?",
          answer:
            "Yes. For offline classes, you can attend free demo classes until you are satisfied. Then you decide.",
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
