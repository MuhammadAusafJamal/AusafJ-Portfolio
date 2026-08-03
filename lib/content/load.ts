/**
 * Reads `content/` off disk, validates the whole thing at once, and hands back
 * typed data.
 *
 * The read happens once per process. Content is static and lives in git, so the
 * only way it changes is a deploy; caching the parsed bundle means a page render
 * never touches the filesystem twice.
 *
 * Validation is deliberately all-or-nothing. A single bad frontmatter field fails
 * the build with the file and the field named, which is the whole reason the
 * schema package exists.
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import { contentBundleSchema } from '@ausaf/schema';
import type { ContentBundle } from '@ausaf/schema/types';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

/** Frontmatter plus the MDX body, which the schema does not describe. */
export type Entry<T> = { file: string; data: T; body: string };

export type Content = {
  site: ContentBundle['site'];
  skills: ContentBundle['skills'];
  socials: ContentBundle['socials'];
  uses: ContentBundle['uses'];
  projects: Entry<ContentBundle['projects'][number]['data']>[];
  experience: Entry<ContentBundle['experience'][number]['data']>[];
  posts: Entry<ContentBundle['posts'][number]['data']>[];
};

async function readJson(name: string): Promise<unknown> {
  const file = path.join(CONTENT_ROOT, 'data', name);
  return JSON.parse(await readFile(file, 'utf8'));
}

/** Every `.mdx` file in a content directory, with frontmatter split from body. */
async function readMdxDir(dir: string): Promise<{ file: string; data: unknown; body: string }[]> {
  const absolute = path.join(CONTENT_ROOT, dir);

  let names: string[];
  try {
    names = await readdir(absolute);
  } catch {
    // The directory is allowed not to exist yet; there is simply nothing of that type.
    return [];
  }

  const files = names.filter((name) => name.endsWith('.mdx')).sort();

  return Promise.all(
    files.map(async (name) => {
      const raw = await readFile(path.join(absolute, name), 'utf8');
      const parsed = matter(raw);

      return {
        // Posix separators so the path reads the same on Windows and in CI, and so the
        // filename check in the bundle schema sees what the author typed.
        file: `content/${dir}/${name}`,
        data: parsed.data,
        body: parsed.content.trim(),
      };
    })
  );
}

async function read(): Promise<Content> {
  const [site, skills, socials, uses, projects, experience, posts] = await Promise.all([
    readJson('site.json'),
    readJson('skills.json'),
    readJson('socials.json'),
    readJson('uses.json'),
    readMdxDir('projects'),
    readMdxDir('experience'),
    readMdxDir('posts'),
  ]);

  const result = contentBundleSchema.safeParse({
    site,
    skills,
    socials,
    uses,
    projects: projects.map(({ file, data }) => ({ file, data })),
    experience: experience.map(({ file, data }) => ({ file, data })),
    posts: posts.map(({ file, data }) => ({ file, data })),
  });

  if (!result.success) {
    throw new Error(`Content failed validation.\n\n${z.prettifyError(result.error)}`);
  }

  // Bodies are carried alongside rather than through the schema, so the validated
  // frontmatter is re-attached to the text it came from here.
  const withBodies = <T>(
    validated: { file: string; data: T }[],
    sources: { file: string; body: string }[]
  ): Entry<T>[] =>
    validated.map((entry, index) => ({ ...entry, body: sources[index]?.body ?? '' }));

  return {
    site: result.data.site,
    skills: result.data.skills,
    socials: result.data.socials,
    uses: result.data.uses,
    projects: withBodies(result.data.projects, projects),
    experience: withBodies(result.data.experience, experience),
    posts: withBodies(result.data.posts, posts),
  };
}

let cached: Promise<Content> | undefined;

export function loadContent(): Promise<Content> {
  cached ??= read();
  return cached;
}
