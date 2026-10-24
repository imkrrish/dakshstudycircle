import "./theme-lab.css"

import { ThemeApplier } from "./theme-applier"
import { ThemeLabPanel } from "./theme-lab-panel"

// TEMPORARY: branch-only theme switcher for the director demo. Never merge.
function ThemeLab() {
  return (
    <>
      <ThemeApplier />
      <ThemeLabPanel />
    </>
  )
}

export { ThemeLab }
