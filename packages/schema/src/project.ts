/**
 * `content/projects/<slug>.mdx` frontmatter.
 *
 * Strict by design: an unrecognised key is an error, not a silently ignored one.
 * A typo'd `feature:` that quietly means "not featured" is exactly the class of
 * bug that makes an authoring tool untrustworthy.
 *
 * Two rules are deliberately NOT here because they cannot be decided from a single
 * file—`slug` must match the filename, and `stack` entries must exist in
 * `skills.json`. Both live in the bundle check in `bundle.ts`.
 */
import { z } from 'zod';
import {
  endDateSchema,
  httpUrlSchema,
  isoDateSchema,
  labelSchema,
  nonEmptyString,
  publicPathSchema,
  slugSchema,
} from './primitives';

/** Max `featured: true` projects across the whole collection. Enforced in `bundle.ts`. */
export const MAX_FEATURED_PROJECTS = 3;

export const projectStatusSchema = z.enum(['live', 'archived', 'wip']);

/**
 * One number with a unit and a label—"128ms" / "p95 latency". Rendered as the
 * MetricBadge row on a case study.
 *
 * `value` is a string, not a number, because the unit is part of the value and
 * formatting it at render time would mean encoding every unit in the component.
 */
export const metricSchema = z.strictObject({
  label: labelSchema,
  value: nonEmptyString.max(24),
  detail: nonEmptyString.max(120).optional(),
});

export const projectLinksSchema = z.strictObject({
  live: httpUrlSchema.optional(),
  repo: httpUrlSchema.optional(),
  writeup: httpUrlSchema.optional(),
});

export const projectFrontmatterSchema = z
  .strictObject({
    title: nonEmptyString.max(80),
    slug: slugSchema,
    /** The problem in one line. Not the stack—the stack is in the tags already. */
    summary: nonEmptyString.max(140),
    /** Your specific contribution, not the team's. */
    role: nonEmptyString.max(80),
    startDate: isoDateSchema,
    endDate: endDateSchema,
    teamSize: z.int().positive().max(500).optional(),
    status: projectStatusSchema,
    featured: z.boolean(),
    /** Manual sort. Ascending. Uniqueness is enforced across the collection. */
    order: z.int(),
    stack: z.array(labelSchema).min(1),
    links: projectLinksSchema.default({}),
    metrics: z.array(metricSchema).max(4).default([]),
    cover: publicPathSchema,
    coverAlt: nonEmptyString.max(140),
    draft: z.boolean(),
  })
  .refine((p) => p.endDate === 'present' || p.endDate >= p.startDate, {
    error: 'endDate is before startDate',
    path: ['endDate'],
  })
  .refine((p) => !p.featured || p.metrics.length > 0, {
    error:
      'a featured project needs at least one metric—without a measurable outcome it belongs in the archive, not on the homepage',
    path: ['metrics'],
  });

export type Project = z.infer<typeof projectFrontmatterSchema>;
export type ProjectStatus = z.infer<typeof projectStatusSchema>;
export type Metric = z.infer<typeof metricSchema>;
