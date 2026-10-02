import { workspaceObjects } from '@/data/workspaceObjects';
import { cn } from '@/utils/cn';

/**
 * Keyboard- and screen-reader-accessible list of workspace objects. Hovering or
 * focusing an item highlights the matching object in the 3D scene.
 */
export function ObjectDock({ selectedId, hoveredId, onSelect, onHover, onHoverEnd, className }) {
  return (
    <nav aria-label="Workspace objects" className={className}>
      <ol className="flex max-w-full [scrollbar-width:none] gap-1 overflow-x-auto rounded-2xl surface-glass p-1.5">
        {workspaceObjects.map((item) => {
          const isSelected = item.id === selectedId;
          const isHighlighted = isSelected || item.id === hoveredId;
          return (
            <li key={item.id} className="shrink-0">
              <button
                type="button"
                data-object-trigger={item.id}
                aria-controls={isSelected ? 'workspace-panel' : undefined}
                aria-expanded={isSelected}
                onClick={() => onSelect(item.id)}
                onPointerEnter={() => onHover(item.id)}
                onPointerLeave={() => onHoverEnd(item.id)}
                onFocus={() => onHover(item.id)}
                onBlur={() => onHoverEnd(item.id)}
                className={cn(
                  'flex flex-col items-start rounded-xl px-3 py-2 text-left transition-colors',
                  isHighlighted ? 'bg-white/[0.08]' : 'hover:bg-white/[0.05]',
                )}
              >
                <span className="flex items-baseline gap-2 text-sm whitespace-nowrap text-fg">
                  <span
                    className={cn(
                      'font-mono text-[0.6875rem]',
                      isSelected ? 'text-accent' : 'text-accent/80',
                    )}
                  >
                    {item.code}
                  </span>
                  {item.title}
                </span>
                <span className="font-mono text-[0.625rem] tracking-[0.14em] whitespace-nowrap text-fg-subtle uppercase">
                  {item.object}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
