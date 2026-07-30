# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and the project adheres to
[Semantic Versioning](https://semver.org/).

For this project, read the version numbers as: **major** — a redesign, or a content-model
change that invalidates existing MDX; **minor** — a new page, section, or CLI command;
**patch** — copy edits, a new post, a bug fix.

## [Unreleased]

### Added

- Repository scaffold: directory skeleton, editor/formatting config, CI workflow,
  contribution guide, and this changelog.
- `PLAN.md` — the full build specification (architecture, theme, content model, API surface,
  CLI, verification).
- `DESIGN-PROMPT.md` — paste-ready prompts for text-to-UI tools, derived from `PLAN.md` §4
  and §5.
- Toolchain: Next 16 + React 19 + TypeScript 6, Tailwind v4 (CSS-first), ESLint 9 flat
  config with the Next core-web-vitals layer and Prettier-as-a-lint-error, Vitest, and npm
  workspaces for `@ausaf/schema`, `@ausaf/commands`, and `@ausaf/cli`.
- `styles/globals.css` — the design tokens from `PLAN.md` §4 as Tailwind v4 `@theme`
  variables, with light/dark palettes and a `prefers-reduced-motion` override.

- Minimal app shell — `app/layout.tsx` and `app/page.tsx`. Not the real design; it renders
  the tokens so the dev server and the Vercel pipeline have something to serve.
- `DESIGN-PROMPT.md`: an explicit **accent budget** — at most three amber elements per
  screenful, and section headings, the hero name, the hero tagline, and skill items are
  never accented. Generated designs put amber on everything, which reads decorative rather
  than deliberate.

- `/styleguide` — the living token reference from `PLAN.md` §4. Colour, typography, spacing,
  shape, motion, and the component primitives, each rendered from its own token rather than
  a hardcoded literal, so the page breaks the moment a token breaks. `noindex`.

### Changed

- **The palette is now monochrome.** The amber accent is gone; `accent` is white on dark and
  near-black on light, marking the primary button and active state only. Hierarchy comes
  from size, weight, and contrast. The single exception is a 6px green status dot —
  functional signal, not decoration.
- Links are underlined by default. Without a hue that is the only affordance a link has.

- CI no longer runs `content:validate`. `ausaf validate` is a stub that exits non-zero by
  design, so the step gated every PR on a command that could not pass. It is commented out
  in the workflow and re-enabled in the same PR that implements the command.

### Notes

- TypeScript is pinned to the 6.x line, not 7.x: `typescript-eslint@8` peers
  `typescript >=4.8.4 <6.1.0`, so TS 7 breaks linting.
- ESLint is pinned to the 9.x line, not 10.x: `eslint-plugin-react@7.37.5` peers
  `eslint <=9.7` and has no ESLint 10 support yet. This is also why `npm audit` reports
  transitive `brace-expansion` advisories through the lint toolchain — dev-only, and not
  resolvable until that plugin ships ESLint 10 support.
