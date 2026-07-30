/**
 * Public barrel for `@ausaf/schema`.
 *
 * Every content and request shape is declared here as a Zod schema, and the
 * domain types are `z.infer`-ed from it — never hand-written. Three consumers
 * import this package: the CLI (validates authoring input before a file is
 * written), the build (fails on invalid content), and the API (narrows request
 * bodies at the network boundary). See PLAN.md §6 and §7.1.
 *
 * Scaffold — schemas land in Phase 2.
 */
export {};
