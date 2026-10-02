/** Shown while a lazily-loaded route chunk downloads on first visit. */
export default function RouteFallback() {
  return (
    <div
      role="status"
      // Delayed fade so fast loads never flash a loading state.
      className="grid min-h-dvh animate-fade-in place-items-center font-mono text-xs tracking-[0.18em] text-fg-subtle uppercase [animation-delay:300ms]"
    >
      Loading workspace…
    </div>
  );
}
