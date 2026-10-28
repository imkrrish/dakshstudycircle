# Site plan

Section order = render order. Type in brackets. ★ = type not built yet.
Content marked PLACEHOLDER / MOCK until real data arrives.

## Navigation

- Navbar: logo (→ /), Courses, Results, Faculty, About, Contact, button "Talk to us" (action: contact-dialog)
- Footer: name, address, both phones, emails, links (incl. Gallery, Privacy), socials

## Collections

- **courses**: slug, title, classes, subjects, summary, facultyIds[]
- **faculty**: id, name, role, subjects, classes, bio, photo, isDirector
- **videos**: id, title, youtubePlaylistId, thumbnail, class?, subject (free YouTube playlists)
- Courses reference faculty by id. "Teaches these courses" on faculty is derived, never stored.

## Button actions

- `link` (href) · `contact-dialog` (opens Talk to us dialog) · `directions` (map, new tab) · `social` (platform; opens the site.socials url in a new tab) · later: `book-demo`
- Talk to us dialog: title "Call or WhatsApp us"; per number: label, Call, WhatsApp, Copy; office hours line. Data from getSite().

## Pages

### Home `/`

1. hero: headline, since-2005 line, "Talk to us" + secondary link to courses
2. course-grid: courses overview (from courses collection)
3. split: director's message (Anil Kumar, from faculty), band tone
4. reason-list: why Daksh, 6 points (ruled numbered list, photo beside), paper
5. results-board: honour board with year tabs, up to 6 rows per year (marks and course in the expanded row) + link to /results, muted tone
6. testimonial-grid: swipeable carousel of featured testimonials (max 12) with a Google rating badge, paper
7. video-player: lesson player (click-to-play facade, nocookie embed on click, default Class 10 Maths) beside a list of the 5 free Maths playlists; rows link to YouTube without JS; band tone
8. faq: native details, 9 questions, site-data placeholders
9. cta-band (dark)

Stats ★ is not on home for now (real numbers only, none yet).

### Courses `/courses` (built)

1. hero (compact, with breadcrumbs Home › Courses)
2. course-grid (`variant: "full"`: summary under each card note, no ribbon): the same groups as home
3. steps ★: how joining works (not built yet)
4. cta-band (dark, same content as home)

SEO phase: add BreadcrumbList structured data (JSON-LD) from each compact hero's `breadcrumbs` data.

### Course detail `/courses/[slug]` (one template, 9 courses)

Slugs: classes-1-5, classes-6-8, classes-9-10, class-11-12-science, class-11-12-commerce, class-11-12-humanities, rms-rimc-sainik, spoken-english, college-classes

1. hero: course name, classes, subjects
2. split: what's covered
3. card-grid: subjects / batch details
4. faculty-grid ★ (compact): who teaches this
5. video-player: lesson player with a playlist list, only if related playlists exist
6. faq: course-specific
7. cta-band
   Each course needs genuinely unique copy (no find-and-replace pages).

### Results `/results`

1. hero (small)
2. results-grid ★ (full + filter: year, class, subject)
3. testimonials ★
4. cta-band

### Faculty `/faculty`

1. hero (small)
2. faculty-grid ★ (full): incl. courses each teaches
3. cta-band
   Can be hidden from nav via a site flag until real data exists.

### About `/about`

1. hero: since 2005
2. split: our story
3. split (image other side): director
4. card-grid: values
5. cta-band

### Gallery `/gallery`

1. hero (small)
2. gallery ★ (lightbox)
3. cta-band (light)

### Contact `/contact`

1. hero (small)
2. contact ★: details + form (submits to WhatsApp prefilled; "or email us" link) + map facade
3. faq

### Privacy `/privacy`, 404

Simple text pages / branded not-found with links home.

## Later

- SEO phase: unknown course slugs (e.g. `/courses/nope`) return HTTP 200 with `noindex` and the 404 content, because of Cache Components (`dynamicParams` is not allowed). Find a way to send a real 404. Observed inconsistency: `/courses/nope` returned 200 once and 404 later, so the behaviour is not stable; re-test on a production build (`pnpm build && pnpm start`) before relying on either.
- Pre-launch accessibility pass: header and footer links are under 44px at 375 (Talk to us 36px, menu button 36px, logo, footer links, back link, "Open on YouTube").
