/**
 * Skills, grouped.
 *
 * No bars, no percentages, no star ratings. A self-assigned 80% is a number nobody
 * can check, and putting one on the page invites the reader to discount every
 * other number on it.
 */
import type { SkillGroup } from '@ausaf/schema/types';
import { TagList } from '@/components/ui/tag';

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <dl className="flex flex-col gap-8">
      {groups.map((group) => (
        <div key={group.group} className="flex flex-col gap-3 sm:flex-row sm:gap-8">
          <dt className="shrink-0 font-mono text-xs text-muted sm:w-28 sm:pt-1">{group.group}</dt>
          <dd className="min-w-0">
            <TagList items={group.items.map((item) => item.name)} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
