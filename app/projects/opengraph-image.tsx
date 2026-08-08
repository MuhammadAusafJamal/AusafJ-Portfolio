/**
 * The `/projects` share card.
 */
import { ImageResponse } from 'next/og';
import { getSite } from '@/lib/content';
import { Card, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og/card';
import { PROJECTS_DESCRIPTION } from './description';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Projects — Muhammad Ausaf Jamal';

export default async function Image() {
  const site = await getSite();

  return new ImageResponse(
    <Card
      title="Projects"
      subtitle={PROJECTS_DESCRIPTION}
      eyebrow="Case studies"
      name={site.name}
      url={site.url}
    />,
    size
  );
}
