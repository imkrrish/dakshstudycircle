import type { Page } from "@/lib/content-schema"

export const home: Page = {
  slug: "home",
  seo: {
    title: "Daksh Study Circle | CBSE Coaching in Delhi Cantt",
    absoluteTitle: true,
    description:
      "CBSE coaching for Classes 1–12 in Sadar Bazaar, Delhi Cantt, since 2005. Personal attention for every student. Talk to us or visit us.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "large",
      eyebrow: "CBSE coaching in Delhi Cantt",
      heading: ["Every child learns differently.", "We teach that way."],
      subheading:
        "Personal attention for every student, from Class 1 to Class 12, in the heart of Sadar Bazaar.",
      proofLine: "Since 2005 · RMS, RIMC & Sainik School prep",
      actions: [
        {
          label: "Talk to us",
          variant: "primary",
          action: { type: "contact-dialog" },
        },
        {
          label: "Explore courses",
          variant: "outline",
          action: { type: "link", href: "#courses" },
        },
      ],
    },
    {
      id: "courses",
      type: "course-grid",
      ribbon: true,
      eyebrow: "Our courses",
      heading: "Tuition for every class, from 1 to 12",
      intro:
        "Plus defence school entrance preparation, Spoken English and classes for college students. Choose your child's class to begin.",
      groups: [
        {
          label: "School tuition",
          items: [
            { kind: "course", course: "classes-1-5" },
            { kind: "course", course: "classes-6-8" },
            { kind: "course", course: "classes-9-10" },
            {
              kind: "stream-group",
              title: "Classes 11–12",
              note: "Choose your stream",
              courses: [
                "class-11-12-science",
                "class-11-12-commerce",
                "class-11-12-humanities",
              ],
            },
          ],
        },
        {
          label: "Beyond school tuition",
          items: [
            { kind: "course", course: "rms-rimc-sainik" },
            { kind: "course", course: "spoken-english" },
            { kind: "course", course: "college-classes" },
          ],
        },
      ],
      actions: [
        {
          label: "See all courses",
          variant: "outline",
          action: { type: "link", href: "/courses" },
        },
      ],
    },
    {
      id: "director",
      type: "split",
      tone: "band",
      eyebrow: "From the director",
      heading: "Meet Anil Sir, director of Daksh",
      body: [
        "I teach Maths to Classes 9–12 myself. At Daksh Study Circle, we look after everything around your child's learning: the classroom atmosphere, the lectures, the study material and the test series.",
        "We also guide you as parents, because you are part of this too. If you would like to know how we can help your child, please come and meet us at our centre in Sadar Bazaar.",
      ],
      attribution: "Anil Kumar · Director, teaches Maths for Classes 9–12",
      // PLACEHOLDER: AI-generated development image, cropped (Gemini watermark
      // removed) from public/anildaksh-potrait-img.jpg. Replace with a real
      // photo before launch. The other anildaksh-* files in public/ are AI
      // development placeholders too (anildaksh-cutout.png,
      // anildaksh-teaching-in-classroom.jpg).
      image: {
        src: "/anildaksh-portrait-crop.jpg",
        alt: "Anil Kumar, Director of Daksh Study Circle",
        width: 960,
        height: 1200,
      },
      imagePosition: "left",
      actions: [
        // {
        //   label: "Get directions",
        //   variant: "outline",
        //   action: { type: "directions" },
        // },
        {
          label: "Read our story",
          variant: "primary",
          action: { type: "link", href: "/about" },
        },
      ],
    },
    {
      id: "why-daksh",
      type: "reason-list",
      eyebrow: "Why Daksh",
      heading: "Why families in Delhi Cantt join Daksh",
      intro: "The things parents ask us about most, answered plainly.",
      items: [
        {
          title: "Attention for every child",
          body: "Batches are small, about 10 to 20 students, so teachers know each child and can answer every doubt.",
        },
        {
          title: "Here since July 2005",
          body: "More than two decades of teaching CBSE students in the same neighbourhood.",
        },
        {
          title: "Classes 1 to 12, one place",
          body: "From Class 1 to Class 12, plus defence school entrance prep, your child can stay with us through school.",
        },
        {
          title: "Syllabus finished early",
          body: "We finish the syllabus early in every class. Then your child revises it with us for the rest of the year.",
        },
        {
          title: "Offline, online or at home",
          body: "Study at our centre, join online classes, or choose home tuition. Pick what suits your child.",
        },
        {
          title: "A smart classroom",
          body: "One classroom has a smartboard for clearer explanations, and we are adding more.",
        },
      ],
      // PLACEHOLDER: AI image (cropped, Gemini watermark removed, from
      // public/anildaksh-teaching-in-classroom.jpg). The board's triangle
      // angles are wrong. Replace with a real photo before launch.
      figure: {
        image: {
          src: "/why-daksh-classroom.jpg",
          alt: "A teacher in a white shirt points at a triangle drawn on a large smartboard while students watch from their desks.",
          width: 1200,
          height: 800,
        },
        caption: "A teacher explains a topic on the smartboard.",
      },
    },
    {
      id: "results",
      type: "results-board",
      tone: "muted",
      eyebrow: "Results",
      heading: "Recent results from our students",
      intro:
        "A few board results and school admissions from the last three years.",
      boardTitle: "Honour Board",
      perYear: 6,
      actions: [
        {
          label: "See all results",
          variant: "quiet",
          action: { type: "link", href: "/results" },
        },
      ],
    },
    {
      id: "testimonials",
      type: "testimonial-grid",
      eyebrow: "In their words",
      heading: "What families tell us",
      intro: "Parents and students on learning at Daksh, in their own words.",
      layout: "carousel",
      show: "featured",
    },
    {
      id: "videos",
      type: "video-player",
      tone: "band",
      eyebrow: "Free video lessons",
      heading: "Free Maths lessons with Anil Sir",
      intro:
        "Maths lessons for Classes 9 to 12, plus Basic Maths, free to watch at home.",
      defaultVideo: "class-10-maths",
      videos: [
        "basic-maths",
        "class-9-maths",
        "class-10-maths",
        "class-11-maths",
        "class-12-maths",
      ],
      actions: [
        {
          label: "Visit our YouTube channel",
          variant: "outline",
          action: { type: "social", platform: "youtube" },
        },
      ],
    },
    {
      id: "faq",
      type: "faq",
      eyebrow: "Before you visit",
      heading: "Questions parents often ask",
      intro:
        "If your question is not here, call or WhatsApp us. We will answer it plainly.",
      items: [
        {
          question: "Where is Daksh Study Circle, and how do I reach you?",
          answer:
            "We are at {address}. {landmark}. The nearest metro is {metro}, a short auto ride away.",
        },
        {
          question: "Which classes and subjects do you teach?",
          answer:
            "We teach CBSE Classes 1–12. Classes 1–8 study Maths, Science and English. Classes 9–10 also study Hindi and Social Studies. For Classes 11–12, we teach Science, Commerce and Humanities subjects. We also run Spoken English for school students and classes for B.A., B.Com. and B.Sc.",
        },
        {
          question:
            "Do you prepare students for RMS, RIMC and Sainik School entrance?",
          answer:
            "Yes. These students study in a separate batch. Demo classes are available, and we also prepare your child for the interview.",
        },
        {
          question: "Can my child attend a demo class first?",
          answer:
            "Yes, for offline classes at our centre. Your child can attend free until you are satisfied and ready to join.",
        },
        {
          question: "Do you have online classes or home tuition?",
          answer:
            "Yes. Along with classes at the centre, we offer online classes and home tuition. Call us to discuss what suits your child.",
        },
        {
          question:
            "How many students are in a batch? Will my child get personal attention?",
          answer: "About 10 to 20 students, depending on the class.",
        },
        // [CONFIRM] whether fees can be shared by phone or WhatsApp, and any instalment option
        {
          question: "What are the fees?",
          answer:
            "Fees depend on the class and course. Please call or WhatsApp us on {phones}, and we will share the details.",
        },
        {
          question: "How do I enquire or get started?",
          answer:
            "Call or WhatsApp {phones}. You can also visit the centre. Opening hours: {hours}.",
        },
        {
          question: "Who teaches Maths?",
          answer:
            "Director Anil Kumar teaches Maths for Classes 9 to 12. You can also watch his free Maths lessons on our YouTube channel.",
        },
      ],
    },
    {
      id: "contact-cta",
      type: "cta-band",
      variant: "dark",
      heading: "Let's find the right class for your child",
      body: "Call or WhatsApp us, or drop by the centre. We'll help you choose the right course and batch for your child. Your child can try our offline classes free before you decide.",
      actions: [
        {
          label: "Talk to us",
          variant: "primary",
          action: { type: "contact-dialog" },
        },
        {
          label: "Get directions",
          variant: "outline",
          action: { type: "directions" },
        },
      ],
      showHours: true,
    },
  ],
}
