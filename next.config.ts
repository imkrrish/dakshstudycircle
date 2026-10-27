import type { NextConfig } from "next"
import { faculty } from "./src/content/faculty"
import { results } from "./src/content/results"

// `pnpm build` lists every sample item still in the data (they are removed from
// the production output; this is a reminder, not a failure). Printed once: the
// env flag stops build workers that reload this file from printing it again.
if (
  process.argv.includes("build") &&
  process.env.NODE_ENV !== "development" &&
  !process.env.DAKSH_SAMPLES_REPORTED
) {
  process.env.DAKSH_SAMPLES_REPORTED = "1"
  const samples = [
    ...faculty
      .filter((item) => item.sample)
      .map((item) => `faculty: ${item.id}`),
    ...results
      .filter((item) => item.sample)
      .map((item) => `results: ${item.id}`),
  ]
  if (samples.length > 0) {
    console.warn(
      [
        `\n⚠ ${samples.length} SAMPLE items are still in the content data.`,
        "  They are left out of this build. Replace them with real data before launch",
        "  (what to collect: docs/content-requests.md):",
        ...samples.map((line) => `  - ${line}`),
        "",
      ].join("\n"),
    )
  }
}

const nextConfig: NextConfig = {
  // Verification builds set NEXT_DIST_DIR=.next-verify so they never touch the dev server's .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Inlined at build time, so the footer year needs no runtime Date.
  env: { NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()) },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // YouTube playlist thumbnails only; the browser never contacts YouTube.
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
}

export default nextConfig
