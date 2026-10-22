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
        label: "PLACEHOLDER",
        e164: "+910000000000",
        display: "PLACEHOLDER 00000 00000",
        whatsapp: false,
      },
    ],
    emails: ["placeholder@example.com"],
    hours: "PLACEHOLDER hours",
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
