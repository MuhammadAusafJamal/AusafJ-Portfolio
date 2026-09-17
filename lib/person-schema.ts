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

/**
 * The entity definition, written for a machine rather than for the hero.
 *
 * `site.positioning` is capped at 120 characters because it has to stay
 * scannable in seconds, which is the right constraint for a human and the wrong
 * one for an answer engine—the engine wants the whole relationship spelled out
 * in a sentence it can quote without editing. So the hero keeps the short line
 * and this carries the long one. Every fact here is stated on `/about`.
 */
const ENTITY_DESCRIPTION =
  'Muhammad Ausaf Jamal is a software engineer based in Karachi, Pakistan, working at ' +
  'Technyx Systems since July 2024. He builds government digital platforms end to end: ' +
  'React, Next.js, TypeScript and React Native on the front end, Node.js with Express and ' +
  'ASP.NET Core with Umbraco on the back, over MongoDB and SQL Server, deployed on Azure.';

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
    description: ENTITY_DESCRIPTION,
    // The hero line, kept alongside the long description because it is the
    // sentence the rest of the site is built around and it fits a snippet.
    disambiguatingDescription: site.positioning,
    // `worksFor` stays a flat Organization. schema.org's dated-employment
    // pattern nests an OrganizationRole in the same property, which is correct
    // and which also breaks every consumer that reads `worksFor.name`. The dates
    // are carried in the visible timeline and the FAQ answers instead, and those
    // are what actually get extracted.
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Engineer',
      occupationalCategory: 'Software Developer',
      skills: skills.flatMap((group) => group.items.map((item) => item.name)).join(', '),
    },
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
