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
      proofLine: "Since 2005 · Classes 1–12 · RMS, RIMC & Sainik School prep",
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
      eyebrow: "Our courses",
      heading: "Tuition for every class, from 1 to 12",
      intro:
        "Plus entrance preparation for defence schools and a Spoken English course. Choose your child's class to begin.",
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
          label: "Entrance and skills",
          items: [
            { kind: "course", course: "rms-rimc-sainik" },
            { kind: "course", course: "spoken-english" },
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
        "I teach Maths to Classes 8–12 myself. At Daksh Study Circle, we look after everything around your child's learning: the classroom atmosphere, the lectures, the study material and the test series.",
        "We also guide you as parents, because you are part of this too. If you would like to know how we can help your child, please come and meet us at our centre in Sadar Bazaar.",
      ],
      attribution: "Anil Kumar · Director, teaches Maths for Classes 8–12",
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
        {
          label: "Get directions",
          variant: "outline",
          action: { type: "directions" },
        },
        {
          label: "Read our story",
          variant: "quiet",
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
        // [CONFIRM] personal attention for every child
        {
          title: "Attention for every child",
          body: "Not every child learns at the same pace. We pay attention to each student's needs in class.",
        },
        {
          title: "Here since July 2005",
          body: "More than two decades of teaching CBSE students in the same neighbourhood.",
        },
        {
          title: "Classes 1 to 12, one place",
          body: "From Class 1 to Class 12, plus defence school entrance prep, your child can stay with us through school.",
        },
        // [CONFIRM] early syllabus completion
        {
          title: "Syllabus finished early",
          body: "We aim to complete the syllabus early, so your child has more time to revise before exams.",
        },
        // [CONFIRM] online classes for missed classes
        {
          title: "Online classes when needed",
          body: "If your child misses a class, online sessions help them keep up.",
        },
        // [CONFIRM] smartboards in classrooms
        {
          title: "Smart classrooms",
          body: "Smartboards help teachers explain difficult topics with diagrams and visuals.",
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
      type: "results-grid",
      tone: "muted",
      eyebrow: "Results",
      heading: "Recent results from our students",
      intro:
        "A few board results and school admissions from the last three years.",
      show: "highlights",
      variant: "compact",
      actions: [
        {
          label: "See all results",
          variant: "outline",
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
      testimonials: ["vikram-negi", "sunita-rawat", "ishita-jain"],
    },
    {
      id: "videos",
      type: "video-grid",
      tone: "band",
      eyebrow: "Free video lessons",
      heading: "Free Maths lessons with Anil Sir",
      intro:
        "Maths lessons for Classes 9 to 12, plus Basic Maths, free to watch at home.",
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
        // [CONFIRM] nearest landmark or metro for directions
        {
          question: "Where is Daksh Study Circle, and how do I reach you?",
          answer: "We are at {address}. Our office is open {hours}.",
        },
        {
          question: "Which classes and subjects do you teach?",
          answer:
            "We teach CBSE students from Class 1 to 12. Batches are Classes 1–5, 6–8 and 9–10. For Classes 11–12 we have Science, Commerce and Humanities. We also run Spoken English.",
        },
        {
          question:
            "Do you prepare students for RMS, RIMC and Sainik School entrance?",
          answer:
            "Yes. We offer entrance preparation for RMS, RIMC and Sainik School. Call or WhatsApp us to ask about the batch for your child's class.",
        },
        {
          question: "Can my child attend a demo class first?",
          answer:
            "Yes. Your child can attend a demo class before joining, so you can both see how we teach. Call or WhatsApp us on {phones} to book one.",
        },
        // [CONFIRM] which modes apply to which classes
        {
          question: "Do you have online classes or home tuition?",
          answer:
            "Yes. We offer group tuition, online classes, home tuition and classes at our centre. Call us to find out what suits your child's class and subject.",
        },
        // [CONFIRM] batch size per class, and how doubts are handled
        {
          question:
            "How many students are in a batch? Will my child get personal attention?",
          answer:
            "Call us or visit the centre, and we will tell you the batch size for your child's class.",
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
            "Call or WhatsApp {phones}. You can also visit us at the centre, {hours}.",
        },
        {
          question: "Who teaches Maths?",
          answer:
            "Director Anil Kumar teaches Maths for Classes 8 to 12. You can also watch his free Maths lessons on our YouTube channel.",
        },
      ],
    },
    {
      id: "contact-cta",
      type: "cta-band",
      variant: "dark",
      heading: "Let's find the right class for your child",
      body: "Call or WhatsApp us, or drop by the centre. We'll help you choose the right course and batch for your child.",
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
