/**
 * Public barrel for `@ausaf/commands`.
 *
 * The command grammar — the definition of `whoami`, `projects`, `open <slug>`,
 * `status`, and the rest. Two clients parse against it: the `ausaf` CLI in the
 * terminal, and the command palette in the browser. The palette is a client of
 * this parser, not a re-implementation of it. See PLAN.md §11.
 *
 * Scaffold — the grammar lands in Phase 7.
 */
export {};
