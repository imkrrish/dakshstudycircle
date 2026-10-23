// PreToolUse: only the content-writer agent may access the project-root reference/ folder.
// Other folders named "reference" (e.g. inside skills) are not affected.
import { resolve, sep } from "node:path"

const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd()
const privateDir = resolve(root, "reference")

// A file or folder path that resolves to <project>/reference or anything inside it
function isPrivatePath(p) {
  if (typeof p !== "string" || p === "") return false
  const full = resolve(root, p)
  return full === privateDir || full.startsWith(privateDir + sep)
}

// A shell command that names the private folder: "reference/...", "./reference", or the absolute path.
// "skills/impeccable/reference/..." is NOT matched, because "reference" there follows a "/".
function commandTouchesPrivate(cmd) {
  if (typeof cmd !== "string") return false
  return (
    cmd.includes(privateDir) ||
    /(^|[\s"'=(])(\.\/)?reference(\/|\s|$|["')])/.test(cmd)
  )
}

let input = ""
process.stdin.on("data", (chunk) => (input += chunk))
process.stdin.on("end", () => {
  const data = JSON.parse(input)
  if (data.agent_type === "content-writer") return

  const t = data.tool_input ?? {}
  const blocked =
    isPrivatePath(t.file_path) ||
    isPrivatePath(t.path) ||
    (data.tool_name === "Glob" && isPrivatePath(t.pattern)) ||
    commandTouchesPrivate(t.command)
  if (!blocked) return

  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason:
          "reference/ is private to the content-writer agent. Ask that agent for content instead.",
      },
    }),
  )
})
