import { ArrowUpRight } from 'lucide-react';
import { NavLink } from 'react-router';

import { primaryNav } from '@/data/navigation';
import { trackEvent } from '@/services/analytics';
import { cn } from '@/utils/cn';

const itemClass = (isActive) =>
  cn(
    'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors',
    isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
  );

/** Primary navigation links, shared by the desktop bar and the mobile menu. */
export function NavItems({ className, onNavigate }) {
  return (
    <ul className={className}>
      {primaryNav.map((item) => (
        <li key={item.label}>
          {item.to ? (
            <NavLink
              viewTransition
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) => itemClass(isActive)}
            >
              {item.label}
            </NavLink>
          ) : (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (item.event) trackEvent(item.event, { source: 'nav' });
                onNavigate?.();
              }}
              className={itemClass(false)}
            >
              {item.label}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
