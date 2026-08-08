/**
 * `robots.txt`.
 *
 * Everything is crawlable except the style guide. The one line that does real work
 * is the sitemap pointer—it is how a crawler finds the case studies without having
 * to walk the site to reach them.
 */
import type { MetadataRoute } from 'next';
import { getSite } from '@/lib/content';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSite();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Belt and braces with the `noindex` on the page itself. Disallow stops the
      // crawl, `noindex` handles anything that ignores this file.
      disallow: '/style-guide',
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
