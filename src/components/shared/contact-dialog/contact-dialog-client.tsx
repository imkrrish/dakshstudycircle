"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
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

// Warm ink instead of the ui default bg-black/30.
const OVERLAY = "bg-foreground/30"

const closeButton = (
  <Button
    variant="ghost"
    size="icon-lg"
    className="absolute top-4 right-4 size-11 bg-secondary"
  />
)

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

  // One line per row, so any number of rows stacks cleanly.
  const hoursRows = hours.map((row) => (
    <span key={row} className="block">
      {row}
    </span>
  ))

  const list = (
    <ContactPhoneList phones={phones} whatsappMessage={whatsappMessage} />
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          data-slot="contact-dialog"
          finalFocus={finalFocus}
          overlayClassName={OVERLAY}
          showCloseButton={false}
        >
          <DialogHeader className="pr-14">
            <DialogTitle className="font-heading text-title font-normal">
              {TITLE}
            </DialogTitle>
            <DialogDescription>{hoursRows}</DialogDescription>
          </DialogHeader>
          {list}
          <DialogClose render={closeButton}>
            <HugeiconsIcon icon={Cancel01Icon} aria-hidden="true" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        data-slot="contact-dialog"
        finalFocus={finalFocus}
        overlayClassName={OVERLAY}
      >
        <DrawerHeader className="relative pr-16 group-data-[swipe-axis=y]/drawer-popup:text-left">
          <DrawerTitle className="font-heading text-title font-normal">
            {TITLE}
          </DrawerTitle>
          <DrawerDescription>{hoursRows}</DrawerDescription>
          <DrawerClose render={closeButton}>
            <HugeiconsIcon icon={Cancel01Icon} aria-hidden="true" />
            <span className="sr-only">Close</span>
          </DrawerClose>
        </DrawerHeader>
        <div className="p-4 pt-6 pb-6">{list}</div>
      </DrawerContent>
    </Drawer>
  )
}

export { ContactDialogClient }
