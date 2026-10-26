import type { Site } from "@/lib/content-schema"

// `hours` arrives already formatted, one string per row (see formatHours).
type ContactDialogData = Pick<Site["contact"], "phones" | "whatsappMessage"> & {
  hours: string[]
}

export type { ContactDialogData }
