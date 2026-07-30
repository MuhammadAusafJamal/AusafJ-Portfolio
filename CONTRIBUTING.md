# Contributing

This is a solo repo, but it runs a real workflow — tagged releases, a changelog, protected
branches. The point is partly the portfolio itself and partly that the git history is a
work sample.

## Branching model (Git Flow)

| Branch            | Purpose                                                   | Branch from | Merges into              |
| ----------------- | --------------------------------------------------------- | ----------- | ------------------------ |
| `main`            | Production. Every commit is a tagged release.             | —           | —                        |
| `develop`         | Integration of finished work for the next release.        | `main`      | `main` (via release)     |
| `feature/<slug>`  | A new feature or change.                                  | `develop`   | `develop`                |
| `release/<x.y.z>` | Stabilize + finalize a release (version bump, changelog). | `develop`   | `main` **and** `develop` |
| `hotfix/<x.y.z>`  | Urgent fix to a released version.                         | `main`      | `main` **and** `develop` |

- `main` and `develop` are long-lived and protected. All other branches are short-lived and
  deleted after merge.
- Open a PR into `develop` (or `main` for hotfixes); no direct pushes to protected branches.
- Content-only changes (a new post, a project write-up) go through `feature/content-<slug>`
  and are published with the CLI — see [Publishing content](#publishing-content).

## Commits

[Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`,
`docs:`, `refactor:`, `test:`, `perf:`, `ci:`, `style:` — plus `!` or a `BREAKING CHANGE:`
footer for breaking changes. The type drives the version bump.

Scopes match the top-level areas: `site`, `cli`, `api`, `schema`, `content`, `theme`.
Example: `feat(cli): add ausaf doctor`.

> **Automated agents (Claude Code): do not commit anything until explicitly instructed.**
> Make and verify changes in the working tree, but leave `git commit`/`git push` to a
> separate, explicit request. This overrides any default urge to commit finished work.

## Versioning & releases ([SemVer](https://semver.org/))

`MAJOR.MINOR.PATCH` — breaking / feature / fix.

For a portfolio, read the numbers as: **major** = a redesign or a content-model change that
invalidates existing MDX; **minor** = a new page, section, or CLI command; **patch** = copy
edits, a new post, a bug fix.

1. `release/x.y.z` off `develop`; bump the version, move `CHANGELOG.md`'s `[Unreleased]`
   entries under the new heading with a date.
2. Merge `release/x.y.z` → `main`; tag `vX.Y.Z`; push tags.
3. Merge `release/x.y.z` back → `develop`.
4. Vercel deploys `main` to production. The tag is what you point at when something breaks.

## Coding conventions

The house rules. See `PLAN.md` for the full specification — this section is the short form
you check a diff against.

### Architecture

- **Content is git, dynamic data is Mongo.** Page content lives in `content/` as MDX and is
  the single source of truth. MongoDB holds only view counts, guestbook entries, contact
  messages, rate-limit state, and the CLI audit log. Never move a page field into the
  database.
- **The homepage must render with the database down.** Nothing on the critical render path
  may await Mongo. Dynamic values (view counts, status) degrade silently to nothing — no
  error UI, no layout shift, no console noise.
- **One schema, three consumers.** `packages/schema` is imported by the CLI (validates
  authoring input), the build (fails on invalid content), and the API (validates request
  bodies). A shape restated by hand in a second place is the bug this rule exists to
  prevent.
- **One command grammar, two clients.** `packages/commands` is imported by the CLI and by
  the browser command palette. The palette is a client of the same parser, not a
  re-implementation of it.
- **Server components by default.** `'use client'` is allowed in the command palette, the
  theme toggle, and the contact form. Adding a fourth needs a reason in the PR.

### Types & schema

- **Types live in `types/`, never in the implementation file.** Every package has
  `src/types/`; no `export interface` / `export type` appears outside it.
  - `shared.types.ts` — the package's cross-module vocabulary. Every package has one.
  - `<module>.types.ts` — types scoped to one module, named after it. A module imports its
    own file directly (`./types/store.types`), not the barrel.
  - `index.ts` — an `export type *` barrel, re-exported from `package.json` as `./types`.

  A type that never leaves the file may stay inline **unexported**; the moment it appears in
  an exported signature it moves to `types/`. The exception is the Zod schema files, where
  `z.infer<typeof someSchema>` sits beside the schema it infers from and `shared.types.ts`
  re-exports it.

- **`./types` subpaths are runtime-free.** They contain nothing but `export type`, so the
  browser bundle never pulls in the Mongo driver. Never add a value export to a
  `.types.ts` file — put it in `constants.ts`.
- **Zod is the single source of truth.** Change the schema first; domain types are
  `z.infer`-ed from it, never hand-written.
- **Parse at the boundary, don't cast.** Every route param, query string, and request body
  is narrowed by a schema before it reaches the database. `as SomeType` on request data is
  how an unvalidated value reaches a query.

### Error handling

- **Content errors name the file, the field, and the fix.** Never surface a raw Zod object
  to the terminal.
- **API routes return one envelope:** `{ error: { code, message, requestId } }`. Never leak
  a stack trace. Status codes: 400 validation, 401 unauthenticated, 403 unauthorised,
  429 rate limited, 500 unexpected.
- **Dynamic-data failures are non-fatal.** A failed view-count read renders nothing. Only
  contract violations throw.

### Config & CLI

- **Secrets from `.env.local` only, never flags.** Flags control behaviour; env carries
  connection details. Add every new secret to `.env.example`.
- **Validate config up front** and print exactly what is missing before doing any work.
- **`--dry-run` on every command that writes or pushes**, and `--json` on every command that
  reads, so the tool stays scriptable.
- **Non-zero exit codes on failure**, so CI can consume the CLI directly.

### Design system

- **Tokens only.** Colors, spacing, type sizes, radii, and durations come from the Tailwind
  config. An arbitrary value (`p-[13px]`, `text-[#ccc]`) in a component is a review comment.
  The permitted values are in `PLAN.md` §4.
- **Both themes, every time.** A component is not done until it has been checked in light
  and dark.
- **One entrance animation, one duration, one curve**, and `prefers-reduced-motion` is
  honoured everywhere.
- **Every new component appears on `/styleguide`.** If it is not on that page, it does not
  exist.
- **Accessibility is not a follow-up ticket.** Keyboard reachable, visible focus ring, real
  labels, semantic landmarks — in the same PR as the component.

### Code style

- **ESLint + Prettier decide formatting; don't argue with them.** Formatting drift is a
  **lint error** (`eslint-plugin-prettier`), so `npm run lint` covers it and CI gates on it.
  Run `npm run lint:fix` before pushing.
- **No magic literals shared by two modules.** A default used in more than one place belongs
  in that package's `constants.ts`.
- **UI components are one per file** under `components/`, presentational, with props typed
  in `types/components.types.ts`. Pages own state and pass it down.
- **Document the _why_.** Every module and non-trivial function carries a `/** */`
  explaining intent and trade-offs, not just mechanics.
- **Import across packages through the barrel** — never a deep `src/` path. Inside a
  package, relative imports go to the module, not the barrel, so there are no cycles.

### Testing

- **Test the pure units.** Schema validation, frontmatter parsing, slug resolution, the
  command parser, and rate-limit key derivation are pure and carry the high-value tests.
- **Route tests assert the envelope**, not just the happy path — a 429 and a 400 are part
  of the contract.
- **The design system is verified by eye, not by test.** Use the checklist in `PLAN.md` §19.

## Publishing content

Content changes never bypass validation.

```bash
ausaf new post <slug>       # scaffolds valid frontmatter
ausaf validate              # the same pass CI runs
ausaf publish <slug>        # clears draft, commits, pushes, triggers deploy
```

A post committed by hand without `ausaf validate` passing is the one case that will break
the production build.

## Dependencies & the lockfile (Windows trap)

`package-lock.json` must contain `@emnapi/core`, `@emnapi/runtime`, and
`@emnapi/wasi-threads` at the root. `@rolldown/binding-wasm32-wasi` (via Vite, which Vitest
pulls in) and `@napi-rs/wasm-runtime` declare them as _optional_ dependencies. They are
never installed on Windows, so an `npm install` run there against a populated
`node_modules` **reconciles the lock against the local tree and deletes those entries** —
after which CI's `npm ci` on Linux fails with `Missing: @emnapi/core@… from lock file`.

- `npm install --package-lock-only` does **not** repair it; it re-derives the same pruned
  tree.
- The only fix is a clean resolve: `rm -rf node_modules package-lock.json && npm install`.
- After any dependency change on Windows, check before committing:

  ```bash
  node -e "const l=require('./package-lock.json');console.log(Object.keys(l.packages).filter(k=>k.includes('@emnapi')))"
  ```

  Three root entries (`core`, `runtime`, `wasi-threads`) is correct; fewer means the lock is
  pruned.

- `npm version` runs an install as a side effect, so it prunes too — bump versions by
  editing `package.json` and the lock's `version` fields directly.

## Version pins that look wrong but aren't

Two dependencies are deliberately held back. Do not "upgrade" them without checking peers.

- **TypeScript stays on 6.x.** `typescript-eslint@8` peers `typescript >=4.8.4 <6.1.0`;
  TypeScript 7 breaks linting entirely.
- **ESLint stays on 9.x.** `eslint-plugin-react@7.37.5` peers `eslint <=9.7` and has no
  ESLint 10 build. This is also why `npm audit` reports transitive `brace-expansion`
  advisories through the lint toolchain. They are dev-only and never reach the browser
  bundle; `npm audit fix --force` would force ESLint 10 and break the config. Revisit when
  that plugin ships ESLint 10 support.

## Local checks before a PR

```bash
npm run lint              # eslint + prettier (formatting is a lint error)
npm run lint:fix          # autofix, including formatting
npm run typecheck         # site + packages + cli
npm run content:validate  # Zod over all MDX and JSON content
npm test                  # vitest
npm run build             # the real production build
```

CI runs all of these on every PR into `main`/`develop`, plus Lighthouse against the preview
deployment. A score below 95 in any category fails the build.
