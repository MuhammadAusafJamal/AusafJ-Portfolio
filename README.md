# AusafJ Portfolio

Personal site for Muhammad Ausaf Jamal. Static content in git, a real backend off the
critical path, and a CLI that manages both.

> **Status: scaffold.** Directory skeleton and repo conventions only — no application code
> yet. `package.json`, `tsconfig.json`, and the ESLint config arrive with `create-next-app`
> (see [Getting started](#getting-started)) so they are deliberately absent rather than
> pre-written and immediately overwritten.

## What this is

A portfolio built to score well on three things — how quickly a recruiter understands what
you do, how it looks, and whether it is memorable — without trading any one of them for
another. The full reasoning, the design tokens, the content model, and the verification
checklist are in **[`PLAN.md`](./PLAN.md)**.

The secondary goal is backend practice. Content is authored through a CLI (`ausaf`) that
shares its Zod schemas with the build and its command grammar with the site's command
palette.

## Architecture

```text
Next.js (App Router) + TypeScript on Vercel
├─ content/          MDX + JSON in git   ← source of truth for every page
├─ packages/schema/  Zod definitions     ← imported by CLI, build, and API
├─ packages/commands/ command grammar    ← imported by CLI and command palette
├─ cli/              the `ausaf` CLI
└─ app/api/          serverless routes → MongoDB Atlas (views, guestbook, contact)
```

Two rules hold the design together:

1. **Page content never lives in the database.** The site is static and renders instantly.
   Pause the Atlas cluster and the homepage must still be perfect.
2. **A shape is declared once.** The schema package validates authoring input, fails the
   build on bad content, and narrows API request bodies. Three consumers, one definition.

## Layout

| Path                   | What lives here                                            |
| ---------------------- | ---------------------------------------------------------- |
| `app/(site)/`          | Page routes and the shared layout                          |
| `app/api/`             | Serverless routes — views, guestbook, contact, health, cli |
| `components/ui/`       | Design-system primitives                                   |
| `components/sections/` | Composed page sections                                     |
| `components/palette/`  | The command palette                                        |
| `content/`             | MDX and JSON — projects, experience, posts, site data      |
| `packages/schema/`     | Zod definitions shared by CLI, build, and API              |
| `packages/commands/`   | Command grammar shared by CLI and palette                  |
| `cli/`                 | The `ausaf` CLI                                            |
| `lib/`                 | Content loading, Mongo client, rate limiting, OG images    |
| `styles/`              | Global styles and design tokens                            |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values you need
npm run dev
```

Only `MONGODB_URI` is needed for the dynamic features; the site builds and runs without it.

## Scripts

| Command                    | What it does                                   |
| -------------------------- | ---------------------------------------------- |
| `npm run dev`              | Local dev server                               |
| `npm run build`            | Production build (fails on invalid content)    |
| `npm run lint`             | ESLint + Prettier (formatting is a lint error) |
| `npm run lint:fix`         | Autofix, including formatting                  |
| `npm run typecheck`        | Site, packages, and CLI                        |
| `npm run content:validate` | Zod over all MDX and JSON                      |
| `npm test`                 | Vitest                                         |

## The CLI

```bash
ausaf new post <slug>    # scaffold valid frontmatter, open $EDITOR
ausaf validate           # the same content check CI runs
ausaf publish <slug>     # clear draft, commit, push, trigger deploy
ausaf stats              # view and guestbook counts from the live API
ausaf doctor             # check env, git state, API reachability
```

Full command reference in [`PLAN.md`](./PLAN.md) §10.

## Documents

| File                                     | Purpose                                                              |
| ---------------------------------------- | -------------------------------------------------------------------- |
| [`PLAN.md`](./PLAN.md)                   | The build specification — architecture, theme, schemas, verification |
| [`DESIGN-PROMPT.md`](./DESIGN-PROMPT.md) | Paste-ready prompts for text-to-UI design tools                      |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md)   | Branching model, commit format, coding conventions                   |
| [`CHANGELOG.md`](./CHANGELOG.md)         | Release history                                                      |

## License

Code is MIT. Written content, images, and design are not — please do not redeploy this as
your own portfolio.
