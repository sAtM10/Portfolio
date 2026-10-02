import { cn } from '@/utils/cn';

import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';

/**
 * Titled page section. `scroll-mt` keeps anchored headings clear of the sticky nav.
 * Header and content fade up once as they scroll into view.
 * Extra props (e.g. `data-source`) are forwarded to the <section>.
 */
export function Section({ id, code, title, intro, className, children, ...props }) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        'scroll-mt-16 border-t border-line py-16 first:border-t-0 sm:py-20 lg:scroll-mt-6',
        className,
      )}
      {...props}
    >
      <Reveal as="header" className="mb-10 max-w-2xl">
        <Eyebrow>{code}</Eyebrow>
        <h2 id={headingId} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {intro && <p className="mt-4 text-fg-muted">{intro}</p>}
      </Reveal>
      {/* Container-query root: content components size themselves to this width. */}
      <Reveal delay={100} className="@container">
        {children}
      </Reveal>
    </section>
  );
}
