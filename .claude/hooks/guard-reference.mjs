// PreToolUse: only the content-writer agent may access reference/
let input = ""
process.stdin.on("data", (chunk) => (input += chunk))
process.stdin.on("end", () => {
  const data = JSON.parse(input)
  if (data.agent_type === "content-writer") return // the content agent is allowed

  const t = data.tool_input ?? {}
  const target = [t.file_path, t.path, t.pattern, t.command]
    .filter(Boolean)
    .join(" ")
  if (!target.includes("reference/")) return // not about reference/, so allow

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
