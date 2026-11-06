// Usage:
//   node scripts/compare-html.mjs save [distDir] [baselineDir]
//   node scripts/compare-html.mjs check [distDir] [baselineDir]

import fs from "node:fs"
import path from "node:path"

const mode = process.argv[2] || "check"
const distDir = path.resolve(process.argv[3] || ".next-verify")
const baselineDir = path.resolve(process.argv[4] || ".html-baseline")

function normalizeHtml(html) {
  return html
    // Next.js build IDs in static URLs: /_next/static/<buildId>/...
    .replace(/\/_next\/static\/[a-zA-Z0-9_-]{16,}\//g, "/_next/static/[BUILD_ID]/")
    // Static chunks with content hashes: chunk-name-<hash>.js (hex or base36/alphanumeric)
    .replace(/\/_next\/static\/chunks\/[a-zA-Z0-9_\-\.\/]+?(\.js|\.css)/g, (match) => {
      return match.replace(/-[a-zA-Z0-9_-]{8,}\.(js|css)$/, "-[HASH].$1")
    })
    // Static CSS hashes
    .replace(/\/_next\/static\/css\/[a-zA-Z0-9_-]+\.css/g, "/_next/static/css/[HASH].css")
    // RSC chunk IDs in self.__next_f.push payloads
    .replace(/[a-zA-Z0-9_\-]{20,}\\/g, "[CHUNK_ID]\\")
    // Build ID in inline script payloads
    .replace(/"buildId":"[^"]+"/g, '"buildId":"[BUILD_ID]"')
    // Next.js runtime script hashes / deployment IDs
    .replace(/"deploymentId":"[^"]+"/g, '"deploymentId":"[DEPLOY_ID]"')
}

function findHtmlFiles(baseDir) {
  const results = []
  function walk(current) {
    if (!fs.existsSync(current)) return
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        results.push(fullPath)
      }
    }
  }
  walk(path.join(baseDir, "server", "app"))
  walk(path.join(baseDir, "server", "pages"))
  return results
}

if (mode === "save") {
  const htmlFiles = findHtmlFiles(distDir)
  if (htmlFiles.length === 0) {
    console.error(`No prerendered HTML files found in ${distDir}`)
    process.exit(1)
  }
  fs.rmSync(baselineDir, { recursive: true, force: true })
  fs.mkdirSync(baselineDir, { recursive: true })

  for (const file of htmlFiles) {
    const rel = path.relative(path.join(distDir, "server"), file)
    const dest = path.join(baselineDir, rel)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    const normalized = normalizeHtml(fs.readFileSync(file, "utf8"))
    fs.writeFileSync(dest, normalized, "utf8")
  }
  console.log(`Saved baseline for ${htmlFiles.length} HTML files into ${baselineDir}`)
} else if (mode === "check" || mode === "compare") {
  if (!fs.existsSync(baselineDir)) {
    console.error(`Baseline directory does not exist: ${baselineDir}`)
    process.exit(1)
  }

  const htmlFiles = findHtmlFiles(distDir)
  let identical = 0
  let differing = 0
  const diffs = []

  for (const file of htmlFiles) {
    const rel = path.relative(path.join(distDir, "server"), file)
    const baseFile = path.join(baselineDir, rel)
    if (!fs.existsSync(baseFile)) {
      console.log(`[NEW ROUTE] ${rel}`)
      differing++
      continue
    }
    const current = normalizeHtml(fs.readFileSync(file, "utf8"))
    const baseline = normalizeHtml(fs.readFileSync(baseFile, "utf8"))
    if (current === baseline) {
      identical++
      console.log(`[IDENTICAL] ${rel}`)
    } else {
      differing++
      console.log(`[DIFFERING] ${rel}`)
      diffs.push({ rel, current, baseline })
    }
  }

  console.log(`\nResults: ${identical} identical, ${differing} differing.`)
  if (diffs.length > 0) {
    for (const d of diffs) {
      console.log(`--- Diffs for ${d.rel} ---`)
      const curLines = d.current.split("\n")
      const baseLines = d.baseline.split("\n")
      for (let i = 0; i < Math.max(curLines.length, baseLines.length); i++) {
        if (curLines[i] !== baseLines[i]) {
          console.log(`  - Baseline: ${baseLines[i]?.slice(0, 160) || "(EOF)"}`)
          console.log(`  + Current:  ${curLines[i]?.slice(0, 160) || "(EOF)"}`)
          break
        }
      }
    }
    process.exit(1)
  }
} else {
  console.error(`Unknown mode: ${mode}. Use "save" or "check".`)
  process.exit(1)
}
