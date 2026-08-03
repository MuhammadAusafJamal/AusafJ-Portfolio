/**
 * The whole-content check.
 *
 * Some rules cannot be decided from one file. A slug has to match its filename;
 * `stack` entries have to exist in `skills.json`; at most three projects may be
 * featured. Those live here, in a schema that takes every content file at once,
 * so `ausaf validate`, the build, and CI all run one call and get one answer.
 *
 * Every entry carries the path it was read from, so an issue path always resolves
 * back to a file the author can open.
 */
import { z } from 'zod';
import { experienceFrontmatterSchema } from './experience';
import { postFrontmatterSchema } from './post';
import { MAX_FEATURED_PROJECTS, projectFrontmatterSchema } from './project';
import { siteSchema, skillsFileSchema, socialsFileSchema, usesFileSchema } from './data';

/** Wraps a parsed file with the path it came from. */
const sourced = <T extends z.ZodType>(data: T) =>
  z.strictObject({
    file: z.string().min(1),
    data,
  });

export const sourcedProjectSchema = sourced(projectFrontmatterSchema);
export const sourcedExperienceSchema = sourced(experienceFrontmatterSchema);
export const sourcedPostSchema = sourced(postFrontmatterSchema);

/** `content/projects/madadgar.mdx` → `madadgar`. */
function basename(file: string): string {
  const last = file.replace(/\\/g, '/').split('/').pop() ?? file;
  return last.replace(/\.[^.]+$/, '');
}

function reportDuplicateSlugs(
  entries: readonly { file: string; data: { slug: string } }[],
  key: string,
  ctx: z.RefinementCtx
): void {
  const seen = new Map<string, string>();

  entries.forEach((entry, index) => {
    const first = seen.get(entry.data.slug);

    if (first === undefined) {
      seen.set(entry.data.slug, entry.file);
      return;
    }

    ctx.addIssue({
      code: 'custom',
      path: [key, index, 'data', 'slug'],
      message: `slug "${entry.data.slug}" is already used by ${first}—slugs are URLs and must be unique`,
    });
  });
}

function reportSlugFilenameMismatch(
  entries: readonly { file: string; data: { slug: string } }[],
  key: string,
  ctx: z.RefinementCtx
): void {
  entries.forEach((entry, index) => {
    const expected = basename(entry.file);

    if (entry.data.slug === expected) return;

    ctx.addIssue({
      code: 'custom',
      path: [key, index, 'data', 'slug'],
      message: `slug "${entry.data.slug}" does not match the filename—rename the file to ${entry.data.slug}.mdx, or change the slug to "${expected}"`,
    });
  });
}

function reportUnknownStack(
  entries: readonly { file: string; data: { stack: readonly string[] } }[],
  key: string,
  known: ReadonlySet<string>,
  ctx: z.RefinementCtx
): void {
  entries.forEach((entry, index) => {
    entry.data.stack.forEach((item, stackIndex) => {
      if (known.has(item)) return;

      ctx.addIssue({
        code: 'custom',
        path: [key, index, 'data', 'stack', stackIndex],
        message: `"${item}" is not in content/data/skills.json—add it there, or fix the spelling (matching is case-sensitive)`,
      });
    });
  });
}

export const contentBundleSchema = z
  .strictObject({
    site: siteSchema,
    skills: skillsFileSchema,
    socials: socialsFileSchema,
    uses: usesFileSchema,
    projects: z.array(sourcedProjectSchema),
    experience: z.array(sourcedExperienceSchema),
    posts: z.array(sourcedPostSchema),
  })
  .superRefine((bundle, ctx) => {
    const knownStack = new Set(
      bundle.skills.flatMap((group) => group.items.map((item) => item.name))
    );

    reportSlugFilenameMismatch(bundle.projects, 'projects', ctx);
    reportSlugFilenameMismatch(bundle.experience, 'experience', ctx);
    reportSlugFilenameMismatch(bundle.posts, 'posts', ctx);

    reportDuplicateSlugs(bundle.projects, 'projects', ctx);
    reportDuplicateSlugs(bundle.experience, 'experience', ctx);
    reportDuplicateSlugs(bundle.posts, 'posts', ctx);

    reportUnknownStack(bundle.projects, 'projects', knownStack, ctx);
    reportUnknownStack(bundle.experience, 'experience', knownStack, ctx);

    // Featured is a homepage slot, not a compliment. Three cards is the layout.
    const featured = bundle.projects.filter((entry) => entry.data.featured && !entry.data.draft);

    if (featured.length > MAX_FEATURED_PROJECTS) {
      ctx.addIssue({
        code: 'custom',
        path: ['projects'],
        message: `${featured.length} projects are featured but the homepage has room for ${MAX_FEATURED_PROJECTS}—unfeature ${featured
          .slice(MAX_FEATURED_PROJECTS)
          .map((entry) => entry.file)
          .join(', ')}`,
      });
    }

    // A duplicate `order` makes the sort depend on filesystem read order, which is
    // how a project silently changes position on an unrelated deploy.
    const byOrder = new Map<number, string>();

    bundle.projects.forEach((entry, index) => {
      const first = byOrder.get(entry.data.order);

      if (first === undefined) {
        byOrder.set(entry.data.order, entry.file);
        return;
      }

      ctx.addIssue({
        code: 'custom',
        path: ['projects', index, 'data', 'order'],
        message: `order ${entry.data.order} is already used by ${first}—duplicate order makes the sort non-deterministic`,
      });
    });
  });

export type ContentBundle = z.infer<typeof contentBundleSchema>;
