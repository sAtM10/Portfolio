import { Box, Layers, LogOut } from 'lucide-react';
import { Link } from 'react-router';

import { LogoMark } from '@/components/icons/LogoMark';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import { cn } from '@/utils/cn';

/** Top bar over the workspace: identity, view toggle, plain-portfolio and exit links. */
export function WorkspaceHud({ is3D, canToggleView, onToggleView, panelOpen }) {
  return (
    <header
      className={cn(
        'pointer-events-none fixed inset-x-0 top-0 z-20 flex items-start justify-between gap-4 p-4 md:p-6',
        // Keep the actions clear of the side panel on wide screens.
        panelOpen && 'md:pr-[calc(min(32rem,100vw-2rem)+2.5rem)]',
      )}
    >
      <Link to="/" className="group pointer-events-auto flex items-center gap-3 rounded-lg">
        <LogoMark className="size-8" />
        <span className="hidden font-mono text-[0.6875rem] tracking-[0.16em] uppercase sm:block">
          <span className="block text-fg-muted transition-colors group-hover:text-fg">
            {profile.name}
          </span>
          <span className="block text-fg-subtle">Digital workspace</span>
        </span>
        <span className="sr-only"> — back to start</span>
      </Link>

      <div className="pointer-events-auto flex flex-wrap justify-end gap-2">
        {canToggleView && (
          <Button variant="secondary" size="sm" onClick={onToggleView} aria-pressed={!is3D}>
            {is3D ? (
              <Layers aria-hidden="true" className="size-3.5" />
            ) : (
              <Box aria-hidden="true" className="size-3.5" />
            )}
            {is3D ? '2D view' : '3D view'}
          </Button>
        )}
        <Button to="/portfolio" variant="secondary" size="sm">
          Plain portfolio
        </Button>
        <Button to="/" variant="ghost" size="sm">
          <LogOut aria-hidden="true" className="size-3.5" />
          Exit
        </Button>
      </div>
    </header>
  );
}
