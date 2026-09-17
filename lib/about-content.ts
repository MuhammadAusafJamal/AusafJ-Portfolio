/**
 * The prose on `/about` that isn't derived from `content/`.
 *
 * Two reasons it lives here rather than inline in the page. The FAQ answers are
 * rendered twice—once as visible text, once inside `FAQPage` markup—and a
 * question whose visible answer and marked-up answer disagree is worse than no
 * markup at all. And the specialization notes are keyed to `skills.json` group
 * names, so keeping them next to each other makes a renamed group obvious.
 *
 * A note is optional. A group with nothing worth saying renders its tags alone
 * rather than getting a sentence written to fill the slot.
 */

/** Keyed by `group` in `content/data/skills.json`. Unmatched keys render nothing. */
export const SKILL_GROUP_NOTES: Record<string, string> = {
  Languages:
    'TypeScript wherever it is allowed. C# arrived with the .NET work in 2026 and I write it daily now.',
  Frontend:
    'Where most of my production work has been. React and Next.js on live client platforms, with Redux only where state genuinely earns it. The React 16 migration onto Next.js is the piece I would point at first.',
  Mobile:
    'React Native clients built against the same API contracts the web platforms use, so the two do not drift apart.',
  Backend:
    'Two stacks, both in production. Node and Express over MongoDB is where I started; ASP.NET Core with Umbraco over SQL Server came later, with the government contracts in mid-2026.',
  Data: 'Relational schemas in SQL Server, document schemas in MongoDB. The PostgreSQL and PL/pgSQL come from a university distributed-database project, where the partitioning logic lives in the database instead of the application.',
  Tooling:
    'Azure App Service, Blob Storage and CDN in production, with pipelines on Azure DevOps and GitHub Actions. Vitest on this site, Jest on client work.',
};

export type Faq = { question: string; answer: string };

/**
 * Questions phrased the way a visitor would ask them, answered in the first
 * person the rest of the site uses.
 *
 * Third-person answers extract more cleanly in the abstract, but a page that
 * refers to its own author as "he" reads as written by someone else, and the
 * `Person` graph already tells a crawler whose page this is. Specificity is what
 * makes an answer quotable—naming the stack, the dates, and the numbers—not
 * grammatical person.
 */
export const FAQS: readonly Faq[] = [
  {
    question: 'What do you actually build?',
    answer:
      'Government digital platforms, end to end. That means the content model and the API on the server, and the React, Next.js or React Native client that consumes it. Three of the case studies on this site are public-sector work delivered through Technyx Systems.',
  },
  {
    question: "What's your backend stack?",
    answer:
      'Two of them. Node.js with Express over MongoDB, and ASP.NET Core with Umbraco as a headless CMS over Microsoft SQL Server. The Node side came first; the .NET side arrived with the government contracts in mid-2026 and I learned it against a live platform.',
  },
  {
    question: 'Do you have real .NET and Umbraco experience?',
    answer:
      'Yes. I have designed 10+ custom Umbraco document types and the REST API controllers that serve them, modelled the SQL Server schemas underneath, and deployed the result to Azure App Service with Blob Storage and CDN. Two government platforms run on it.',
  },
  {
    question: 'How long have you been working?',
    answer:
      'Since July 2024 at Technyx Systems, starting as an intern and moving to full time in January 2025. Before that, three months on the server side at Square Tech in 2024. I finished a B.S. in Computer Science at the University of Karachi in December 2025.',
  },
  {
    question: 'Are you open to remote work?',
    answer:
      'Yes, remote or in Karachi. I am open to software engineering roles now, and the fastest way to start a conversation is email.',
  },
];
