"use client"

import { useId, type ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import { useDialogStore, type DialogName } from "@/lib/stores/dialog-store"

function DialogTriggerButton({
  dialog,
  id,
  onClick,
  ...props
}: Omit<ComponentProps<typeof Button>, "render"> & { dialog: DialogName }) {
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
      onClick={(event) => {
        onClick?.(event)
        openDialog(dialog, event.currentTarget)
      }}
      {...props}
    />
  )
}

export { DialogTriggerButton }
