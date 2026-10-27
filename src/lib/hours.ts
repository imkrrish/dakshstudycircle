import type { Site } from "@/lib/content-schema"

type OpeningHours = Site["contact"]["hours"][number]

const DAY_LABELS: Record<OpeningHours["from"], string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
}

// "09:00" → "9 am", "18:30" → "6:30 pm", "12:00" → "12 pm".
function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number)
  const hour = h % 12 === 0 ? 12 : h % 12
  const suffix = h < 12 ? "am" : "pm"
  return `${hour}${m ? `:${String(m).padStart(2, "0")}` : ""} ${suffix}`
}

// One display row per entry: "Mon–Sat, 9 am – 8 pm".
function formatHours(hours: OpeningHours[]): string[] {
  return hours.map(({ from, to, opens, closes }) => {
    const days = to ? `${DAY_LABELS[from]}–${DAY_LABELS[to]}` : DAY_LABELS[from]
    return `${days}, ${formatTime(opens)} – ${formatTime(closes)}`
  })
}

// "9", "9:30": no am/pm, for tight rows. "Mon–Sat 9–8 · Sun 9–6".
function formatHoursShort(hours: OpeningHours[]): string {
  const clock = (time: string) => {
    const [h, m] = time.split(":").map(Number)
    return `${h % 12 === 0 ? 12 : h % 12}${m ? `:${String(m).padStart(2, "0")}` : ""}`
  }
  return hours
    .map(({ from, to, opens, closes }) => {
      const days = to ? `${DAY_LABELS[from]}–${DAY_LABELS[to]}` : DAY_LABELS[from]
      return `${days} ${clock(opens)}–${clock(closes)}`
    })
    .join(" · ")
}

// All rows on one line, for running text such as faq answers.
function formatHoursInline(hours: OpeningHours[]): string {
  return formatHours(hours).join("; ")
}

export { formatHours, formatHoursInline, formatHoursShort }
