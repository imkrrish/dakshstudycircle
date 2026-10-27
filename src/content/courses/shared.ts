import type { Section } from "@/lib/content-schema"

// The closing band every course page ends with (same words as /courses).
export const courseCta: Extract<Section, { type: "cta-band" }> = {
  id: "cta",
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
}
