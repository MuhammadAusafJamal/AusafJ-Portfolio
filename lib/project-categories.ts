/**
 * Labels for the `/projects` filter taxonomy.
 *
 * One map, two consumers: the filter tiles/pills on `/projects` and the kicker
 * line `ProjectCard` shows on every card. Keeping the label text here instead
 * of duplicating it in both places is what stops them drifting apart.
 */
import type { ProjectCategory } from '@ausaf/schema/types';

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  mobile: 'Mobile',
  web: 'Web',
  'ai-first': 'AI-First',
  creative: 'Creative',
};
