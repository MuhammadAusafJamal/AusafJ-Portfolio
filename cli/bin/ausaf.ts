#!/usr/bin/env -S npx tsx
/**
 * `ausaf` — the content CLI entrypoint.
 *
 * Parses against `@ausaf/commands` and validates against `@ausaf/schema`, so the
 * terminal, the build, and the API all agree on what a valid project or post is.
 * Command reference: PLAN.md §10.
 *
 * Scaffold — commands land in Phase 6. Exits non-zero so CI and `npm run
 * content:validate` fail loudly rather than reporting a false pass.
 */
console.error('ausaf: not implemented yet — see PLAN.md §10 (Phase 6).');
process.exit(1);
