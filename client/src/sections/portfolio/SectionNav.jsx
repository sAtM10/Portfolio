import { useEffect, useMemo, useRef } from 'react';

import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/utils/cn';

/**
 * In-page navigation: a sticky, horizontally scrollable bar on small screens and a
 * sticky vertical rail on large screens. Highlights the section currently in view.
 */
export function SectionNav({ sections }) {
  const ids = useMemo(() => sections.map((section) => section.id), [sections]);
  const activeId = useActiveSection(ids);
  const listRef = useRef(null);

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
          {sections.map(({ id, code, label }) => {
            const isActive = id === activeId;
            return (
              <li key={id} className="shrink-0">
                <a
                  href={`#${id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition-colors',
                    isActive ? 'bg-white/[0.06] text-fg' : 'text-fg-muted hover:text-fg',
                  )}
                >
                  <span
                    className={cn(
                      'font-mono text-[0.6875rem]',
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
