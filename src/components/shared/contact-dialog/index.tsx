import { getSite } from "@/lib/content"
import { formatHours } from "@/lib/hours"
import { ContactDialogClient } from "./contact-dialog-client"

async function ContactDialog() {
  const { contact } = await getSite()
  return (
    <ContactDialogClient
      phones={contact.phones}
      hours={formatHours(contact.hours)}
      whatsappMessage={contact.whatsappMessage}
    />
  )
}

export { ContactDialog }
