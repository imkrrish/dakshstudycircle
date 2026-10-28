import type { Course } from "@/lib/content-schema"
import { courseCta } from "./shared"

// Open [CONFIRM] items:
// - The subject split by stream is NOT confirmed by the institute: it follows the usual
//   CBSE groupings from the pamphlet's subject list (docs/content-requests.md).
// - Computer Science language (C++ or Python) and whether Informatics Practices is taught
//   for this stream.
// - Teachers other than Anil Kumar are SAMPLE records (shown in development only).

export const class11To12Humanities: Course = {
  slug: "class-11-12-humanities",
  title: "Class 11–12 Humanities",
  summary:
    "CBSE Class 11 and 12 Humanities: Political Science, Economics and English.",
  cardNote: "Political Science, Economics and English",
  classes: ["Class 11", "Class 12"],
  subjects: ["Political Science", "Economics", "English"],
  facultyIds: ["sample-humanities-teacher", "sample-english-teacher"],
  // Pamphlet: Rs 25,000 per subject, per session up to the final exams.
  fees: {
    rows: [
      { label: "Class 11", amount: 25000, per: "subject", period: "session" },
      { label: "Class 12", amount: 25000, per: "subject", period: "session" },
    ],
  },
  order: 6,
  seo: {
    title: "Class 11–12 Humanities Tuition, Delhi Cantt",
    description:
      "CBSE Class 11 and 12 Humanities coaching in Delhi Cantt. Political Science, Economics and English. Free demo for offline classes.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        shot: "Humanities · landscape 3:2 · camera at eye level across a table, on students with open books · soft natural light",
      },
      eyebrow: "Class 11–12 Humanities",
      heading: ["Read with understanding. Write with clarity."],
      subheading:
        "Political Science, Economics and English for CBSE Classes 11 and 12, taught in small batches.",
    },
    {
      id: "subjects",
      type: "subjects",
      eyebrow: "Subjects",
      heading: "Three subjects for Humanities",
      intro: "We teach Political Science, Economics and English.",
    },
    {
      id: "how-we-teach",
      type: "reason-list",
      tone: "band",
      eyebrow: "How we teach",
      heading: "How we teach Humanities",
      items: [
        {
          title: "Syllabus finished early",
          body: "We complete the syllabus early, so you have time to read, think and write.",
        },
        {
          title: "Revision all year",
          body: "Revision runs through the year, so chapters are not left for the end.",
        },
        {
          title: "Regular tests",
          body: "Regular tests give you practice at writing answers.",
        },
        {
          title: "Study material",
          body: "Study material is part of the tuition, so your reading stays organised.",
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
      heading: "Questions about Class 11–12 Humanities",
      intro:
        "Short answers for parents and students. If yours is not here, call or WhatsApp us on {phones}.",
      items: [
        {
          question: "Which Humanities subjects do you teach?",
          answer: "Political Science, Economics and English.",
        },
        {
          question: "Do I have to take English?",
          answer:
            "CBSE guidance says English or Hindi is the first subject. Please check which one your school expects.",
        },
        {
          question: "Does CBSE have a Humanities stream?",
          answer:
            "As per CBSE guidance, CBSE has no official streams, only subject combinations chosen by the school. Check your school's list.",
        },
        {
          question: "What is the fee?",
          answer:
            "Rs 25,000 per subject, per session, up to the final exams. The same applies to Class 11 and Class 12.",
        },
        {
          question: "Is there a free demo?",
          answer:
            "Yes, for offline classes at {address}. It is free until your child is satisfied and ready to join. Call us on {phones} ({hours}).",
        },
        {
          question: "Can my child study at home or online?",
          answer:
            "Yes. You can choose offline classes at the centre, online classes or home tuition. The free demo is for offline classes only. Batches are about 10 to 20 students.",
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
