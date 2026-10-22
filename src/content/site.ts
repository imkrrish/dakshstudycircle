import type { Site } from "@/lib/content-schema"

export const site: Site = {
  name: "PLACEHOLDER site name",
  tagline: "PLACEHOLDER tagline",
  foundedYear: 2000,
  url: "https://example.com",
  seo: {
    titleTemplate: "%s | PLACEHOLDER",
    description: "PLACEHOLDER description",
  },
  contact: {
    phones: [
      {
        label: "PLACEHOLDER: Office",
        e164: "+919818824279",
        display: "+91 98188 24279",
        whatsapp: true,
      },
      {
        label: "PLACEHOLDER: Director",
        e164: "+919953005312",
        display: "+91 99530 05312",
        whatsapp: true,
      },
    ],
    emails: ["placeholder@example.com"],
    hours: "PLACEHOLDER: Mon–Sat, 10 am – 7 pm",
    whatsappMessage:
      "Hello, I'd like to know about classes at Daksh Study Circle.",
    address: {
      line1: "PLACEHOLDER line 1",
      locality: "PLACEHOLDER locality",
      city: "PLACEHOLDER city",
      state: "PLACEHOLDER state",
      postalCode: "000000",
    },
  },
  socials: [],
  nav: [],
  navCta: {
    label: "PLACEHOLDER CTA",
    action: { type: "contact-dialog" },
  },
  features: { showFaculty: false },
}
