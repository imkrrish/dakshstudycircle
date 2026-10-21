---
paths:
  - "src/components/**/*.tsx"
  - "src/app/**/*.tsx"
---

# Writing React components: match shadcn's style (reference: src/components/ui/button.tsx)

## Reusable components (`src/components/`)

- kebab-case file, PascalCase component: `course-card.tsx` → `CourseCard`
- `function` declaration (not arrow); destructure props in the signature, defaults there too
- Props: `ComponentProps<"div">` (or `Primitive.Props` when wrapping a Base UI component), combined with `&`
- Root element: `data-slot="<file-name>"`, `className` merged with `cn()`, rest spread with `{...props}`
- Import `cn` from `"cn"`, like the shadcn components do
- Variants with `cva`; pass `className` into the variants call
- Named exports at the bottom of the file
- No `React.FC`, no `forwardRef` (React 19: ref is a normal prop), no `import React`
- Icon inside a Button: add `data-icon="inline-start"` or `data-icon="inline-end"` to the icon

```tsx
import type { ComponentProps } from "react"
import { cn } from "cn"

function CourseCard({
  title,
  className,
  ...props
}: ComponentProps<"div"> & { title: string }) {
  return (
    <div
      data-slot="course-card"
      className={cn("rounded-lg border p-6", className)}
      {...props}
    >
      {title}
    </div>
  )
}

export { CourseCard }
```

## Route files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`)

- Next.js requires a default export. Name it after the route: `AboutPage`, `ContactPage`, `RootLayout`

```tsx
export default function AboutPage() {
  return <main>...</main>
}
```

## Animation

- Simple fades and slides: CSS (Tailwind / tw-animate-css). SVG drawing and sequences: anime.js.
- Never use motion or framer-motion.
- anime.js lives in small "use client" wrappers; pass content as children so it stays server-rendered.
- Content must be visible without JavaScript; animation only enhances it.
- Never animate the hero headline in on page load (hurts LCP). Animate decorations instead.
- Respect `prefers-reduced-motion`.
