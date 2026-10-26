import { cva } from "class-variance-authority"
import Image from "next/image"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { ActionButton } from "@/components/shared/action-button"
import type { SectionOf } from "@/lib/content-schema"

const splitMediaVariants = cva("", {
  variants: {
    imagePosition: {
      left: "",
      right: "md:order-last",
    },
  },
  defaultVariants: { imagePosition: "left" },
})

function SplitSection({ section }: { section: SectionOf<"split"> }) {
  const {
    id,
    eyebrow,
    heading,
    body,
    attribution,
    image,
    imagePosition,
    tone,
    actions,
  } = section
  const [name, ...roleParts] = (attribution ?? "").split(" · ")
  const role = roleParts.join(" · ")

  return (
    <Section
      data-slot="split-section"
      id={id}
      tone={tone}
      aria-labelledby={`${id}-heading`}
    >
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
          <div
            className={splitMediaVariants({
              imagePosition,
              className: "md:col-span-5",
            })}
          >
            <div className="mx-auto aspect-4/5 w-full max-w-80 overflow-clip rounded-xl md:max-w-100">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1152px) 400px, (min-width: 768px) 36vw, 320px"
                className="size-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 md:col-span-7">
            <SectionHeading
              id={`${id}-heading`}
              eyebrow={eyebrow}
              title={heading}
            />
            <div className="flex max-w-prose flex-col gap-4 text-base text-foreground/80">
              {body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {attribution && (
              <p className="flex max-w-prose flex-col gap-0.5 border-t pt-4 text-base">
                <span className="font-semibold">{name}</span>
                {role && <span className="text-muted-foreground">{role}</span>}
              </p>
            )}
            {actions && actions.length > 0 && (
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                {actions.map((button) => (
                  <ActionButton
                    key={button.label}
                    button={button}
                    size="lg"
                    className="h-11 w-full sm:h-10 sm:w-auto"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { SplitSection }
