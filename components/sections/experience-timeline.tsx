/**
 * Experience, grouped by employer.
 *
 * A company is one entry on the rule, and every role held there hangs off it. Two
 * roles at Technyx listed as separate rows would read as two short stints; nested
 * under one company they read as what they were, an internship that turned into
 * the job.
 *
 * Dates are a range rather than a duration. A duration invites the reader to do
 * arithmetic about seniority; a range just states the fact.
 */
import type { CompanyHistory } from '@/lib/content';
import { TagList } from '@/components/ui/tag';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** `2024-08-01` becomes `Aug 2024`. Parsed by hand so no timezone can shift the month. */
function formatDate(value: string): string {
  if (value === 'present') return 'Present';

  const [year, month] = value.split('-');
  const name = MONTHS[Number(month) - 1];

  return name === undefined ? value : `${name} ${year}`;
}

const range = (start: string, end: string) => `${formatDate(start)}—${formatDate(end)}`;

export function ExperienceTimeline({ history }: { history: CompanyHistory[] }) {
  return (
    <ol className="flex flex-col gap-16">
      {history.map((company) => (
        <li key={company.company}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold">
              {company.companyUrl === undefined ? (
                company.company
              ) : (
                <a href={company.companyUrl} target="_blank" rel="noreferrer">
                  {company.company}
                </a>
              )}
            </h3>
            <p className="font-mono text-xs text-subtle">
              {company.location} · {range(company.startDate, company.endDate)}
            </p>
          </div>

          {/* The rule and the dots are the timeline. One border, one marker per role,
              no library and nothing that animates on scroll. */}
          <ol className="mt-6 flex flex-col gap-8 border-l border-border">
            {company.roles.map((role) => (
              <li key={role.slug} className="relative pl-6">
                {/* 8px dot pulled 4px left sits centred on the rule without an
                    arbitrary offset — both values are on the spacing scale. */}
                <span
                  aria-hidden
                  className="absolute top-2 -left-1 size-2 rounded-full bg-border-strong"
                />

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-medium">{role.role}</h4>
                  <p className="font-mono text-xs text-subtle">
                    {range(role.startDate, role.endDate)}
                  </p>
                </div>

                <ul className="mt-3 flex flex-col gap-2 text-muted">
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <div className="mt-4">
                  <TagList items={role.stack} />
                </div>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
