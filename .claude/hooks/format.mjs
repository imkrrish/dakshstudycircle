// Runs after Claude edits or writes a file: formats it with Prettier.
// Prints nothing, so it adds zero tokens to Claude's context.
import { execFileSync } from "node:child_process"
import { join } from "node:path"

let input = ""
process.stdin.on("data", (chunk) => (input += chunk))
process.stdin.on("end", () => {
  const file = JSON.parse(input).tool_input?.file_path
  if (!file || !/\.(tsx?|jsx?|css|json|md)$/.test(file)) return

  const prettier = join(
    process.env.CLAUDE_PROJECT_DIR,
    "node_modules/.bin/prettier",
  )
  try {
    execFileSync(prettier, ["--write", "--log-level", "silent", file], {
      stdio: "ignore",
    })
  } catch {
    // If formatting fails, never block Claude's work
  }
})
