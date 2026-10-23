# Site plan

Section order = render order. Type in brackets. ★ = type not built yet.
Content marked PLACEHOLDER / MOCK until real data arrives.

## Navigation

- Navbar: logo (→ /), Courses, Results, Faculty, About, Contact, button "Talk to us" (action: contact-dialog)
- Footer: name, address, both phones, emails, links (incl. Gallery, Privacy), socials

## Collections

- **courses**: slug, title, classes, subjects, summary, facultyIds[]
- **faculty**: id, name, role, subjects, classes, bio, photo, isDirector
- Courses reference faculty by id. "Teaches these courses" on faculty is derived, never stored.

## Button actions

- `link` (href) · `contact-dialog` (opens Talk to us dialog) · later: `book-demo`
- Talk to us dialog: title "Call or WhatsApp us"; per number: label, Call, WhatsApp, Copy; office hours line. Data from getSite().

## Pages

### Home `/`

1. hero: headline, since-2005 line, "Talk to us" + secondary link to courses
2. stats ★: real numbers only
3. card-grid: courses overview (from courses collection)
4. split: director's message (Anil Kumar, from faculty)
5. reason-list: why Daksh, 6 points (ruled numbered list, photo beside)
6. results-grid ★ (compact): highlights + link to /results
7. testimonials ★
8. video-grid ★: YouTube playlists (facade)
9. faq ★
10. cta-band (dark)

### Courses `/courses`

1. hero (small)
2. card-grid: all 8 courses
3. steps ★: how joining works
4. cta-band

### Course detail `/courses/[slug]` (one template, 8 courses)

Slugs: classes-1-5, classes-6-8, classes-9-10, class-11-12-science, class-11-12-commerce, class-11-12-humanities, rms-rimc-sainik, spoken-english

1. hero: course name, classes, subjects
2. split: what's covered
3. card-grid: subjects / batch details
4. faculty-grid ★ (compact): who teaches this
5. video-grid ★: only if related playlists exist
6. faq ★: course-specific
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
3. faq ★

### Privacy `/privacy`, 404

Simple text pages / branded not-found with links home.
