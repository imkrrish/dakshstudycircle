import type { Course } from "@/lib/content"
import { courseCta } from "./shared"

// Open [CONFIRM] items:
// - The subject split by stream is NOT confirmed by the institute: it follows the usual
//   CBSE groupings from the pamphlet's subject list (docs/content-requests.md).
// - Computer Science language (C++ or Python) and whether Informatics Practices is taught
//   for this stream.
// - Teachers other than Anil Kumar are SAMPLE records (shown in development only).

export const class11To12Science: Course = {
  slug: "class-11-12-science",
  title: "Class 11–12 Science",
  summary: "CBSE Class 11 and 12 Science, with Maths taught by Anil Kumar.",
  cardNote: "Physics, Chemistry, Maths, Biology and more",
  classes: ["Class 11", "Class 12"],
  subjects: [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "English",
    "Computer Science",
    "Informatics Practices",
  ],
  facultyIds: [
    "anil-kumar",
    "pathak-sir",
    "sample-chem-bio-teacher",
    "sample-computer-teacher",
    "sample-english-teacher",
  ],
  // Pamphlet: Rs 25,000 per subject, per session up to the final exams.
  fees: {
    rows: [
      { label: "Class 11", amount: 25000, per: "subject", period: "session" },
      { label: "Class 12", amount: 25000, per: "subject", period: "session" },
    ],
  },
  order: 4,
  seo: {
    title: "Class 11–12 Science Tuition, Delhi Cantt",
    description:
      "CBSE Class 11 and 12 Science coaching in Delhi Cantt. Physics, Chemistry, Maths, Biology and more. Free demo for offline classes.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        shot: "Science · landscape 3:2 · from the back of the room, over a student's shoulder towards the board · soft daylight from the window",
      },
      eyebrow: "Class 11–12 Science",
      heading: ["Learn Science by solving problems, one step at a time"],
      subheading:
        "Physics, Chemistry, Mathematics and Biology for CBSE Classes 11 and 12. Maths is taught by our director, Anil Kumar.",
    },
    {
      id: "subjects",
      type: "subjects",
      eyebrow: "Subjects",
      heading: "Subjects you can take",
      intro:
        "Choose the subjects you need. Each one is taught separately. Check your school's combination first.",
    },
    {
      id: "how-we-teach",
      type: "reason-list",
      tone: "band",
      eyebrow: "How we teach",
      heading: "How we teach Science",
      items: [
        {
          title: "Syllabus finished early",
          body: "We complete the syllabus early, so you have time to practise problems before the exams.",
        },
        {
          title: "Revision all year",
          body: "Revision runs through the whole year. Nothing is left for the last month.",
        },
        {
          title: "Regular tests",
          body: "Tests are held regularly. They show you where a topic still needs work.",
        },
        {
          title: "Study material",
          body: "Study material is part of the tuition, so you have material to work from.",
        },
      ],
    },
    {
      id: "videos",
      type: "video-player",
      eyebrow: "Free on YouTube",
      heading: "Learn Maths with Anil Sir, free",
      intro:
        "Anil Sir has put his Class 11 Maths and Class 12 Maths lessons on YouTube. Watch them free, any time.",
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
      eyebrow: "Questions",
      heading: "Questions about Class 11–12 Science",
      intro:
        "Short answers for parents and students. If yours is not here, call or WhatsApp us on {phones}.",
      items: [
        {
          question: "Who teaches Maths?",
          answer:
            "Anil Kumar, the director, teaches Mathematics for Classes 11 and 12. He also teaches Maths for Classes 9 to 12.",
        },
        {
          question: "How much is the fee?",
          answer: "Rs 25,000 per subject, per session, up to the final exams.",
        },
        {
          question: "Which subjects can I join?",
          answer:
            "Physics, Chemistry, Mathematics, Biology, English, Computer Science and Informatics Practices. Pick the ones your school combination needs.",
        },
        {
          question:
            "Can I take both Computer Science and Informatics Practices?",
          answer:
            "As per CBSE guidance, only one of Informatics Practices, Computer Science and Information Technology can be taken. Please check your school's combinations.",
        },
        {
          question: "Is there a free demo?",
          answer:
            "Yes, for offline classes at {address}. It is free until your child is satisfied and ready to join. Call us on {phones} ({hours}).",
        },
        {
          question: "Can I study online or at home?",
          answer:
            "Yes. You can choose offline classes at the centre, online classes or home tuition. The free demo is for offline classes only.",
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
