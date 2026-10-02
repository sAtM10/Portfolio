import { CircleAlert } from 'lucide-react';
import { useId } from 'react';

import { cn } from '@/utils/cn';

const controlClass =
  'mt-2 block w-full rounded-lg border bg-black/25 px-3.5 py-2.5 text-[0.9375rem] text-fg transition-colors placeholder:text-fg-subtle focus:border-accent/70 disabled:opacity-60';

/** Labelled input/textarea with hint and error wired up via aria-describedby. */
export function TextField({ label, error, hint, optional, multiline, className, ...props }) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;
  const Control = multiline ? 'textarea' : 'input';

  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm text-fg">
        {label}
        {optional && (
          <span className="font-mono text-[0.625rem] tracking-[0.14em] text-fg-subtle uppercase">
            Optional
          </span>
        )}
      </label>
      <Control
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          controlClass,
          error ? 'border-danger/70' : 'border-line-strong',
          multiline && 'min-h-36 resize-y',
        )}
        {...props}
      />
      <div className="mt-1.5 flex justify-between gap-4 text-sm">
        {error ? (
          <p id={errorId} className="flex items-start gap-1.5 text-danger">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
            {error}
          </p>
        ) : (
          <span />
        )}
        {hint && (
          <p id={hintId} className="shrink-0 font-mono text-xs text-fg-subtle">
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}
