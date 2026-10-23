# Roadmap

Rule: one step per Claude Code session. `/clear` between steps. I review the plan, review the diff, and commit myself.

## Phase 0 · Setup

- [x] Next.js 16, shadcn base-luma preset, brand tokens, fonts
- [x] Claude Code setup (CLAUDE.md, rules, skills, agents, MCP, hooks)
- [x] Pages and sections planned (site-plan.md)

## Phase 1 · Foundation

- [x] 1.1 Content layer: types (Site, Page, Section union, Course, Faculty, Button action), `getSite` / `getPage` / `getCourses` / `getFaculty`, validation (unique ids, max one dark band)
- [x] 1.2 Section renderer + layout primitives (Container, Section, SectionHeading)
- [x] 1.3 Navbar (logo, 5 links, "Talk to us") + mobile menu
- [x] 1.4 "Talk to us" dialog + button action system
- [x] 1.5 Footer (name, address, phones, links incl. Gallery, socials)

## Phase 2 · Core sections → Home v1

- [ ] 2.1 hero
- [ ] 2.2 split
- [ ] 2.3 card-grid (default + icon variant)
- [ ] 2.4 cta-band (dark / light)
- [ ] 2.5 Home v1 assembled from these 4
- [ ] Compact hero: own page-title size between text-heading and text-display (fix when building the first inner page)

## Phase 3 · New section types

- [ ] 3.1 stats
- [ ] 3.2 faq
- [ ] 3.3 testimonials
- [ ] 3.4 video-grid (YouTube facade)
- [ ] 3.5 FacultyCard (full / compact) + faculty-grid
- [ ] 3.6 results-grid (compact / full + filter island)
- [ ] 3.7 steps
- [ ] 3.8 gallery (lightbox)
- [ ] 3.9 contact (details + WhatsApp form + map facade)

## Phase 4 · Pages

- [ ] 4.1 Home complete
- [ ] 4.2 Courses index
- [ ] 4.3 Course detail template + first course
- [ ] 4.4 Remaining 7 course contents
- [ ] 4.5 Faculty
- [ ] 4.6 Results
- [ ] 4.7 About
- [ ] 4.8 Gallery
- [ ] 4.9 Contact
- [ ] 4.10 Privacy + 404

## Phase 5 · Polish

- [ ] Logo SVGs in `public/brand/`
- [ ] Motifs redesigned from real artwork
- [ ] Animations (anime.js v4), reduced-motion checked
- [ ] Full UI review (ui-checker at 1280 / 375)

## Phase 6 · SEO & performance

- [ ] Metadata per page, OG images
- [ ] sitemap.xml, robots.txt
- [ ] JSON-LD: EducationalOrganization + LocalBusiness, Course, FAQPage
- [ ] Redirects from old URLs
- [ ] Lighthouse ≥ 95 on every page

## Phase 7 · Launch

- [ ] Hosting decided and set up
- [ ] Launch checklist in prd.md complete
- [ ] DNS cutover, HTTPS
- [ ] Google Search Console + sitemap submitted
- [ ] Google Business Profile website link checked

## Later

- [ ] Book-a-demo flow
- [ ] Form backend (email / admin inbox)
- [ ] Admin panel or CMS (Strapi?)
- [ ] Theme packaging (demo content pack, docs)
