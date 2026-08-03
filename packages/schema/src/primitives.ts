/**
 * Shared field-level primitives.
 *
 * Every content and request schema is assembled from these, so a rule like
 * "slugs are lowercase kebab" is written once and cannot drift between the CLI,
 * the build, and the API.
 *
 * The error strings are written for whoever is staring at CLI output at the time.
 * They name the rule and give the fix, because the alternative is dumping a raw
 * Zod issue at the author and letting them work it out.
 */
import { z } from 'zod';

/** Lowercase kebab-case. Immutable once published—changing one breaks the URL. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const slugSchema = z.string().min(1).max(80).regex(SLUG_PATTERN, {
  error: 'must be lowercase kebab-case, e.g. "madadgar-service-orchestrator"',
});

/** ISO 8601 calendar date, `YYYY-MM-DD`. Rejects `2024-1-5`. */
export const isoDateSchema = z.iso.date({ error: 'must be an ISO 8601 date, e.g. "2024-01-05"' });

/** An end date, or the literal `present` for ongoing work. */
export const endDateSchema = z.union([isoDateSchema, z.literal('present')], {
  error: 'must be an ISO 8601 date or the literal "present"',
});

/** An absolute external URL. `http` is allowed so a localhost demo can be linked while drafting. */
export const httpUrlSchema = z.url({
  protocol: /^https?$/,
  error: 'must be an absolute http(s) URL',
});

export const emailSchema = z.email({ error: 'must be a valid email address' });

/**
 * A path under `public/`, written as it appears in the browser. Images live beside
 * their content at `/content/<type>/<slug>/…`; the leading slash is what makes
 * `next/image` treat it as local rather than remote.
 */
export const publicPathSchema = z.string().regex(/^\/[^\s]+$/, {
  error: 'must be a root-relative path under public/, e.g. "/content/projects/foo/cover.png"',
});

/** Free text that must actually contain something after trimming. */
export const nonEmptyString = z.string().trim().min(1, { error: 'must not be empty' });

/** A tag, stack entry, or skill name. Human-cased (`Next.js`, not `nextjs`)—these render verbatim. */
export const labelSchema = nonEmptyString.max(40);
