import { getSite } from "@/lib/content"
import { ContactDialogClient } from "./contact-dialog-client"

async function ContactDialog() {
  const { contact } = await getSite()
  return (
    <ContactDialogClient
      phones={contact.phones}
      hours={contact.hours}
      whatsappMessage={contact.whatsappMessage}
    />
  )
}

export { ContactDialog }
