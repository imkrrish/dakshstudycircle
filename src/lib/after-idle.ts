// Runs `run` once the window has loaded and the browser is idle, so decoration
// never competes with the first paint or LCP. Returns a cancel function.
// Safari has no requestIdleCallback, so a short timeout stands in.
function afterLoadIdle(run: () => void) {
  let cancelled = false
  let idleHandle = 0

  const schedule = () => {
    const go = () => {
      if (!cancelled) run()
    }
    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(go, { timeout: 2000 })
    } else {
      idleHandle = window.setTimeout(go, 200)
    }
  }

  if (document.readyState === "complete") schedule()
  else window.addEventListener("load", schedule, { once: true })

  return () => {
    cancelled = true
    window.removeEventListener("load", schedule)
    if (typeof window.cancelIdleCallback === "function") {
      window.cancelIdleCallback(idleHandle)
    } else {
      window.clearTimeout(idleHandle)
    }
  }
}

export { afterLoadIdle }
