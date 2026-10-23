import type { ComponentProps } from "react"
import { Location01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"
import Link from "next/link"

import { DialogTriggerButton } from "@/components/shared/dialog-trigger-button"
import { Button as UiButton } from "@/components/ui/button"
import { getSite } from "@/lib/content"
import type { Button } from "@/lib/content-schema"

const variantMap = {
  primary: "default",
  secondary: "secondary",
  outline: "outline",
  quiet: "ghost",
} as const

async function DirectionsButton({
  button,
  className,
  size,
  ...dataAttributes
}: {
  button: Button
  className?: string
  size?: ComponentProps<typeof UiButton>["size"]
  [attribute: `data-${string}`]: string | boolean | undefined
}) {
  const { mapUrl } = (await getSite()).contact
  if (!mapUrl) return null

  return (
    <UiButton
      data-slot="action-button"
      variant={variantMap[button.variant ?? "primary"]}
      size={size}
      className={cn("focus-ring", className)}
      {...dataAttributes}
      nativeButton={false}
      render={<a href={mapUrl} target="_blank" rel="noopener noreferrer" />}
    >
      <HugeiconsIcon
        icon={Location01Icon}
        strokeWidth={2}
        data-icon="inline-start"
        aria-hidden="true"
      />
      {button.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </UiButton>
  )
}

function ActionButton({
  button,
  className,
  size,
  ...dataAttributes
}: {
  button: Button
  className?: string
  size?: ComponentProps<typeof UiButton>["size"]
  [attribute: `data-${string}`]: string | boolean | undefined
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
          {...dataAttributes}
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
          {...dataAttributes}
        >
          {button.label}
        </DialogTriggerButton>
      )
    case "directions":
      return (
        <DirectionsButton
          button={button}
          size={size}
          className={className}
          {...dataAttributes}
        />
      )
    default: {
      const unhandled: never = action
      throw new Error(`[ActionButton] unhandled action: ${String(unhandled)}`)
    }
  }
}

export { ActionButton }
