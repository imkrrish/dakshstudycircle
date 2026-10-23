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
  ],
}
