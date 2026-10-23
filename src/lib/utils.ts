export { cn } from "cn"

export function whatsappHref(e164: string, message: string) {
  return `https://wa.me/${e164.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
}
