/**
 * The iOS home-screen icon.
 *
 * Safari will not take the SVG that serves as the favicon—an apple-touch-icon has
 * to be a raster PNG—so the same mark is rasterised here through `next/og` at the
 * 180px iOS expects. Without this file, adding the site to a home screen uses a
 * screenshot of the page, which at that size is an unreadable grey rectangle.
 *
 * Radius 0 because iOS masks the icon with its own rounded square. Supplying one
 * of ours would round the corners twice and leave a dark rim inside the mask.
 */
import { ImageResponse } from 'next/og';
import { mark } from '@/lib/og/mark';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  const svg = mark({ radius: 0 });
  const source = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- next/image does not
            exist inside an ImageResponse; this renders through Satori, not the DOM. */}
      <img src={source} width={size.width} height={size.height} alt="" />
    </div>,
    size
  );
}
