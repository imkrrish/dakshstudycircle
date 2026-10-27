# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences on one site.

- **Parents (decision makers, payers).** Compare coaching institutes, mostly on mid-range phones over mobile data, often after a local search or a recommendation. They look for trust, results, location, and how much personal attention their child will get. For RMS / RIMC / Sainik School entrance prep, parents are the sole decision makers.
- **Students (attendees).** CBSE students from Class 1 to 12, plus younger students preparing for RMS, RIMC and Sainik School entrance exams. Older students may browse courses themselves.

Located in Delhi Cantt, so many nearby families are likely from the defence community. _Assumption, to be confirmed; not a fact to state on the site._

## Product Purpose

Website for Daksh Study Circle, a coaching institute in Delhi Cantt (Hall No. H-1, 2nd Floor, Kalpatru Complex, Sadar Bazaar, Delhi Cantonment, New Delhi 110010). Its job is to build parents' trust and turn visits into enquiries: a call, a WhatsApp message, a visit, or the contact form. Success = enquiries.

Offers: CBSE tuition for Classes 1–12, entrance preparation for RMS, RIMC and Sainik Schools, and Spoken English.

## Positioning

Working hypothesis, to confirm (not a settled claim):

1. **Longevity in one locality.** Teaching in Delhi Cantt since July 2005; 20+ years of local reputation and word of mouth. A new competitor cannot copy this.
2. **Defence-school entrance prep** (RMS, RIMC, Sainik) alongside regular CBSE tuition.
3. **One place from Class 1 to 12**, plus Spoken English; a family can stay for years.
4. **Director-led and personal.** Director Anil Kumar teaches Maths himself; batches of about 10–20; the syllabus is finished early so there is time to revise; offline, online and home tuition.

Open: whether nearby institutes also offer RMS/RIMC/Sainik prep. If few do, #2 leads; if many do, #1 and #4 lead. Never claim "best" or "top" without evidence.

## Operating Context

- Enquiry routes: phone call, WhatsApp, in-person visit, contact form. Office hours in site data.
- Parents arrive from local search or word of mouth; local SEO matters.
- MVP pages: Home, Courses, 8 course detail pages (one template), Results, Faculty, About,
  Gallery, Contact, Privacy, 404. Full plan in `docs/site-plan.md`.
- MVP enquiry UI: a "Talk to us" button opens a dialog with both numbers (Call / WhatsApp /
  Copy). The contact form submits via a prefilled WhatsApp message. No backend.

## Capabilities and Constraints

- Web only. Next.js 16, every page statically generated. High Lighthouse / PageSpeed scores and good local SEO are core goals.
- Mobile-first: must work well at 375px wide, on mid-range phones and mobile data.
- English only.
- No backend yet. A contact form (email or admin panel) and a CMS come later.
- Content is data-driven (`src/content/`); components hold nothing institute-specific.

## Brand Commitments

Name: Daksh Study Circle. Tagline in site data: "Your quest for knowledge ends here."
Confirmed: founded July 2005 (site data `foundedYear: 2005`, shown as "since 2005"), CBSE Classes 1–12, RMS/RIMC/Sainik entrance prep, Spoken English.
Confirmed by the owner (and already on the page):

- Director Anil Kumar teaches Maths for Classes 9–12.
- Batch size is about 10–20 students, true for every class (site data `facts.batchSize`).
- The syllabus is finished early in every class, then revised for the rest of the year.
- Free demo for offline classes only (not online or home tuition), at the centre, until the child is satisfied and ready to join (`facts.freeDemo`).
- One smart classroom (smartboard), with more being added.
- Three modes: offline classes at the centre, online classes and home tuition (`facts.modes`).
- Regular tests and study material, and a test series, are part of the tuition (written in the course data and the director's message).
- Landmark: behind the Mother Dairy booth, opposite Sadar Bazaar bus stand; nearest metro Sadar Bazar Cantonment (Magenta Line), about 2 km (`contact.landmark`, `contact.nearestMetro`).
- Hours: Mon–Sat 9 am – 8 pm, Sun 9 am – 6 pm.

Nothing in this list is waiting on confirmation.

## Evidence on Hand

- Real: address, phones, emails, socials, offered courses, director name (Anil Kumar).
- **None yet:** results, ranks, student numbers, testimonials. These are MOCK placeholders marked `MOCK` until real data arrives. Do not fabricate results, ranks, student numbers or years of experience.

## Voice

Warm, calm, confident, specific. Written for parents' trust. Simple Indian English, sentence
case, no ALL CAPS, no "!!!", no generic coaching phrases ("360 degree", "benchmark setter").

## Product Principles

1. **Trust before polish.** Every claim must be true and checkable; unproven claims are omitted or marked PLACEHOLDER/MOCK.
2. **One tap to a human.** Calling or WhatsApping the institute is always within reach on mobile.
3. **Speak to the parent's worry.** Personal attention, syllabus coverage and location answer the questions parents actually ask.
4. **Light and fast.** Performance on cheap phones and mobile data is a feature.
5. **Local and specific.** Delhi Cantt, defence-school prep and 20+ years in one place, stated plainly rather than with generic coaching language.

## Accessibility & Inclusion

WCAG AA contrast, full keyboard navigation, reduced-motion support. Comply with Indian guidelines restricting misleading coaching advertisements.
