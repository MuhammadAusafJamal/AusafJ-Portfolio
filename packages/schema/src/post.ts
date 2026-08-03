/**
 * `content/posts/<slug>.mdx` frontmatter.
 *
 * Two schemas, and the split matters. `postFrontmatterSchema` is what an author
 * writes and what the CLI validates before touching disk. `postSchema` is what the
 * site renders—the same fields plus `readingTime`, which is computed from the
 * body at load time and must never be authored by hand, because a hand-written one
 * silently goes stale on the next edit.
 */
import { z } from 'zod';
import {
  isoDateSchema,
  labelSchema,
  nonEmptyString,
  publicPathSchema,
  slugSchema,
  httpUrlSchema,
} from './primitives';

export const postFrontmatterSchema = z
  .strictObject({
    title: nonEmptyString.max(90),
    slug: slugSchema,
    date: isoDateSchema,
    /** Set when the post is materially revised. Omitted means never revised. */
    updated: isoDateSchema.optional(),
    /** Doubles as the `<meta name="description">`, hence the 160 cap. */
    summary: nonEmptyString.max(160),
    tags: z.array(labelSchema).min(1).max(6),
    draft: z.boolean(),
    cover: publicPathSchema.optional(),
    coverAlt: nonEmptyString.max(140).optional(),
    /** Set when the post was published elsewhere first. */
    canonical: httpUrlSchema.optional(),
  })
  .refine((p) => p.updated === undefined || p.updated >= p.date, {
    error: 'updated is before date',
    path: ['updated'],
  })
  .refine((p) => p.cover === undefined || p.coverAlt !== undefined, {
    error: 'a cover needs coverAlt—an image without alt text fails the accessibility pass',
    path: ['coverAlt'],
  });

/** Computed, never authored. Minutes, rounded up, floored at 1. */
export const readingTimeSchema = z.int().positive();

export const postSchema = z.intersection(
  postFrontmatterSchema,
  z.object({ readingTime: readingTimeSchema })
);

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
export type Post = z.infer<typeof postSchema>;
