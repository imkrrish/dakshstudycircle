# Decisions log

One line per decision. Newest at the bottom. Format: date: decision. Why.

- 2026-10-21: Rebuild in Next.js 16 + TypeScript + Tailwind v4 + shadcn. Modern, SEO-friendly, my main skillset.
- 2026-10-21: shadcn style base-luma on Base UI (not Radix). Preset choice; no `asChild`.
- 2026-10-21: Hugeicons for icons, anime.js for animation (not lucide / motion).
- 2026-10-21: Brand primary #E80218 (not logo red #ED151F) for buttons. Logo red fails 4.5:1 with white text.
- 2026-10-21: Navy / flame / saffron only in gradients and motifs. Keeps the site calm; avoids failing color combos.
- 2026-10-21: Every page static, without `output: export`. Speed + SEO, server features still available.
- 2026-10-21: Pages are data (`{ seo, sections }`) read only via `getPage()`. CMS later changes only that function.
- 2026-10-22: MVP has 10 pages incl. 8 course detail pages from one template. Local SEO per course.
- 2026-10-22: Courses and faculty are collections linked by id (course → facultyIds). One source of truth; reverse link derived.
- 2026-10-22: Separate Faculty page; FacultyCard reused (full / compact). Show who teaches what.
- 2026-10-22: Contact form submits via WhatsApp, not mailto. mailto loses enquiries on phones.
- 2026-10-22: Main CTA "Talk to us" opens a dialog with both numbers. Numbers out of the hero; works on desktop too.
- 2026-10-22: Buttons carry an action type (`contact-dialog` now, `book-demo` later). Demo booking without changing components.
- 2026-10-22: Main nav: Courses, Results, Faculty, About, Contact (+ Talk to us). Gallery in footer. Fits a mobile menu.
- 2026-10-22: Phone + address in footer on every page. Consistent business details help local SEO.
- 2026-10-22: Results are MOCK until launch. Coaching-ad guidelines; real data needs consent.
