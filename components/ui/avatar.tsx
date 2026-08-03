/**
 * Avatar.
 *
 * The source image is already masked to a circle with transparent corners, so the
 * dark backdrop inside it stays part of the photo on either theme rather than
 * fighting the page background. The ring is what stops it reading as a floating
 * head on the dark theme.
 *
 * `width` and `height` are twice the rendered size and `sizes` is deliberately
 * absent: that combination is what makes `next/image` emit a 1x/2x srcset, and it
 * is why the face stays sharp on a retina display. Passing `sizes="160px"` here
 * would pin every device to the 160px candidate and a 2x screen would upscale it.
 *
 * `priority` because it sits above the fold, and explicit dimensions because a
 * face that reflows on load is the most visible layout shift a page can have.
 */
import Image from 'next/image';

/** Rendered at 160px (`--spacing-avatar`), decoded at 320 so 2x screens have pixels. */
const SOURCE_PX = 320;

export function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={SOURCE_PX}
      height={SOURCE_PX}
      priority
      quality={90}
      className="size-avatar rounded-full ring-1 ring-border"
    />
  );
}
