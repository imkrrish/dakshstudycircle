import { z } from "zod"
import { ButtonSchema, sectionBase, type LoadedContent } from "../shared"

// The only {tokens} a form message part may use.
const MESSAGE_TOKENS = ["name", "course", "question"] as const

const TOKEN_PATTERN = /\{(\w+)\}/g

const MessagePartSchema = z.strictObject({
  text: z.string().min(1),
  // Dropped from the message when the field it names is empty.
  optional: z.boolean().optional(),
})

// The WhatsApp prefill form. Data and rules only: the form UI comes with the
// contact-reach design run. Nothing is stored or sent to a server; the fields
// build a wa.me message for phones[0].
const ContactFormSchema = z
  .strictObject({
    heading: z.string().min(1),
    submitLabel: z.string().min(1),
    fields: z.strictObject({
      name: z.strictObject({ label: z.string().min(1) }),
      course: z.strictObject({
        label: z.string().min(1),
        // The disabled first option of the picker. Never submitted.
        placeholder: z.string().min(1),
      }),
      question: z.strictObject({
        label: z.string().min(1),
        // Shown after the label, e.g. "(optional)".
        optionalNote: z.string().min(1),
      }),
    }),
    // The last option of the course field. `message` is the text that goes
    // into {course} when it is picked.
    notSure: z.strictObject({
      label: z.string().min(1),
      message: z.string().min(1),
    }),
    // Ordered parts, joined with one space. Tokens: {name}, {course}, {question}.
    message: z.array(MessagePartSchema).min(1),
  })
  .superRefine((form, ctx) => {
    form.message.forEach((part, i) => {
      for (const [, token] of part.text.matchAll(TOKEN_PATTERN)) {
        if (!(MESSAGE_TOKENS as readonly string[]).includes(token)) {
          ctx.addIssue({
            code: "custom",
            path: ["message", i, "text"],
            message: `unknown token {${token}}. Allowed: ${MESSAGE_TOKENS.map((t) => `{${t}}`).join(", ")}`,
          })
        }
      }
    })
  })

export const ContactReachSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("contact-reach"),
  heading: z.string().min(1),
  intro: z.string().optional(),
  // "call" and "whatsapp" actions target phones[0]. The call button adds the
  // number itself, so it is never typed in page data.
  actions: z.array(ButtonSchema).min(1),
  whatsappNote: z.string().min(1),
  emailLabel: z.string().min(1),
  form: ContactFormSchema,
})

// Field rules for the form UI (not used yet). The course value must be one of
// `form.courseOptions`. Free text has newlines and control characters collapsed
// to a single space before it goes into the message.
export const CONTACT_FORM_RULES = {
  name: { trim: true, min: 1, max: 60 },
  question: { max: 300 },
  collapseWhitespace: true,
} as const

export type ContactReachSection = z.infer<typeof ContactReachSectionSchema>

export type ResolvedContactReachSection = Omit<ContactReachSection, "form"> & {
  // phones[0]: the number the call, WhatsApp and form target.
  primary: { e164: string; display: string } | null
  // Every phone after the primary one.
  otherPhones: Array<{ e164: string; display: string }>
  emails: string[]
  form: ContactReachSection["form"] & {
    courseOptions: Array<{ value: string; label: string; message: string }>
  }
}

// ---------- Resolving ----------

export function resolveContactReach(
  section: ContactReachSection,
  content: LoadedContent,
): ResolvedContactReachSection {
  const { phones, emails } = content.site.contact
  const { notSure } = section.form
  return {
    ...section,
    primary: phones[0]
      ? { e164: phones[0].e164, display: phones[0].display }
      : null,
    otherPhones: phones
      .slice(1)
      .map(({ e164, display }) => ({ e164, display })),
    emails,
    form: {
      ...section.form,
      courseOptions: [
        ...content.courses.map((course) => ({
          value: course.slug,
          label: course.title,
          message: course.title,
        })),
        { value: "not-sure", label: notSure.label, message: notSure.message },
      ],
    },
  }
}
