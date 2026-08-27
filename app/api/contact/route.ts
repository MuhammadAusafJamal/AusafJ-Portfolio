/**
 * `POST /api/contact`.
 *
 * Validates against `contactCreateSchema`—the same schema `ContactForm` checks
 * client-side, so the two can never quietly disagree. Rejects a filled
 * honeypot or a submission faster than `MIN_FORM_SECONDS`, then sends the
 * message with Resend.
 *
 * Deliberately not wired to Mongo: `lib/db` has no connection helper yet, and
 * persisting `contact_messages` plus IP-based rate limiting is a separate,
 * larger piece of infrastructure. The honeypot and the minimum-fill-time check
 * carry the spam defense on their own, and messages send today.
 */
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactCreateSchema, MIN_FORM_SECONDS } from '@ausaf/schema';
import { getSite } from '@/lib/content';

function errorResponse(status: number, code: string, message: string, requestId: string) {
  return NextResponse.json({ error: { code, message, requestId } }, { status });
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse(400, 'validation_error', 'Request body must be JSON.', requestId);
  }

  const parsed = contactCreateSchema.safeParse(body);

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Invalid submission.';
    return errorResponse(400, 'validation_error', message, requestId);
  }

  const { name, email, message, website, renderedAt } = parsed.data;

  // A filled honeypot fails silently from the caller's point of view—reporting
  // it plainly would tell a bot exactly what tripped.
  if (website !== undefined && website !== '') {
    return errorResponse(400, 'validation_error', 'Submission rejected.', requestId);
  }

  const elapsedSeconds = (Date.now() - new Date(renderedAt).getTime()) / 1000;

  // A real human can trip this too (autofill, fast typing), so the message
  // reads like an ordinary "try again"—no reason to teach a bot the rule.
  if (elapsedSeconds < MIN_FORM_SECONDS) {
    return errorResponse(
      400,
      'validation_error',
      'That was quick! Give it one more second and send again.',
      requestId
    );
  }

  const site = await getSite();
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey === undefined) {
    console.error(`[${requestId}] RESEND_API_KEY is not set—cannot send contact message`);
    return errorResponse(
      500,
      'internal_error',
      `That didn't quite make it through. Drop me a line directly at ${site.email} instead.`,
      requestId
    );
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

  const { error } = await resend.emails.send({
    from: `${site.name} <${from}>`,
    to: site.email,
    replyTo: email,
    subject: `New message from ${name}`,
    text: message,
  });

  if (error !== null && error !== undefined) {
    console.error(`[${requestId}] Resend send failed: ${error.message}`);
    return errorResponse(
      500,
      'internal_error',
      `That didn't quite make it through. Drop me a line directly at ${site.email} instead.`,
      requestId
    );
  }

  return NextResponse.json({ ok: true });
}
