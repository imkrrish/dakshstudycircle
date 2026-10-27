"use client"

import { useId, type ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import { useDialogStore, type DialogName } from "@/lib/stores/dialog-store"
import { isPlainClick } from "@/lib/utils"

// With `fallbackHref` the trigger is a real link (for "Talk to us": the first
// phone number as tel:), so it still works without JavaScript. A plain click
// is taken over to open the dialog; modified clicks go to the browser.
function DialogTriggerButton({
  dialog,
  fallbackHref,
  id,
  onClick,
  ...props
}: Omit<ComponentProps<typeof Button>, "render"> & {
  dialog: DialogName
  fallbackHref?: string
}) {
  const generatedId = useId()
  const triggerId = id ?? generatedId
  const openDialog = useDialogStore((s) => s.openDialog)
  // Only the button that opened the dialog reports it as expanded.
  const expanded = useDialogStore(
    (s) => s.activeDialog === dialog && s.returnFocusTo?.id === triggerId,
  )
  return (
    <Button
      data-slot="dialog-trigger-button"
      id={triggerId}
      aria-haspopup="dialog"
      aria-expanded={expanded}
      {...(fallbackHref && {
        nativeButton: false,
        render: <a href={fallbackHref} />,
      })}
      onClick={(event) => {
        onClick?.(event)
        if (fallbackHref) {
          if (!isPlainClick(event)) return
          event.preventDefault()
        }
        openDialog(dialog, event.currentTarget)
      }}
      {...props}
    />
  )
}

export { DialogTriggerButton }
