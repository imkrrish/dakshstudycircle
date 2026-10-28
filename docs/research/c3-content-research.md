# C3a: content research and plan

Checked 2026-10-27. Report only: no code or content files were changed.
Research was done by three `content-writer` runs (they have WebSearch/WebFetch). Official sites often blocked
them (NTA and rimc.gov.in returned 403 or refused), and the CBSE PDFs were unreadable. So many exam rows below are
**UNVERIFIED** or rest on secondary sources. **Rule for C3b: nothing marked UNVERIFIED or "secondary" goes on the
site as a fact.** Someone with a normal browser must open the official bulletins first (see "Verification
checklist").

Confidence key: high = read on an official page; med = official snippet or consistent secondary sources;
low = single secondary source or conflict; none = not found.

---

## 0. New owner-confirmed facts (record in data in C3b; not in PRODUCT.md now)

| Course              | Fact                                                                                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Classes 1–8         | Rs 25,000–30,000 **per session**, all three subjects together (Maths, Science, English). Exact amount depends on the class and on when the student joins (mid/late-session joiners pay less). |
| Classes 11–12       | Rs 25,000 **per subject, per session**. Pamphlet subjects: Maths, Physics, Chemistry, Biology, Accountancy, Economics, Political Science, Business Studies, English, "C++", IP.               |
| RMS / RIMC / Sainik | Rs 80,000 for the whole session, every entry level (RMS Class 6 and 9, Sainik Class 6 and 9, RIMC Class 8). Only exam-related subjects are taught.                                            |
| Spoken English      | Rs 9,000 for 3 months, ages under 20, 5 classes a week.                                                                                                                                       |
| College classes     | For students doing an open/distance degree, e.g. DU SOL. Pamphlet: B.A., B.Com., B.Sc. No fee known.                                                                                          |
| Faculty             | Other teachers unknown; C3b adds sample records (`sample: true`) per subject.                                                                                                                 |

Fee-model impact: `FeesSchema.per` allows `subject | course`, `period` allows `month | quarter | year | session | course`.
Classes 1–8 = `per: "course"`, `period: "session"` with a **range** (the schema has a single `amount`; it needs a
`amountTo` or a note field). Entrance and Spoken English = `per: "course"`. Spoken English `period: "course"` (3 months).

## 0b. Mismatches with what is on the site now

| Where                                      | Now                                                                                 | Should be                                                                                                                              | Source                            |
| ------------------------------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `class-11-12-science.ts` subjects and hero | "C++ (Computer Science)"                                                            | "Computer Science" (Python-based) once owner answers Q1                                                                                | CBSE CS 083 2026-27 (medium-high) |
| Same file                                  | Subject "Informatics Practices"                                                     | OK (official name); keep "IP" only in short form                                                                                       | CBSE                              |
| PRODUCT.md fees                            | "Accounts"                                                                          | "Accountancy" (official name)                                                                                                          | CBSE                              |
| PRODUCT.md fees                            | Classes 1–8 and 11–12 period "not confirmed"                                        | Now confirmed: per session                                                                                                             | Owner                             |
| `rms-rimc-sainik.ts`                       | `classes: ["Class 5","Class 7","Class 8"]`, cardNote "admission to Class 6, 8 or 9" | Entry classes are 6 and 9 (RMS, Sainik) and 8 (RIMC). "Class 5/7/8" are the classes students are _in_ when they apply: clarify wording | Official: RMS site, Society       |
| `spoken-english.ts`                        | "Classes 1–12", "usually June–August"                                               | Owner now says ages under 20, 5 classes/week, 3 months. Season (June–August) and "Classes 1–12" no longer confirmed: ask (Q9)          | Owner                             |
| `college-classes.ts`                       | "College tuition for B.A., B.Com. and B.Sc. students"                               | For open/distance (e.g. DU SOL) students; pamphlet list needs checking against SOL (below)                                             | Owner, DU SOL                     |
| Existing code comment (RMS)                | "RIMC admits Class 8", "AISSEE Class 6 and 9"                                       | Consistent with official sources; keep                                                                                                 | Society, secondary                |
| Pamphlet exam figures                      | None provided to me (PRODUCT.md only has fees)                                      | If the pamphlet prints ages/dates/marks, send them so I can compare                                                                    | n/a                               |

---

## 1. Search intent and page mapping

No search volumes were found; the examples below are observed topics (search results this session) or marked
INFERENCE. Local queries return mostly national platforms and directories, not Delhi Cantt institutes, so a local
page with address and fees has a real gap to fill (observed).

| #   | Intent                                                                    | Example queries                                                                                         | Best answered by                                                           | Page and section                                     | Official link instead of our copy?                                             |
| --- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| 1   | Tuition by class, subject, place                                          | "class 10 maths tuition Delhi Cantt", "tuition near me", "CBSE class 9 coaching near Palam" (INFERENCE) | Our course page                                                            | `/courses/[slug]`: hero, subjects, fees, faq         | No                                                                             |
| 2   | Home tuition vs centre                                                    | "home tuition vs coaching" (INFERENCE)                                                                  | Our FAQ                                                                    | course faq ("modes")                                 | No                                                                             |
| 3   | RMS/RIMC/Sainik eligibility, age, dates, pattern, syllabus, result, seats | observed topics: exam date, age, syllabus, pattern, result, fees, "coaching near me"                    | **Guide page** (summary + "last checked") then official link               | `/guides/[exam]`: facts, pattern, calendar, links    | **Yes** for dates, forms, results, counselling; we give a summary and the link |
| 4   | Entrance coaching near me, "which class to start", "what do you teach"    | INFERENCE                                                                                               | Our course page                                                            | `/courses/rms-rimc-sainik`                           | No                                                                             |
| 5   | Spoken English near me, fees                                              | "spoken English classes Delhi Cantt" (INFERENCE); fee-seeking is common in listings (observed)          | Our course page                                                            | `/courses/spoken-english` fees block                 | No                                                                             |
| 6   | DU SOL help                                                               | observed: date sheet, exam form, admit card. INFERENCE: "DU SOL study material", "SOL B.A. guidance"    | Our page for "classes for SOL students"; official link for forms and dates | `/courses/college-classes`, link block               | **Yes** (sol.du.ac.in, exam.du.ac.in)                                          |
| 7   | Study material, sample papers, syllabus, date sheets                      | "CBSE sample paper 2026-27", "syllabus class 10 2026-27" (INFERENCE)                                    | Official link only                                                         | course page "Official CBSE links" block (no copying) | **Yes** (cbseacademic.nic.in/curriculum_2027.html)                             |

---

## 2. Official facts

### 2.1 CBSE (session 2026-27)

| Fact                                                                      | Value                                                                                                                                                                                                                                                                                                                                          | Official source                                                                      | Checked    | Conf.                                        |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------- | -------------------------------------------- |
| Curriculum 2026-27 published for Classes IX–XII                           | Yes (Circular Acad-14/2026, April)                                                                                                                                                                                                                                                                                                             | https://cbseacademic.nic.in/curriculum_2027.html                                     | 2026-10-27 | high                                         |
| Class IX scheme                                                           | Language 1 and 2, Maths (Standard or Advanced), Science (Standard or Advanced), Social Science, Vocational Education, Individuals in Society, Art Education, Physical Education and Well-being, CT & AI module                                                                                                                                 | https://cbseacademic.nic.in/skill-education.html                                     | same       | high                                         |
| Class IX Language 3                                                       | Optional on the scheme page; a circular summary says three languages in IX. Wording conflicts: do not say "compulsory"                                                                                                                                                                                                                         | skill-education page; Acad-49/2026 (summary only)                                    | same       | low                                          |
| Class IX Standard/Advanced split (80/25 marks)                            | News only                                                                                                                                                                                                                                                                                                                                      | n/a                                                                                  | same       | low: do not print                            |
| Class X scheme 2026-27                                                    | Language 1, Language 2, Maths (Basic or Standard), Science, Social Science; optional skill subject and third language                                                                                                                                                                                                                          | skill-education page                                                                 | same       | high                                         |
| Class X two board exams                                                   | Held in 2026: main 17 Feb–11 Mar, second 15–21 May, better score counts; second-exam results 18 Jul 2026                                                                                                                                                                                                                                       | https://www.cbse.gov.in/cbsenew/documents/Press_Release_18072026.pdf (snippet)       | same       | high on dates; rules for 2027 med: [CONFIRM] |
| CT & AI                                                                   | Compulsory module in IX–X in 2026-27; compulsory subject from 2027-28                                                                                                                                                                                                                                                                          | skill-education page                                                                 | same       | high                                         |
| Third language in Class VI                                                | Introduced from 2026-27 (Acad-17/2026)                                                                                                                                                                                                                                                                                                         | https://cbseacademic.nic.in/web_material/Circulars/2026/17_Circular_2026.pdf (title) | same       | high on title; detail unread                 |
| New NCERT books                                                           | Class 6 and 8 follow NCF-SE; Class IX books published except Social Science at last check                                                                                                                                                                                                                                                      | https://ncert.nic.in/pdf/announcement/notices/NCERT_Press_Release_grade9.pdf         | same       | med                                          |
| Class XI–XII scheme                                                       | Subject I English or Hindi; Subject II another language or an academic elective; III–V electives; optional 6th; internal: Health & PE, Work Experience, General Studies                                                                                                                                                                        | skill-education page                                                                 | same       | high                                         |
| Academic electives (official names)                                       | Accountancy, Biology, Biotechnology, Business Studies, Chemistry, Computer Science, Economics, Engineering Graphics, Entrepreneurship, Fine Arts, Geography, History, Home Science, Informatics Practices, Legal Studies, Mathematics, Applied Mathematics, Physical Education, Physics, Political Science, Psychology, Sociology (and others) | curriculum_2027.html                                                                 | same       | high                                         |
| Streams                                                                   | CBSE's scheme has **no** Science/Commerce/Humanities streams; they are school groupings. Use "subject combinations" in guidance text; the stream names stay as our course names                                                                                                                                                                | skill-education page                                                                 | same       | high (inference from scheme)                 |
| Combination limits                                                        | Only one of IP (065), Computer Science (083), IT (802); Business Studies and Business Administration not together                                                                                                                                                                                                                              | skill-education page                                                                 | same       | high                                         |
| Computer Science 083                                                      | 2026-27 syllabus is Python-based; no C++ found in any result                                                                                                                                                                                                                                                                                   | .../CurriculumMain27/SecPart2/Computer_Science_SecP2_2026-27.pdf                     | same       | med-high (PDF text unreadable)               |
| Informatics Practices 065                                                 | 2026-27 syllabus PDF exists                                                                                                                                                                                                                                                                                                                    | .../Informatics_Practices_SecP2_2026-27.pdf                                          | same       | med                                          |
| Classes 1–8 subjects (EVS vs Science, middle stage)                       | **Not verified**                                                                                                                                                                                                                                                                                                                               | n/a                                                                                  | same       | none                                         |
| Competency-based questions, internal assessment weights, Class XI changes | **Not verified**; no percentages                                                                                                                                                                                                                                                                                                               | n/a                                                                                  | same       | none                                         |

Parent-worthy 2026-27 changes (all need a final read of the circulars before copy): Class X second board exam
(done once in 2026), third language from Class VI, two-level Maths/Science in IX, CT & AI, new NCERT books.

### 2.2 AISSEE (Sainik Schools), Classes 6 and 9

The Information Bulletin could not be read. **Do not use sainikschooladmission.in** (a parked domain, not official).

| Fact                                                                                                  | Value                                                                                               | Official source                                               | Checked    | Conf.               |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ---------- | ------------------- |
| Latest cycle confirmed                                                                                | AISSEE-2026 (admission 2026-27), exam 18.01.2026, results published                                 | https://exams.nta.nic.in/sainik-school-society/               | 2026-10-27 | med                 |
| Next cycle (2027-28)                                                                                  | No official notification found. Guesses of Oct–Nov 2026 form and Jan 2027 exam are third-party      | n/a                                                           | same       | none: [CONFIRM]     |
| Public Notice 24 Oct 2025                                                                             | Adds 3 New Sainik Schools (Namakkal, Vasco, Ambajogai); refers to Information Bulletin Appendix I-B | https://nta.ac.in/Download/Notice/Notice_20251025180445.pdf   | same       | high                |
| Entry classes                                                                                         | VI and IX, by AISSEE performance                                                                    | https://sainikschoolsociety.in                                | same       | high                |
| Counselling                                                                                           | Online (AISSAC)                                                                                     | https://pesa.ncog.gov.in/sainikschoolecounselling/landingpage | same       | high                |
| Schools                                                                                               | 33 existing listed, plus "New Sainik Schools" in partnership mode; total intake not verified        | https://sainikschoolsociety.in/our-schools                    | same       | med (33), low (new) |
| Girls                                                                                                 | 10% of vacancies or 10 seats (whichever is more) in Class VI per school (SOP 2026, snippet)         | sainikschoolsociety.in SOP PDF                                | same       | med                 |
| Age Class VI / IX                                                                                     | 10–12 / 13–15 as on 31 March (seen for 2024 and 2025 notices); 2026 assumed same                    | NTA notices                                                   | same       | med: [CONFIRM]      |
| Education                                                                                             | VI: in or passed Class V; IX: Class VIII                                                            | secondary only                                                | same       | low                 |
| Pattern Class VI                                                                                      | 125 MCQs, 300 marks, 150 min (Maths, Language, Intelligence, GK), offline OMR                       | secondary only                                                | same       | low                 |
| Pattern Class IX                                                                                      | 150 Qs, 400 marks, 180 min (Maths, Intelligence, English, Gen. Science, Social Science)             | secondary only                                                | same       | low                 |
| Negative marking, cut-offs, medium, syllabus, application fee, seat matrix, school fees, scholarships | Not verified (fees conflict between sites)                                                          | bulletin / AISSAC portal                                      | same       | none                |

### 2.3 RMS CET (Class 6 and 9)

| Fact                                                 | Value                                                                                                                                                                                                                         | Source                                                                | Checked    | Conf.                             |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------- | --------------------------------- |
| Classes, schools                                     | VI and IX; 5 schools: Chail, Ajmer, Belgaum, Bengaluru, Dholpur; boarders only                                                                                                                                                | https://rashtriyamilitaryschools.edu.in (admission.html)              | 2026-10-27 | high                              |
| Age and gender                                       | **Conflict.** RMS site: 10–12 (VI), 13–15 (IX) as on 31 Mar, "exclusively for boys" (one page) while the homepage says "boys and girls". 2026 notice via secondary sites: 10–13 / 13–16 as on 31 Mar 2027; girls for Class VI | rashtriyamilitaryschools.edu.in vs Careers360 (secondary)             | same       | low                               |
| Class requirement                                    | VI: passed or studying in V. IX: not verified                                                                                                                                                                                 | secondary                                                             | same       | med / none                        |
| Stages                                               | OMR written test, interview and medical, merit                                                                                                                                                                                | secondary (official confirms OMR only)                                | same       | med                               |
| Class VI subjects                                    | Intelligence, GK, Maths, English; bilingual                                                                                                                                                                                   | secondary                                                             | same       | med                               |
| Class IX subjects, marks, duration, negative marking | Not verified                                                                                                                                                                                                                  | n/a                                                                   | same       | none                              |
| 2026 cycle calendar                                  | Apply 23 Sep–20 Oct 2026 (late to 25 Oct, Rs 500); exam 13 Dec 2026; previous cycle result 9 Feb 2026. **Application window has closed**                                                                                      | secondary (Careers360)                                                | same       | med                               |
| Portal                                               | https://exams.nta.nic.in/rmscet/ (NTA this cycle)                                                                                                                                                                             | RMS homepage, secondary                                               | same       | med                               |
| Application fee                                      | Rs 1,000 General/OBC; Rs 750 SC/ST/KIA wards                                                                                                                                                                                  | secondary                                                             | same       | med                               |
| Reservation                                          | 70% JCO/OR wards (incl. ex-servicemen); 30% officers (incl. retired) and civilians; 50 seats for wards of personnel killed in action; SC 15%, ST 7.5%                                                                         | https://rashtriyamilitaryschools.edu.in/reservation-of-vacancies.html | same       | high                              |
| School fees (annual, from 2020-21 until revised)     | Entitled OR Rs 12,000; entitled JCO Rs 18,000; non-entitled officer Rs 32,000; non-entitled civilian Rs 51,000; SC/ST pay 25% of their category fee; no tuition fee for KIA wards                                             | https://rashtriyamilitaryschools.edu.in/fee-structure.html            | same       | high on the page; confirm current |
| Seats per school, syllabus                           | Not verified                                                                                                                                                                                                                  | n/a                                                                   | same       | none                              |

### 2.4 RIMC Dehradun (Class 8)

| Fact                                                               | Value                                                                                                                                                   | Source                        | Checked    | Conf.                           |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------- | ------------------------------- |
| Entry class, schools                                               | Class VIII; one college (Dehradun)                                                                                                                      | institution                   | 2026-10-27 | high (one college), med (class) |
| Eligibility                                                        | Studying in or passed Class VII; boys and girls (secondary)                                                                                             | secondary                     | same       | med                             |
| Age                                                                | 11.5–13 years; counting date for the July 2027 term not verified (1 Jan 2027 for the Jan 2027 term per a state notice)                                  | secondary                     | same       | med range, none date            |
| Stages and marks                                                   | Written (Maths 200, English 125, GK 75 = 400), viva 50, medical                                                                                         | secondary                     | same       | med                             |
| Calendar                                                           | July 2027 term: apply 1–30 Sep 2026, exam 6 Dec 2026, pen and paper; result and interview months not verified. Jan 2027 term exam was 7 Jun 2026 (over) | UNI, Karmasandhan (secondary) | same       | med                             |
| Portal                                                             | NTA (RIMCEE) this cycle; some cycles via state DoSE                                                                                                     | secondary                     | same       | low-med                         |
| Official site                                                      | rimc.gov.in unreachable; may be rimc.edu.in. **Check which is live**                                                                                    | n/a                           | same       | low                             |
| Syllabus, duration, medium, seats, reservation, fees, scholarships | Not verified                                                                                                                                            | n/a                           | same       | none                            |

### 2.5 DU SOL

| Fact                                | Value                                                                                                                                                                                                                                                                                       | Source               | Checked    | Conf.                 |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ---------- | --------------------- |
| Name                                | School of Open Learning (shown as CDOE on the homepage)                                                                                                                                                                                                                                     | https://sol.du.ac.in | 2026-10-27 | high                  |
| UG programmes (18 listed)           | B.Sc. (Hons) Computer Science (new); B. Management Studies; BBA (FIA); B.A. (Hons) English, Political Science, Economics; B.Com. (Hons); B.Com.; B.A. (Programme) with Computer Applications, Economics, Education, English, Hindi, History, Mathematics, Political Science, Sanskrit, Urdu | same                 | same       | high                  |
| Pamphlet check                      | B.A. yes; B.Com. yes; **B.Sc.: only B.Sc. (Hons) Computer Science**, no general B.Sc.                                                                                                                                                                                                       | same                 | same       | high                  |
| Admission 2026-27                   | UG closed (last date 13 Oct 2026 per summary); on Class 12 marks                                                                                                                                                                                                                            | https://sol.du.ac.in | same       | high closed, med rest |
| Student links                       | Dashboard medhasetu.oldcdu.ac.in; exam forms and date sheets via sol.du.ac.in and exam.du.ac.in                                                                                                                                                                                             | same                 | same       | high                  |
| Helpdesk                            | Mon–Fri 9:30–5:30; 011-65213030, 011-35663474                                                                                                                                                                                                                                               | same                 | same       | high                  |
| Eligibility %, exam pattern details | Not reliable                                                                                                                                                                                                                                                                                | prospectus (garbled) | same       | low: do not quote     |

### 2.6 Spoken English

Nothing official needed. A CEFR level (A1–C2, Council of Europe) can be named only if the owner says which level the
course aims at (Q8).

---

## 3. Content plan

### 3.1 Recommendation

- **Course pages:** finish the 8 remaining pages (classes-1-5, classes-6-8, class-11-12-science, -commerce, -humanities, rms-rimc-sainik, spoken-english, college-classes) on the classes-9-10 template.
- **Exam guides: one page per exam, three pages**, not one combined. Reasons: each exam has its own queries (parents search "RMS CET age", "AISSEE date" separately), its own calendar and "last checked" date, and one page per exam keeps each page short on a phone. Plus a small **hub** `/guides` listing the three. (A combined page would be a wall of text.)
- Also one non-exam guide is _not_ proposed (CBSE official links live as a block on course pages).

### 3.2 Page list

| URL                               | Title (working)                                     | Targets intent | Type      |
| --------------------------------- | --------------------------------------------------- | -------------- | --------- |
| `/courses/classes-1-5`            | Classes 1–5 CBSE tuition, Delhi Cantt               | 1, 2           | course    |
| `/courses/classes-6-8`            | Classes 6–8 CBSE tuition                            | 1, 2           | course    |
| `/courses/class-11-12-science`    | Class 11–12 Science tuition                         | 1, 7           | course    |
| `/courses/class-11-12-commerce`   | Class 11–12 Commerce tuition                        | 1, 7           | course    |
| `/courses/class-11-12-humanities` | Class 11–12 Humanities tuition                      | 1, 7           | course    |
| `/courses/rms-rimc-sainik`        | RMS, RIMC and Sainik School coaching                | 4              | course    |
| `/courses/spoken-english`         | Spoken English classes                              | 5              | course    |
| `/courses/college-classes`        | Classes for open/distance degree students           | 6              | course    |
| `/guides`                         | Entrance exam guides                                | 3              | guide hub |
| `/guides/rms-cet`                 | RMS CET: eligibility, pattern, dates                | 3              | guide     |
| `/guides/sainik-school-aissee`    | Sainik School (AISSEE): eligibility, pattern, dates | 3              | guide     |
| `/guides/rimc`                    | RIMC Dehradun entrance: eligibility, pattern, dates | 3              | guide     |

Slug note: site-plan lists `/courses/[slug]` with 9 courses; guides are a new route family (site-plan update in C3b).

### 3.3 Course page outlines (existing sections only)

Common order (as classes-9-10): hero (compact, facts tile) › subjects › reason-list (band, "How we teach") › [video-player if playlists exist] › fees › faq › cta-band.

| Page                                  | Outline differences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Classes 1–5, 6–8                      | hero facts: Classes, Subjects (3), Batch size, Free demo. Subjects: Maths, Science, English. Fees block: range per session, "depends on class and joining time". reason-list: syllabus early, regular tests, study material (all owner-confirmed). faq: demo, batch size, modes, how fees depend on joining time, "Is Hindi/Social Studies taught?" (answer only after Q4). No video-player (playlists are Maths 9/10 only).                                                                                                           |
| 11–12 Science / Commerce / Humanities | hero facts add "Fee per subject". Subjects: per stream (see Q2 for split). Fees: Rs 25,000 per subject per session. Science page: Maths taught by Anil Sir (confirmed). video-player: Class 11/12 Maths playlists only if they exist in `videos.ts`. faq: "Can I take a different combination?" (answer with CBSE rule: choose electives; one of IP/CS/IT), "Computer Science language" after Q1. A "Official CBSE links" list block (syllabus, sample papers) on each 11–12 and 9–10 page is a _proposed new small section_: see 3.5. |
| RMS/RIMC/Sainik                       | hero facts: Entry classes (RMS 6, 9; Sainik 6, 9; RIMC 8), Fee, Batch, Demo. Section "Which exam, which class" (card-grid: 3 cards, each links to its guide). Subjects: only exam-related subjects (Maths, English, GK/reasoning per Q5). reason-list: separate batch, interview preparation (existing course copy; confirm Q5). fees: Rs 80,000 for the session, every level. Section "Before you apply" linking to guides. faq. cta.                                                                                                 |
| Spoken English                        | hero facts: Duration 3 months, Classes per week 5, Age under 20, Fee Rs 9,000. reason-list: only confirmed items. faq: batch timing (Q9), starting month.                                                                                                                                                                                                                                                                                                                                                                              |
| College classes                       | hero: "Classes for students of open and distance degrees". Subjects card-grid: B.A., B.Com. (and B.Sc. only after Q7). Split: "What we help with" (Q7). Official-links list: sol.du.ac.in, exam.du.ac.in. No fee (PLACEHOLDER). Note: SOL UG admission 2026-27 is closed; never promise "admission help".                                                                                                                                                                                                                              |

### 3.4 Exam-guide page outline

hero (compact, breadcrumbs Home › Guides › RMS CET; facts tile: Classes, Age, Mode, Last checked) ›
**facts-tiles** (key numbers) › **eligibility** (short list) › **pattern** (dotted-leader table: paper, marks, time) ›
**syllabus** (short list per subject) › **calendar** (dotted-leader table: form, exam, result; each with `status`: confirmed / expected / check official) ›
**seats and fees** (reservation + school fees tables; only where verified) › **official links** (list) ›
"How Daksh prepares your child" (split, links to the course page, with the no-guarantee line) › faq › cta-band.
A visible line under the hero: "Last checked 27 Oct 2026 · Always confirm on the official site".

Reuse: hero, split, card-grid, faq, cta-band, fees-like dotted-leader table (`HeroFacts` style). New sections needed:
`fact-list` (dotted-leader table, generic), `link-list` (official links), `eligibility` could be a plain `reason-list`
without numerals or a `card-grid`. Prefer **one** generic new section (`fact-table`: rows of label/value/note/status)
used for pattern, calendar, seats and fees, and a `link-list`. Everything else reuses existing sections.

### 3.5 Cross-links

- Course page `rms-rimc-sainik` ↔ each guide: card-grid "Which exam" (course → guide) and the guide's "How Daksh prepares" split (guide → course).
- Guides hub ↔ the three guides; each guide has "Related guides" (two others).
- Class 6–8 and 9–10 pages mention entrance exams in the faq with a link to `/guides`.
- Nav: add "Guides" only after C3b has all three guides; footer "Explore" column gets "Entrance exam guides".
- Related links are data (`related: [slug]`) so the reverse link is derived, not stored twice (same rule as faculty).

### 3.6 Schema proposal: `Guide` (collection `src/content/guides/`, read via `getGuides()` / `getGuide(slug)`)

```ts
Guide = {
  slug: string                       // "rms-cet"
  exam: string                       // "RMS CET"
  title: string
  summary: string
  courseSlug?: string                // links to the course page
  seo: { title, description }
  lastChecked: ISODate               // shown on the page
  cycle: string                      // "Admission 2027-28" (the notification the facts come from)
  entryClasses: { label: string; ageRule?: Fact }[]
  eligibility: Fact[]                // { label, value, note? }
  pattern: { entryClass: string; papers: { subject, marks?, questions?, duration? }[]; totalMarks?; negativeMarking?: Fact; medium?: Fact }[]
  syllabus: { entryClass: string; subjects: { name, topics: string[] }[] }[]
  calendar: { label: string; date?: string; status: "confirmed" | "expected" | "check-official" }[]
  seats?: Fact[]                     // reservation, school count
  scholarships?: Fact[]
  schoolFees?: { label, amount, note? }[]
  officialLinks: { label: string; href: string; purpose: "apply" | "notification" | "result" | "counselling" | "info" }[]
  sources: { fact: string; url: string; checked: ISODate }[]   // every fact traceable
  disclaimer: string                 // standard no-guarantee line (site data, not hard-coded)
  related: string[]                  // guide slugs
  sections: Section[]                // as for pages: hero, split, faq, cta-band; new sections reference guide fields
}
Fact = { label: string; value: string; sourceId?: string; confirmed: boolean }
```

Rules built into the schema: `confirmed: false` facts render as "Check the latest official notification" and the
build lists them (like `sample: true`); a fact with `confirmed: true` needs a `sourceId` found in `sources`;
`lastChecked` is required; official URLs only on `officialLinks`/`sources`. Dates use `status` so "expected" is never
shown as final. Nothing exam-specific lives in components.

Also needed in `Fees`: an `amountTo` (range) for Classes 1–8, and a `note` for "depends on joining time".

### 3.7 Copy rules

1. No guarantee of marks, ranks, selection or seats. Standard line (proposed, own wording, not official): "Admission depends only on the official exam and counselling process. We prepare students; we cannot promise selection or a seat. Check dates and rules on the official website."
2. Paraphrase official text; never copy PDFs. Every fact in a guide traces to a `sources` entry.
3. Visible "Last checked" date on every guide; unconfirmed facts say "check the official notification", never a guess.
4. No "best/top/100% results" (Indian coaching-centre guidelines, PRODUCT.md). Results stay MOCK.
5. Fees on course pages come only from owner data; school fees (RMS) are on the guide, not mixed with Daksh fees.
6. Missing facts: `PLACEHOLDER`; sample faculty: `sample: true`.
7. Voice per PRODUCT.md: simple Indian English, sentence case, short blocks.

---

## 4. Verification checklist (before C3b writes any exam figures)

A person with a normal browser should open and confirm:

1. AISSEE Information Bulletin (latest; English): age, education, pattern, negative marking, medium, syllabus, fee, seats. https://aissee.nta.nic.in and https://exams.nta.nic.in/sainik-school-society/
2. RMS CET notification on https://exams.nta.nic.in/rmscet/: age, **girls or boys only**, pattern per class, dates, fee.
3. RIMC: which site is live (rimc.gov.in or rimc.edu.in) and the current notification: age counting date, syllabus, fees.
4. CBSE circulars Acad-14, -17, -46, -49/2026 (Class IX language rule, two-level subjects, 2027 board norms).
5. CBSE Computer Science 083 and IP 065 2026-27 syllabus PDFs (Python confirmed; no C++).
6. CBSE Classes 1–8 subjects (NCERT/CBSE pages were not reachable by the researcher).

Until then C3b can build the pages with `confirmed: false` facts that show "check the official notification".

## 5. Questions for the owner

1. **"C++" in the pamphlet:** CBSE Computer Science is now Python-based (C++ not found in the current syllabus). Do you teach C++, Python, or both? Should the site say "Computer Science (Python)"?
2. **Stream split of Class 11–12 subjects:** pamphlet lists 11 subjects; confirm which are in Science, Commerce, Humanities (English, IP/Computer Science in every stream or only some?). Is Accountancy under Commerce, Political Science and Economics under Humanities and Commerce?
3. **Classes 1–8 fee:** the exact amount for each class (1, 2 … 8), and the rule for mid-session joiners (any simple example, or "call us")? Can we publish the Rs 25,000–30,000 range?
4. **Classes 1–8 subjects:** Is Hindi / Social Studies / EVS taught at all? (Pamphlet says only Maths, Science, English.)
5. **Entrance course:** which subjects exactly (Maths, English, GK, reasoning, Hindi?), is there an interview/viva class, batch size, timings, duration, who teaches it? Do you prepare for AISSEE Class 6 and 9, RMS Class 6 and 9, RIMC Class 8 all in one batch or separate batches by class?
6. **Entrance session:** when does the entrance session start and end (months)? Does Rs 80,000 cover everything (material, tests, mock interviews)?
7. **College classes:** which subjects, which degrees (B.A., B.Com., B.Sc.) really? DU SOL has no general B.Sc. (only B.Sc. (Hons) Computer Science). Any other universities (IGNOU, others)? Fee? Batch days?
8. **Spoken English:** What level (beginner/intermediate)? Is the "under 20" age limit firm? Does the course include grammar/personality development? Do you issue a certificate?
9. **Spoken English timing:** Is it still "usually June–August", or does it run through the year? Daily timing? Is "Classes 1–12" still true?
10. **Fee display:** Spoken English, 11–12 and Classes 1–8 prices go live on the site (`showFees`). OK to show all?
11. **Faculty:** names, subjects and classes of the other teachers, or keep sample records until you send them (docs/content-requests.md)?
12. **Pamphlet exam figures:** does the pamphlet print any ages, exam dates, marks or seat numbers? Send the lines so I can compare (official wins).
13. **Gender:** are boys and girls both taught in the entrance batch? (Only for the course page; eligibility for each exam comes from the official notification.)
