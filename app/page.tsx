/**
 * Homepage.
 *
 * A server component with no client-side data fetching anywhere on it. Every value
 * below is read from `content/` at build time and validated before it renders, so
 * the page is fully formed in the HTML and stays up whether or not the database
 * is reachable.
 *
 * Section order is the reading order a recruiter actually uses: who, what I
 * shipped, where I have worked, what I know, how to reach me.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getCompanyHistory,
  getFeaturedProjects,
  getSite,
  getSkills,
  getSocials,
  getTestimonial,
} from '@/lib/content';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { Contact } from '@/components/sections/contact';
import { ExperienceTimeline } from '@/components/sections/experience-timeline';
import { Hero } from '@/components/sections/hero';
import { Skills } from '@/components/sections/skills';
import { ProjectCard } from '@/components/ui/project-card';
import { Quote } from '@/components/ui/quote';
import { Section } from '@/components/ui/section';

/**
 * Title, description, and OG copy are inherited from the root layout, which reads
 * them from `site.json`. Only the canonical is declared per route, and every route
 * has to declare its own—see the note in the layout.
 */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default async function Home() {
  const [site, socials, projects, history, skills, testimonial] = await Promise.all([
    getSite(),
    getSocials(),
    getFeaturedProjects(),
    getCompanyHistory(),
    getSkills(),
    getTestimonial(),
  ]);

  // Marks up the same facts the hero states, so a search result can carry the role
  // and the links without a crawler having to infer them from the copy.
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: 'Software Engineer',
    email: `mailto:${site.email}`,
    url: site.url,
    address: { '@type': 'PostalAddress', addressLocality: site.location },
    sameAs: socials.map((social) => social.url),
    knowsAbout: skills.flatMap((group) => group.items.map((item) => item.name)),
  };

  return (
    <>
      <Nav name={site.name} />

      <main id="main" className="mx-auto flex max-w-page flex-col gap-24 px-5 py-24 md:px-8">
        <Hero site={site} socials={socials} />

        <Section
          id="work"
          title="Selected work"
          action={
            <Link href="/projects" className="font-mono text-xs">
              All projects
            </Link>
          }
        >
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.data.slug} project={project.data} />
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <ExperienceTimeline history={history} />
          {/* Inside the section, not beside it—the quote is evidence for the
              timeline it follows, and it disappears entirely while it is a draft. */}
          {testimonial !== undefined && (
            <div className="mt-12">
              <Quote testimonial={testimonial} />
            </div>
          )}
        </Section>

        <Section id="skills" title="Skills">
          <Skills groups={skills} />
        </Section>

        <Section id="contact" title="Contact">
          <Contact site={site} socials={socials} />
        </Section>
      </main>

      <Footer name={site.name} socials={socials} />

      <script
        type="application/ld+json"
        // The value is generated above from validated content, never from user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
