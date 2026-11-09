"use client"

import { useId, useRef, useState, type ComponentProps } from "react"
import { WhatsappIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"
import type { SectionOf } from "@/lib/content"
import { whatsappButtonClass } from "@/components/shared/whatsapp-styles"
import { whatsappHref } from "@/lib/utils"

type FormData = SectionOf<"contact-reach">["form"]

type FormRules = {
  name: { min: number; max: number }
  question: { max: number }
}

type Values = { name: string; course: string; question: string }

const NAME_ERROR = "Please enter your name."
const COURSE_ERROR = "Please choose a class or course."

// Newlines, control characters and runs of spaces become one space.
function clean(value: string) {
  return value
    .replace(/\p{Cc}+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function buildMessage(
  form: FormData,
  rules: FormRules,
  values: Values,
): string {
  const course = form.courseOptions.find((o) => o.value === values.course)
  const filled: Record<string, string> = {
    name: clean(values.name).slice(0, rules.name.max),
    course: course ? clean(course.message) : "",
    question: clean(values.question).slice(0, rules.question.max),
  }
  return clean(
    form.message
      .filter((part) => {
        if (!part.optional) return true
        const tokens = [...part.text.matchAll(/\{(\w+)\}/g)].map((m) => m[1])
        return tokens.every((token) => filled[token])
      })
      .map((part) =>
        part.text.replace(
          /\{(\w+)\}/g,
          (_, token: string) => filled[token] ?? "",
        ),
      )
      .join(" "),
  )
}

// Shared look for the three controls: the paper field, the site's focus ring
// and 16px text (below that, iOS zooms the page when a field is focused).
const control =
  "rounded-sm border-input bg-background text-base md:text-base focus-visible:ring-0 focus-visible:border-input focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:border-destructive aria-invalid:ring-0"

const labelClass = "text-sm font-medium"

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null
  return (
    <p id={id} className="text-sm text-destructive">
      {children}
    </p>
  )
}

// The WhatsApp prefill form. Nothing is stored or sent to our server: the
// fields build a wa.me message for the primary number and open it in a new tab.
function ContactWhatsappForm({
  form,
  phone,
  rules,
  className,
  ...props
}: Omit<ComponentProps<"form">, "onSubmit"> & {
  form: FormData
  phone: string
  rules: FormRules
}) {
  const id = useId()
  const nameRef = useRef<HTMLInputElement>(null)
  const courseRef = useRef<HTMLSelectElement>(null)
  const [values, setValues] = useState<Values>({
    name: "",
    course: "",
    question: "",
  })
  const [submitted, setSubmitted] = useState(false)

  // Checked on submit, then live, so a fixed field loses its error as you type.
  const errors = submitted
    ? {
        name:
          clean(values.name).length < rules.name.min ? NAME_ERROR : undefined,
        course: values.course === "" ? COURSE_ERROR : undefined,
      }
    : { name: undefined, course: undefined }

  const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault()
    setSubmitted(true)
    if (clean(values.name).length < rules.name.min) {
      nameRef.current?.focus()
      return
    }
    if (values.course === "") {
      courseRef.current?.focus()
      return
    }
    window.open(
      whatsappHref(phone, buildMessage(form, rules, values)),
      "_blank",
      "noopener",
    )
  }

  const nameId = `${id}-name`
  const courseId = `${id}-course`
  const questionId = `${id}-question`

  return (
    <form
      data-slot="contact-whatsapp-form"
      noValidate
      aria-labelledby={`${id}-heading`}
      onSubmit={onSubmit}
      // The fields need JavaScript; without it the buttons above are the way in.
      className={cn(
        "bg-background sm:border sm:border-foreground/20 sm:p-1.5 noscript:hidden",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-5 border border-foreground/20 px-4 py-8 sm:px-8 sm:py-10">
        <h3 id={`${id}-heading`} className="font-heading text-title">
          {form.heading}
        </h3>

        <div className="flex flex-col gap-2">
          <label htmlFor={nameId} className={labelClass}>
            {form.fields.name.label}
          </label>
          <Input
            ref={nameRef}
            id={nameId}
            type="text"
            autoComplete="name"
            maxLength={rules.name.max}
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            className={cn(control, "h-11 px-4")}
          />
          <FieldError id={`${nameId}-error`}>{errors.name}</FieldError>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={courseId} className={labelClass}>
            {form.fields.course.label}
          </label>
          <NativeSelect
            ref={courseRef}
            id={courseId}
            aria-required="true"
            aria-invalid={errors.course ? true : undefined}
            aria-describedby={errors.course ? `${courseId}-error` : undefined}
            value={values.course}
            onChange={(e) => setValues({ ...values, course: e.target.value })}
            className={cn(
              "w-full",
              "[&>select]:h-11 [&>select]:rounded-sm [&>select]:pr-10 [&>select]:pl-4",
              values.course === "" && "[&>select]:text-muted-foreground",
              "[&>select]:border-input [&>select]:bg-background [&>select]:text-base",
              "[&>select]:focus-visible:border-input [&>select]:focus-visible:ring-0 [&>select]:focus-visible:outline-2 [&>select]:focus-visible:outline-offset-2 [&>select]:focus-visible:outline-ring",
              "[&>select]:aria-invalid:border-destructive [&>select]:aria-invalid:ring-0",
              "[&>svg]:right-4",
            )}
          >
            <NativeSelectOption value="" disabled>
              {form.fields.course.placeholder}
            </NativeSelectOption>
            {form.courseOptions.map((option) => (
              <NativeSelectOption key={option.value} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <FieldError id={`${courseId}-error`}>{errors.course}</FieldError>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={questionId} className={labelClass}>
            {form.fields.question.label}{" "}
            <span className="font-normal text-muted-foreground">
              {form.fields.question.optionalNote}
            </span>
          </label>
          <Textarea
            id={questionId}
            maxLength={rules.question.max}
            value={values.question}
            onChange={(e) => setValues({ ...values, question: e.target.value })}
            className={cn(control, "min-h-24 px-4 py-3")}
          />
        </div>

        <Button
          type="submit"
          variant="outline"
          size="lg"
          className={cn(
            whatsappButtonClass,
            "mt-1 h-11 w-full gap-2 px-5 text-base focus-ring sm:w-auto sm:self-start",
          )}
        >
          <HugeiconsIcon
            icon={WhatsappIcon}
            strokeWidth={2}
            data-icon="inline-start"
            aria-hidden="true"
          />
          {form.submitLabel}
          <span className="sr-only"> (opens in a new tab)</span>
        </Button>
      </div>
    </form>
  )
}

export { ContactWhatsappForm }
