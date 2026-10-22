import { useSyncExternalStore } from "react"

const QUERY = "(min-width: 48rem)" // Tailwind `md`

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}

// Server snapshot is false; the dialog renders nothing until opened, so there
// is no hydration mismatch or layout shift.
function useIsDesktop() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}

export { useIsDesktop }
