import { AnimatePresence, m } from 'motion/react';
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { workspaceObjectById } from '@/data/workspaceObjects';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTrackEvent } from '@/hooks/useTrackEvent';
import { MarkerLayer } from '@/sections/workspace/MarkerLayer';
import { ObjectDock } from '@/sections/workspace/ObjectDock';
import { SceneLoading } from '@/sections/workspace/SceneLoading';
import { WorkspaceGrid } from '@/sections/workspace/WorkspaceGrid';
import { WorkspaceHud } from '@/sections/workspace/WorkspaceHud';
import { WorkspacePanel } from '@/sections/workspace/WorkspacePanel';
import { trackEvent } from '@/services/analytics';
import { cn } from '@/utils/cn';
import { hasWebGL } from '@/utils/webgl';

// three.js + React Three Fiber live in their own chunk, fetched only when 3D is shown.
const WorkspaceScene = lazy(() => import('@/three/WorkspaceScene'));

const FADE = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

const COMPACT_SCREEN = '(max-width: 767px), (pointer: coarse) and (max-height: 500px)';

// Keep the side panel's width in one place for the dock/hint offsets.
const BESIDE_PANEL = 'md:right-[calc(min(32rem,100vw-2rem)+2rem)]';

const isFormField = (element) =>
  element instanceof HTMLElement && element.matches('input, textarea, select, [contenteditable]');

const focusTrigger = (id) =>
  requestAnimationFrame(() => document.querySelector(`[data-object-trigger="${id}"]`)?.focus());

function describe2DReason({ webglSupported, sceneFailed, isSmallScreen }) {
  if (!webglSupported)
    return "This browser can't render 3D graphics, so here's the 2D workspace — same content.";
  if (sceneFailed)
    return "The 3D scene couldn't start on this device, so here's the 2D workspace instead.";
  if (isSmallScreen)
    return 'On small screens the workspace opens in 2D — every object has the same content.';
  return 'You are viewing the 2D workspace. Switch back to 3D from the top bar at any time.';
}

export default function WorkspacePage() {
  useTrackEvent('workspace_enter');

  // `?object=<id>` makes every panel deep-linkable; `?view=2d` opts out of 3D.
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = workspaceObjectById[searchParams.get('object')] ?? null;
  const wants2D = searchParams.get('view') === '2d';

  // Phones in portrait (narrow) or landscape (short + touch) get the 2D workspace.
  const isSmallScreen = useMediaQuery(COMPACT_SCREEN);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [webglSupported] = useState(hasWebGL);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  // DOM marker elements, registered by MarkerLayer and positioned by the 3D scene.
  const markerElementsRef = useRef(new Map());

  const canUse3D = webglSupported && !isSmallScreen && !sceneFailed;
  const is3D = canUse3D && !wants2D;

  // Panel state lives in the URL but never adds history entries, so Back leaves the page.
  const updateParams = useCallback(
    (mutate) =>
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          mutate(next);
          return next;
        },
        { replace: true, preventScrollReset: true },
      ),
    [setSearchParams],
  );

  const selectObject = useCallback(
    (id) => {
      if (id === 'cabinet') trackEvent('project_open', { source: 'workspace' });
      updateParams((params) => params.set('object', id));
    },
    [updateParams],
  );

  const closePanel = useCallback(() => {
    if (!selected) return;
    updateParams((params) => params.delete('object'));
    focusTrigger(selected.id);
  }, [selected, updateParams]);

  const toggleView = () =>
    updateParams((params) => (is3D ? params.set('view', '2d') : params.delete('view')));

  const handleHoverEnd = useCallback(
    (id) => setHoveredId((current) => (current === id ? null : current)),
    [],
  );

  // Escape closes the panel — except while typing, so a form draft is never lost.
  useEffect(() => {
    if (!selected) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !isFormField(event.target)) closePanel();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selected, closePanel]);

  return (
    <MotionProvider>
      <main id="main" tabIndex={-1} className="fixed inset-0 overflow-hidden outline-none">
        <title>Workspace — Satwik Mukherjee</title>
        <h1 className="sr-only">Satwik Mukherjee — digital workspace</h1>

        {/* First in source order so keyboard and screen-reader users meet it first. */}
        <WorkspaceHud
          is3D={is3D}
          canToggleView={canUse3D}
          onToggleView={toggleView}
          panelOpen={Boolean(selected)}
        />

        {is3D ? (
          <>
            <p className="sr-only">
              An interactive 3D desk. The 3D scene is visual only: use the workspace objects list to
              open each section.
            </p>
            <ErrorBoundary onError={() => setSceneFailed(true)}>
              <Suspense fallback={null}>
                <WorkspaceScene
                  selectedId={selected?.id ?? null}
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                  onHoverEnd={handleHoverEnd}
                  onSelect={selectObject}
                  onDeselect={closePanel}
                  reducedMotion={reducedMotion}
                  markerElementsRef={markerElementsRef}
                  onReady={() => setSceneReady(true)}
                />
              </Suspense>
            </ErrorBoundary>
            <AnimatePresence>
              {!selected && (
                <m.div key="markers" {...FADE}>
                  <MarkerLayer
                    elementsRef={markerElementsRef}
                    hoveredId={hoveredId}
                    onHover={setHoveredId}
                    onHoverEnd={handleHoverEnd}
                    onSelect={selectObject}
                  />
                </m.div>
              )}
            </AnimatePresence>
            <SceneLoading hidden={sceneReady} />

            <AnimatePresence>
              {!selected && sceneReady && (
                <m.p
                  key="hint"
                  aria-hidden="true"
                  {...FADE}
                  className="pointer-events-none fixed inset-x-4 bottom-28 z-20 text-center font-mono text-[0.6875rem] tracking-[0.16em] text-fg-subtle uppercase"
                >
                  Click an object on the desk — or pick one below
                </m.p>
              )}
            </AnimatePresence>
            <ObjectDock
              selectedId={selected?.id}
              hoveredId={hoveredId}
              onSelect={selectObject}
              onHover={setHoveredId}
              onHoverEnd={handleHoverEnd}
              className={cn(
                'fixed inset-x-4 bottom-4 z-20 flex justify-center transition-[right] duration-500 ease-(--ease-cinematic)',
                selected && BESIDE_PANEL,
              )}
            />
          </>
        ) : (
          <WorkspaceGrid
            reason={describe2DReason({ webglSupported, sceneFailed, isSmallScreen })}
            selectedId={selected?.id}
            onSelect={selectObject}
          />
        )}

        {/* AnimatePresence keeps the panel mounted while it slides out after closing. */}
        <AnimatePresence>
          {selected && (
            <WorkspacePanel
              key="panel"
              object={selected}
              isSheet={isSmallScreen}
              onClose={closePanel}
              onNavigate={selectObject}
            />
          )}
        </AnimatePresence>
      </main>
    </MotionProvider>
  );
}
