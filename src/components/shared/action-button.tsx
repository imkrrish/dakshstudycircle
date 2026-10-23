import type { ComponentProps } from "react"
import { cn } from "cn"
import Link from "next/link"

import { DialogTriggerButton } from "@/components/shared/dialog-trigger-button"
import { Button as UiButton } from "@/components/ui/button"
import type { Button } from "@/lib/content-schema"

const variantMap = {
  primary: "default",
  secondary: "secondary",
  outline: "outline",
} as const

function ActionButton({
  button,
  className,
  size,
}: {
  button: Button
  className?: string
  size?: ComponentProps<typeof UiButton>["size"]
}) {
  const variant = variantMap[button.variant ?? "primary"]
  const { action } = button

  switch (action.type) {
    case "link": {
      const { href } = action
      const isInternal = href.startsWith("/") || href.startsWith("#")
      const isWeb = /^https?:\/\//.test(href)
      return (
        <UiButton
          data-slot="action-button"
          variant={variant}
          size={size}
          className={cn("focus-ring", className)}
          nativeButton={false}
          render={
            isInternal ? (
              <Link href={href} />
            ) : isWeb ? (
              <a href={href} target="_blank" rel="noopener noreferrer" />
            ) : (
              <a href={href} />
            )
          }
        >
          {button.label}
        </UiButton>
      )
    }
    case "contact-dialog":
      return (
        <DialogTriggerButton
          data-slot="action-button"
          dialog="contact"
          variant={variant}
          size={size}
          className={cn("focus-ring", className)}
        >
          {button.label}
        </DialogTriggerButton>
      )
    default: {
      const unhandled: never = action
      throw new Error(`[ActionButton] unhandled action: ${String(unhandled)}`)
    }
  }
}

export { ActionButton }
