/**
 * A share card per case study, generated at build from the same frontmatter the
 * page renders.
 *
 * This is what replaces the project `cover` in the share slot. Those files are
 * declared in frontmatter but are not on disk, and an og:image that 404s renders
 * the preview as a grey box—worse than no card, because it looks broken rather
 * than plain.
 *
 * `generateStaticParams` is repeated here rather than borrowed from `page.tsx`.
 * Without it this route is generated on demand, and a scraper that times out on
 * the first request caches the miss.
 */
import { ImageResponse } from 'next/og';
import { getProject, getProjects, getSite } from '@/lib/content';
import { Card, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og/card';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Case study — Muhammad Ausaf Jamal';

export async function generateStaticParams() {
  return (await getProjects()).map((project) => ({ slug: project.data.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, site] = await Promise.all([getProject(slug), getSite()]);

  return new ImageResponse(
    <Card
      // A slug with no project is unreachable here—the page 404s first—but the
      // image route is its own request, so it still needs an answer.
      title={project?.data.title ?? site.name}
      subtitle={project?.data.summary ?? site.positioning}
      eyebrow="Case study"
      name={site.name}
      url={site.url}
    />,
    size
  );
}
