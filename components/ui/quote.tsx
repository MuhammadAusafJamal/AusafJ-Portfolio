/**
 * A quote from someone who managed the work.
 *
 * It sits under the experience timeline rather than in a section of its own,
 * because that is what it is: corroboration for the dates and the bullets
 * directly above it. Given a heading and a slot of its own it would read as an
 * advertisement, and one line of praise cannot carry a whole section anyway.
 *
 * No portrait, no quotation-mark glyph, no card. A hairline and a name are enough
 * for a reader to see where the sentence stops being mine.
 */
import type { Testimonial } from '@ausaf/schema/types';

export function Quote({ testimonial }: { testimonial: Testimonial }) {
  const { quote, name, role, company, relationship, url } = testimonial;

  return (
    <figure className="border-l border-border-strong pl-6">
      <blockquote className="text-lg text-muted">“{quote}”</blockquote>

      <figcaption className="mt-4 font-mono text-xs text-muted">
        <span className="text-text">
          {url === undefined ? (
            name
          ) : (
            <a href={url} target="_blank" rel="noreferrer" className="no-underline hover:underline">
              {name}
            </a>
          )}
        </span>
        {` · ${role}, ${company}`}
        {/* The relationship is the load-bearing half of the attribution: a line
            from a manager and the same line from a peer are not worth the same. */}
        <span className="mt-1 block">{relationship}</span>
      </figcaption>
    </figure>
  );
}
