/**
 * Education and certifications.
 *
 * These were hardcoded in `app/resume/page.tsx` with a comment explaining that a
 * list appearing in exactly one place doesn't earn a content schema and a JSON
 * file. That reasoning held until `/about` needed the same list. Two copies of a
 * date is how a credential ends up saying Aug 2026 on one page and Sep 2026 on
 * the other, so it lives here instead—one module, no schema, no new content file.
 *
 * Kept in step with the CV, which is the list that gets read first. The hackathon
 * certificate and the Kaggle course came off both in Sep 2026: a course completion
 * is not a credential, and neither survives the question "what did you build with
 * it".
 *
 * Order is reverse-chronological, the same as everything else on the site.
 */

export type Credential = {
  name: string;
  issuer: string;
  /** Display string, not an ISO date—these render verbatim and never sort. */
  date: string;
  /** Issuer's site, for the `url` on the JSON-LD credential. Optional: not every issuer has one worth linking. */
  issuerUrl?: string;
};

export type Education = {
  qualification: string;
  institution: string;
  location: string;
  start: string;
  end: string;
};

export const CERTIFICATIONS: readonly Credential[] = [
  {
    name: 'JavaScript (Intermediate) Certification',
    issuer: 'HackerRank',
    date: 'Aug 2026',
    issuerUrl: 'https://www.hackerrank.com',
  },
  {
    name: 'Claude 101',
    issuer: 'Anthropic',
    date: 'Aug 2026',
    issuerUrl: 'https://www.anthropic.com',
  },
  {
    name: 'Claude Code in Action',
    issuer: 'Anthropic',
    date: 'Apr 2026',
    issuerUrl: 'https://www.anthropic.com',
  },
  {
    name: 'Certified Web & Mobile Application Developer',
    issuer: 'S.M.I.T',
    date: 'Nov 2023',
  },
];

export const EDUCATION: readonly Education[] = [
  {
    qualification: 'B.S. Computer Science',
    institution: 'University of Karachi',
    location: 'Karachi, Pakistan',
    start: 'Feb 2022',
    end: 'Dec 2025',
  },
  {
    qualification: 'Intermediate, Pre-Engineering',
    institution: 'Govt. DJ Science College',
    location: 'Karachi, Pakistan',
    start: 'Sep 2019',
    end: 'Aug 2021',
  },
];
