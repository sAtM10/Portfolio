import { workspaceObjects } from '@/data/workspaceObjects';
import { cn } from '@/utils/cn';

/**
 * Numbered markers floating over the 3D objects. The scene's MarkerProjector moves
 * them each frame via the registered elements. Pointer affordance only: hidden from
 * assistive tech and the tab order, since the object dock is the accessible version.
 */
export function MarkerLayer({ elementsRef, hoveredId, onHover, onHoverEnd, onSelect }) {
  const register = (id) => (element) => {
    if (element) elementsRef.current.set(id, element);
    else elementsRef.current.delete(id);
  };

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {workspaceObjects.map(({ id, code, title }) => {
        const isHovered = id === hoveredId;
        return (
          // Starts invisible; the projector sets transform + opacity on the first frame.
          <div key={id} ref={register(id)} className="absolute top-0 left-0" style={{ opacity: 0 }}>
            <button
              type="button"
              tabIndex={-1}
              onClick={() => onSelect(id)}
              onPointerEnter={() => onHover(id)}
              onPointerLeave={() => onHoverEnd(id)}
              className="pointer-events-auto flex -translate-x-3.5 -translate-y-1/2 cursor-pointer items-center gap-2 select-none"
            >
              <span
                className={cn(
                  'grid size-7 place-items-center rounded-full border font-mono text-[0.625rem] backdrop-blur-sm transition-colors',
                  isHovered
                    ? 'border-accent bg-accent text-accent-ink'
                    : 'border-line-strong bg-canvas/70 text-fg-muted',
                )}
              >
                {code}
              </span>
              <span
                className={cn(
                  'rounded-md border border-line-strong bg-canvas/80 px-2 py-1 font-mono text-[0.625rem] tracking-[0.14em] whitespace-nowrap text-fg uppercase transition-opacity',
                  isHovered ? 'opacity-100' : 'opacity-0',
                )}
              >
                {title}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
