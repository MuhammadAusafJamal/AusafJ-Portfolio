/**
 * The browser favicon.
 *
 * SVG rather than a rasterised `.ico`, so it stays sharp at 16px in a tab strip and
 * at 64px in a bookmark bar off one file of a few hundred bytes.
 */
import { mark } from '@/lib/og/mark';

export const size = { width: 64, height: 64 };
export const contentType = 'image/svg+xml';

export default function Icon() {
  return new Response(mark({ radius: 12 }), {
    headers: {
      'Content-Type': contentType,
      // Static and content-addressed by Next's generated filename, so it can be
      // cached hard—the URL changes when the mark does.
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
