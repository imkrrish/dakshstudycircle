# Daksh Study Circle — website

Marketing site for a coaching institute: landing, about, courses, contact pages.
MVP, frontend only. No backend, database, or auth yet.

## Stack versions — newer than your training data

- Next.js 16.4 + React 19.3: APIs and conventions may differ from what you know.
  Check `node_modules/next/dist/docs/` before using a Next.js API you're unsure of.
- Tailwind v4: theme lives in `src/app/globals.css` (`@theme`). No tailwind.config file.
- shadcn components are built on **Base UI**, not Radix. Don't use Radix APIs (e.g. `asChild`);
  check the component's file in `src/components/ui/` for its actual props.
- Icons: **Hugeicons** (`@hugeicons/react` + `@hugeicons/core-free-icons`). Never lucide-react.
- `cn()` comes from the `cn` package (re-exported in `src/lib/utils.ts`). This is correct —
  don't replace it with clsx/tailwind-merge.

## Layout

- Everything lives under `src/`: routes in `src/app/`, UI in `src/components/`, helpers in `src/lib/`.

## Commands

- pnpm only. Never npm or yarn.
- Dev: `pnpm dev`. Assume it's already running on :3000.
- Lint: `pnpm lint` · Typecheck: `pnpm typecheck`
- Add shadcn component: `pnpm dlx shadcn@latest add <name>`

## Conventions

- Server Components by default; "use client" only for state, effects, or browser APIs.
- Use theme tokens (`bg-primary`, `text-muted-foreground`). No hard-coded colors.
- Never edit `src/components/ui/` directly. Wrap or extend instead.

## Before saying a task is done

- Run `pnpm lint` and `pnpm typecheck`, and fix what they report.
