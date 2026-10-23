export { cn } from "cn"

export function whatsappHref(e164: string, message: string) {
  return `https://wa.me/${e164.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
}

// "Capt. Vikram Negi (Retd.)" → "VN": first and last name initials, without
// titles ("Capt.") or bracketed notes.
export function initials(name: string) {
  const words = name
    .replace(/\([^)]*\)/g, "")
    .split(/\s+/)
    .filter((w) => w && !w.endsWith("."))
  const first = words[0]?.[0] ?? ""
  const last = words.length > 1 ? words[words.length - 1][0] : ""
  return (first + last).toUpperCase()
}
