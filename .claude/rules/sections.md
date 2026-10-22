---
paths:
  - "src/components/sections/**"
  - "src/content/**"
  - "src/lib/content.ts"
  - "src/lib/content-schema.ts"
---

# Sections and page data

## Data

- All content schemas live in `src/lib/content-schema.ts` (zod). Types are inferred from the
  schemas (`z.infer`); never write a content type by hand.
- Sections: a `z.discriminatedUnion` on `type`, each with a unique `id`. Use `SectionOf<"hero">`
  to get one section's type.
- Data must be serializable (no JSX, no functions; icons by name from `src/lib/icons.ts`) so it can come from a CMS.
- Schemas are strict: unknown keys fail the build.
- Buttons are data with an `action` (`link` | `contact-dialog`, more later). Render them only
  through the shared action button component; never hard-code button behaviour in a section.
- Mark placeholder text `PLACEHOLDER` and mock results `MOCK`.
- Validation runs when `src/lib/content.ts` loads and fails the build on: schema errors, duplicate
  section ids, more than one dark `cta-band` per page/course, duplicate slugs/ids, unknown facultyIds.
- Sections that show collection data (courses, faculty) store a reference; `getPage()`/`getCourse()`
  resolve it so components receive plain data.

## Section components

- One file per type in `src/components/sections/`, props `{ section }` typed with `SectionOf<...>`.
- Build with the layout primitives in `src/components/layout/`: `Section` (root `<section id>`,
  padding, scroll margin, `aria-labelledby`), `Container`, `SectionHeading`.
- Headings: only the hero renders an h1. Section titles are h2 (via `SectionHeading`), card titles h3.
- Layout options are props implemented as `cva` variants (e.g. `imagePosition: "left" | "right"`).
- Optional parts (eyebrow, actions, image) render only when present in the data.
- Add a prop only for a design choice actually needed twice. Very different layouts get a new section type.
- Interactive sections (sliders, tabs, filters): the section stays a Server Component; only a small inner island uses "use client".

## Registry

- `section-renderer.tsx` maps each `type` to its component with a lookup object, typed so a missing component is a TypeScript error.

## Adding a section type

1. Add its zod schema to the union in `content-schema.ts`
2. Create the component (a stub is fine until it's designed)
3. Register it in the renderer
4. Use it in page data

Starting types: hero, split, card-grid, cta-band (currently stubs, replaced in place when designed).
Add new types only when a page needs them.
