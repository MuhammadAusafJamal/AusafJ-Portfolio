/**
 * Type-only barrel, re-exported as the `./types` subpath.
 *
 * Runtime-free by contract: nothing but `export type` may appear here or in any
 * `*.types.ts` file, so the browser bundle never pulls in a server dependency.
 * A value belongs in `constants.ts` or the module.
 */
export {};
