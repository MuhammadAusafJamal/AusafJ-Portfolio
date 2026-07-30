/**
 * Vitest. Per CONTRIBUTING, the high-value tests are the pure units — schema
 * validation, frontmatter parsing, slug resolution, the command parser, and
 * rate-limit key derivation. Everything runs from TypeScript via esbuild; there
 * is no build step.
 */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    // The scaffold has no tests yet and CI must still go green. Vitest exits 1 on
    // an empty run otherwise.
    passWithNoTests: true,
    include: ['packages/*/test/**/*.test.ts', 'cli/test/**/*.test.ts', 'lib/**/*.test.ts'],
  },
});
