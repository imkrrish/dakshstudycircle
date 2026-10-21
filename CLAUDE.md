# Daksh Study Circle — website

Marketing site for a coaching institute: landing, about, courses, contact pages.
MVP, frontend only. No backend, database, or auth yet.

## Stack versions — newer than your training data

- Next.js 16.4 + React 19.3: APIs and conventions may differ from what you know.
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

## Before creating a component

1. Check `src/components/` and `src/components/ui/`. If it exists, reuse or extend it.
2. Otherwise, if shadcn provides it, add it with `pnpm dlx shadcn@latest add <name>`. Never hand-write a shadcn component.
3. Only then create a new one, following `.claude/rules/react-components.md`.

## Git

- Never commit, push, or change git history. The user does all commits.
- If a task changed files, end your reply with a suggested commit message (Conventional Commits, e.g. `feat: add contact page`).

## Conventions

- Server Components by default; "use client" only for state, effects, or browser APIs.
- Use theme tokens (`bg-primary`, `text-muted-foreground`). No hard-coded colors.
- Never edit `src/components/ui/` directly. Wrap or extend instead.

## Where to look things up

- Next.js: `node_modules/next/dist/docs/` (matches the installed version).
- Runtime/build errors: next-devtools MCP (dev server must be running).
- shadcn components: shadcn MCP.
- Any other library (Base UI, Tailwind v4, Hugeicons): Context7 MCP.

## Checking the UI

- Use `playwright-cli` against http://localhost:3000.
- Read the page snapshot first. Take a screenshot only when judging visual design (layout, spacing, colors).

## Content

- Site copy comes from the `content-writer` agent. Never read `reference/` directly.
- Results and testimonials are MOCK data until launch: obviously fake, marked `MOCK`.

## Before saying a task is done

- Run `pnpm lint` and `pnpm typecheck`, and fix what they report.
- If routes were added or changed, run `pnpm build` and confirm every route shows `○` (static).
