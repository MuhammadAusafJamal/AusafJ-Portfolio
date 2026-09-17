# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and the project adheres to
[Semantic Versioning](https://semver.org/).

For this project, read the version numbers as: **major**—a redesign, or a content-model
change that invalidates existing MDX; **minor**—a new page, section, or CLI command;
**patch**—copy edits, a new post, a bug fix.

## [Unreleased]

### Fixed

- **The README and `content/positioning.md` both still said `/about` did not exist.** It
  shipped in v0.7.0, along with the 404 in v0.6.0, and neither document was updated at the
  time. The README status block now lists `/about` and the 404 among the routes that render,
  and leaves `/blog` as the one still outstanding. The open item in `positioning.md` is
  closed, with two AEO items opened in its place: Search Console and Bing submission, and the
  `llms.txt` and per-project schema work skipped in favour of `/about`.

## [0.8.0]—2026-09-17

### Added

- **A "Questions I get asked" section on `/about`**, with `FAQPage` markup built from the same
  array the visible answers render from. Two independent AEO reads landed on the same gap: the
  site answered "who is this person" well and "is he a .NET developer" poorly, because a skills
  list is a set of nouns and nothing stated the relationships in sentences. Google stopped
  showing FAQ rich results for most sites in 2023, so the markup is there for the answer
  engines that still parse it rather than for a snippet.
- **A sentence above each skill group on `/about`.** `C#` and `Umbraco` sitting in a tag row
  cannot tell a reader whether the work was two years or one afternoon. Each group now says
  which, in a line.
- **`hasOccupation` on the `Person` schema**, carrying the occupational category and the full
  skill list.

### Changed

- **The `Person` schema's `description` is now a full entity definition** rather than a copy of
  the hero line. `site.positioning` is capped at 120 characters because it has to stay
  scannable in seconds, which is the right constraint for a recruiter and the wrong one for an
  answer engine. The hero keeps the short line; the schema carries the long one, and the hero
  line moves to `disambiguatingDescription`.

## [0.7.0]—2026-09-17

### Added

- **`/about`**—the long-form bio, the full experience timeline with every role's bullets and
  stack, the complete skill matrix, education, and certifications. The homepage answers "what
  does this person do" in three lines; this answers it in paragraphs, and it is where
  education and certifications belong rather than competing for space above the fold.
- **`lib/person-schema.ts`**—the `Person` graph, built once and emitted on both the homepage
  and `/about`. Two pages describing one identity is what lets an answer engine resolve the
  name to an entity rather than to a string.
- **Four fields on that schema** the homepage's inline version never had: `worksFor`,
  `alumniOf`, `hasCredential`, and `description`. Every one restates something the visible
  copy already says.
- **`/about` in the nav**, under More.

### Fixed

- **`/resume` and `/contact` were missing from `sitemap.xml`.** The sitemap listed the
  homepage, `/projects`, and the case studies only, so the two pages a recruiter is most
  likely to want were the two a crawler had to reach through a nav link. `/about` is listed
  from the start.

### Changed

- **Certifications moved to `lib/credentials.ts`**, with education alongside them. The list
  was hardcoded in `app/resume/page.tsx` under a comment arguing that a list living in one
  place doesn't need extracting. `/about` made it two places, and two copies of a date is how
  a credential ends up reading Aug 2026 on one page and Sep 2026 on the other.

## [0.6.0]—2026-09-17

### Added

- **A real 404 page.** Next was serving its own bare default—no nav, no footer, and the
  layout's generic title. `app/not-found.tsx` routes back into the site instead: Projects,
  Resume, Contact, and the homepage, plus a line explaining that project URLs changed, which
  is the likeliest reason anyone lands there.

### Removed

- **The `/projects/experience-abu-dhabi` redirect.** The old path now 404s rather than
  forwarding to `gov-tourism-platform`. The renamed slug is the only address for that case
  study, and the client's real name no longer resolves to anything.

## [0.5.0]—2026-09-16

### Added

- **Two government platform case studies**—`gov-family-affairs-portal` (Umbraco headless on
  ASP.NET Core, SQL Server, Azure) and `gov-coastal-development` (Umbraco on ASP.NET MVC with
  a React Native client). These are the site's only evidence for the second backend stack;
  without them the .NET entries on the skills list had nothing behind them.
- **`ausafj-portfolio`**—this site, as a case study. Tagged `web` and `ai-first`: the AI is in
  how it gets built, through the repo's own agent instructions and the local `humanizer`
  skill, not in the product. There are no model calls at runtime and there should not be.
- **A `Source` section on all three government case studies**, saying plainly that the code is
  client-owned. Every other card shows Live and Source links; blank space where those sit
  reads as unfinished, and a stated reason reads as deliberate.
- **The .NET track in `skills.json`**—C#, ASP.NET Core, ASP.NET MVC, Umbraco, SQL Server,
  Azure, Azure DevOps, plus Bootstrap, Jest, and Vitest. The schema caps the file at six
  groups, so .NET went into Backend and Azure into Tooling rather than getting a group each.

### Changed

- **The site described a frontend engineer and the downloadable CV described a dual-stack
  one.** A recruiter reading `/resume` and then clicking Download got two different people.
  Experience bullets, skills, positioning, and the PDF are now the same story.
- **`experience-abu-dhabi` is now `gov-tourism-platform`**, matching the anonymised project
  names already used on the CV and LinkedIn. Real client names stay out of public content.
  The old path redirects permanently.
- **Certifications on `/resume`** trimmed to the four on the CV. The hackathon certificate and
  the Kaggle course came off: a course completion is not a credential.
- **The `ai-first` filter blurb on `/projects`** promised "agent pipelines doing the actual
  work". That is true of Madadgar and false of this site, so it now covers both the pipelines
  and the builds where AI does the authoring.
- `public/resume.pdf` replaced with the current Full Stack Engineer CV.

### Fixed

- **The README status block claimed the pages and API routes were still to come.** Six routes
  render from validated content and the contact API is live. It now lists what is genuinely
  outstanding: the rest of the API, the `ausaf` commands, and `/about` and `/blog`.
- **`DESIGN-PROMPT.md` hardcoded the previous hero copy**, so anyone regenerating a mockup
  from it would have reproduced the old positioning line and the "2 years" proof line.

### Removed

- **`agent-x`**—a one-day WIP with no live link, cut from the CVs and now from the site.

## [0.4.2]—2026-08-28

### Fixed

- **Contact form had no way back to idle after a successful send**—it rendered only the
  success message, permanently, until a full page reload. Adds a "Send another message"
  link that resets it.
- **Availability status pill wrapped awkwardly** in the two-column contact card. The label
  was 52 characters, too long to reliably hold one line at any realistic width. Shortened to
  "Open to SWE roles, Karachi or remote."

## [0.4.1]—2026-08-28

### Fixed

- **Contact form showed a false failure after a successful send.** A `SyntheticEvent`'s
  `currentTarget` goes null once the synchronous part of a handler returns, so
  `event.currentTarget.reset()` after the `await fetch(...)` threw and landed in the catch
  block—even though the message had already sent (server logged a clean `200`, email
  confirmed delivered). The form element is now captured synchronously, before the `await`,
  instead of read off the event afterward.

## [0.4.0]—2026-08-28

The V2 redesign, plus two new pages: `/contact` and `/resume`.

### Added

- **`categories` field on projects** (`mobile`/`web`/`ai-first`/`creative`), required on
  every project. Three.js Journey was wrongly modeled as one project—it's a monorepo of 4
  independent builds, so it's split into `solar-system`, `day-night-cycle`,
  `animated-character`, and `minecraft-clone` (tagged `creative` + `ai-first` for its
  procedural world-gen). New `agent-x` project added. 8 projects total.
- **`/projects` category filtering**—4 ability tiles plus a filter-pill row, `?category=` in
  the URL, server-rendered with no client component.
- **`/contact`**—two-column layout, `// comment`-style field labels, a Resend-backed form
  with honeypot and minimum-fill-time anti-spam. Mongo persistence and rate-limiting are
  explicitly deferred, not silently half-built.
- **`/resume`**—renders inline from the same content functions the homepage uses, plus a
  Certifications section.
- **Instrument Serif**, finally wired up. `--font-display` existed as a token with nothing
  behind it; now self-hosted via `next/font` and used on exactly one line per page.

### Changed

- **Nav's "More" overflow** moved from `<details>` to the native Popover API—`<details>`
  doesn't close on outside click, which browser-testing caught as a real stuck-open bug.
  Visible links reordered by intent: `Projects` and `Contact` stay visible, the rest move
  into `More`.
- **Tag** goes from a filled pill to a hairline border; **metric badge** label moves above
  the value; **status dot** wraps in a quiet pill chip.
- **`ProjectCard`** gets a category kicker line, visible on the homepage's featured cards too.

### Fixed

- **`--palette-text-subtle`** failed WCAG AA against every background in the palette
  (4.07:1 on `--color-bg`, 3.8:1 on `--color-surface`, both need 4.5:1 at 13px)—caught by a
  Lighthouse audit on card metric labels. Raised to `#82828b`. Lighthouse accessibility
  score 96→100.
- **`data-scroll-behavior="smooth"`** on `<html>` fixes same-page scroll jerk and the
  cross-page anchor snap.
- **`/projects` filter clicks** no longer jump the viewport to the top (`scroll={false}`).

## [0.3.1]—2026-08-27

### Fixed

- **`v0.2.0` and `v0.3.0` were tagged but never became GitHub Releases**—a pushed tag alone
  doesn't populate the repo's Releases page. Both got Release entries retroactively, and the
  release checklist in `CONTRIBUTING.md` now names the `gh release create` step explicitly
  so it isn't skipped again.

## [0.3.0]—2026-08-27

A floating pill nav as an alternative to the full-width bar, documented side by side on the
style guide.

### Added

- **A floating pill nav variant.** Centered, sticky, with surface elevation and backdrop
  blur—an island instead of a full-width bar. `Nav` takes a `variant` prop
  (`'floating' | 'bar'`); `'floating'` is the default, `'bar'` stays available for a route
  that wants full-width instead.
- **`ThemeToggle` accepts a `className` override**, so the floating variant can size and
  border it inline without a second component.
- **Both nav variants on `/style-guide`**, side by side, so a change to one is visible
  against the other.

### Fixed

- **The skip-to-content link could render behind the new nav.** The floating variant sits at
  `z-40`; the skip link moves to `z-50` so it always wins.

## [0.2.0]—2026-08-09

Everything a link to this site produces: the canonical it claims, the card that appears
when it is shared, and the icon in the tab. None of the three were right.

### Added

- **A sitemap and a robots.txt.** Neither existed, so nothing told a crawler the case
  studies were there. The sitemap is built from `getProjects()` rather than written by
  hand, so a new `.mdx` file appears in it on the next deploy. It carries no
  `lastModified`: a project's `endDate` is when the work stopped rather than when the
  page changed, and file mtimes on Vercel are all checkout time.
- **Generated share cards.** One layout in `lib/og/card.tsx` behind the homepage,
  `/projects`, and every case study, drawn at build from content that already exists.
  Replaces `/me.png`—a portrait doing duty as a 1200×630 card—on every route.
- **A favicon and an iOS icon.** `app/icon.tsx` draws the mark as a filled tile so it
  needs no theme, with the letter as stroked paths rather than text, because an icon
  file cannot load a font. `apple-icon.tsx` rasterises the same mark at 180px.
- **A quote from a former manager**, inside the Experience section as evidence for the
  timeline rather than beside it. One object rather than a list, with `relationship`
  required—the same sentence from a manager and from a peer are not worth the same.
  It ships as a draft and renders nowhere until the words are his.

### Fixed

- **Every page canonicalised to the homepage.** The root layout set
  `alternates.canonical`, metadata is inherited, and so each case study was declaring
  the homepage as its real version—a request to deindex it. Each route declares its own
  now, and the host is `www`, which is where the apex 308s.
- **`/projects/[slug]` shipped with no og:image.** `openGraph` replaces the parent's
  object rather than merging into it, so setting a title on a project page silently
  dropped the inherited url and image.
- **In-page links cut to their target instead of moving to it.** `scroll-behavior` and
  `scroll-padding-top` sit on `<html>`, so one number covers every anchor rather than
  each new target needing a class copied onto it. Route changes are unaffected, and
  reduced-motion turns it off outright.
- **The Madadgar source link 404'd.** The repository is
  `Madadgar-AI-Service-Orchestrator`.

### Removed

- `site.ogImage`. Share cards are drawn from the fields already in `site.json`, so a
  path to a static one was a setting that looked live and changed nothing.

## [0.1.0]—2026-08-03

First release. The site is live with real content on it.

Still to come: `/about`, `/blog`, `/uses`, the `ausaf` CLI, the command palette, and the
API routes behind them.

### Added

- **Homepage.** Hero, selected work, a grouped experience timeline, skills, and contact,
  in the order a recruiter reads them. A server component with no client-side fetching:
  every value is read from `content/` at build time and validated before it renders, so
  the page is fully formed in the HTML and does not depend on a database being reachable.
- **`/projects` and three case studies**, statically generated from MDX. Each one states
  the problem, the decision that mattered, and what it produced.
- **Experience groups by employer.** Two roles at one company nest under a single entry
  with a computed span, so an internship that turned into the job reads as one continuous
  stint rather than two short ones.
- **`@ausaf/schema`**—Zod definitions for every content file, every API request body, and
  the error envelope, with the domain types inferred from them. `contentBundleSchema`
  carries the rules a single file cannot decide on its own: a slug has to match its
  filename, a `stack` entry has to exist in `skills.json`, three projects may be featured,
  and two projects may not share an `order`. 36 tests cover the refinements.
- **`lib/content`**—reads the content tree once per process, validates it as a whole, and
  hands back typed data. A bad frontmatter field fails the build naming the file and the
  field.
- **Design system primitives**: `Avatar`, `Button`, `MetricBadge`, `ProjectCard`,
  `Section`, `StatusDot`, `Tag`. Every one appears on `/style-guide`.
- **Self-hosted Geist Sans and Geist Mono** through `next/font`, subset at build time with
  a metric-matched fallback.
- **A status dot that pulses** while availability is open. The only looping animation on
  the site, and it stops under `prefers-reduced-motion`.
- **`JSON-LD Person`** on the homepage, and a skip-to-content link as the first focusable
  element.
- Repository scaffold: directory skeleton, editor and formatting config, CI workflow,
  contribution guide, and this changelog.
- `DESIGN-PROMPT.md`—paste-ready prompts for text-to-UI tools.
- Toolchain: Next 16 + React 19 + TypeScript 6, Tailwind v4 (CSS-first), ESLint 9 flat
  config with the Next core-web-vitals layer and Prettier-as-a-lint-error, Vitest, and npm
  workspaces for `@ausaf/schema`, `@ausaf/commands`, and `@ausaf/cli`.
- `styles/globals.css`—the design tokens as Tailwind v4 `@theme` variables, with light and
  dark palettes and a `prefers-reduced-motion` override.
- `/style-guide`—the living token reference. Colour, typography, spacing, shape, motion,
  and the component primitives, each rendered from its own token rather than a hardcoded
  literal, so the page breaks the moment a token breaks. `noindex`.
- Theme provider and toggle. `next-themes` writes the theme class onto `<html>`, and a
  `@custom-variant` points Tailwind's `dark:` at that class instead of
  `prefers-color-scheme`—the toggle has to beat the OS preference, not follow it. The
  toggle renders both icons and lets CSS pick, so there is no mounted-state flash and no
  layout shift.

### Changed

- **The site canonical URL is `mausafjamal.dev`.** A default `*.vercel.app` domain was
  disproportionately common among the low scorers in the portfolio review this project is
  built against.
- **The palette is monochrome.** The amber accent is gone; `accent` is white on dark and
  near-black on light, marking the primary button and active state only. Hierarchy comes
  from size, weight, and contrast. The single exception is a 6px green status dot: it
  carries meaning, so it earns its colour.
- Links are underlined by default. Without a hue that is the only affordance a link has.
- The database layer is Mongoose rather than the raw `mongodb` driver, so collection shapes
  are declared as models in one place instead of being implied by query sites.
- `PLAN.md` stays in the repo as the specification, but nothing else references it. One of
  those citations was rendering on the public style guide.
- CI no longer runs `content:validate`. `ausaf validate` is a stub that exits non-zero by
  design, so the step gated every PR on a command that could not pass. It is commented out
  in the workflow and re-enabled in the same PR that implements the command.

### Notes

- TypeScript is pinned to the 6.x line, not 7.x: `typescript-eslint@8` peers
  `typescript >=4.8.4 <6.1.0`, so TS 7 breaks linting.
- ESLint is pinned to the 9.x line, not 10.x: `eslint-plugin-react@7.37.5` peers
  `eslint <=9.7` and has no ESLint 10 support yet.
- Three flagship projects still lack a measurable outcome. The IoT distributed database is
  off the homepage until it has one, and the schema refuses to mark a project featured
  without a metric.

[unreleased]: https://github.com/MuhammadAusafJamal/AusafJ-Portfolio/compare/v0.3.1...HEAD
[0.3.1]: https://github.com/MuhammadAusafJamal/AusafJ-Portfolio/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/MuhammadAusafJamal/AusafJ-Portfolio/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/MuhammadAusafJamal/AusafJ-Portfolio/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/MuhammadAusafJamal/AusafJ-Portfolio/releases/tag/v0.1.0
