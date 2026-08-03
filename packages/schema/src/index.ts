/**
 * Public barrel for `@ausaf/schema`.
 *
 * Every content and request shape is declared here as a Zod schema, and the
 * domain types are `z.infer`-ed from it—never hand-written. Three consumers
 * import this package: the CLI (validates authoring input before a file is
 * written), the build (fails on invalid content), and the API (narrows request
 * bodies at the network boundary).
 */
export * from './primitives';
export * from './project';
export * from './experience';
export * from './post';
export * from './data';
export * from './api';
export * from './bundle';

/**
 * Bumped whenever a content shape changes in a way that requires existing files
 * to be edited. `ausaf doctor` compares this against the value recorded in
 * `.ausafrc` and tells you which migration you are missing.
 */
export const SCHEMA_VERSION = 1;
