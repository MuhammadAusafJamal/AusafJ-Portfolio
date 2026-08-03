# Positioning

Everything downstream—the hero, the meta description, the OG image, the project
selection—is derived from this file. Written from the CV and a full pass over
github.com/MuhammadAusafJamal.

Nothing here is aspirational. Every claim is backed by a repo or a role.

---

## The one-line positioning

**Recommended:**

> Software engineer building full-stack products with React, Next.js, and Node.

Plain, accurate, and it names the stack a recruiter is screening for. Twelve words, fits the
hero at 49px without wrapping past two lines.

**Alternates:**

- _"Software engineer. I build full-stack web and mobile products—and I ship what I
  learn."_—warmer, more personality, slightly less scannable.
- _"Software engineer from Karachi, shipping full-stack products across web and mobile."_—
  leads with location, useful if targeting local or regional roles first.

## The proof line

> 2 years at Technyx Systems. BS Computer Science, University of Karachi.

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

| Field    | Value                                                  |
| -------- | ------------------------------------------------------ |
| Name     | Muhammad Ausaf Jamal                                   |
| Role     | Software Engineer                                      |
| Location | Karachi, Pakistan                                      |
| Email    | <ausaffarooqui17@gmail.com>                            |
| GitHub   | github.com/MuhammadAusafJamal                          |
| LinkedIn | linkedin.com/in/muhammadausafjamal                     |
| Degree   | BS Computer Science, University of Karachi (2022–2026) |

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

### 2. Experience Abu Dhabi—legacy migration

**Why it makes the cut.** It is the only entry with real users and commercial stakes, and
"migrate React 16 to Next.js without disrupting a live product" is a story about judgment,
not just typing. Recruiters weight production work far above side projects.

**Hard decision:** incremental migration versus rewrite, and how you kept the existing stack
serving traffic throughout.

**Missing:** a real before/after number. Load time, bundle size, or Lighthouse score across
the migration would carry this section. "4+ REST endpoints" and "20+ components" are
countable, not impactful—they describe volume, not effect.

**Constraint to check:** client work. Confirm what you may show publicly. If no live link or
source is possible, say so in the case study—an explicit "client project, source not
public" reads as professional, not evasive.

### 3. IoT Sensor Data Management System—distributed database

**Why it beats the other coursework projects.** It is the only repo with real SQL—
`PLpgSQL` alongside the JavaScript—so it is the one piece of evidence that you have worked
at the data layer rather than only calling an API. That directly fills the gap the CV leaves.

**Hard decision:** the partitioning or replication strategy, and what it costs on read versus
write.

**Missing:** a diagram of the distribution model, and one number—rows handled, query time,
or node count.

### Reserve

**This portfolio and the `ausaf` CLI.** Once the CLI ships, this repo becomes a legitimate
fourth flagship: one Zod schema consumed by CLI, build, and API; a command grammar shared
between a terminal and a browser palette; real Git Flow, protected branches, and CI. Swap it
in if any of the three above cannot produce a measurable outcome.

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

| Group     | Items                                              |
| --------- | -------------------------------------------------- |
| Languages | TypeScript, JavaScript (ES6+), SQL                 |
| Frontend  | React, Next.js, Redux, Material UI, Tailwind, SCSS |
| Mobile    | React Native, Expo                                 |
| Backend   | Node.js, Express, REST APIs, authentication        |
| Data      | MongoDB, Firestore, PostgreSQL/PLpgSQL             |
| Tooling   | Git, GitHub Actions, Vercel, Netlify, npm          |

No proficiency bars, no percentages, no star ratings. Nobody can check the number, so it
reads as decoration.

---

## Open items

- [ ] Pick the final positioning line from the three above
- [ ] Get one measurable outcome for each flagship—this is the blocker on all three
- [ ] Fix the `Frontend/` vs `frontend/` collision in Madadgar
- [ ] Fill in the Madadgar demo video link, or delete the placeholder line
- [ ] Add descriptions and topics to the repos that have none
- [ ] Pin Madadgar, IoT Sensor DDB, and this portfolio on the GitHub profile
- [ ] Update the CV: it says "1.5+ years" and reads as frontend-only. It undersells Madadgar
      and the distributed-database work entirely, and it does not mention this portfolio
- [ ] Decide what Experience Abu Dhabi may show publicly
- [ ] One good photo
