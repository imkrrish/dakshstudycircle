import { z } from "zod"
import { formatHours } from "@/lib/hours"
import { ButtonSchema, sectionBase, type LoadedContent } from "../shared"

export const ContactVisitSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("contact-visit"),
  heading: z.string().min(1),
  labels: z.strictObject({
    address: z.string().min(1),
    landmark: z.string().min(1),
    metro: z.string().min(1),
    hours: z.string().min(1),
  }),
  // Follows the site's nearest-metro value.
  metroNote: z.string().min(1),
  // The free-demo line. Stated once on the page.
  note: z.string().min(1),
  // Directions button (the "directions" action).
  actions: z.array(ButtonSchema).min(1),
  // Click-to-load map: data only for now, the facade comes with the design run.
  // Dropped when site.contact.mapEmbedUrl is empty.
  map: z.strictObject({
    showMapLabel: z.string().min(1),
    title: z.string().min(1),
  }),
})

export type ContactVisitSection = z.infer<typeof ContactVisitSectionSchema>

export type ResolvedContactVisitSection = Omit<ContactVisitSection, "map"> & {
  addressLines: string[]
  landmark?: string
  metro?: string
  // formatHours() rows, the same as the footer and CTA.
  hours: string[]
  map?: ContactVisitSection["map"] & { embedUrl: string }
}

// ---------- Resolving ----------

export function resolveContactVisit(
  section: ContactVisitSection,
  content: LoadedContent,
): ResolvedContactVisitSection {
  const { address, hours, landmark, nearestMetro, mapEmbedUrl } =
    content.site.contact
  const { map, ...rest } = section
  return {
    ...rest,
    addressLines: [
      address.line1,
      address.line2,
      address.locality,
      `${address.city}, ${address.state} ${address.postalCode}`,
    ].filter((line): line is string => Boolean(line)),
    ...(landmark ? { landmark } : {}),
    ...(nearestMetro ? { metro: nearestMetro } : {}),
    hours: formatHours(hours),
    ...(mapEmbedUrl ? { map: { ...map, embedUrl: mapEmbedUrl } } : {}),
  }
}
