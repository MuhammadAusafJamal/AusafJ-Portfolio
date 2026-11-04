/**
 * `/style-guide/<look>`—the style guide for one alternate look.
 *
 * The page wraps the shared style guide in the look's class, so every swatch,
 * font, and radius below is that look's token, whatever theme the visitor has
 * picked. One page per entry in `lib/looks.ts`; anything else 404s.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StyleGuide } from '@/components/style-guide';
import { LOOKS } from '@/lib/looks';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOOKS.map((look) => ({ look: look.id }));
}

type Props = { params: Promise<{ look: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { look: id } = await params;
  const look = LOOKS.find((entry) => entry.id === id);
  return {
    title: look === undefined ? 'Style guide' : `Style guide: ${look.label}`,
    robots: { index: false, follow: false },
  };
}

export default async function LookStyleGuidePage({ params }: Props) {
  const { look: id } = await params;
  const look = LOOKS.find((entry) => entry.id === id);
  if (look === undefined) notFound();

  return (
    <div className={`${look.id} min-h-screen`}>
      <StyleGuide look={look.id} />
      <p className="mx-auto max-w-page px-5 pb-24 font-mono text-sm md:px-8">
        <Link href="/style-guide">Default style guide</Link>
        <span className="text-muted"> · </span>
        <a href={`/?theme=${look.id}`}>See the site in this look</a>
      </p>
    </div>
  );
}
