/**
 * Boundary tests.
 *
 * These are the schemas a hostile request hits first, so most of the assertions
 * below are about what gets rejected.
 */
import { describe, expect, it } from 'vitest';
import {
  GUESTBOOK_MESSAGE_MAX,
  apiErrorSchema,
  contactCreateSchema,
  guestbookCreateSchema,
  guestbookListQuerySchema,
} from '../src/api';

const contact = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Saw the command palette. Are you open to a chat?',
  renderedAt: '2026-08-02T10:00:00.000Z',
};

describe('guestbookCreateSchema', () => {
  it('rejects a message over the limit', () => {
    expect(
      guestbookCreateSchema.safeParse({ message: 'x'.repeat(GUESTBOOK_MESSAGE_MAX + 1) }).success
    ).toBe(false);
  });

  it('rejects whitespace-only input', () => {
    expect(guestbookCreateSchema.safeParse({ message: '   ' }).success).toBe(false);
  });

  it('rejects extra fields—a client cannot set its own handle', () => {
    expect(guestbookCreateSchema.safeParse({ message: 'hello', handle: 'admin' }).success).toBe(
      false
    );
  });
});

describe('guestbookListQuerySchema', () => {
  it('defaults the page size', () => {
    expect(guestbookListQuerySchema.parse({}).limit).toBe(20);
  });

  it('coerces a limit that arrived as a query string', () => {
    expect(guestbookListQuerySchema.parse({ limit: '5' }).limit).toBe(5);
  });

  it('caps the page size', () => {
    expect(guestbookListQuerySchema.safeParse({ limit: '5000' }).success).toBe(false);
  });

  it('rejects a cursor that is not an object id', () => {
    expect(guestbookListQuerySchema.safeParse({ cursor: 'not-an-id' }).success).toBe(false);
  });
});

describe('contactCreateSchema', () => {
  it('accepts a real submission', () => {
    expect(contactCreateSchema.safeParse(contact).success).toBe(true);
  });

  it('rejects a filled honeypot', () => {
    expect(
      contactCreateSchema.safeParse({ ...contact, website: 'https://spam.example' }).success
    ).toBe(false);
  });

  it('accepts an empty honeypot', () => {
    expect(contactCreateSchema.safeParse({ ...contact, website: '' }).success).toBe(true);
  });

  it('rejects a bad email', () => {
    expect(contactCreateSchema.safeParse({ ...contact, email: 'ada@' }).success).toBe(false);
  });

  it('requires renderedAt, so the time-on-form check cannot be skipped', () => {
    const { renderedAt: _omitted, ...withoutTimestamp } = contact;

    expect(contactCreateSchema.safeParse(withoutTimestamp).success).toBe(false);
  });
});

describe('apiErrorSchema', () => {
  it('accepts the envelope every route returns', () => {
    const parsed = apiErrorSchema.safeParse({
      error: { code: 'rate_limited', message: 'Too many requests.', requestId: 'req_01H' },
    });

    expect(parsed.success).toBe(true);
  });

  it('rejects an unknown code', () => {
    expect(
      apiErrorSchema.safeParse({ error: { code: 'kaboom', message: 'x', requestId: 'y' } }).success
    ).toBe(false);
  });
});
