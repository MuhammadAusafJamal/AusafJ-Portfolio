/**
 * Request and response shapes for the API routes.
 *
 * These are parsed at the network boundary before anything reaches Mongo, so a
 * route handler never sees an unnarrowed body. The same schemas are what the
 * command palette parses responses against, which is why the response shapes are
 * declared here rather than inferred from whatever a handler happens to return.
 */
import { z } from 'zod';
import { emailSchema, nonEmptyString, slugSchema } from './primitives';

/* ------------------------------------------------------------ error envelope */

/**
 * One envelope for every failure: `{ error: { code, message, requestId } }`.
 * `requestId` is echoed from the structured log line, so a user reporting a broken
 * page hands you the exact log entry. A stack trace never crosses this boundary.
 */
export const errorCodeSchema = z.enum([
  'validation_error',
  'unauthenticated',
  'forbidden',
  'not_found',
  'rate_limited',
  'internal_error',
]);

export const apiErrorSchema = z.strictObject({
  error: z.strictObject({
    code: errorCodeSchema,
    message: nonEmptyString,
    requestId: nonEmptyString,
  }),
});

/* -------------------------------------------------------------------- /views */

export const viewsParamsSchema = z.strictObject({ slug: slugSchema });

export const viewsResponseSchema = z.strictObject({
  slug: slugSchema,
  count: z.int().nonnegative(),
});

/* ---------------------------------------------------------------- /guestbook */

export const GUESTBOOK_MESSAGE_MAX = 280;

export const guestbookCreateSchema = z.strictObject({
  message: nonEmptyString.max(GUESTBOOK_MESSAGE_MAX),
});

export const guestbookListQuerySchema = z.strictObject({
  /** Opaque cursor—the `_id` of the last row of the previous page. */
  cursor: z
    .string()
    .regex(/^[a-f0-9]{24}$/, { error: 'must be a 24-character hex id' })
    .optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

/**
 * The public projection. `providerUserId` is stored but never serialised—it is
 * an identifier for a third-party account and has no business in a page payload.
 */
export const guestbookEntrySchema = z.strictObject({
  id: z.string(),
  handle: nonEmptyString.max(60),
  avatarUrl: z.url(),
  message: nonEmptyString.max(GUESTBOOK_MESSAGE_MAX),
  createdAt: z.iso.datetime(),
});

export const guestbookListResponseSchema = z.strictObject({
  entries: z.array(guestbookEntrySchema),
  nextCursor: z.string().nullable(),
});

/* ------------------------------------------------------------------ /contact */

/** A submission faster than this is a bot. Paired with the honeypot below. */
export const MIN_FORM_SECONDS = 3;

export const contactCreateSchema = z.strictObject({
  name: nonEmptyString.max(80),
  email: emailSchema,
  message: nonEmptyString.max(2000),
  /**
   * Honeypot. Hidden from sighted users and from screen readers, so a human always
   * leaves it empty and a form-filling bot does not. Named plausibly on purpose.
   */
  website: z.literal('').optional(),
  /** When the form was rendered. The handler rejects anything under MIN_FORM_SECONDS. */
  renderedAt: z.iso.datetime(),
});

/* ------------------------------------------------------------------- /health */

/**
 * What the `status` command prints. `dbLatencyMs` is a real round-trip to Atlas—
 * that number is the point of the command, so it is required, and a failed ping
 * reports `status: "degraded"` rather than omitting the field.
 */
export const healthResponseSchema = z.strictObject({
  status: z.enum(['ok', 'degraded']),
  dbLatencyMs: z.int().nonnegative().nullable(),
  region: z.string().nullable(),
  timestamp: z.iso.datetime(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;
export type ErrorCode = z.infer<typeof errorCodeSchema>;
export type ViewsResponse = z.infer<typeof viewsResponseSchema>;
export type GuestbookCreate = z.infer<typeof guestbookCreateSchema>;
export type GuestbookEntry = z.infer<typeof guestbookEntrySchema>;
export type GuestbookListQuery = z.infer<typeof guestbookListQuerySchema>;
export type GuestbookListResponse = z.infer<typeof guestbookListResponseSchema>;
export type ContactCreate = z.infer<typeof contactCreateSchema>;
export type HealthResponse = z.infer<typeof healthResponseSchema>;
