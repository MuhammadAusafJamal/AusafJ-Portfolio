/**
 * The content API every page reads from.
 *
 * Each function returns validated data, already sorted the way it renders. A page
 * should never sort, filter drafts, or reach for `loadContent()` itself; if a new
 * view needs a different cut, it gets a function here.
 */
import { loadContent } from './load';
import type { Entry } from './load';
import type { Experience, Project, Testimonial } from '@ausaf/schema/types';

export type { Content, Entry } from './load';

export async function getSite() {
  return (await loadContent()).site;
}

export async function getSkills() {
  return (await loadContent()).skills;
}

export async function getSocials() {
  return (await loadContent()).socials;
}

export async function getUses() {
  return (await loadContent()).uses;
}

/**
 * `undefined` while the quote is a draft, which is the same contract every other
 * draft in this module has. The homepage renders nothing rather than rendering a
 * placeholder attributed to a real person.
 */
export async function getTestimonial(): Promise<Testimonial | undefined> {
  const { testimonial } = await loadContent();
  return testimonial.draft ? undefined : testimonial;
}

/** Drafts never leave this module. Nothing downstream has to remember to filter. */
const published = <T extends { draft: boolean }>(entries: Entry<T>[]) =>
  entries.filter((entry) => !entry.data.draft);

export async function getProjects(): Promise<Entry<Project>[]> {
  const { projects } = await loadContent();
  return published(projects).sort((a, b) => a.data.order - b.data.order);
}

export async function getFeaturedProjects(): Promise<Entry<Project>[]> {
  return (await getProjects()).filter((entry) => entry.data.featured);
}

export async function getProject(slug: string): Promise<Entry<Project> | undefined> {
  return (await getProjects()).find((entry) => entry.data.slug === slug);
}

/** Most recent first. `present` sorts above every finished role. */
export async function getExperience(): Promise<Entry<Experience>[]> {
  const { experience } = await loadContent();

  return [...experience].sort((a, b) => b.data.startDate.localeCompare(a.data.startDate));
}

export async function getFeaturedExperience(): Promise<Entry<Experience>[]> {
  return (await getExperience()).filter((entry) => entry.data.featured);
}

/** One company, and every role held there, most recent first. */
export type CompanyHistory = {
  company: string;
  companyUrl?: string;
  location: string;
  /** The span across all roles, so an intern-to-hire run reads as one continuous stint. */
  startDate: string;
  endDate: string;
  roles: Experience[];
};

/**
 * Groups roles by employer.
 *
 * Two entries at one company is a promotion, and listing them as separate rows
 * throws that away — the reader sees two short stints instead of one long one
 * that went somewhere. Grouping is the whole point of the timeline.
 */
export async function getCompanyHistory(): Promise<CompanyHistory[]> {
  const roles = await getFeaturedExperience();
  const byCompany = new Map<string, CompanyHistory>();

  for (const { data } of roles) {
    const existing = byCompany.get(data.company);

    if (existing === undefined) {
      byCompany.set(data.company, {
        company: data.company,
        companyUrl: data.companyUrl,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        roles: [data],
      });
      continue;
    }

    existing.roles.push(data);
    existing.startDate = min(existing.startDate, data.startDate);
    existing.endDate = maxEnd(existing.endDate, data.endDate);
    existing.companyUrl ??= data.companyUrl;
  }

  const history = [...byCompany.values()];

  for (const company of history) {
    company.roles.sort((a, b) => b.startDate.localeCompare(a.startDate));
  }

  return history.sort((a, b) => b.startDate.localeCompare(a.startDate));
}

const min = (a: string, b: string) => (a <= b ? a : b);

/** `present` outranks any date, since an ongoing role ends later than a finished one. */
const maxEnd = (a: string, b: string) => {
  if (a === 'present' || b === 'present') return 'present';
  return a >= b ? a : b;
};

export async function getPosts() {
  const { posts } = await loadContent();

  return published(posts).sort((a, b) => b.data.date.localeCompare(a.data.date));
}
