import { cn } from '@/utils/cn';

/** Small mono label used above headings, e.g. "— SOFTWARE DEVELOPMENT ENGINEER". */
export function Eyebrow({ as: Tag = 'p', className, children }) {
  return (
    <Tag
      className={cn(
        'flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-accent uppercase',
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
      {children}
    </Tag>
  );
}
