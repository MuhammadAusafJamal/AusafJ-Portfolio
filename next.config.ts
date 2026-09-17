/**
 * Next.js configuration.
 *
 * Deliberately thin. The security headers and the image formats are worth
 * encoding; everything else is a default that should stay a default.
 */
import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Tightened once the real asset origins are known; a report-only CSP goes here first.
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  // Fail the production build on a type error rather than shipping it. Linting is
  // a separate gate—Next 16 dropped the built-in `next lint`, so `npm run lint`
  // and the CI job own it.
  typescript: { ignoreBuildErrors: false },

  images: {
    // AVIF first, WebP fallback. The page-weight budget assumes both.
    formats: ['image/avif', 'image/webp'],

    // Next 16 only honours a quality it has been told about; anything else falls
    // back to 75 without warning. 90 is here for the hero portrait, where the
    // difference between 75 and 90 on a face at 2x is visible.
    qualities: [75, 90],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
