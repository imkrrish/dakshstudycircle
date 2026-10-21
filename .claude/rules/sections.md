---
paths:
  - "src/components/sections/**"
  - "src/content/**"
  - "src/lib/content.ts"
---

# Sections and page data

## Data

- Section types: a discriminated union in `src/content/types.ts`, keyed by `type`, each with a unique `id`.
- Data must be serializable (no JSX, no functions; icons and motifs by name) so it can come from a CMS.
- Mark placeholder text `PLACEHOLDER` and mock results `MOCK`.
- `getPage()` validates each page: unique section ids, at most one `cta-band` with variant "dark".

## Section components

- One file per type in `src/components/sections/`, props `{ section }`, root `<section id={section.id}>`.
- Layout options are props implemented as `cva` variants (e.g. `imagePosition: "left" | "right"`).
- Optional parts (eyebrow, actions, image) render only when present in the data.
- Add a prop only for a design choice actually needed twice. Very different layouts get a new section type.
- Interactive sections (sliders, tabs): the section stays a Server Component; only a small inner island uses "use client".

## Registry

- `section-renderer.tsx` maps each `type` to its component with a lookup object, typed so a missing component is a TypeScript error.

## Adding a section type

1. Type in `types.ts` → 2. component → 3. register in the renderer → 4. use it in page data.

Starting types: hero, split, card-grid, cta-band. Add new ones (bento grid, slider…) only when a page needs them.
