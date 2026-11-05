import { formatHoursInline, formatHoursShort } from "@/lib/hours"
import type { Site } from "./site"

// Site facts that faq text may use as {address}, {phones}, {hours}, {landmark}
// and {metro}. The last two exist only when set in site.contact.
export function contactPlaceholders(site: Site): Record<string, string> {
  const { address, phones, hours, landmark, nearestMetro } = site.contact
  return {
    // Same one-line format as the footer.
    address: [
      address.line1,
      address.line2,
      address.locality,
      `${address.city}, ${address.state} ${address.postalCode}`,
    ]
      .filter(Boolean)
      .join(", "),
    phones: new Intl.ListFormat("en-IN", { type: "disjunction" }).format(
      phones.map((p) => p.display),
    ),
    hours: formatHoursInline(hours),
    ...(landmark ? { landmark } : {}),
    ...(nearestMetro ? { metro: nearestMetro } : {}),
  }
}

// Centre-wide facts that hero fact values and teaching-plan details may use: {hours}, {batchSize}, {modes}, {freeDemo}.
export function heroPlaceholders(site: Site): Record<string, string> {
  return {
    hours: formatHoursShort(site.contact.hours),
    batchSize: site.facts.batchSize,
    modes: site.facts.modes,
    freeDemo: site.facts.freeDemo,
  }
}

export const PLACEHOLDER_PATTERN = /\{(\w+)\}/g

// An unknown {name} in faq text or hero facts would ship as literal braces, so it fails the build.
export function checkPlaceholders(
  label: string,
  sections: Array<{ type: string; id: string; [key: string]: unknown }>,
  known: Set<string>,
  knownHero: Set<string>,
  errors: string[],
) {
  for (const section of sections) {
    if (section.type === "hero") {
      const facts = section.facts as { items: Array<{ value: string }> } | undefined
      facts?.items.forEach((item, i) => {
        for (const [, name] of item.value.matchAll(PLACEHOLDER_PATTERN)) {
          if (knownHero.has(name)) continue
          errors.push(
            `${label}: hero "${section.id}" fact ${i + 1}: unknown placeholder {${name}}. Known: ${[...knownHero].map((k) => `{${k}}`).join(", ")}`,
          )
        }
      })
      continue
    }
    if (section.type === "teaching-plan") {
      const details = section.details as Array<{ value: string }> | undefined
      details?.forEach((item, i) => {
        for (const [, name] of item.value.matchAll(PLACEHOLDER_PATTERN)) {
          if (knownHero.has(name)) continue
          errors.push(
            `${label}: teaching-plan "${section.id}" detail ${i + 1}: unknown placeholder {${name}}. Known: ${[...knownHero].map((k) => `{${k}}`).join(", ")}`,
          )
        }
      })
      continue
    }
    if (section.type !== "faq") continue
    const unknownIn = (text: string, where: string) => {
      for (const [, name] of text.matchAll(PLACEHOLDER_PATTERN)) {
        if (known.has(name)) continue
        errors.push(
          `${label}: faq "${section.id}" ${where}: unknown placeholder {${name}}. Known: ${[...known].map((k) => `{${k}}`).join(", ")}`,
        )
      }
    }
    if (typeof section.intro === "string") unknownIn(section.intro, "intro")
    const items = section.items as Array<{ question: string; answer: string }> | undefined
    items?.forEach((item, i) => {
      for (const text of [item.question, item.answer]) {
        for (const [, name] of text.matchAll(PLACEHOLDER_PATTERN)) {
          if (known.has(name)) continue
          errors.push(
            `${label}: faq "${section.id}" item ${i + 1}: unknown placeholder {${name}}. Known: ${[...known].map((k) => `{${k}}`).join(", ")}`,
          )
        }
      }
    })
  }
}
