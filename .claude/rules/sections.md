---
paths:
  - "src/components/sections/**"
  - "src/content/**"
---

# Adding a section type

1. **Type:** add `XData` (`type: "x"`, `id: string`, fields) to `src/content/types.ts` and to the `Section` union. Keep data serializable (icons as names, no JSX or functions) so it can come from a CMS later.
2. **Component:** create `src/components/sections/x.tsx` (`XSection`, props `{ section: XData }`). Render `<section id={section.id}>`. Use `cva` for visual variants.
3. **Registry:** add it to `sectionComponents` in `section-renderer.tsx`. TypeScript errors until you do.
4. **Data:** add the section to a page in `src/content/pages/`. Read content only through `getPage()` / `getSite()` in `src/lib/content.ts`, never import content files in components.

Interactive sections (sliders, tabs) stay Server Components: put `"use client"` on a small island component inside them, not on the section itself.
