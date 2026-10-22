// Work log: appends to .claude/worklog/YYYY-MM.md and never reads it into Claude's context.
// - As a PostToolUse hook: logs file writes, edits, moves and deletes automatically.
// - As a command: node .claude/hooks/worklog.mjs note "summary" for Claude's task summary.
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs"
import { join, relative } from "node:path"

const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd()
const dir = join(root, ".claude/worklog")
const stamp = new Date().toLocaleString("sv-SE") // "2026-10-22 10:41:05", local time
const file = join(dir, `${stamp.slice(0, 7)}.md`) // one file per month

function append(text) {
  mkdirSync(dir, { recursive: true })
  appendFileSync(file, text + "\n")
}

if (process.argv[2] === "note") {
  append(`\n### ${stamp.slice(0, 16)}: ${process.argv.slice(3).join(" ")}`)
} else {
  let input = ""
  process.stdin.on("data", (chunk) => (input += chunk))
  process.stdin.on("end", () => {
    try {
      const data = JSON.parse(input)
      const t = data.tool_input ?? {}
      const who = data.agent_type ? ` (${data.agent_type})` : ""
      let entry
      if (data.tool_name === "Write" || data.tool_name === "Edit") {
        entry = `${data.tool_name === "Write" ? "wrote" : "edited"} ${relative(root, t.file_path)}${who}`
      } else if (
        data.tool_name === "Bash" &&
        /\b(rm|rmdir|mv)\b/.test(t.command ?? "")
      ) {
        entry = `ran: ${t.command}${who}`
      }
      if (!entry) return
      // Skip repeats: five edits to the same file in a row become one line
      if (
        existsSync(file) &&
        readFileSync(file, "utf8").trimEnd().endsWith(entry)
      )
        return
      append(`- ${stamp.slice(11, 16)} ${entry}`)
    } catch {
      // Logging must never block Claude's work
    }
  })
}
