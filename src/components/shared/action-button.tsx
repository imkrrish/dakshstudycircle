import type { ComponentProps } from "react"
import {
  Facebook01Icon,
  InstagramIcon,
  Location01Icon,
  NewTwitterIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"
import Link from "next/link"

import { DialogTriggerButton } from "@/components/shared/dialog-trigger-button"
import { whatsappButtonClass } from "@/components/shared/whatsapp-styles"
import { Button as UiButton, buttonVariants } from "@/components/ui/button"
import { getSite } from "@/lib/content"
import type { Button, SocialPlatform } from "@/lib/content"
import { whatsappHref } from "@/lib/utils"

const socialIcons = {
  facebook: Facebook01Icon,
  x: NewTwitterIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
} satisfies Record<SocialPlatform, IconSvgElement>

// A quiet button is a text link: its label gets the underline draw.
function Label({ button }: { button: Button }) {
  return button.variant === "quiet" ? (
    <span className="link-draw-label">{button.label}</span>
  ) : (
    button.label
  )
}

const variantMap = {
  primary: "default",
  secondary: "secondary",
  outline: "outline",
  quiet: "ghost",
} as const

// A button that opens an external address (map, social profile) in a new tab.
function ExternalButton({
  href,
  icon,
  button,
  className,
  size,
  ...dataAttributes
}: {
  href: string
  icon: IconSvgElement
  button: Button
  className?: string
  size?: ComponentProps<typeof UiButton>["size"]
  [attribute: `data-${string}`]: string | boolean | undefined
}) {
  return (
    <a
      data-slot="action-button"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({
          variant: variantMap[button.variant ?? "primary"],
          size,
        }),
        "focus-ring",
        className,
      )}
      {...dataAttributes}
    >
      <HugeiconsIcon
        icon={icon}
        strokeWidth={2}
        data-icon="inline-start"
        aria-hidden="true"
      />
      <Label button={button} />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

async function DirectionsButton(props: {
  button: Button
  className?: string
  size?: ComponentProps<typeof UiButton>["size"]
  [attribute: `data-${string}`]: string | boolean | undefined
}) {
  const { mapUrl } = (await getSite()).contact
  if (!mapUrl) return null
  return <ExternalButton href={mapUrl} icon={Location01Icon} {...props} />
}

// A tel: link to the primary number (site.contact.phones[0]).
async function CallButton({
  button,
  className,
  size,
  showNumber = true,
  ...dataAttributes
}: {
  button: Button
  className?: string
  size?: ComponentProps<typeof UiButton>["size"]
  // False when the number is already set large next to the button.
  showNumber?: boolean
  [attribute: `data-${string}`]: string | boolean | undefined
}) {
  const [primary] = (await getSite()).contact.phones
  if (!primary) return null
  return (
    <a
      data-slot="action-button"
      href={`tel:${primary.e164}`}
      className={cn(
        buttonVariants({
          variant: variantMap[button.variant ?? "primary"],
          size,
        }),
        "focus-ring",
        className,
      )}
      {...dataAttributes}
    >
      <Label button={button} />
      {showNumber && ` ${primary.display}`}
    </a>
  )
}

// WhatsApp chat with the primary number, prefilled with the site message.
async function WhatsappButton(props: {
  button: Button
  className?: string
  size?: ComponentProps<typeof UiButton>["size"]
  [attribute: `data-${string}`]: string | boolean | undefined
}) {
  const { phones, whatsappMessage } = (await getSite()).contact
  const [primary] = phones
  if (!primary) return null
  return (
    <ExternalButton
      href={whatsappHref(primary.e164, whatsappMessage)}
      icon={WhatsappIcon}
      {...props}
      button={{ ...props.button, variant: "outline" }}
      className={cn(whatsappButtonClass, props.className)}
    />
  )
}

async function SocialButton({
  platform,
  ...props
}: {
  platform: SocialPlatform
  button: Button
  className?: string
  size?: ComponentProps<typeof UiButton>["size"]
  [attribute: `data-${string}`]: string | boolean | undefined
}) {
  const social = (await getSite()).socials.find((s) => s.platform === platform)
  if (!social) return null
  return (
    <ExternalButton href={social.url} icon={socialIcons[platform]} {...props} />
  )
}

async function ContactDialogButton({
  button,
  ...props
}: Omit<ComponentProps<typeof DialogTriggerButton>, "dialog"> & {
  button: Button
}) {
  const [firstPhone] = (await getSite()).contact.phones
  return (
    <DialogTriggerButton
      dialog="contact"
      fallbackHref={firstPhone && `tel:${firstPhone.e164}`}
      {...props}
    >
      <Label button={button} />
    </DialogTriggerButton>
  )
}

function ActionButton({
  button,
  className,
  size,
  showNumber,
  ...dataAttributes
}: {
  button: Button
  className?: string
  size?: ComponentProps<typeof UiButton>["size"]
  // Call button only: show the number in the label (default) or just the word.
  showNumber?: boolean
  [attribute: `data-${string}`]: string | boolean | undefined
}) {
  const variant = variantMap[button.variant ?? "primary"]
  const { action } = button

  switch (action.type) {
    case "link": {
      const { href } = action
      const isInternal = href.startsWith("/") || href.startsWith("#")
      const isWeb = /^https?:\/\//.test(href)
      const linkProps = {
        "data-slot": "action-button",
        className: cn(
          buttonVariants({ variant, size }),
          "focus-ring",
          className,
        ),
        ...dataAttributes,
      }
      if (isInternal) {
        return (
          <Link href={href} {...linkProps}>
            <Label button={button} />
          </Link>
        )
      }
      return (
        <a
          href={href}
          {...(isWeb && { target: "_blank", rel: "noopener noreferrer" })}
          {...linkProps}
        >
          <Label button={button} />
          {isWeb && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      )
    }
    case "contact-dialog":
      return (
        <ContactDialogButton
          data-slot="action-button"
          button={button}
          variant={variant}
          size={size}
          className={cn("focus-ring", className)}
          {...dataAttributes}
        />
      )
    case "call":
      return (
        <CallButton
          button={button}
          size={size}
          showNumber={showNumber}
          className={className}
          {...dataAttributes}
        />
      )
    case "whatsapp":
      return (
        <WhatsappButton
          button={button}
          size={size}
          className={className}
          {...dataAttributes}
        />
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
    case "social":
      return (
        <SocialButton
          platform={action.platform}
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
