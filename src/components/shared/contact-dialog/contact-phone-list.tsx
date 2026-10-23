"use client"

import { useEffect, useRef, useState, type ComponentProps } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Call02Icon,
  Copy01Icon,
  Tick02Icon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { whatsappHref } from "@/lib/utils"
import type { ContactDialogData } from "./types"

const COPIED_MS = 2000

function ContactPhoneList({
  phones,
  whatsappMessage,
  className,
  ...props
}: ComponentProps<"div"> &
  Pick<ContactDialogData, "phones" | "whatsappMessage">) {
  const [copied, setCopied] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy(display: string) {
    try {
      await navigator.clipboard.writeText(display)
    } catch {
      return
    }
    setCopied(display)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(null), COPIED_MS)
  }

  return (
    <div
      data-slot="contact-phone-list"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      <ul className="flex flex-col divide-y divide-border">
        {phones.map((phone) => {
          const isCopied = copied === phone.display
          return (
            <li
              key={phone.e164}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex min-w-0 flex-col">
                <span className="text-sm text-muted-foreground">
                  {phone.label}
                </span>
                <span className="text-base font-medium">{phone.display}</span>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  nativeButton={false}
                  render={
                    <a
                      href={`tel:${phone.e164}`}
                      data-track="call"
                      aria-label={`Call ${phone.display}`}
                    />
                  }
                >
                  <HugeiconsIcon icon={Call02Icon} aria-hidden="true" />
                </Button>
                {phone.whatsapp && (
                  <Button
                    variant="outline"
                    size="icon"
                    nativeButton={false}
                    render={
                      <a
                        href={whatsappHref(phone.e164, whatsappMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-track="whatsapp"
                        aria-label={`WhatsApp ${phone.display}`}
                      />
                    }
                  >
                    <HugeiconsIcon icon={WhatsappIcon} aria-hidden="true" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  data-track="copy"
                  aria-label={`Copy ${phone.display}`}
                  onClick={() => copy(phone.display)}
                >
                  <HugeiconsIcon
                    icon={isCopied ? Tick02Icon : Copy01Icon}
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </li>
          )
        })}
      </ul>
      <p role="status" aria-live="polite" className="sr-only">
        {copied ? `Copied ${copied}` : ""}
      </p>
    </div>
  )
}

export { ContactPhoneList }
