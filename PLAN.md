# AusafJ Portfolio — Full Build Specification

Everything needed to build this yourself: architecture, theme, schemas, API surface, CLI spec, checklists, verification.
No implementation code — this is the spec you execute against.

---

## 1. Context

### 1.1 The goal

Score high on the three factors used in the reviewed spreadsheet (200+ portfolios, max 30 points).

Rubric, verbatim from the sheet:

- **Hireability (10)** — "If a recruiter looked at your site, would they be able quickly get a good idea of what you do and your skill level or obtain or view a resume that can give them more information?"
- **Aesthetic (10)** — "Does the site look good? Is it responsive? Is it overwhelming or does it maintain a nice sense of UX and direction for the viewer?"
- **Creativity (10)** — "Is the site creative or unique? Is it able to do so **without compromising any of the other values**?"

Secondary goal: use the build to strengthen backend skill — content is managed from a CLI you write, not a CMS.

Starting point: `D:\My Projects\AusafJ-Portfolio` — empty, no commits. Greenfield.

### 1.2 What the data says

| Site                      | Hire | Aesth | Creat | Total |
| ------------------------- | ---- | ----- | ----- | ----- |
| prasoon-v2.vercel.app     | 10   | 10    | 10    | 30    |
| sugith.in                 | 9.5  | 9     | 10    | 28.5  |
| tedawf.com                | 10   | 9     | 9     | 28    |
| thegr8binil.me            | 9    | 9.5   | 9.5   | 28    |
| jasoncameron.dev          | 10   | 9     | 9     | 28    |
| andrijaweb.vercel.app     | 8.5  | 10    | 9     | 27.5  |
| rafaelamaral.dev          | 10   | 9     | 8.5   | 27.5  |
| yuteoctober (Win95 theme) | 10   | 10    | 7     | 27    |
| natsha.me                 | 7    | 10    | 10    | 27    |
| bryanleezh.dev            | 8    | 9     | 10    | 27    |
| wallenart.dev             | 9    | 7.5   | 10    | 26.5  |
| cobraaitch                | 6    | 10    | 10    | 26    |

**Read of the data:** totals above 27 come from _balance_, not from a maxed Creativity. Every site that maxed Creativity by going concept-heavy paid for it elsewhere — cobraaitch 6.0 Hireability, natsha 7.0 Hireability, wallenart 7.5 Aesthetic. Meanwhile the Win95 concept site scored 10/10 on Hireability and Aesthetic and still only totalled 27 because Creativity was judged 7.

Conclusion: **conventional-but-excellent + one memorable, additive moment** is the highest expected value. Target 9.5 / 9.5 / 9 = 28.

### 1.3 Reference structure

tedawf.com (28) section order, as the proven baseline:

nav (home / projects / blog / contact) → hero with photo, one-line identity ("Backend by profession, full-stack by passion"), resume PDF link, socials → work & education accordion with tech tags per role → featured projects with tags and live/source links → recent blog posts with view counts → footer.

---

## 2. Decisions

| Area            | Decision                        | Reasoning                                                               |
| --------------- | ------------------------------- | ----------------------------------------------------------------------- |
| Framework       | Next.js App Router + TypeScript | Static output, best-in-class metadata/OG tooling, first-class on Vercel |
| Styling         | Tailwind, tokens only           | Tokens in config; arbitrary values banned in components                 |
| CLI stack       | Node + TypeScript               | Shared types with site, one language                                    |
| Content storage | **MDX in git**                  | Source of truth for all page content                                    |
| Dynamic data    | **MongoDB Atlas**               | Off the critical render path                                            |
| Hosting         | Vercel                          | Static/ISR pages + serverless routes                                    |
| Audience        | Everyone, via layering          | Progressive disclosure, nothing cut                                     |
| Creativity      | One signature moment            | Command palette sharing the CLI's grammar                               |

### 2.1 Mongo over Firebase

Firebase hides backend work behind an SDK — a reviewer sees configuration, not engineering — and its client SDK is heavy enough to cost you Aesthetic/perf points. MongoDB forces you to own schema design, index strategy, and connection pooling under serverless. Those are the things an interviewer can actually probe, and they are the things that make this project strengthen your backend skill.

### 2.2 Content must NOT live in the database

A serverless cold start plus a Mongo round-trip on the critical render path costs Aesthetic and Hireability directly: slow first paint, layout shift, and a cluster outage means a blank portfolio during the exact 20 seconds a recruiter is looking.

Static MDX renders instantly and cannot go down. The backend is still real — it just sits off the critical path, powering view counts, guestbook, contact, and the CLI.

**Hard rule: the homepage must render perfectly with the Atlas cluster paused.** This is a verification step in §17.

### 2.3 Resolving "show everything"

Everything is present. Hierarchy decides what a 10-second visitor absorbs.

| Layer | Where           | Content                                                                |
| ----- | --------------- | ---------------------------------------------------------------------- |
| 1     | Above the fold  | Who you are, what you build, seniority signal, resume, contact         |
| 2     | Homepage scroll | 3 featured projects, experience timeline, skill groups, recent writing |
| 3     | Dedicated pages | Every case study, full skill matrix, all posts, uses, archive          |

Nothing is dropped. Depth is opt-in. Flat-everything is precisely what capped the 6.0 and 6.5 Hireability rows in the sheet.

---

## 3. Phase 0 — Positioning (before any code)

Hireability is decided here, not in the codebase. Produce `content/positioning.md` by hand.

1. **One sentence:** `<role> who builds <thing> for <who>, using <stack>.` This exact string goes in the hero, `<meta description>`, the OG image, and your LinkedIn headline. Test: read it to someone who doesn't know you; they should be able to name a job req you fit.
2. **Seniority signal you can prove** — years, scale numbers (requests/day, users, data volume), notable employer, or shipped product. One line, above the fold.
3. **Three flagship projects.** Each needs, in writing, before you build anything:
   - the problem, in one sentence a non-engineer understands
   - your specific contribution (not the team's)
   - one hard technical decision and the tradeoff you took
   - one measurable outcome (latency, cost, users, load handled, time saved)
   - a live URL and a source URL

   A project without a measurable outcome is a Layer-3 project, not a flagship.

4. **Update the resume PDF first.** It gets linked from the hero and it is the artifact the recruiter actually reads. The site is the trailer; the resume is the film.
5. **Buy a real domain.** `ausafjamal.dev` / `ausaf.dev` / similar. Sub-25 scorers in the sheet were disproportionately on default `*.vercel.app` domains.
6. **Get one good photo.** tedawf, the 28-scorer, leads with a photo. Faces build trust faster than illustration.

---

## 4. Theme & design system

Build this before components exist. "Overwhelming" is the explicit failure mode named in the Aesthetic rubric — the fix is a small, rigidly-applied token set.

### 4.1 Concept

**Monochrome. Near-black canvas, no accent hue, generous whitespace, one column.**

Rationale: the overwhelming majority of dev portfolios use blue or violet on dark, and a coloured accent is the thing generated designs immediately overuse — heading, tagline, tags, metrics, all accented, which reads decorative rather than deliberate. Removing the hue removes the failure mode. Hierarchy then comes from size, weight, and contrast, which is where it should come from anyway.

The "accent" token still exists, but it is white on dark and near-black on light. It marks the primary button and interactive state; nothing else.

**One exception:** the status dot stays green. It is functional signal, not decoration — a health indicator that reads at a glance, used at 6px and nowhere else. Colour that carries meaning is not a violation of a monochrome palette; colour that carries emphasis is.

Since there is no hue to distinguish links, **links are underlined.** Without colour, the underline is the only affordance left, so it is not optional.

### 4.2 Color tokens — dark (default)

| Token           | Hex       | Use                                 |
| --------------- | --------- | ----------------------------------- |
| `bg`            | `#0B0B0C` | Page background                     |
| `surface`       | `#141416` | Cards, panels                       |
| `surface-2`     | `#1C1C20` | Hover, raised, code blocks          |
| `border`        | `#26262B` | Hairlines, card outlines            |
| `border-strong` | `#3A3A42` | Focus outlines, active borders      |
| `text`          | `#EDEDEF` | Headings, body                      |
| `text-muted`    | `#A1A1AA` | Secondary copy, meta                |
| `text-subtle`   | `#71717A` | Timestamps, non-essential only      |
| `accent`        | `#FAFAFA` | Primary button fill, active state   |
| `accent-hover`  | `#FFFFFF` | Accent hover                        |
| `accent-quiet`  | `#1F1F23` | Tag backgrounds, subtle fills       |
| `success`       | `#4ADE80` | Status dot only — 6px, nowhere else |
| `danger`        | `#F87171` | Errors, destructive                 |

Contrast check: `text` on `bg` ≈ 17:1, `text-muted` ≈ 8:1, `accent` ≈ 18:1. All pass AA comfortably. `text-subtle` ≈ 4.6:1 — **never use it for information a recruiter needs.**

### 4.3 Color tokens — light

| Token           | Hex       | Use                        |
| --------------- | --------- | -------------------------- |
| `bg`            | `#FAFAF9` | Page background            |
| `surface`       | `#FFFFFF` | Cards, panels              |
| `surface-2`     | `#F4F4F2` | Hover, raised, code blocks |
| `border`        | `#E4E4E1` | Hairlines                  |
| `border-strong` | `#C9C9C4` | Focus outlines             |
| `text`          | `#18181B` | Headings, body             |
| `text-muted`    | `#52525B` | Secondary copy             |
| `text-subtle`   | `#71717A` | Non-essential only         |
| `accent`        | `#0A0A0B` | Primary button fill        |
| `accent-hover`  | `#000000` | Accent hover               |
| `accent-quiet`  | `#EFEFED` | Tag backgrounds            |
| `success`       | `#15803D` | Status dot only            |
| `danger`        | `#B91C1C` | Errors                     |

The accent **inverts** between themes: white on dark, near-black on light. A primary button is therefore always maximum contrast against its page, in both themes — which is the whole reason a monochrome palette can carry a call to action at all.

**If you later want a hue back**, swap the `accent` / `accent-hover` pair and change nothing else: cool teal `#2DD4BF` / `#0F766E`, terminal lime `#A3E635` / `#4D7C0F`, or signal rose `#FB7185` / `#BE123C`. Whatever you pick must darken in light mode — a mid-tone on white fails contrast outright, and that is the most common light-mode mistake.

### 4.4 Typography

| Role               | Family               | Notes                                |
| ------------------ | -------------------- | ------------------------------------ |
| Text + UI          | **Geist Sans**       | Self-hosted, subset latin            |
| Mono               | **Geist Mono**       | Code, tags, command palette, metrics |
| Display (optional) | **Instrument Serif** | Hero line only, nothing else         |

Using a serif for exactly one line and nowhere else is a strong, cheap aesthetic signal. If it doesn't land in your first pass, drop it — do not spread it around.

**Scale** — 1.25 ratio from 16px base:

| Token  | Size | Line height | Use                         |
| ------ | ---- | ----------- | --------------------------- |
| `xs`   | 13px | 1.5         | Tags, meta, captions        |
| `sm`   | 14px | 1.6         | Secondary copy, nav         |
| `base` | 16px | 1.65        | Body                        |
| `lg`   | 20px | 1.5         | Lead paragraph, card titles |
| `xl`   | 25px | 1.35        | Section headings            |
| `2xl`  | 31px | 1.25        | Page titles                 |
| `3xl`  | 39px | 1.15        | Hero, mobile                |
| `4xl`  | 49px | 1.1         | Hero, desktop               |

Rules: body 16-18px minimum, never smaller. Measure capped at **65-75 characters** — this alone separates polished from amateur. Only two weights in use (400 and 600). Headings get `letter-spacing: -0.02em`; body gets none.

### 4.5 Spacing

4px base unit. Permitted values only: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Nothing else, ever.

| Context                     | Value   |
| --------------------------- | ------- |
| Inside a tag/chip           | 4 / 8   |
| Inside a button             | 12 / 24 |
| Inside a card               | 24      |
| Between elements in a block | 16      |
| Between blocks in a section | 32      |
| Between sections, mobile    | 64      |
| Between sections, desktop   | 96      |

Inconsistent vertical rhythm is the number one source of an "amateur" verdict. Consistency here matters more than the specific numbers.

### 4.6 Layout

| Token           | Value  |
| --------------- | ------ |
| Page max-width  | 1080px |
| Prose max-width | 720px  |
| Gutter, mobile  | 20px   |
| Gutter, desktop | 32px   |

**Single content column.** Resist multi-column grids — they read as busy at laptop widths, which is where most reviewers sit. Project cards may be a 2-up grid at ≥1024px; nothing else grids.

Breakpoints: `390 / 640 / 768 / 1024 / 1280 / 1536`. Design at 390 first.

### 4.7 Radii, borders, elevation

Radii: `6px` (tags, inputs), `12px` (cards, buttons), `9999px` (avatar, pills). Two values plus full. Nothing else.

**In dark mode, elevate with border + surface shift, never shadow.** Shadows on near-black read as smudge. Light mode may use one shadow: `0 1px 2px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)`.

Borders are always 1px, always `border`, except focus.

### 4.8 Motion

| Token      | Duration | Easing                           | Use                      |
| ---------- | -------- | -------------------------------- | ------------------------ |
| `micro`    | 150ms    | `cubic-bezier(0.4, 0, 0.2, 1)`   | Hover, color, opacity    |
| `standard` | 200ms    | `cubic-bezier(0.4, 0, 0.2, 1)`   | Toggles, expand/collapse |
| `entrance` | 320ms    | `cubic-bezier(0.22, 1, 0.36, 1)` | Section reveal, modal    |

One entrance pattern for the entire site: fade in + 8px upward translate, staggered 40ms between siblings, triggered once on intersection, never replayed.

`prefers-reduced-motion: reduce` → all durations to 0ms, no translate, opacity only. Non-negotiable.

Banned: parallax, scroll-jacking, cursor-following blobs, auto-playing carousels, text that types itself on every visit. All of these read as 2021 template.

### 4.9 Component inventory

Build only these. Every one appears on `/style-guide`.

`Button` (primary / secondary / ghost) · `Link` (inline / external with icon) · `Tag` · `Card` · `Section` (title + optional description + children) · `Prose` (MDX wrapper) · `Timeline` + `TimelineItem` · `ProjectCard` · `PostCard` · `MetricBadge` · `ThemeToggle` · `Nav` · `Footer` · `CommandPalette` · `Callout` · `CodeBlock` (with copy) · `Avatar` · `StatusDot`

**Rule: if a section needs an explanation of how to use it, delete it.**

### 4.10 Iconography & imagery

Icons: one set only (Lucide). 16px inside text, 20px standalone. `currentColor` always.

Images: every project needs a cover at 1200×630, same crop and treatment across all of them. Consistency between covers matters more than the quality of any single one. Screenshots get a subtle 1px `border` and 12px radius — never a fake browser chrome frame.

---

## 5. Information architecture

### 5.1 Routes

| Route              | Purpose                                                          | Render  |
| ------------------ | ---------------------------------------------------------------- | ------- |
| `/`                | Scan surface — everything essential in one screen + short scroll | Static  |
| `/projects`        | All projects, filterable by stack                                | Static  |
| `/projects/[slug]` | Case study                                                       | Static  |
| `/about`           | Long-form bio, full experience, full skill matrix                | Static  |
| `/blog`            | All posts                                                        | Static  |
| `/blog/[slug]`     | Post + view count                                                | ISR     |
| `/uses`            | Tools, hardware, editor, setup                                   | Static  |
| `/resume`          | Inline PDF viewer + download                                     | Static  |
| `/guestbook`       | Signed-in guestbook                                              | Dynamic |
| `/style-guide`     | Token + component reference (noindex)                            | Static  |
| `/404`             | Routes back into the site                                        | Static  |

Nav: `Work · About · Blog · Contact` + theme toggle + a small `⌘K` hint. Four items maximum. Sticky, height 56px, background blur, hairline bottom border on scroll.

### 5.2 Above-the-fold contract

All of the following visible **without scrolling** at 1366×768 _and_ at 390×844:

1. Name
2. One-line positioning
3. Seniority / proof line
4. Resume button (primary) + Contact (secondary)
5. GitHub + LinkedIn
6. One visual anchor — your photo

If a recruiter must scroll or hover to learn what you do, Hireability caps at 6-7. That is exactly what happened to the 6.0 and 6.5 rows in the sheet.

### 5.3 Homepage, section by section

| #   | Section       | Content                                                                      | Notes                                                                             |
| --- | ------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 1   | Hero          | Photo, name, positioning line, proof line, resume + contact buttons, socials | The whole contract above                                                          |
| 2   | Featured work | Exactly 3 project cards                                                      | Title, one-line problem, stack tags, one metric, live + source links              |
| 3   | Experience    | Condensed timeline, 4-5 most recent                                          | Company, role, dates, one line each, stack tags. Full detail on `/about`          |
| 4   | Skills        | 4-6 grouped clusters                                                         | Languages / Backend / Frontend / Data / Infra / Tooling. No percentage bars, ever |
| 5   | Writing       | 2-3 most recent posts                                                        | Title, date, tags, view count                                                     |
| 6   | Contact       | Email (one-click copy), form, socials, availability status                   | State plainly whether you're open to work                                         |
| 7   | Footer        | Nav repeat, socials, last-deployed timestamp, source link                    | Last-deployed timestamp is a quiet, effective engineering signal                  |

**Never ship: skill percentage bars, a "years of experience" counter that animates, testimonial carousels, a hero that types itself.** Every one of these is a recognised template tell.

### 5.4 Case study template (`/projects/[slug]`)

Fixed order, identical for every project:

1. Title + one-line summary
2. Meta row — role, timeframe, team size, status
3. Links row — live demo, source, writeup
4. Cover image
5. **Problem** — 2-3 sentences, plain language
6. **Approach** — what you built, with an architecture diagram
7. **Hard decision** — the tradeoff you took and why you rejected the alternative. _This is the section that gets you hired._
8. **Outcome** — measurable results as `MetricBadge` row
9. **Stack** — tags, grouped
10. **What I'd change** — one honest paragraph. Reads as senior; almost nobody does it
11. Next/previous project

---

## 6. Content model

Every shape defined once in `packages/schema` with Zod, consumed by the CLI, the build, and the API. The build fails on a schema violation. That single decision is what makes the CLI safe to trust.

### 6.1 `content/projects/<slug>.mdx`

| Field           | Type                          | Required | Notes                         |
| --------------- | ----------------------------- | -------- | ----------------------------- |
| `title`         | string                        | yes      |                               |
| `slug`          | string                        | yes      | Must match filename           |
| `summary`       | string ≤140                   | yes      | One-line problem statement    |
| `role`          | string                        | yes      | Your specific role            |
| `startDate`     | ISO date                      | yes      |                               |
| `endDate`       | ISO date \| `"present"`       | yes      |                               |
| `teamSize`      | number                        | no       |                               |
| `status`        | `live` \| `archived` \| `wip` | yes      |                               |
| `featured`      | boolean                       | yes      | Max 3 true                    |
| `order`         | number                        | yes      | Manual sort                   |
| `stack`         | string[]                      | yes      | Must exist in `skills.json`   |
| `links.live`    | url                           | no       |                               |
| `links.repo`    | url                           | no       |                               |
| `links.writeup` | url                           | no       |                               |
| `metrics`       | `{label, value, detail?}[]`   | no       | Rendered as MetricBadge row   |
| `cover`         | path                          | yes      | 1200×630                      |
| `coverAlt`      | string                        | yes      |                               |
| `draft`         | boolean                       | yes      | Excluded from build when true |

Body sections use MDX headings matching §5.4.

### 6.2 `content/experience/<slug>.mdx`

`company`, `companyUrl`, `role`, `employmentType`, `location`, `startDate`, `endDate|present`, `bullets[]` (3-5, each starting with an action verb and containing a number where possible), `stack[]`, `logo`, `featured`.

### 6.3 `content/posts/<slug>.mdx`

`title`, `slug`, `date`, `updated`, `summary` (≤160, doubles as meta description), `tags[]`, `readingTime` (computed, not authored), `draft`, `cover`, `canonical`.

### 6.4 `content/data/*.json`

- `skills.json` — `{group, items:[{name, level, years, icon}]}[]`. `level` used for grouping/sorting only, **never rendered as a bar**.
- `socials.json` — `{platform, url, handle, icon, showInHero}[]`
- `site.json` — name, positioning line, proof line, email, location, availability status, resume path, default OG image
- `uses.json` — `{category, items:[{name, url, note}]}[]`

### 6.5 Content rules

- Slugs: lowercase kebab, immutable once published (breaking a URL loses your SEO and any shared link).
- Dates: ISO 8601, always.
- Images live beside content in `public/content/<type>/<slug>/`.
- `draft: true` is excluded from build, sitemap, and RSS.

---

## 7. Repository architecture

```text
AusafJ-Portfolio/
├─ app/
│  ├─ (site)/            page routes, shared layout
│  ├─ api/
│  │  ├─ views/[slug]/
│  │  ├─ guestbook/
│  │  ├─ contact/
│  │  ├─ health/
│  │  └─ cli/            token-authed endpoints
│  ├─ opengraph-image/   dynamic OG generation
│  ├─ sitemap.ts
│  └─ robots.ts
├─ components/
│  ├─ ui/                primitives from §4.9
│  ├─ sections/          composed homepage sections
│  └─ palette/           command palette
├─ content/              MDX + JSON, git-tracked, source of truth
│  ├─ projects/
│  ├─ experience/
│  ├─ posts/
│  ├─ data/
│  └─ positioning.md
├─ packages/
│  ├─ schema/            Zod definitions — the shared contract
│  └─ commands/          command grammar shared by CLI and palette
├─ cli/
│  ├─ src/commands/
│  ├─ src/lib/
│  └─ bin/
├─ lib/
│  ├─ content/           MDX read + validate + cache
│  ├─ db/                Mongo client, cached across invocations
│  ├─ ratelimit/
│  └─ og/
├─ public/
│  ├─ content/
│  ├─ fonts/             self-hosted, subset
│  └─ resume.pdf
├─ styles/
└─ .github/workflows/
```

### 7.1 The load-bearing idea

`packages/schema` is imported by **three** consumers:

1. The **CLI** — validates input at authoring time, before a file is written
2. The **build** — validates every content file, fails the build on violation
3. The **API** — validates request bodies at the network boundary

`packages/commands` is imported by **two**:

1. The **CLI** — parses terminal input
2. The **command palette** — parses browser input

One definition, multiple consumers, no drift. This is the sentence that does work in an interview, and it is why the signature moment in §11 is honest rather than decorative.

---

## 8. Data architecture (MongoDB Atlas)

Dynamic data only. Never page content.

### 8.1 Collections

**`views`**

| Field       | Type   | Notes                                         |
| ----------- | ------ | --------------------------------------------- |
| `_id`       | string | The slug — natural key, no extra index needed |
| `count`     | int    | Atomic `$inc`                                 |
| `updatedAt` | date   |                                               |

**`guestbook`**

| Field                 | Type        | Notes                              |
| --------------------- | ----------- | ---------------------------------- |
| `_id`                 | ObjectId    |                                    |
| `provider`            | string      | `github`                           |
| `providerUserId`      | string      |                                    |
| `handle`, `avatarUrl` | string      |                                    |
| `message`             | string ≤280 |                                    |
| `createdAt`           | date        |                                    |
| `hidden`              | boolean     | Soft moderation, never hard delete |

Indexes: `{createdAt: -1}`, `{providerUserId: 1, createdAt: -1}`

**`contact_messages`**

| Field                      | Type     | Notes                               |
| -------------------------- | -------- | ----------------------------------- |
| `_id`                      | ObjectId |                                     |
| `name`, `email`, `message` | string   |                                     |
| `ipHash`                   | string   | Hashed, never raw IP                |
| `userAgent`                | string   |                                     |
| `createdAt`                | date     |                                     |
| `status`                   | enum     | `new` / `read` / `replied` / `spam` |

Index: `{createdAt: -1}`

**`cli_audit`**

| Field             | Type            | Notes          |
| ----------------- | --------------- | -------------- |
| `_id`             | ObjectId        |                |
| `command`, `args` | string / object |                |
| `result`          | enum            | `ok` / `error` |
| `durationMs`      | int             |                |
| `createdAt`       | date            |                |

Indexes: `{createdAt: -1}`, TTL 90 days

**`link_clicks`** — `slug`, `target`, `createdAt`. Index `{createdAt: -1}`, TTL 180 days.

**`rate_limits`** — `_id` (key), `count`, `expiresAt`. TTL index on `expiresAt`.

### 8.2 Serverless connection rules

1. **One cached client across warm invocations.** Store the promise on `globalThis`; never open a connection per request. Getting this wrong exhausts the Atlas connection pool under any real traffic — it is a classic serverless interview question, and having solved it deliberately is the point.
2. `maxPoolSize: 10`, `minPoolSize: 0`.
3. Every query has an explicit timeout.
4. Every index has a written justification in `lib/db/README.md`.
5. IP allowlist on Atlas set to Vercel's ranges, not `0.0.0.0/0`.
6. Separate databases for preview and production deployments.

---

## 9. API surface

| Method   | Route                 | Auth           | Rate limit     | Notes                                     |
| -------- | --------------------- | -------------- | -------------- | ----------------------------------------- |
| `GET`    | `/api/views/[slug]`   | none           | 60/min/IP      | Read count                                |
| `POST`   | `/api/views/[slug]`   | none           | 1/slug/session | Increment, debounced client-side          |
| `GET`    | `/api/guestbook`      | none           | 60/min/IP      | Paginated, `hidden` excluded              |
| `POST`   | `/api/guestbook`      | GitHub OAuth   | 3/hour/user    | Zod-validated, ≤280 chars                 |
| `DELETE` | `/api/guestbook/[id]` | owner or admin | 10/hour        | Soft delete                               |
| `POST`   | `/api/contact`        | none           | 3/hour/IP      | Honeypot + Zod + email dispatch           |
| `GET`    | `/api/health`         | none           | 30/min/IP      | DB ping + latency, feeds `status` command |
| `POST`   | `/api/cli/publish`    | bearer token   | 30/hour        | Triggers deploy                           |
| `GET`    | `/api/cli/stats`      | bearer token   | 60/hour        | Aggregated counts                         |
| `GET`    | `/api/cli/backup`     | bearer token   | 5/day          | Full collection export                    |

### 9.1 Standards applied to every route

1. Zod validation on every input — params, query, body.
2. Consistent error envelope: `{error: {code, message, requestId}}`. Never leak a stack trace.
3. Structured JSON logs including `requestId`, route, duration, outcome.
4. Rate limiting on every write, Mongo-backed with a TTL index.
5. Correct status codes — 400 validation, 401 unauthenticated, 403 unauthorised, 429 rate limited, 500 unexpected.
6. Explicit cache headers per route; `no-store` on anything user-specific.
7. A written failure mode for each route in `app/api/README.md`. That document later becomes a blog post, which feeds Hireability.

---

## 10. CLI specification — `ausaf`

Node + TypeScript. Repo bin, documented in the README with a recorded demo GIF at the top. The GIF is doing real work here — it is the fastest proof that this is a working tool and not a folder of scripts.

### 10.1 Commands

| Command                  | Flags                             | Behaviour                                                                |
| ------------------------ | --------------------------------- | ------------------------------------------------------------------------ |
| `ausaf new project`      | `--title --slug --no-interactive` | Prompts, writes valid frontmatter, scaffolds image dir, opens `$EDITOR`  |
| `ausaf new post`         | same                              | As above for posts                                                       |
| `ausaf new experience`   | same                              | As above                                                                 |
| `ausaf list [type]`      | `--json --drafts --featured`      | Table output, or JSON when piped                                         |
| `ausaf edit <slug>`      |                                   | Resolves slug across types, opens editor                                 |
| `ausaf validate`         | `--fix`                           | Zod over all content. Same call CI runs. `--fix` repairs formatting only |
| `ausaf publish <slug>`   | `--message --no-push`             | Clears `draft`, commits, pushes, triggers deploy                         |
| `ausaf unpublish <slug>` |                                   | Sets `draft: true`, commits                                              |
| `ausaf deploy --status`  | `--watch`                         | Polls Vercel deployments API                                             |
| `ausaf stats`            | `--json --since`                  | Views, guestbook, contact counts from your own API                       |
| `ausaf backup`           | `--out`                           | Exports Mongo collections to timestamped JSON                            |
| `ausaf doctor`           |                                   | Checks env, git state, API reachability, schema version                  |

### 10.2 Build notes

- **clack** over commander for prompts — materially better in a demo GIF.
- Imports `packages/schema`. **Never re-declare a shape in the CLI.**
- `--json` on every read command, so the tool is scriptable.
- Config in `.ausafrc` (committed); secrets in `.env.local` (never committed).
- Non-zero exit codes on failure so CI can consume it.
- Errors name the file, the field, and the fix. Never dump a raw Zod object.
- Unit tests for the schema layer and the file writer.
- `--dry-run` on every command that writes or pushes.

### 10.3 Backend skills this demonstrates

Schema-driven validation · shared contracts across consumers · idempotent writes · audit logging · token auth · API client with retry/backoff · structured error handling · CI integration. Write these down; they are your talking points.

---

## 11. Signature moment — the command palette

`⌘K` / `Ctrl+K` / `~` opens a palette that speaks **the same command grammar as the CLI**, via the shared `packages/commands`.

### 11.1 Why this one

- **Genuinely unique.** Nobody in that 200-row spreadsheet shipped a portfolio whose UI is a client for its own authoring tool.
- **It is a story, not decoration.** "I built a CLI to manage this site, then shipped the CLI's command parser to the browser." That sentence works in an interview; a WebGL blob does not.
- **Zero Hireability cost.** Purely additive. The site is fully usable without ever opening it.
- **Zero Aesthetic cost.** No WebGL, no 3D, lazy-loaded, does not block first paint.
- It doubles as fast navigation, which benefits both recruiters and developers — so it earns its place on utility alone.

This is why the sheet's balance pattern holds: it adds Creativity without subtracting anywhere.

### 11.2 Commands

| Input                 | Result                                                      |
| --------------------- | ----------------------------------------------------------- |
| `whoami`              | Positioning line, current role, location, availability      |
| `projects`            | List, arrow-navigable                                       |
| `open <slug>`         | Navigate to that project                                    |
| `resume`              | Open resume                                                 |
| `contact`             | Copy email, or open form                                    |
| `blog`                | Recent posts                                                |
| `theme [dark\|light]` | Toggle                                                      |
| `status`              | **Live** — hits `/api/health`, prints real DB latency in ms |
| `stack`               | Skills grouped, as the CLI prints them                      |
| `source`              | Open the repo                                               |
| `help`                | Command list                                                |

`status` is the detail that sells it — a real network call to a real backend, returning a real number, rendered in mono. It proves the backend exists in a way no static badge can.

### 11.3 Guardrails

- Discoverable via a small persistent `⌘K` hint in the nav. **Never a modal on load.**
- `Esc` closes. Full arrow-key navigation. Focus trapped while open, restored on close.
- `role="dialog"`, `aria-modal`, labelled input, results in an `aria-live` region.
- Lazy-loaded chunk. Does not appear in the initial bundle.
- Fuzzy match with a visible "no results" state and a nudge toward `help`.
- On touch devices: either omit entirely, or expose as a search icon with tap-friendly targets. Do not ship a keyboard-only feature to mobile and call it done.
- Unknown command → helpful suggestion, never a dead end.

### 11.4 Fallback option

If you want something more visual: a live architecture diagram of this very site (Next.js → Vercel → Atlas) with real request latency animating along the edges, fed by `/api/health`. Same "shows backend thinking" payoff, more visual weight, notably more build effort.

---

## 12. Performance budget

| Metric                                 | Target             | Ceiling     |
| -------------------------------------- | ------------------ | ----------- |
| Lighthouse Performance (mobile)        | 100                | ≥95         |
| Lighthouse A11y / Best Practices / SEO | 100                | ≥95         |
| LCP                                    | <1.5s              | 2.0s        |
| CLS                                    | 0                  | 0.05        |
| INP                                    | <100ms             | 200ms       |
| JS on `/`, gzipped                     | <120KB             | 150KB       |
| Total page weight on `/`               | <500KB             | 800KB       |
| Fonts                                  | 2 families, subset | 4 files max |

Enforcement:

1. Self-host fonts, subset to latin, `font-display: swap`, preload the two used above the fold.
2. `next/image` everywhere, explicit dimensions, AVIF/WebP, `priority` only on the hero.
3. Server components by default. `"use client"` only for the palette, theme toggle, and form.
4. Lazy-load the palette, guestbook, and anything below the fold.
5. No client-side data fetching above the fold, ever.
6. Run Lighthouse in CI on every PR; fail the build below 95.

The Aesthetic score explicitly includes responsiveness. Slow reads as unpolished regardless of how it looks in a screenshot.

---

## 13. Accessibility

Non-negotiable, and it is also free Lighthouse points.

1. Full keyboard traversal, including the palette. No traps.
2. Visible focus ring on every interactive element — 2px `accent`, 2px offset. Never `outline: none` without a replacement.
3. Semantic landmarks: `header`, `nav`, `main`, `footer`. One `h1` per page, no skipped levels.
4. Alt text on every image. Decorative images get `alt=""`.
5. Body text ≥4.5:1, large text ≥3:1, in **both** themes.
6. `prefers-reduced-motion` fully honoured.
7. Form fields have real labels — placeholders are not labels. Errors announced via `aria-live`.
8. Skip-to-content link as the first focusable element.
9. Touch targets ≥44×44px.
10. Test with VoiceOver or NVDA on the homepage at minimum.

---

## 14. SEO, metadata, social

1. Per-page `title` and `description`. Homepage description = the positioning line from §3.
2. Dynamically generated OG images per project and post — title, your name, accent bar. Consistent template.
3. `JSON-LD Person` schema on `/` with `name`, `jobTitle`, `url`, `sameAs[]`, `knowsAbout[]`.
4. `JSON-LD BlogPosting` on each post.
5. `sitemap.xml` and `robots.txt` generated at build. `/style-guide` excluded and `noindex`.
6. RSS feed for the blog.
7. Canonical URLs everywhere.
8. Verify every OG card in the real Twitter/X, LinkedIn, and Discord preview tools before launch — a broken preview when someone shares your site is a silent, expensive loss.

---

## 15. Security

1. All secrets in Vercel env vars. `.env.local` gitignored. Rotate the CLI token if it ever touches a commit.
2. CLI token: long random string, `Authorization: Bearer`, compared with a timing-safe equality check.
3. Every write route rate limited.
4. Honeypot field plus a minimum time-on-form check on the contact form.
5. `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.
6. Sanitise guestbook input; render as plain text, never as HTML.
7. Hash IPs before storage. Do not store raw IPs.
8. Atlas: dedicated DB user, least privilege, IP allowlist scoped to Vercel.
9. Dependabot or Renovate on.

---

## 16. CI/CD

GitHub Actions on every push and PR:

1. `typecheck`
2. `lint`
3. `ausaf validate` — content schema check
4. `build`
5. `test` — schema and CLI unit tests
6. Lighthouse CI against the preview deployment, failing below 95

Vercel: preview deploy per PR, production on `main`. A status badge in the README is cheap, legible Hireability.

---

## 17. Verification

Run all of these before you call it launched.

### 17.1 Content pipeline

1. `ausaf validate` and the production build both pass on clean content.
2. Deliberately break one `.mdx` frontmatter field — the build must fail with a readable, field-level error.
3. `ausaf new project` end to end: prompts → file written → renders on `/projects` in dev.
4. `ausaf publish` end to end: commit → push → Vercel deploy → live within one deploy cycle.
5. `ausaf --dry-run` on every writing command makes no changes.

### 17.2 Resilience

1. **Pause the Atlas cluster. The homepage, all projects, and all posts must render perfectly.** View counts degrade silently — no error UI, no layout shift, no console spam.
2. Hammer `/api/contact` and `/api/guestbook` — confirm 429 with the correct error envelope.
3. Load the site with JavaScript disabled — all content readable, all links working.

### 17.3 Quality

1. Lighthouse mobile on `/`, `/projects/[slug]`, `/blog/[slug]` — all four categories ≥95.
2. Keyboard-only traversal of the entire site including the palette. No trap, focus always visible.
3. Screen reader pass on the homepage.
4. Real iOS Safari and real Android Chrome — not devtools emulation. Check safe-area insets and the mobile nav.
5. Both themes fully checked on every page. A half-finished light mode is an immediately visible tell.
6. All OG cards verified in real share previews.

### 17.4 The one that matters most

1. **The 10-second test.** Show the homepage to 5 people for 10 seconds, close it, then ask what you do and roughly how senior you are. If 4 of 5 can't answer, the hero is wrong — fix it before launch. This single test predicts the Hireability score better than anything else in this document.

---

## 18. Copywriting rules

Copy carries more of the Hireability score than layout does.

1. First person, no third-person bio voice.
2. Lead every experience bullet with an action verb and include a number wherever one exists.
3. Cut every adjective that isn't load-bearing. "Passionate," "hardworking," "detail-oriented" are noise — every candidate claims them.
4. Name specific technologies, versions where it matters. Specificity reads as competence.
5. Project summaries describe the _problem_, not the stack. The stack is in the tags already.
6. State availability plainly: "Open to backend and full-stack roles — remote or Karachi."
7. Proofread everything. Typos read as carelessness and cost points on all three factors simultaneously.
8. Write the "What I'd change" section on each case study honestly. Almost nobody does it, and it reads as senior.

---

## 19. Score checklists

### 19.1 Hireability → 9-10

- [ ] Role and seniority readable in under 5 seconds
- [ ] Resume viewable inline AND downloadable, no gate, no form
- [ ] Email visible and copyable in one click
- [ ] Every project shows your specific role and a measurable outcome
- [ ] Live demo + source link on every project
- [ ] Experience timeline with dates and tech tags
- [ ] GitHub and LinkedIn above the fold
- [ ] At least 2 real blog posts at launch
- [ ] Real domain, not `*.vercel.app`
- [ ] Availability status stated explicitly
- [ ] Passes the 10-second test with 4 of 5 people

### 19.2 Aesthetic → 9-10

- [ ] One type scale, one spacing unit, one accent, applied without exception
- [ ] Consistent vertical rhythm between every section
- [ ] Perfect at 390px — not merely "not broken"
- [ ] Light and dark both finished
- [ ] All motion uses one duration and one curve; reduced-motion honoured
- [ ] No section that requires an explanation
- [ ] Lighthouse ≥95 on mobile
- [ ] Zero layout shift
- [ ] Consistent image treatment across all covers

### 19.3 Creativity → 8-10

- [ ] One signature moment, describable in a single sentence
- [ ] Purely additive — site fully works without it
- [ ] Ties to your real engineering story
- [ ] Zero cost to load time or mobile UX
- [ ] Discoverable without a forced tutorial
- [ ] Nothing from the banned-effects list in §4.8

---

## 20. Sequencing

| Phase | Work                                                  | Effort                |
| ----- | ----------------------------------------------------- | --------------------- |
| 0     | Positioning, resume, project selection, domain, photo | 1-2 days, **no code** |
| 1     | Theme tokens + `/style-guide`                         | 2-3 days              |
| 2     | IA + `packages/schema` + content model                | 2 days                |
| 3     | Site build with real content, all pages               | 5-7 days              |
| 4     | Responsive + a11y + SEO passes                        | 2 days                |
| 5     | Mongo + API routes                                    | 3-4 days              |
| 6     | CLI                                                   | 3-4 days              |
| 7     | Command palette                                       | 2-3 days              |
| 8     | Perf, testing, launch checklist                       | 3-4 days              |

Roughly 4-5 weeks part-time.

**Phases 0 and 1 are the ones people skip and the ones that decide the score. Do not compress them.** A weak positioning line cannot be rescued by any amount of engineering downstream, and an inconsistent spacing system will bleed Aesthetic points on every single page you ever add.

Ship order within Phase 3: build the boring correct version with real content first. Decorate only after it is complete and readable. Zero lorem ipsum at any point — placeholder text hides exactly the layout problems you need to see.

---

## 21. Open items

- [ ] Domain not chosen
- [ ] Three flagship projects not selected
- [ ] Photo not shot
- [ ] Resume not updated
- [ ] Accent confirmed as amber, or swapped per §4.3
- [ ] Serif display line — try Instrument Serif in Phase 1, keep or cut
- [ ] Guestbook: worth the OAuth + moderation cost? Recommend yes — it is the most legible proof to a visitor that a real backend is running
- [ ] Two launch blog posts not written. Suggested: "Shipping a CLI's command parser to the browser" and "Connection pooling MongoDB under serverless" — both come free out of work you are already doing
