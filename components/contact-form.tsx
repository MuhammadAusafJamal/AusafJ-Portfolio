'use client';

/**
 * The contact form.
 *
 * One of the three client components the performance budget permits—see the
 * same comment on `theme-toggle.tsx`. Everything it validates is validated
 * again server-side against the same schema (`contactCreateSchema`); this copy
 * only exists to fail fast without a round trip.
 *
 * Two anti-spam checks travel with every submission: `website` is a honeypot
 * input hidden from sighted users and screen readers alike, so a human always
 * leaves it empty and a form-filling bot does not; `renderedAt` is the moment
 * this component mounted, and the API rejects anything submitted faster than
 * `MIN_FORM_SECONDS` after it. Neither needs a database or a rate limiter to
 * work.
 */
import { useEffect, useRef, useState } from 'react';
import { contactCreateSchema } from '@ausaf/schema';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const renderedAt = useRef<string>(new Date().toISOString());

  // Recorded once, at first mount—resetting it on every render would defeat
  // the minimum-fill-time check it exists to support.
  useEffect(() => {
    renderedAt.current = new Date().toISOString();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // React nulls a SyntheticEvent's currentTarget once the synchronous part
    // of the handler returns, so it can't be read after the `await` below—
    // capture the element itself now, not just its FormData.
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      message: String(form.get('message') ?? ''),
      website: String(form.get('website') ?? ''),
      renderedAt: renderedAt.current,
    };

    const parsed = contactCreateSchema.safeParse(payload);

    if (!parsed.success) {
      // The schema's own messages ("must not be empty") are written for
      // content-authoring errors in CLI output, not a visitor filling out a
      // form—swap in copy for this form's own three fields instead.
      const field = parsed.error.issues[0]?.path[0];
      const message =
        field === 'email'
          ? "That email doesn't look quite right. Mind double-checking it?"
          : field === 'message'
            ? "Didn't catch a message there. What's on your mind?"
            : 'Looks like your name got left blank. Who am I talking to?';
      setStatus('error');
      setErrorMessage(message);
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const body = (await response.json()) as { error?: { message?: string } };
        setStatus('error');
        setErrorMessage(
          body.error?.message ?? "That didn't quite make it through. Try email instead."
        );
        return;
      }

      setStatus('success');
      formElement.reset();
    } catch {
      setStatus('error');
      setErrorMessage("That didn't quite make it through. Try email instead.");
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-3 rounded-card border border-border bg-surface p-6">
        <p className="text-sm text-muted">
          Got it. Thanks for reaching out! I&apos;ll reply from the email above.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="w-fit font-mono text-xs text-muted no-underline hover:text-text hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-mono text-xs text-subtle">
            {'// your name'}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={80}
            placeholder="Jane Recruiter"
            className="rounded-tag border border-border bg-surface px-3 py-2 text-sm transition-colors duration-micro ease-standard focus-visible:border-border-strong"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-mono text-xs text-subtle">
            {'// your email'}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className="rounded-tag border border-border bg-surface px-3 py-2 text-sm transition-colors duration-micro ease-standard focus-visible:border-border-strong"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-mono text-xs text-subtle">
          {'// your message'}
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={2000}
          rows={5}
          placeholder="What are you hiring for, or what are you building? I'm listening."
          className="resize-none rounded-tag border border-border bg-surface px-3 py-2 text-sm transition-colors duration-micro ease-standard focus-visible:border-border-strong"
        />
      </div>

      {/* Honeypot. `tabIndex={-1}` and `aria-hidden` keep it out of tab order and
          off screen readers, and it sits off-screen rather than `display:none`
          so a bot that skips hidden fields still fills it in. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-fit rounded-card bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors duration-micro ease-standard hover:bg-accent-hover disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>

      {status === 'error' && <p className="text-sm text-danger">{errorMessage}</p>}
    </form>
  );
}
