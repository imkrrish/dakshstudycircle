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

const COPIED_MS = 1500

type CopyState = { display: string; status: "copied" | "failed" } | null

// Every action is at least 2.75rem tall (touch target).
const action = "h-11 gap-2 px-3 text-base"

function ContactPhoneList({
  phones,
  whatsappMessage,
  className,
  ...props
}: ComponentProps<"div"> &
  Pick<ContactDialogData, "phones" | "whatsappMessage">) {
  const [copy, setCopy] = useState<CopyState>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function copyNumber(display: string) {
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(display)
    } catch {
      // Missing API, denied permission or a throw: the number stays visible.
      setCopy({ display, status: "failed" })
      return
    }
    setCopy({ display, status: "copied" })
    timer.current = setTimeout(() => setCopy(null), COPIED_MS)
  }

  return (
    <div
      data-slot="contact-phone-list"
      className={cn("flex flex-col", className)}
      {...props}
    >
      <ul className="flex flex-col divide-y divide-border">
        {phones.map((phone, index) => {
          const state = copy?.display === phone.display ? copy.status : null
          return (
            <li
              key={phone.e164}
              className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0"
            >
              <div className="flex flex-col">
                {phone.label && (
                  <span className="text-sm text-muted-foreground">
                    {phone.label}
                  </span>
                )}
                <span className="text-xl font-medium tabular-nums">
                  {phone.display}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={index === 0 ? "default" : "outline"}
                  nativeButton={false}
                  className={cn(action, "flex-1")}
                  render={
                    <a
                      href={`tel:${phone.e164}`}
                      data-track="call"
                      aria-label={`Call ${phone.display}`}
                    />
                  }
                >
                  <HugeiconsIcon icon={Call02Icon} aria-hidden="true" />
                  Call
                </Button>
                {phone.whatsapp && (
                  <Button
                    variant="outline"
                    nativeButton={false}
                    className={cn(action, "flex-1")}
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
                    WhatsApp
                  </Button>
                )}
                <Button
                  variant="outline"
                  data-track="copy"
                  aria-label={`Copy ${phone.display}`}
                  className={cn(action, "min-w-11")}
                  onClick={() => copyNumber(phone.display)}
                >
                  <HugeiconsIcon
                    key={state === "copied" ? "copied" : "copy"}
                    icon={state === "copied" ? Tick02Icon : Copy01Icon}
                    aria-hidden="true"
                    className={state === "copied" ? "copy-pop" : undefined}
                  />
                  {/* The label never changes: a longer "Copied" pushed the row
                      past the drawer at 375. The check icon and the live region
                      below carry the feedback, and the button keeps its width. */}
                  Copy
                </Button>
              </div>
              <p
                role="status"
                aria-live="polite"
                className={cn(state !== "failed" && "sr-only", "text-sm")}
              >
                {state === "copied" && `Copied ${phone.display}`}
                {state === "failed" &&
                  `Couldn't copy. The number is ${phone.display}`}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { ContactPhoneList }
