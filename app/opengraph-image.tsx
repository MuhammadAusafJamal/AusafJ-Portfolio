/**
 * The homepage share card, and the fallback for any route without its own.
 *
 * Living at the root of `app/` means every segment below inherits it, so a page
 * added later gets a real card instead of nothing. The pages therefore declare no
 * `openGraph.images` at all—file-based metadata like this outranks the config kind,
 * and having two sources for one tag is how they end up disagreeing.
 */
import { ImageResponse } from 'next/og';
import { getSite } from '@/lib/content';
import { Card, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og/card';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Muhammad Ausaf Jamal — software engineer';

export default async function Image() {
  const site = await getSite();

  return new ImageResponse(
    <Card
      title={site.name}
      subtitle={site.positioning}
      eyebrow="Portfolio"
      name={site.location}
      url={site.url}
    />,
    size
  );
}
