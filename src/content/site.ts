import type { Site } from "@/lib/content-schema"

export const site: Site = {
  name: "Daksh Study Circle",
  tagline: "Your quest for knowledge ends here.",
  foundedYear: 2005,
  url: "https://example.com",
  seo: {
    titleTemplate: "%s | Daksh Study Circle",
    description: "PLACEHOLDER description",
  },
  contact: {
    phones: [
      {
        e164: "+919818824279",
        display: "+91 98188 24279",
        whatsapp: true,
      },
      {
        e164: "+919953005312",
        display: "+91 99530 05312",
        whatsapp: true,
      },
    ],
    emails: ["urdaksh@gmail.com", "dakshstudycircle@gmail.com"],
    hours: "Mon–Sat, 10 am – 7 pm",
    whatsappMessage:
      "Hello, I'd like to know about classes at Daksh Study Circle.",
    address: {
      line1: "Hall No. H-1, 2nd Floor, Kalpatru Complex",
      line2: "Sadar Bazaar",
      locality: "Delhi Cantonment",
      city: "New Delhi",
      state: "Delhi",
      postalCode: "110010",
    },
    mapUrl: "https://maps.app.goo.gl/CfvNuGANjBQsmxCi9",
  },
  socials: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/Daksh-Study-Circle-210403489015823",
    },
    { platform: "x", url: "https://x.com/urdaksh" },
    {
      platform: "instagram",
      url: "https://www.instagram.com/dakshstudycircle/",
    },
    {
      platform: "youtube",
      url: "https://www.youtube.com/channel/UCkZgoRhjxTUkTyyS4XSrADw",
    },
  ],
  footer: {
    exploreExtra: [{ label: "Gallery", href: "/gallery" }],
    legal: [{ label: "Privacy policy", href: "/privacy" }],
  },
  nav: [
    { label: "Courses", href: "/courses" },
    { label: "Results", href: "/results" },
    { label: "Faculty", href: "/faculty", feature: "showFaculty" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  navCta: {
    label: "Talk to us",
    variant: "primary",
    action: { type: "contact-dialog" },
  },
  features: { showFaculty: true },
}
