"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useDialogStore } from "@/lib/stores/dialog-store"
import { ContactPhoneList } from "./contact-phone-list"
import type { ContactDialogData } from "./types"
import { useIsDesktop } from "./use-is-desktop"

const TITLE = "Call or WhatsApp us"

// Read at close time so focus returns to whichever element opened the dialog.
function finalFocus() {
  return useDialogStore.getState().returnFocusTo ?? true
}

function ContactDialogClient({
  phones,
  hours,
  whatsappMessage,
}: ContactDialogData) {
  const open = useDialogStore((s) => s.activeDialog === "contact")
  const closeDialog = useDialogStore((s) => s.closeDialog)
  const isDesktop = useIsDesktop()

  const onOpenChange = (next: boolean) => {
    if (!next) closeDialog()
  }

  const list = (
    <ContactPhoneList phones={phones} whatsappMessage={whatsappMessage} />
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent data-slot="contact-dialog" finalFocus={finalFocus}>
          <DialogHeader>
            <DialogTitle className="font-heading text-xl font-normal">
              {TITLE}
            </DialogTitle>
            <DialogDescription>{hours}</DialogDescription>
          </DialogHeader>
          {list}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent data-slot="contact-dialog" finalFocus={finalFocus}>
        <DrawerHeader className="relative pr-14 text-left">
          <DrawerTitle className="font-heading text-xl font-normal">
            {TITLE}
          </DrawerTitle>
          <DrawerDescription className="text-left">{hours}</DrawerDescription>
          <DrawerClose
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute top-4 right-4 bg-secondary"
              />
            }
          >
            <HugeiconsIcon icon={Cancel01Icon} aria-hidden="true" />
            <span className="sr-only">Close</span>
          </DrawerClose>
        </DrawerHeader>
        <div className="p-4 pb-6">{list}</div>
      </DrawerContent>
    </Drawer>
  )
}

export { ContactDialogClient }
