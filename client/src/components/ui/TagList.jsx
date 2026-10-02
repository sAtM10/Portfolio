import { cn } from '@/utils/cn';

/**
 * Inline list of technology chips. Items are strings or { name, primary };
 * primary items get an accent marker plus screen-reader text.
 */
export function TagList({ items, label, className }) {
  if (!items?.length) return null;

  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-2', className)}>
      {items.map((item) => {
        const { name, primary } = typeof item === 'string' ? { name: item } : item;
        return (
          <li
            key={name}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[0.6875rem]',
              primary
                ? 'border-accent/30 bg-accent/[0.08] text-fg'
                : 'border-line bg-white/[0.02] text-fg-muted',
            )}
          >
            {primary && <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />}
            {name}
            {primary && <span className="sr-only"> (daily professional stack)</span>}
          </li>
        );
      })}
    </ul>
  );
}
