/**
 * `content/experience/<slug>.mdx` frontmatter.
 *
 * The bullet rules are enforced here: 3–5 of them, each opening with an action
 * verb. A style guide would say the same thing, and a style guide loses to the
 * night you write three roles at 1am.
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

export const employmentTypeSchema = z.enum([
  'full-time',
  'part-time',
  'contract',
  'internship',
  'freelance',
]);

/**
 * Openers that describe being near the work. Every one has a stronger verb hiding
 * behind it. This is a denylist because an allowlist of approved verbs would
 * reject perfectly good bullets, and a tool that blocks correct input gets
 * bypassed within a week.
 */
const WEAK_BULLET_OPENERS: readonly string[] = [
  'assisted',
  'helped',
  'involved',
  'participated',
  'responsible',
  'tasked',
  'was',
  'worked',
];

const bulletSchema = nonEmptyString
  .max(240)
  .regex(/^[A-Z]/, { error: 'must start with a capital letter' })
  .refine((b) => !WEAK_BULLET_OPENERS.includes((b.split(/\s+/)[0] ?? '').toLowerCase()), {
    error:
      'must open with an action verb—"Built", "Migrated", "Cut"—not "Worked on" or "Responsible for"',
  });

export const experienceFrontmatterSchema = z
  .strictObject({
    company: nonEmptyString.max(80),
    companyUrl: httpUrlSchema.optional(),
    slug: slugSchema,
    role: nonEmptyString.max(80),
    employmentType: employmentTypeSchema,
    location: nonEmptyString.max(80),
    startDate: isoDateSchema,
    endDate: endDateSchema,
    /**
     * 2–5, each leading with a verb and carrying a number wherever one exists.
     * The floor is 2 rather than 3 because a three-month internship honestly has
     * two things worth saying, and a floor that forces a third invites padding —
     * which is the failure this rule was written to prevent.
     */
    bullets: z.array(bulletSchema).min(2).max(5),
    stack: z.array(labelSchema).min(1),
    logo: publicPathSchema.optional(),
    /** Shown in the condensed homepage timeline rather than only on `/about`. */
    featured: z.boolean(),
  })
  .refine((e) => e.endDate === 'present' || e.endDate >= e.startDate, {
    error: 'endDate is before startDate',
    path: ['endDate'],
  });

export type Experience = z.infer<typeof experienceFrontmatterSchema>;
export type EmploymentType = z.infer<typeof employmentTypeSchema>;
