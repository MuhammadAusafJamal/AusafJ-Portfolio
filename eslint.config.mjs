/**
 * ESLint flat config (ESLint 10).
 *
 * The rule set is shared with the `Component-Usage-Explorer` repo so both
 * codebases read the same. The difference here is that this project *is* a Next
 * app, so the Next layer (`eslint-config-next` — the `@next/next` rules that
 * catch the image/font/script mistakes that cost Lighthouse points) is kept
 * rather than dropped. Formatting is owned by `.prettierrc` and reported as a
 * lint error, so `npm run lint` covers it and CI gates on it.
 *
 *   npm run lint       # report
 *   npm run lint:fix   # autofix (includes formatting)
 */
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import next from 'eslint-config-next/core-web-vitals';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  {
    // Generated/vendored output — never linted.
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/*.d.ts',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...(Array.isArray(next) ? next : [next]),

  // ---- Every TypeScript file ----
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Best Practices
      'no-console': ['error', { allow: ['warn', 'error', 'info', 'group', 'groupEnd'] }],
      'prefer-const': 'error',
      'no-unused-vars': 'off',
      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          // Honor the codebase conventions: `_`/`_foo` for intentionally unused
          // args/vars, and destructuring a prop purely to exclude it from a
          // `...rest` spread (ignoreRestSiblings).
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          caughtErrorsIgnorePattern: '.',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      // Allow the codebase's established short-circuit (`cond && fn()`) and
      // ternary (`cond ? a() : b()`) side-effect statements. Truly dead
      // expressions are still reported.
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      '@typescript-eslint/no-require-imports': 'warn',
      // quotes
      'jsx-quotes': 'off',
    },
  },

  // ---- Node-side code (CLI, schema/command packages, config files) ----
  {
    files: ['cli/**/*.ts', 'packages/*/src/**/*.ts', 'lib/**/*.ts', '*.mjs', '*.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },

  /**
   * The CLI's `list --json` and `stats --json` output is machine output a caller
   * pipes, not a log line (logs go to stderr via pino). `console.log` is the
   * correct call there, so the rule is relaxed for the CLI entrypoint rather than
   * the output being bent into `console.info`.
   */
  {
    files: ['cli/bin/**/*.ts'],
    rules: {
      'no-console': ['error', { allow: ['log', 'warn', 'error', 'info', 'group', 'groupEnd'] }],
    },
  },

  // ---- Site (browser + React) ----
  {
    files: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { react, 'react-hooks': reactHooks },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules, // no `import React` needed
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // ---- API routes are server-only ----
  {
    files: ['app/api/**/*.ts'],
    languageOptions: { globals: globals.node },
  },

  // ---- Tests ----
  {
    files: ['**/test/**/*.ts', '**/*.test.{ts,tsx}'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },

  // Must stay last: turns off every rule Prettier owns, then reports formatting
  // drift as a lint error (`plugin:prettier/recommended` in the source config).
  prettierRecommended
);
