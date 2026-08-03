/**
 * `content/data/*.json`—the four files that are structured data rather than prose.
 *
 * `site.json` is the one that matters most: the positioning line lives there, and
 * the hero, the meta description, and the OG image all read it from that one
 * field. Edit it once and the three of them stay in agreement.
 */
import { z } from 'zod';
import {
  emailSchema,
  httpUrlSchema,
  labelSchema,
  nonEmptyString,
  publicPathSchema,
} from './primitives';

/* ---------------------------------------------------------------- skills.json */

/**
 * `level` exists to order and group the list. It never becomes a progress bar or a
 * percentage: nobody can check the number, so it reads as decoration.
 */
export const skillLevelSchema = z.enum(['core', 'working', 'familiar']);

export const skillSchema = z.strictObject({
  name: labelSchema,
  level: skillLevelSchema,
  years: z.number().positive().max(50).optional(),
  /** Lucide icon name, or an `/icons/…` path for a brand mark Lucide has no glyph for. */
  icon: nonEmptyString.max(40).optional(),
});

export const skillGroupSchema = z.strictObject({
  group: labelSchema,
  items: z.array(skillSchema).min(1),
});

/** 4–6 groups. More than six stops reading as grouped and starts reading as a wall. */
export const skillsFileSchema = z.array(skillGroupSchema).min(1).max(6);

/* --------------------------------------------------------------- socials.json */

export const socialSchema = z.strictObject({
  platform: labelSchema,
  url: httpUrlSchema,
  handle: nonEmptyString.max(60),
  icon: nonEmptyString.max(40),
  /** Above-the-fold slot. Keep this to GitHub and LinkedIn. */
  showInHero: z.boolean(),
});

export const socialsFileSchema = z.array(socialSchema).min(1);

/* ------------------------------------------------------------------ site.json */

export const availabilitySchema = z.enum(['open', 'selective', 'closed']);

export const siteSchema = z.strictObject({
  name: nonEmptyString.max(60),
  /** The one-line positioning. Hero, meta description, and OG image all read this. */
  positioning: nonEmptyString.max(120),
  /** The proof line under it—years, employer, degree. */
  proof: nonEmptyString.max(120),
  email: emailSchema,
  location: nonEmptyString.max(60),
  availability: availabilitySchema,
  /** Rendered verbatim beside the status dot. Ambiguity here costs you for free. */
  availabilityLabel: nonEmptyString.max(80),
  resumePath: publicPathSchema,
  ogImage: publicPathSchema,
  url: httpUrlSchema,
});

/* ------------------------------------------------------------------ uses.json */

export const usesItemSchema = z.strictObject({
  name: labelSchema,
  url: httpUrlSchema.optional(),
  note: nonEmptyString.max(160).optional(),
});

export const usesCategorySchema = z.strictObject({
  category: labelSchema,
  items: z.array(usesItemSchema).min(1),
});

export const usesFileSchema = z.array(usesCategorySchema).min(1);

export type Site = z.infer<typeof siteSchema>;
export type Availability = z.infer<typeof availabilitySchema>;
export type Skill = z.infer<typeof skillSchema>;
export type SkillLevel = z.infer<typeof skillLevelSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Social = z.infer<typeof socialSchema>;
export type UsesItem = z.infer<typeof usesItemSchema>;
export type UsesCategory = z.infer<typeof usesCategorySchema>;
