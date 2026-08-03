# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and the project adheres to
[Semantic Versioning](https://semver.org/).

For this project, read the version numbers as: **major**—a redesign, or a content-model
change that invalidates existing MDX; **minor**—a new page, section, or CLI command;
**patch**—copy edits, a new post, a bug fix.

## [Unreleased]

Nothing yet.

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

[unreleased]: https://github.com/MuhammadAusafJamal/AusafJ-Portfolio/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/MuhammadAusafJamal/AusafJ-Portfolio/releases/tag/v0.1.0
