/**
 * `/style-guide`—the living reference for the default design system.
 *
 * Per CONTRIBUTING, no component ships until it appears on this page. Each
 * alternate look has its own page at `/style-guide/<look>`, linked below.
 *
 * Excluded from the sitemap and marked noindex—it is a working tool, not a page
 * a recruiter should land on.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { StyleGuide } from '@/components/style-guide';
import { LOOKS } from '@/lib/looks';

export const metadata: Metadata = {
  title: 'Style guide',
  robots: { index: false, follow: false },
};

export default function StyleGuidePage() {
  return (
    <>
      <StyleGuide />
      <nav
        aria-label="Other looks"
        className="mx-auto max-w-page px-5 pb-24 font-mono text-sm md:px-8"
      >
        <p className="text-muted">Other looks</p>
        <ul className="mt-4 flex flex-col gap-2">
          {LOOKS.map((look) => (
            <li key={look.id}>
              <Link href={`/style-guide/${look.id}`}>{look.label}</Link>
              <span className="text-muted"> · {look.summary}</span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
