# Daksh Study Circle — website

Marketing site for a coaching institute (pages listed in `docs/site-plan.md`).
MVP, frontend only. No backend, database, or auth yet.

## Stack versions — newer than your training data

- Next.js 16.4 + React 19.3: APIs and conventions may differ from what you know.
- Tailwind v4: theme lives in `src/app/globals.css` (`@theme`). No tailwind.config file.
- shadcn components are built on **Base UI**, not Radix. Don't use Radix APIs (e.g. `asChild`);
  check the component's file in `src/components/ui/` for its actual props.
- Icons: **Hugeicons** (`@hugeicons/react` + `@hugeicons/core-free-icons`). Never lucide-react.
- `cn()` comes from the `cn` package (re-exported in `src/lib/utils.ts`). This is correct —
  don't replace it with clsx/tailwind-merge.
- Animation: anime.js (CSS for simple fades). Never motion or framer-motion.

## Layout

- Everything lives under `src/`: routes in `src/app/`, UI in `src/components/`, helpers in `src/lib/`.

## Architecture

- Pages are built from data: each page is `{ seo, sections: [] }` in `src/content/pages/`,
  read only through `getPage()` / `getSite()` in `src/lib/content.ts`. Later this becomes a
  CMS fetched at build time, so components never import content files directly.
- Sections are modular components controlled by props. The order of the sections array is
  the order on the page.
- Which sections each page has: `docs/site-plan.md`.
- Collections: courses and faculty are records read via `getCourses()` / `getFaculty()`.
  Courses reference faculty by id; "teaches these courses" is derived, never stored twice.
- Buttons in data carry an action: `link` (href) or `contact-dialog` (the "Talk to us" dialog).
  More actions (e.g. `book-demo`) come later; never hard-code a button's behaviour in a section.
- Nothing institute-specific in components. Names, phones, address and copy come from
  `getSite()` / `getPage()` / collections (this site may become a reusable theme).

## Commands

- pnpm only. Never npm or yarn.
- Dev: `pnpm dev`. Assume it's already running on :3000.
- Lint: `pnpm lint` · Typecheck: `pnpm typecheck`
- Never stop or restart the dev server on :3000. Use another port (e.g. 3100) for test servers.
- To stop a test server you started, kill only its own PID (e.g. from `lsof -ti :3100`), never by process name.

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
- Design context: `PRODUCT.md` (audience, purpose, voice, constraints) and `DESIGN.md` once it
  exists (visual system). Use the `impeccable` skill for design work; follow theme tokens in
  `src/app/globals.css`.
- Do only the task asked. Don't build ahead or refactor unrelated code; mention follow-ups instead.

## Where to look things up

- Next.js: `node_modules/next/dist/docs/` (matches the installed version).
- Runtime/build errors: next-devtools MCP (dev server must be running).
- shadcn components: shadcn MCP.
- Any other library (Base UI, Tailwind v4, Hugeicons): Context7 MCP.

## Checking the UI

- Full page checks: use the `ui-checker` agent.
- Quick single check in this session: `playwright-cli` against http://localhost:3000.
- Read the snapshot first; screenshot only when judging visual design.

## Content

- Site copy comes from the `content-writer` agent. Never read `reference/` directly.
- Results and testimonials are MOCK data until launch: obviously fake, marked `MOCK`.
- Approved copy goes into the page data files in `src/content/pages/`, never hard-coded in components.
- Never invent facts (numbers, names, results, dates). Missing content uses obvious
  placeholder text marked `PLACEHOLDER`.

## Before saying a task is done

- Lint: `pnpm lint` · Typecheck: `pnpm typecheck` · Build: `NEXT_DIST_DIR=.next-verify pnpm build`
- If routes were added or changed, run `NEXT_DIST_DIR=.next-verify pnpm build` and confirm every route shows `○` (static).

## Work log

- After a task that created, edited or deleted files, append a summary:
  `node .claude/hooks/worklog.mjs note "<task and why, 1–2 lines>"`. File changes are logged automatically.
- Read the log only when debugging a failure, and then only recent entries: `tail -n 80 .claude/worklog/<YYYY-MM>.md`.
