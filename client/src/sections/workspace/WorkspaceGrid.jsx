import {
  Archive,
  Gamepad2,
  Laptop,
  Monitor,
  Server,
  Smartphone,
  SquareTerminal,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { workspaceObjects } from '@/data/workspaceObjects';
import { cn } from '@/utils/cn';

const ICONS = {
  laptop: Laptop,
  monitor: Monitor,
  rack: Server,
  cabinet: Archive,
  terminal: SquareTerminal,
  phone: Smartphone,
  shelf: Gamepad2,
};

/** 2D workspace: the same objects as cards, for small screens, no WebGL or by choice. */
export function WorkspaceGrid({ reason, selectedId, onSelect }) {
  return (
    <div className="h-full overflow-y-auto pt-24 pb-10">
      <Container size="narrow">
        <Eyebrow>Digital workspace · 2D</Eyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">Pick an object on the desk</h2>
        {reason && <p className="mt-3 text-sm text-fg-muted">{reason}</p>}

        <nav aria-label="Workspace objects" className="mt-8">
          <ul className="grid gap-3 sm:grid-cols-2">
            {workspaceObjects.map((item) => {
              const Icon = ICONS[item.id];
              const isSelected = item.id === selectedId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    data-object-trigger={item.id}
                    aria-controls={isSelected ? 'workspace-panel' : undefined}
                    aria-expanded={isSelected}
                    onClick={() => onSelect(item.id)}
                    className={cn(
                      'flex w-full items-center gap-4 rounded-2xl surface-glass p-4 text-left transition-colors',
                      isSelected ? 'border-accent/50' : 'hover:border-line-strong',
                    )}
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-accent">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-baseline gap-2 text-fg">
                        <span className="font-mono text-[0.6875rem] text-accent">{item.code}</span>
                        {item.panelTitle ?? item.title}
                      </span>
                      <span className="block font-mono text-[0.625rem] tracking-[0.14em] text-fg-subtle uppercase">
                        {item.object}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </div>
  );
}
