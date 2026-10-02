import { Menu, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

import { NavItems } from './NavItems';
import { SocialLinks } from './SocialLinks';

/** Disclosure-style menu (not a modal): Escape or an outside click closes it. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event) => {
      if (!panelRef.current?.contains(event.target) && !buttonRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  const Icon = open ? X : Menu;

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="grid size-10 place-items-center rounded-lg border border-line text-fg-muted transition-colors hover:text-fg"
      >
        <Icon aria-hidden="true" className="size-5" />
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      </button>

      <nav
        ref={panelRef}
        id={panelId}
        aria-label="Primary"
        hidden={!open}
        className="absolute inset-x-4 top-[calc(100%+0.25rem)] z-30 animate-fade-in rounded-2xl surface-glass p-2"
      >
        <NavItems className="flex flex-col" onNavigate={() => setOpen(false)} />
        <div className="mt-2 border-t border-line px-2 pt-2">
          <SocialLinks />
        </div>
      </nav>
    </div>
  );
}
