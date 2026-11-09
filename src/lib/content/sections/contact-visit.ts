import { z } from "zod"
import { formatHours } from "@/lib/hours"
import {
  ButtonSchema,
  IconSchema,
  sectionBase,
  type LoadedContent,
} from "../shared"

export const ContactVisitSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("contact-visit"),
  heading: z.string().min(1),
  labels: z.strictObject({
    address: z.string().min(1),
    hours: z.string().min(1),
  }),
  // The way to the centre: stations in order, each with an icon. `toNext`
  // labels the stretch between this station and the next, so the last one has
  // none. Each fact (landmark, metro, distance) is stated once, here.
  route: z.strictObject({
    stations: z
      .array(
        z.strictObject({
          title: z.string().min(1),
          line: z.string().min(1),
          icon: IconSchema,
          toNext: z.string().min(1).optional(),
        }),
      )
      .min(2)
      .max(4)
      .refine((stations) => !stations.at(-1)?.toNext, {
        message: "the last station has no stretch after it (remove toNext)",
      }),
  }),
  // The free-demo line. Stated once on the page.
  note: z.string().min(1),
  // Directions button (the "directions" action).
  actions: z.array(ButtonSchema).min(1),
  // Click-to-load map. Dropped when site.contact.mapEmbedUrl is empty.
  map: z.strictObject({
    showMapLabel: z.string().min(1),
    title: z.string().min(1),
  }),
})

export type ContactVisitSection = z.infer<typeof ContactVisitSectionSchema>

export type ResolvedContactVisitSection = Omit<ContactVisitSection, "map"> & {
  addressLines: string[]
  // formatHours() rows split into days and times: "Mon–Sat, 9 am – 8 pm".
  hours: { days: string; times: string }[]
  map?: ContactVisitSection["map"] & { embedUrl: string }
}

// The resolved map data (present only when the site has an embed URL).
export type ContactVisitMap = NonNullable<ResolvedContactVisitSection["map"]>

// ---------- Resolving ----------

export function resolveContactVisit(
  section: ContactVisitSection,
  content: LoadedContent,
): ResolvedContactVisitSection {
  const { address, hours, mapEmbedUrl } = content.site.contact
  const { map, ...rest } = section
  return {
    ...rest,
    addressLines: [
      address.line1,
      address.line2,
      address.locality,
      `${address.city}, ${address.state} ${address.postalCode}`,
    ].filter((line): line is string => Boolean(line)),
    // formatHours() stays the one source of the wording; only split for the
    // two-column timetable.
    hours: formatHours(hours).map((row) => {
      const at = row.indexOf(", ")
      return { days: row.slice(0, at), times: row.slice(at + 2) }
    }),
    ...(mapEmbedUrl ? { map: { ...map, embedUrl: mapEmbedUrl } } : {}),
  }
}
