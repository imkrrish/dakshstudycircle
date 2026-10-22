import type { Site } from "@/lib/content-schema"

type ContactDialogData = Pick<
  Site["contact"],
  "phones" | "hours" | "whatsappMessage"
>

export type { ContactDialogData }
