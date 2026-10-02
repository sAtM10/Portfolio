import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/utils/cn';

/** Imperative style write for the sliding highlight; kept outside the component. */
function placeIndicator(indicator, target) {
  indicator.style.transform = `translate(${target.offsetLeft}px, ${target.offsetTop}px)`;
  indicator.style.width = `${target.offsetWidth}px`;
  indicator.style.height = `${target.offsetHeight}px`;
}

/**
 * In-page navigation: a sticky, horizontally scrollable bar on small screens and a
 * sticky vertical rail on large screens. Highlights the section currently in view with
 * one indicator that glides between items (CSS transition, no animation library).
 */
export function SectionNav({ sections }) {
  const ids = useMemo(() => sections.map((section) => section.id), [sections]);
  const activeId = useActiveSection(ids);
  const listRef = useRef(null);
  const indicatorRef = useRef(null);

  // Move the indicator under the active link, and keep it there when the layout resizes.
  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    const active = list?.querySelector('[aria-current]');
    if (!list || !indicator || !active) return undefined;

    const place = () => placeIndicator(indicator, active);
    place();
    // Enable the transition only after the first placement, so it never slides in from 0,0.
    const frame = requestAnimationFrame(() => indicator.setAttribute('data-ready', ''));
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [activeId]);

  // Keep the active chip visible in the horizontal bar without moving the page.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector('[aria-current]');
    if (!list || !item || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: item.offsetLeft - list.clientWidth / 2 + item.offsetWidth / 2,
      behavior: 'smooth',
    });
  }, [activeId]);

  return (
    <div className="sticky top-0 z-20 -mx-5 border-b border-line bg-canvas/85 px-5 backdrop-blur-md sm:-mx-8 sm:px-8 lg:mx-0 lg:self-start lg:border-b-0 lg:bg-transparent lg:px-0 lg:pt-20 lg:backdrop-blur-none">
      <nav aria-label="Sections">
        <ol
          ref={listRef}
          className="relative flex [scrollbar-width:none] gap-1 overflow-x-auto py-3 lg:flex-col lg:overflow-visible lg:py-0"
        >
          <span
            ref={indicatorRef}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 rounded-lg bg-white/[0.06] data-ready:transition-[transform,width,height] data-ready:duration-300 data-ready:ease-(--ease-cinematic)"
          />
          {sections.map(({ id, code, label }) => {
            const isActive = id === activeId;
            return (
              <li key={id} className="shrink-0">
                <a
                  href={`#${id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'relative flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition-colors',
                    isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
                  )}
                >
                  <span
                    className={cn(
                      'font-mono text-[0.6875rem] transition-colors',
                      isActive ? 'text-accent' : 'text-fg-subtle',
                    )}
                  >
                    {code}
                  </span>
                  {label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
