# Classes 9–10 course page: design audit

⚠️ DEGRADED: single-context (the owner ruled out parallel agents, so impeccable's two isolated assessments ran in one context; the detector overlay was skipped).
Standard: DESIGN.md plus the owner's taste. Evidence: live page on :3000, 1440 and 375 full-page captures, measured section boxes. 2026-11-05.

Current order: hero (photo-split) › subjects › teaching-plan (band) › results board › FAQ › dark CTA.
This already matches the target list. Fees, videos, links, teachers and the facts tile are not rendered. The problems are about rhythm, repetition and the "how we teach" section, not about structure.

## 1. Page-level problems

- **Repetition is the biggest problem.** On a six-section page the same facts appear 2–3 times each. "Syllabus finished early" is in the hero subheading and step 1. The demo is in the notice, FAQ 1 and the CTA body. Batch size, modes and study material are in the notice and again in the FAQ. "Regular tests" is in step 3 and FAQ 2. A parent reads the same claims three times, which reads as padding, not proof.
- **Hierarchy collapses in the middle.** The step numerals are set at `text-heading`, the same 44px / 32px as the h2 above them, so the h2 has three rivals. The honour board's "2026" (display, ~76px) is bigger than the page h1 (54px). It is the loudest type on the page.
- **Rhythm.** Course pages tighten `--section-y` to 3/4rem. That works where the tone changes, but results and FAQ are both on paper, so the board's frame ends and the FAQ heading starts after 128px of plain paper, with nothing to say a new section has begun.
- **Contrast and size are fine.** Body text is `foreground/80` and muted text is 6.9:1. Nothing is below the 15px floor. Only one red button shows (navbar). There is one dark band, and centred text appears only in the board and the CTA. No rule breaches.
- **Production gap.** Results are `sample: true` and are removed in production. Until real results arrive, the live page goes band › FAQ › CTA. Any separation plan has to work both with and without the results section.

## 2. Section separation

**Where sections run together now**

- Results › FAQ (1440 y≈2730, 375 y≈3480): same paper, no tone change. This is the main problem.
- Hero › subjects: same paper, and subjects has `pt-0` by design. This is acceptable because the hero owns that space, as on home. At 375 the first subject card is cut in half at the 812 fold.
- Subjects › band and band › results read clearly: the tint edge does the work.

**Options (no lines, glow, dots or section boxes)**

A. **Tone ladder, home's rule: toned sections never touch.** paper (hero, subjects) › tint band (board year) › paper (results) › muted (FAQ) › ink (CTA). The page darkens one step at a time toward the dark close. Home already works this way: the director band and the videos band are kept apart by paper, and the muted results section sits between paper neighbours. The board sheet (`bg-card`) still lifts off paper through its double rule, as the 1440 capture shows. Without results it becomes band › muted › ink, two adjacent toned sections. That is still readable, but it breaks the "never touch" rule, so in that case the FAQ falls back to paper (a `tone` value in the data, not code).

B. **Mirror home exactly: results on muted, no band.** paper › paper › paper (board year) › muted (results) › paper (FAQ) › ink. This is a familiar pattern and the board sits on its home ground. Downside: three paper sections in a row at the top, and the board year loses its stage. When results are removed, the page is all paper down to the CTA. It is the weakest option without results.

C. **Rhythm only: heading cadence and spacing.** Keep the tones and separate same-tone neighbours with space. Between two paper sections use 5/7rem (the site default) instead of 3/4rem, and keep 3/4rem only at tone edges. Every section starts with the same eyebrow › h2 cadence (today only the hero has an eyebrow). This costs nothing visually but is subtle: on a phone, extra space reads as "end of page" as easily as "next section".

**Recommendation: A, with C's spacing rule as a fallback.** It uses only existing tokens (`band`, `muted`, `ink`), follows the rule home already follows, gives the board year a stage of its own, and the steady darkening gives the page a direction toward the CTA. Section tones are data (`tone` on results/FAQ), so this is a small data change with no new CSS. Add C's wider gap only if a same-tone join remains after A.

## 3. Per section (target order)

**Hero, photo-split, no tile: medium**

- Wrong: at 1440 the photo's top lines up with the breadcrumbs, not the eyebrow or h1, and the text block ends ~90px above the photo's bottom, so the left column looks short and top-heavy. The subheading is two sentences, and the second one ("syllabus finished early…") repeats the board year. The spec asks for one audience line.
- Fix: align the photo top with the eyebrow (or centre the text against the photo) from `lg`. Cut the subheading to its first sentence (copy via content-writer). Keep: no button, no caption, no tile.

**Subjects: medium**

- Wrong: at 375 five full-width bordered cards stack for ~650px, which reads as an app list. English and Hindi have the same summary word for word. Card heights vary (134/108px).
- Fix: give English and Hindi distinct one-line summaries (content-writer; facts only). Below `md`, drop the per-card border and set the subjects as one paper sheet. Names in Garamond `text-title`, separated by space, not rules (no new horizontal lines). From `md`, keep the 3 + 3 / 2 + 2 + 2 grid.

**The board year (how we teach): high**

- Wrong now: three text-only steps whose numerals are as large as the h2. The section reads as a generic "1-2-3 features" row. The printed notice under it is a boxed card holding batch size, modes, demo and material. That is the facts-tile content the target keeps out, and all four items repeat the FAQ. The heading ("How we prepare your child for the boards") is generic.
- Fix: replace with the stages concept below. Drop the notice from this section (its facts stay in the FAQ). Heading and captions via content-writer.
- **Concept: works, with conditions.**
  - _Stages from fixed facts only._ Equal spacing, no months, no test frequency, no durations. Consider 3 discs instead of 4. "Learn the syllabus" and "finish early" are one fact ("taught and finished early"), and splitting them invites a reader to infer a timeline. The last disc, "board exams", is the destination, not a service. Mark it only by tone (tint fill, ink numeral), never red, never glow.
  - _Discs._ `card` (paper-raised) with a hairline on the tint band, about 6–7rem at 1440 and 4.5rem at 375. Numerals in EB Garamond lining figures (already on `--font-heading`), set at `text-title`, below the h2. Muted ink. They must not look like arch frames or medallions: no inner rules or ornament.
  - _The curve is the main risk._ The owner rejected line-art and new lines. Earn it by tying it to home's course path: the same gentle ease-out rise (rising toward the exams, then level), one solid stroke in `foreground/20` at 1–1.5px, behind the discs. No dashes, arrowheads, end dots or nodes. Draw it in an `aria-hidden` SVG laid out from the grid, with `vector-effect: non-scaling-stroke`, so it never thickens or detaches on resize. Static. If it animates later, scroll-sync it like the course path, never autoplay.
  - _Two-tone caption._ The light lead-in must still pass AA: use `muted-foreground` (6.9:1), not a lighter tint. The key phrase is Nunito Sans 600 in ink. Not a bold Garamond (Heading Weight Rule). Read it as one sentence. Markup: `<ol>`, each `<li>` holding the caption, with the numeral as a CSS counter (not read aloud).
  - _Alignment._ Captions under the discs must be left-aligned to the disc's left edge, not centred (centred text only in hero, board and CTA).
  - _Mobile._ With discs in a left column, captions to the right and a line down the disc column, this becomes a stock vertical timeline (app-like list). Keep the curve as a gentle sway rather than a straight rail, keep the discs large with generous gaps, and test at 375 for the stepper look before committing.

**Results: medium (low if A ships)**

- Wrong: on paper next to the paper FAQ (see §2). The "2026" numeral outranks the h1. Every row's meta says "Class 10", which the intro already says, so the line repeats seven times. Section, intro and board title stack three labels ("Recent board results" / "Results from our Class 10 students." / "Honour Board").
- Fix: tone per §2. On course pages set the year numeral at `text-page-title` or `text-heading` so the h1 stays the largest. Leave home's display numeral as it is. Hide the meta when every row shares it, or show only the score. Keep the printed style and dotted leaders exactly.

**FAQ: medium**

- Wrong: four of five answers repeat the notice and the steps. Once the notice is removed this becomes the right home for those facts, so it is a dedupe issue, not an FAQ issue. No tone of its own.
- Fix: muted tone (option A). Keep the five questions, and once the notice is gone, check that each fact appears in exactly one place on the page. The fees question stays as "call us", because fees are hidden.

**CTA: low**

- Wrong: the body's third sentence repeats the demo again. Otherwise it meets the spec (paper button, hours, centred, one dark band).
- Fix: shorten the body to two sentences in the shared `courseCta` (affects all course pages; content-writer).

## 4. Fix order (one section per run)

1. **Board year.** Stages with discs and curve, notice removed, new heading and captions. The highest value, and it removes most of the repetition.
2. **Separation.** Option A tones on results and FAQ (data only), with the no-results fallback checked.
3. **Hero.** Photo alignment from `lg`, one-line subheading.
4. **Subjects.** Distinct English and Hindi lines, mobile sheet instead of stacked boxes.
5. **Results.** Course-page numeral size, redundant meta.
6. **FAQ.** Final dedupe pass against the new board year.
7. **CTA.** Two-sentence shared body (touches every course page; do last).

Housekeeping (not an audit finding): `.impeccable/design.json` is stale against DESIGN.md. Run `impeccable document` to refresh it.
