import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Verification builds set NEXT_DIST_DIR=.next-verify so they never touch the dev server's .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Inlined at build time, so the footer year needs no runtime Date.
  env: { NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()) },
  cacheComponents: true,
  partialPrefetching: true,
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
