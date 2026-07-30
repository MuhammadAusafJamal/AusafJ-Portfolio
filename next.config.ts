/**
 * Next.js configuration.
 *
 * Deliberately thin. The two things worth encoding here are the security headers
 * (PLAN.md §15) and the image formats that keep the performance budget (§12) —
 * everything else is a default that should stay a default.
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
  // a separate gate — Next 16 dropped the built-in `next lint`, so `npm run lint`
  // and the CI job own it.
  typescript: { ignoreBuildErrors: false },

  images: {
    // AVIF first, WebP fallback — the budget in PLAN.md §12 assumes both.
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
