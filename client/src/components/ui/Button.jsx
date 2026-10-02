import { Link } from 'react-router';

import { cn } from '@/utils/cn';

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-lg font-mono uppercase tracking-[0.14em] transition-[color,background-color,border-color,box-shadow,translate] duration-200 ease-(--ease-cinematic) active:translate-y-px disabled:pointer-events-none disabled:opacity-50';

const variants = {
  primary:
    'bg-accent text-accent-ink hover:bg-accent-strong shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--color-accent)_70%,transparent)]',
  secondary:
    'border border-line-strong bg-white/[0.03] text-fg hover:border-fg-subtle/60 hover:bg-white/[0.07]',
  ghost: 'text-fg-muted hover:bg-white/[0.04] hover:text-fg',
};

const sizes = {
  sm: 'h-9 px-3.5 text-[0.6875rem]',
  md: 'h-11 px-5 text-xs',
  lg: 'h-12 px-6 text-xs',
};

/**
 * Renders a router <Link> when `to` is set, an <a> when `href` is set,
 * otherwise a <button>. External or `newTab` links open in a new tab and
 * announce that to screen readers.
 */
export function Button({
  to,
  href,
  newTab,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (to) {
    return (
      <Link to={to} viewTransition className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    const opensNewTab = newTab ?? /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(opensNewTab && { target: '_blank', rel: 'noopener noreferrer' })}
        {...props}
      >
        {children}
        {opensNewTab && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
