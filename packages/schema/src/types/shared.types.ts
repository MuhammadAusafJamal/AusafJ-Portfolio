/**
 * The package's cross-module vocabulary.
 *
 * Each type is inferred beside the schema it comes from and re-exported here, so
 * a consumer importing `@ausaf/schema/types` gets the whole domain without pulling
 * Zod into its bundle. Nothing in this file is hand-written; a hand-written type
 * drifts from its validator the first time a field changes, and then the two
 * disagree in exactly the place you were trusting them.
 */
export type {
  ApiError,
  ContactCreate,
  ErrorCode,
  GuestbookCreate,
  GuestbookEntry,
  GuestbookListQuery,
  GuestbookListResponse,
  HealthResponse,
  ViewsResponse,
} from '../api';
export type { ContentBundle } from '../bundle';
export type {
  Availability,
  Site,
  Skill,
  SkillGroup,
  SkillLevel,
  Social,
  Testimonial,
  UsesCategory,
  UsesItem,
} from '../data';
export type { EmploymentType, Experience } from '../experience';
export type { Post, PostFrontmatter } from '../post';
export type { Metric, Project, ProjectCategory, ProjectStatus } from '../project';

/** The three content types that live as MDX, used to resolve a slug across all of them. */
export type ContentType = 'project' | 'experience' | 'post';
