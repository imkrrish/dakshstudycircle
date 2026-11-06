import type { Course } from "@/lib/content"
import { courseCta } from "./shared"

// Open [CONFIRM] items:
// - The subject split by stream is NOT confirmed by the institute: it follows the usual
//   CBSE groupings from the pamphlet's subject list (docs/content-requests.md).
// - Computer Science language (C++ or Python) and whether Informatics Practices is taught
//   for this stream.
// - Teachers other than Anil Kumar are invented records (sample: true, development only).

export const class11To12Commerce: Course = {
  slug: "class-11-12-commerce",
  title: "Class 11–12 Commerce",
  summary: "CBSE Class 11 and 12 Commerce, from Accountancy to Economics.",
  cardNote: "Accountancy, Business Studies, Economics, Maths",
  classes: ["Class 11", "Class 12"],
  subjects: [
    "Accountancy",
    "Business Studies",
    "Economics",
    "Mathematics",
    "English",
    "Informatics Practices",
  ],
  facultyIds: [
    "anil-kumar",
    "deepak-arora",
    "anjali-malhotra",
  ],
  // Pamphlet: Rs 25,000 per subject, per session up to the final exams.
  fees: {
    rows: [
      { label: "Class 11", amount: 25000, per: "subject", period: "session" },
      { label: "Class 12", amount: 25000, per: "subject", period: "session" },
    ],
  },
  order: 5,
  seo: {
    title: "Class 11–12 Commerce Tuition, Delhi Cantt",
    description:
      "CBSE Class 11 and 12 Commerce coaching in Delhi Cantt. Accountancy, Business Studies, Economics and Maths. Free demo for offline classes.",
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
        shot: "Commerce · landscape 3:2 · camera at desk height, side-on, on a student's notebook and calculator · warm, even indoor light",
      },
      eyebrow: "Classes 11–12 · Commerce",
      heading: ["Get comfortable with accounts, business and numbers"],
      subheading: "Coaching CBSE students in Delhi Cantt since 2005.",
    },
    {
      id: "subjects",
      type: "subjects",
      heading: "What your child will study",
      summaries: [
        {
          subject: "Accountancy",
          text: "Accounting basics, financial statements, and partnership and company accounts.",
        },
        {
          subject: "Business Studies",
          text: "Nature of business, principles of management, marketing and finance.",
        },
        {
          subject: "Economics",
          text: "Microeconomics, macroeconomics, statistics for economics and Indian economic development.",
        },
        {
          subject: "Mathematics",
          text: "Sets and functions, algebra, calculus, vectors and 3D geometry, probability and statistics.",
        },
        {
          subject: "English",
          text: "Reading comprehension, writing skills and the literature chapters.",
        },
        {
          subject: "Informatics Practices",
          text: "Data handling with Python and Pandas, SQL databases and networking basics.",
        },
      ],
    },
    {
      id: "how-we-teach",
      type: "teaching-plan",
      heading: "Ready well before the boards",
      steps: [
        {
          icon: "book",
          lead: "Every chapter taught,",
          title: "finished early",
        },
        {
          icon: "note-edit",
          lead: "Revision and regular tests",
          title: "all year round",
        },
        {
          icon: "school",
          lead: "On board exam day, your child",
          title: "walks in prepared",
          destination: true,
        },
      ],
    },
    {
      id: "results",
      type: "results-board",
      heading: "Class 12 board results",
      boardTitle: "Honour Board",
      perYear: 8,
      years: 1,
    },
    {
      id: "videos",
      type: "video-player",
      eyebrow: "Free on YouTube",
      heading: "Maths with Anil Sir, free on YouTube",
      intro:
        "If you take Maths, watch the free Class 11 Maths and Class 12 Maths playlists by Anil Sir.",
      videos: ["class-11-maths", "class-12-maths"],
      defaultVideo: "class-11-maths",
      actions: [
        {
          label: "Visit our YouTube channel",
          variant: "outline",
          action: { type: "social", platform: "youtube" },
        },
      ],
    },
    {
      id: "fees",
      type: "fees",
      eyebrow: "Fees",
      heading: "Fees for Classes 11 and 12",
    },
    {
      id: "faq",
      type: "faq",
      heading: "Questions parents ask",
      intro: "Short answers to what parents ask most.",
      items: [
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
          question: "Are online classes or home tuition available?",
          answer:
            "Yes. Classes run offline at our centre in Delhi Cantt, online, and as home tuition.",
        },
        {
          question: "Do you give study material?",
          answer: "Yes. Study material is part of the tuition.",
        },
        {
          question: "What are the fees?",
          answer:
            "Fees depend on the class and course. Please call or WhatsApp us on {phones}, and we will share the details.",
        },
      ],
    },
    {
      id: "official-links",
      type: "link-list",
      eyebrow: "Official links",
      heading: "Official CBSE material",
      intro:
        "Use these CBSE pages to check the syllabus and practise with sample papers.",
      items: [
        {
          label: "CBSE curriculum 2026-27",
          href: "https://cbseacademic.nic.in/curriculum_2027.html",
          purpose: "Syllabus and sample papers, straight from CBSE.",
        },
      ],
    },
    courseCta,
  ],
}
