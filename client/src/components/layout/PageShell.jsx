import { cn } from '@/utils/cn';

import { SiteHeader } from './SiteHeader';

/**
 * Standard page frame: header, a focusable <main> (target of the skip link)
 * and an optional footer slot.
 */
export function PageShell({ title, mainClassName, footer, children }) {
  return (
    <div className="flex min-h-dvh flex-col">
      {title && <title>{title}</title>}
      <SiteHeader />
      <main id="main" tabIndex={-1} className={cn('flex-1 outline-none', mainClassName)}>
        {children}
      </main>
      {footer}
    </div>
  );
}
