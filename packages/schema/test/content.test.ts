/**
 * Schema tests.
 *
 * These cover the rules where a silent pass would put something wrong on the live
 * site. Zod already tests its own field types; what needs testing is the code
 * written here, so the refinements and the cross-file checks are what get asserted.
 */
import { describe, expect, it } from 'vitest';
import { contentBundleSchema } from '../src/bundle';
import { experienceFrontmatterSchema } from '../src/experience';
import { postFrontmatterSchema } from '../src/post';
import { projectFrontmatterSchema } from '../src/project';

const project = {
  title: 'Madadgar',
  slug: 'madadgar',
  summary: 'Matches a spoken request for a home service to an available provider.',
  role: 'Full-stack engineer',
  startDate: '2025-11-01',
  endDate: 'present',
  status: 'live',
  featured: true,
  order: 1,
  stack: ['TypeScript', 'Node'],
  metrics: [{ label: 'intent accuracy', value: '94%' }],
  cover: '/content/projects/madadgar/cover.png',
  coverAlt: 'The Madadgar booking screen.',
  draft: false,
};

const experience = {
  company: 'Technyx Systems',
  slug: 'technyx-systems',
  role: 'Software Engineer',
  employmentType: 'full-time',
  location: 'Karachi, Pakistan',
  startDate: '2024-02-01',
  endDate: 'present',
  bullets: [
    'Built the booking flow end to end.',
    'Migrated the dashboard to the App Router.',
    'Cut the initial bundle by 40%.',
  ],
  stack: ['TypeScript', 'Node'],
  featured: true,
};

const post = {
  title: 'Shipping a CLI parser to the browser',
  slug: 'cli-parser-in-the-browser',
  date: '2026-01-10',
  summary: 'One command grammar, two clients.',
  tags: ['TypeScript'],
  draft: false,
};

const bundle = {
  site: {
    name: 'Muhammad Ausaf Jamal',
    positioning: 'Software engineer building full-stack products with React, Next.js, and Node.',
    proof: '2 years at Technyx Systems. BS Computer Science, University of Karachi.',
    email: 'ausaffarooqui17@gmail.com',
    location: 'Karachi, Pakistan',
    availability: 'open',
    availabilityLabel: 'Open to software engineering roles—Karachi or remote.',
    resumePath: '/resume.pdf',
    ogImage: '/og/default.png',
    url: 'https://mausafjamal.dev',
  },
  skills: [
    {
      group: 'Languages',
      items: [
        { name: 'TypeScript', level: 'core' },
        { name: 'Node', level: 'core' },
      ],
    },
  ],
  socials: [
    {
      platform: 'GitHub',
      url: 'https://github.com/MuhammadAusafJamal',
      handle: 'MuhammadAusafJamal',
      icon: 'github',
      showInHero: true,
    },
  ],
  uses: [{ category: 'Editor', items: [{ name: 'VS Code' }] }],
  projects: [{ file: 'content/projects/madadgar.mdx', data: project }],
  experience: [{ file: 'content/experience/technyx-systems.mdx', data: experience }],
  posts: [{ file: 'content/posts/cli-parser-in-the-browser.mdx', data: post }],
};

/** Every issue message, joined—enough to assert on without pinning exact wording. */
function messagesFor(input: unknown): string {
  const result = contentBundleSchema.safeParse(input);
  return result.success ? '' : result.error.issues.map((issue) => issue.message).join('\n');
}

describe('projectFrontmatterSchema', () => {
  it('accepts a well-formed project', () => {
    expect(projectFrontmatterSchema.safeParse(project).success).toBe(true);
  });

  it('rejects an unknown key rather than ignoring it', () => {
    const result = projectFrontmatterSchema.safeParse({ ...project, feature: true });

    expect(result.success).toBe(false);
  });

  it('rejects a featured project with no metric', () => {
    const result = projectFrontmatterSchema.safeParse({ ...project, metrics: [] });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['metrics']);
  });

  it('allows a non-featured project with no metric', () => {
    expect(
      projectFrontmatterSchema.safeParse({ ...project, featured: false, metrics: [] }).success
    ).toBe(true);
  });

  it('rejects an end date before the start date', () => {
    const result = projectFrontmatterSchema.safeParse({ ...project, endDate: '2020-01-01' });

    expect(result.success).toBe(false);
  });

  it('rejects a slug that is not kebab-case', () => {
    expect(projectFrontmatterSchema.safeParse({ ...project, slug: 'Madadgar App' }).success).toBe(
      false
    );
  });

  it('defaults links to an empty object', () => {
    const parsed = projectFrontmatterSchema.parse(project);

    expect(parsed.links).toEqual({});
  });
});

describe('experienceFrontmatterSchema', () => {
  it('accepts a well-formed role', () => {
    expect(experienceFrontmatterSchema.safeParse(experience).success).toBe(true);
  });

  it('accepts two bullets, which is all a short internship honestly has', () => {
    expect(
      experienceFrontmatterSchema.safeParse({
        ...experience,
        bullets: experience.bullets.slice(0, 2),
      }).success
    ).toBe(true);
  });

  it('rejects a single bullet', () => {
    expect(
      experienceFrontmatterSchema.safeParse({
        ...experience,
        bullets: experience.bullets.slice(0, 1),
      }).success
    ).toBe(false);
  });

  it('rejects a bullet that opens with a weak verb', () => {
    const result = experienceFrontmatterSchema.safeParse({
      ...experience,
      bullets: ['Worked on the booking flow.', ...experience.bullets.slice(1)],
    });

    expect(result.success).toBe(false);
  });
});

describe('postFrontmatterSchema', () => {
  it('accepts a well-formed post', () => {
    expect(postFrontmatterSchema.safeParse(post).success).toBe(true);
  });

  it('rejects a cover without alt text', () => {
    const result = postFrontmatterSchema.safeParse({
      ...post,
      cover: '/content/posts/x/cover.png',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['coverAlt']);
  });

  it('rejects an updated date before the publish date', () => {
    expect(postFrontmatterSchema.safeParse({ ...post, updated: '2025-01-01' }).success).toBe(false);
  });

  it('rejects a hand-authored readingTime', () => {
    expect(postFrontmatterSchema.safeParse({ ...post, readingTime: 4 }).success).toBe(false);
  });
});

describe('contentBundleSchema', () => {
  it('accepts a consistent bundle', () => {
    const result = contentBundleSchema.safeParse(bundle);

    expect(result.success).toBe(true);
  });

  it('rejects a slug that does not match its filename', () => {
    const messages = messagesFor({
      ...bundle,
      projects: [{ file: 'content/projects/madadgar-app.mdx', data: project }],
    });

    expect(messages).toContain('does not match the filename');
  });

  it('rejects a duplicate slug', () => {
    const messages = messagesFor({
      ...bundle,
      posts: [
        { file: 'content/posts/cli-parser-in-the-browser.mdx', data: post },
        { file: 'content/posts/cli-parser-in-the-browser.mdx', data: post },
      ],
    });

    expect(messages).toContain('is already used by');
  });

  it('rejects a stack entry that is not in skills.json', () => {
    const messages = messagesFor({
      ...bundle,
      projects: [
        {
          file: 'content/projects/madadgar.mdx',
          data: { ...project, stack: ['TypeScript', 'Rust'] },
        },
      ],
    });

    expect(messages).toContain('not in content/data/skills.json');
  });

  it('rejects more than three featured projects', () => {
    const projects = ['one', 'two', 'three', 'four'].map((slug, index) => ({
      file: `content/projects/${slug}.mdx`,
      data: { ...project, slug, order: index + 1 },
    }));
    const messages = messagesFor({ ...bundle, projects });

    expect(messages).toContain('room for 3');
  });

  it('rejects a duplicate order', () => {
    const messages = messagesFor({
      ...bundle,
      projects: [
        { file: 'content/projects/madadgar.mdx', data: project },
        {
          file: 'content/projects/other.mdx',
          data: { ...project, slug: 'other', featured: false },
        },
      ],
    });

    expect(messages).toContain('non-deterministic');
  });

  it('does not count a draft towards the featured limit', () => {
    const projects = ['one', 'two', 'three', 'four'].map((slug, index) => ({
      file: `content/projects/${slug}.mdx`,
      data: { ...project, slug, order: index + 1, draft: index === 3 },
    }));

    expect(messagesFor({ ...bundle, projects })).toBe('');
  });
});
