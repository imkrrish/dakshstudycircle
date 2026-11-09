import type { Page } from "@/lib/content"

// Facts (address, landmark, metro, hours, phones, emails, map links) come from
// site.ts through the section resolvers; only wording lives here.
// [CONFIRM] hours, walk-in policy, hall number and spelling, demo for online or
// home tuition: docs/content-requests.md ("Open questions: Contact").
export const contact: Page = {
  slug: "contact",
  seo: {
    title: "Contact Daksh Study Circle, Sadar Bazaar, Delhi Cantt",
    absoluteTitle: true,
    description:
      "Call or WhatsApp Daksh Study Circle, or visit the centre in Sadar Bazaar, Delhi Cantt. See the address, landmark, metro and visiting hours.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Contact" }],
      eyebrow: "Contact",
      heading: ["Talk to us,", "or visit the centre."],
      subheading: "Sadar Bazaar, Delhi Cantt.",
      media: {
        image: {
          src: "/images/classroom/classroom-test-day.avif",
          alt: "Students from several classes writing a test at their desks in a Daksh Study Circle classroom",
          width: 1280,
          height: 958,
        },
        shot: "Classroom test day, students writing at their desks · landscape 4:3 · daylight with the lights on",
      },
    },
    {
      id: "reach",
      type: "contact-reach",
      tone: "muted",
      heading: "Call or message us",
      intro: "Parents can call the centre to talk to the teachers.",
      // Both target the primary number (site.contact.phones[0]).
      actions: [
        { label: "Call", variant: "primary", action: { type: "call" } },
        {
          label: "WhatsApp",
          variant: "outline",
          action: { type: "whatsapp" },
        },
      ],
      whatsappNote: "Both numbers are on WhatsApp.",
      emailLabel: "Email",
      // Data only for now: the form UI comes with the design run. The course
      // options are attached from the courses collection, then "notSure".
      form: {
        heading: "Send a message on WhatsApp",
        submitLabel: "Open WhatsApp",
        fields: {
          name: { label: "Your name" },
          course: { label: "Class or course" },
          question: { label: "Your question", optionalNote: "(optional)" },
        },
        notSure: { label: "Not sure yet", message: "classes" },
        message: [
          { text: "Hello, I am {name}." },
          { text: "I would like to know about {course}." },
          { text: "{question}", optional: true },
        ],
      },
    },
    {
      id: "visit",
      type: "contact-visit",
      tone: "paper",
      heading: "Visit the centre",
      labels: {
        address: "Address",
        landmark: "Landmark",
        metro: "Nearest metro",
        hours: "Hours",
      },
      metroNote: "It is a short auto ride, not walking distance.",
      note: "Demo classes at the centre are free until you are satisfied enough to join.",
      actions: [
        {
          label: "Get directions",
          variant: "outline",
          action: { type: "directions" },
        },
      ],
      // Data only for now: the click-to-load facade comes with the design run.
      map: {
        showMapLabel: "Show map",
        title: "Map showing Daksh Study Circle in Sadar Bazaar, Delhi Cantt",
      },
    },
  ],
}
