# Positioning

Everything downstream—the hero, the meta description, the OG image, the project
selection—is derived from this file. Written from the CV and a full pass over
github.com/MuhammadAusafJamal, and last reconciled against the CV and LinkedIn on
2026-09-16.

Nothing here is aspirational. Every claim is backed by a repo or a role.

---

## The one-line positioning

**Recommended:**

> Software engineer building government digital platforms on React, Next.js, Node, and .NET.

Names the stack a recruiter screens for and the domain the work actually happens in. Opens
with "Software engineer" deliberately: that is the real job title and the LinkedIn headline,
so a recruiter cross-checking the site against the CV finds the same words in both places.

**Alternates:**

- _"Software engineer. I build full-stack web and mobile products—and I ship what I
  learn."_—warmer, more personality, slightly less scannable.
- _"Software engineer from Karachi, shipping full-stack products across web and mobile."_—
  leads with location, useful if targeting local or regional roles first.

## The proof line

> 2+ years at Technyx Systems. BS Computer Science, University of Karachi, 2025.

**Why not a scale metric.** The usual advice is to lead with requests/day or p95 latency.
That assumes a senior engineer, and inventing a number you cannot defend is disqualifying
in the first technical screen. At roughly two years, the credible substitute is **evidence of
craft and range**—shipped projects, clean repositories, a real workflow. That is a stronger
signal at this level than a borrowed latency figure.

## Availability

> Open to software engineering roles—Karachi or remote.

State it plainly on the homepage. Ambiguity here costs Hireability points for free.

---

## Identity

| Field    | Value                                                          |
| -------- | -------------------------------------------------------------- |
| Name     | Muhammad Ausaf Jamal                                           |
| Role     | Software Engineer                                              |
| Location | Karachi, Pakistan                                              |
| Email    | <ausaffarooqui17@gmail.com>                                    |
| GitHub   | github.com/MuhammadAusafJamal                                  |
| LinkedIn | linkedin.com/in/muhammadausafjamal                             |
| Degree   | BS Computer Science, University of Karachi (Feb 2022–Dec 2025) |

---

## The three flagship projects

Selected on evidence, not preference. Each one has to carry four things: a problem stated
plainly, your specific contribution, one hard decision, one measurable outcome.

### 1. Madadgar—AI Service Orchestrator

**Why it leads.** It is the only project that is genuinely full-stack _and_ genuinely hard:
a React Native (Expo) app, an Express backend, Firebase auth and Firestore, and an eight-agent
orchestration pipeline that turns a natural-language message into a matched provider and a
booking. Built for the Google Antigravity Hackathon, Challenge 2.

The detail worth leading with is the **multilingual intake**—English, Roman Urdu, and Urdu.
_"Mujhe kal subah G-13 mein AC technician chahiye"_ parsed into service type, location, and
time is a concrete, memorable capability, and it is regionally distinctive in a way no
generic CRUD project is.

The **hard decision** to write up: provider ranking is a weighted blend of rating,
availability, and distance. Why those weights, what you rejected, and how you validated it.

**Missing before this can ship as a flagship:**

- A measurable outcome. Intent-extraction accuracy across the three languages, or end-to-end
  latency per request, would both work.
- The demo video link—the README still contains the literal placeholder
  `‹paste your demo video link here›`.
- **A real bug: the repo contains both `Frontend/` and `frontend/`.** That is invisible on
  Windows and on macOS by default, but a Linux clone produces two separate directories. Fix
  before anyone reads the repo.
- The whole project is a single commit. Nobody can see how it was built. Nothing to do
  retroactively, but worth knowing that the git history adds no signal here.

### 2. Government Tourism & Destination Information Platform—legacy migration

**Why it makes the cut.** It is the entry with real users and commercial stakes, and
"migrate React 16 to Next.js without disrupting a live product" is a story about judgment,
not just typing. Recruiters weight production work far above side projects.

**Hard decision:** incremental migration versus rewrite, and how the existing stack kept
serving traffic throughout.

**Outcome, now sourced:** crash handling across the application cut runtime crashes by
roughly 5-6%. That number is scoped to this project and belongs nowhere else—never on the
general Technyx role bullet.

**Naming:** published under the anonymised name on the site, the CV, and LinkedIn. The real
client name is not used in public content, and the old `/projects/experience-abu-dhabi` URL
redirects permanently to the new slug.

**Still missing:** a load-time or bundle-size figure across the migration. The crash metric
carries the section for now, but a performance number is the one a migration story wants.

### 3. Government Family Affairs Digital Services Portal—headless CMS backend

**Why it takes the third slot.** It is the only public evidence of the second backend stack.
The CV claims ASP.NET Core, Umbraco, SQL Server, and Azure; without this case study those
four entries on the skills list have nothing behind them.

**Hard decision:** headless rather than Umbraco's built-in rendering, so the web platform and
the external integrations read one source of truth instead of two.

**Countable:** 10+ custom document types. That counts structure rather than effect, which is
an honest description of what the work was.

**Missing:** an outcome rather than a count. Editor time per publish, or integration count
served, would both work.

### Reserve

**IoT Sensor Data Management System.** The only repo with real SQL—`PLpgSQL` alongside the
JavaScript. It held a flagship slot until the government .NET work gave the data layer better
evidence, and it still backs the PostgreSQL entry on the skills list.

**This portfolio and the `ausaf` CLI.** Once the CLI ships, this repo becomes a legitimate
flagship: one Zod schema consumed by CLI, build, and API; a command grammar shared between a
terminal and a browser palette; real Git Flow, protected branches, and CI. It is already a
Key Project on the CV. Swap it in if any of the three above cannot produce a measurable
outcome.

---

## The differentiator

Seven CS fundamentals projects, **all deployed and clickable**:

| Project                    | Subject                     | Live |
| -------------------------- | --------------------------- | ---- |
| IoT Sensor DDB             | Distributed databases       | ✓    |
| Ciphers                    | Cryptography                | ✓    |
| Process Control Block      | OS scheduling, round robin  | ✓    |
| Queueing & Simulation      | Modelling & simulation      | ✓    |
| Date-Time Format Validator | Automata, regular languages | ✓    |
| HCI Interface              | Human-computer interaction  | ✓    |
| Three.js Journey           | WebGL, 3D                   | ✓    |

Most graduates have coursework rotting in a private repo. Every one of these is deployed and
has a URL. **That is the story:** this person finishes things and ships them.

Give it a section on `/projects`—"Coursework, shipped" or similar—rather than a flagship
slot. It works as volume evidence, not as a single deep case study.

---

## Skills—grouped as they should appear

| Group     | Items                                                                   |
| --------- | ----------------------------------------------------------------------- |
| Languages | TypeScript, JavaScript, C#, SQL                                         |
| Frontend  | React, Next.js, Redux, Material UI, Tailwind, Bootstrap, SCSS, Three.js |
| Mobile    | React Native, Expo                                                      |
| Backend   | Node.js, Express, REST APIs, ASP.NET Core, ASP.NET MVC, Umbraco, Zod    |
| Data      | MongoDB, Mongoose, SQL Server, PostgreSQL/PLpgSQL, Firestore            |
| Tooling   | Azure, Azure DevOps, GitHub Actions, Git, Vercel, Jest, Vitest          |

Six groups is the schema cap, so the second backend stack had to fit inside the existing
shape rather than get a group of its own. `.NET` lives in Backend, Azure in Tooling.

No proficiency bars, no percentages, no star ratings. Nobody can check the number, so it
reads as decoration.

---

## Open items

- [x] Pick the final positioning line—settled on the "Software engineer" opener so the site,
      the CV header, and the LinkedIn headline all say the same thing
- [x] Decide what the tourism platform may show publicly—anonymised name, no live URL, no repo
- [x] Source a measurable outcome for the tourism platform—~5-6% runtime crash reduction
- [ ] Get a measurable outcome for Madadgar and for the Family Affairs portal. Intent-extraction
      accuracy across the three languages would carry Madadgar
- [ ] Add a load-time or bundle-size figure to the tourism migration
- [ ] Fix the `Frontend/` vs `frontend/` collision in Madadgar
- [ ] Fill in the Madadgar demo video link, or delete the placeholder line
- [ ] Add descriptions and topics to the repos that have none
- [ ] Pin Madadgar, IoT Sensor DDB, and this portfolio on the GitHub profile
- [x] Build `/about` and move education and certifications there. Shipped in v0.7.0. Both
      lists now come from `lib/credentials.ts`, which `/about` and `/resume` share, and
      `/about` carries the `Person` graph plus the FAQ added in v0.8.0
- [ ] Submit `sitemap.xml` in Google Search Console and import the property into Bing
      Webmaster Tools. Search discoverability is the ceiling on the AEO score and no code
      change moves it. Bing feeds Copilot and partly feeds ChatGPT browsing
- [ ] `llms.txt` and per-project `CreativeWork` schema, the two AEO items skipped in favour
      of `/about`
- [ ] **Covers: render the field before shooting any images.** `cover` is required on every
      project and read by nothing—`ProjectCard` renders category, title, summary, metrics,
      stack, and links, and `app/projects/[slug]/opengraph-image.tsx` generates the share
      card from frontmatter instead. All 10 `cover.png` paths point at files that do not
      exist, and the site looks correct anyway. Order of work: render `cover` on the card or
      the case study, then screenshot the five projects with live URLs (the four Three.js
      scenes and this site), then decide what Madadgar and IoT get, since they are repo-only.
      The three government projects cannot be shown at all. Deferred to a later release
- [ ] Decide whether this portfolio gets its own project page. It is a Key Project on the CV
      and has no page here
- [ ] One good photo
