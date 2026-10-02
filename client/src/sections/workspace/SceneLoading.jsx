import { cn } from '@/utils/cn';

/** Overlay shown while the 3D chunk downloads and the first frame renders. */
export function SceneLoading({ hidden }) {
  return (
    <div
      aria-hidden={hidden}
      className={cn(
        'pointer-events-none fixed inset-0 z-10 grid place-items-center bg-canvas transition-opacity duration-700',
        hidden ? 'opacity-0' : 'opacity-100',
      )}
    >
      <div role="status" className="flex flex-col items-center gap-4">
        <span className="font-mono text-xs tracking-[0.2em] text-fg-subtle uppercase">
          Booting workspace…
        </span>
        <span className="relative h-px w-40 overflow-hidden bg-line">
          <span className="absolute inset-y-0 left-0 w-2/5 animate-scan bg-accent" />
        </span>
      </div>
    </div>
  );
}
