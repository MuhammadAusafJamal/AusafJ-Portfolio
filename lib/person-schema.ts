/**
 * The `Person` graph, built once and rendered on the homepage and `/about`.
 *
 * Answer engines resolve a person by cross-referencing the same entity across
 * pages, so both pages emit the identical object rather than each describing a
 * slightly different person. `sameAs` is what ties this to the GitHub and
 * LinkedIn profiles; without it the name is a string rather than an identity.
 *
 * Everything here is already stated in the visible copy somewhere. This markup
 * exists so a crawler doesn't have to infer any of it from prose, not to claim
 * anything the pages don't.
 */
import type { Site, Social, SkillGroup } from '@ausaf/schema/types';
import { CERTIFICATIONS, EDUCATION } from './credentials';

const EMPLOYER = {
  '@type': 'Organization',
  name: 'Technyx Systems',
  url: 'https://technyxsystems.com',
} as const;

export function buildPersonSchema({
  site,
  socials,
  skills,
}: {
  site: Site;
  socials: Social[];
  skills: SkillGroup[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: 'Software Engineer',
    // The positioning line, verbatim. It is the one sentence the site is built
    // around, so it is also the one an answer engine should quote.
    description: site.positioning,
    email: `mailto:${site.email}`,
    url: site.url,
    address: { '@type': 'PostalAddress', addressLocality: site.location },
    sameAs: socials.map((social) => social.url),
    knowsAbout: skills.flatMap((group) => group.items.map((item) => item.name)),
    worksFor: EMPLOYER,
    alumniOf: EDUCATION.map((entry) => ({
      '@type': 'EducationalOrganization',
      name: entry.institution,
    })),
    hasCredential: CERTIFICATIONS.map((credential) => ({
      '@type': 'EducationalOccupationalCredential',
      name: credential.name,
      credentialCategory: 'certificate',
      recognizedBy: {
        '@type': 'Organization',
        name: credential.issuer,
        ...(credential.issuerUrl === undefined ? {} : { url: credential.issuerUrl }),
      },
    })),
  };
}
