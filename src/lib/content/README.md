# Content layer

`@/lib/content` is the public API for all site content: async getters (`getSite`, `getPage`, `getCourse`, …) and all content schemas and types.

Code is grouped by feature rather than layer: each feature file holds its schema, validation rules, and resolving logic.

- `shared.ts` shared primitives, zod parse helper, and sample filters.
- `site.ts` site-wide metadata, navigation, and contact schema.
- `page.ts` page schemas, course templates, section resolution, and page-level rules.
- `placeholders.ts` template placeholder dictionary and placeholder validation.
- `sections/` one file per section type with its schema, validation, and resolver; union in `index.ts`.
- `collections/` one file per collection (courses, faculty, videos, results, testimonials).
- `load.ts` parses and validates all raw data once, at module load (`server-only`).
- `index.ts` public async API and unified export surface.

## Add a section type

1. Add `sections/<type>.ts` containing its schema, validation rules, and resolving function.
2. Add one line to `sections/index.ts` for the discriminated union.
3. Register its component and renderer entry in `src/components/sections/section-renderer.tsx`.

`board-results` (the /results board section) resolves the board records into the latest year (cards), earlier years (honour rows) and the `sheets` the shared result popup reads. It is never dropped: with no records it shows its `empty` line. It replaced the old `results-grid`.

Faculty sections: `person-feature` (one faculty id, shown large) and `people-grid` (`show: "all" | "all-but-leads"`, in faculty `order`) both resolve through `faculty-display.ts` (one subject name, class ranges, "N years teaching"). Each is dropped when nobody is left to show (e.g. sample faculty in production).

## Add a collection

1. Add `collections/<name>.ts` with its schema, validation, and resolution logic.
2. Add data in `src/content/` and load it in `load.ts` (`loadContent`).
3. Export getters and types from `index.ts`.

## Add a placeholder

Add the placeholder key and extraction logic to `placeholders.ts`. Unknown `{names}` fail build validation automatically.

## Add a page rule

Add the validation rule function or check to `page.ts` and call it from `loadContent()` in `load.ts`.
