# PRD: Daksh Study Circle website v2

Status: Draft · Owner: Krishan · Last updated: 2026-10-22

## 1. Background

The current site (built ~2021) is 2 static pages in plain HTML/CSS/JS. Key problems:

- Contact form uses `mailto:`. On phones, enquiries are silently lost.
- Results exist only as two image banners (latest 2018), which Google can't read.
- Weak SEO: same title/description on every page, no structured data, no course pages.
- Heavy and dated: jQuery for a lightbox, eager YouTube iframes, typos.

## 2. Goals

1. **Enquiries:** turn visitors (mostly parents on phones) into calls and WhatsApp messages.
2. **Trust:** show 20 years since 2005, the director, faculty, results and testimonials.
3. **Local SEO:** rank for course searches in Delhi Cantt / Sadar Bazaar.
4. **Easy updates:** all content in data files now; CMS/admin panel later without rewriting components.
5. **Reusable (secondary):** architecture clean enough to package as a coaching-institute theme.

## 3. Audience

- **Primary:** parents of CBSE Class 1–12 students in Delhi Cantt and nearby (many defence families), on mobile.
- **Secondary:** students; parents of RMS/RIMC/Sainik School aspirants; Spoken English learners.

## 4. MVP scope

**Pages:** Home, Courses, 8 Course detail pages (one template), Results, Faculty, About, Gallery, Contact, Privacy, 404.

**Features**

- "Talk to us" CTA opens a dialog: 2 numbers, each with Call / WhatsApp / Copy, plus office hours.
- Contact form submits via WhatsApp (prefilled message); small "or email us" fallback link.
- Faculty and courses linked: course pages show who teaches; faculty page shows what each teaches.
- Results page with year / class / subject filter (MOCK data until launch).
- Gallery with lightbox; YouTube playlists and Google Map as click-to-load facades.
- Every page statically generated.

## 5. Out of scope (later phases)

- Book-a-demo flow (CTA actions are designed for it).
- Form backend / email delivery, admin panel, CMS.
- Hindi version, fee display, student login, online tests, blog.

## 6. Success measures

- Lighthouse ≥ 95 in all 4 categories on mobile; LCP < 2.5 s on 4G.
- All routes static (○) in `pnpm build`.
- No WCAG AA contrast failures; works at 375 px.
- All pages indexed in Google Search Console within a month of launch.
- Call and WhatsApp clicks measurable (analytics tool TBD).
- Within 3–6 months: top-3 local results for "[course] tuition Delhi Cantt".

## 7. Constraints

- Never invent facts. Results stay MOCK until real data with consent. No AI-generated faces for people.
- Follow India's guidelines against misleading coaching advertisements.
- Vercel Hobby is non-commercial, so production needs another host or Vercel Pro.
- Claude Pro usage limits: small, focused build steps.

## 8. Launch checklist

- [ ] Real results (with consent) replace MOCK
- [ ] Real faculty details and photos, or Faculty page hidden from nav
- [ ] Logo SVGs added
- [ ] Privacy policy reviewed
- [ ] No `PLACEHOLDER`, `MOCK` or `[CONFIRM]` left in content
- [ ] Hosting chosen, domain/DNS moved, redirects from old URLs (`/about.html`, `/index.html`)

## 9. Open questions

- Hosting provider?
- Analytics tool?
- Which person answers which number? (PLACEHOLDER mapping for now)
- Exact office hours? (PLACEHOLDER: standard office hours)
- Show fees on the site, or "call for fees"?
- Confirm all 8 courses are currently offered (especially Classes 1–5)
