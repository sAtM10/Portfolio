import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';

import { OBJECT_LAYOUT, OVERVIEW } from './layout';

const DAMPING = 3.5; // higher = snappier
const PANEL_BREAKPOINT = 768; // px; below this the panel is a bottom sheet
const PANEL_MAX_WIDTH = 512; // px; matches md:w-[min(32rem,…)] in WorkspacePanel

/**
 * Eases the camera between the overview and each object's focus pose, adds a subtle
 * pointer parallax in the overview, and shifts the projection left while the side
 * panel is open so the focused object stays centred in the visible area.
 *
 * The canvas renders on demand, so the rig requests frames only while moving.
 * Scratch vectors live in refs: they are mutated every frame, outside React's render.
 */
export function CameraRig({ selectedId, reducedMotion }) {
  const { camera, size, invalidate } = useThree();
  const lookAt = useRef(new Vector3(...OVERVIEW.target));
  const goalPosition = useRef(new Vector3());
  const goalTarget = useRef(new Vector3());
  const viewOffset = useRef(0);
  const wasAnimating = useRef(false);

  useEffect(() => {
    invalidate();
  }, [selectedId, size.width, size.height, invalidate]);

  useFrame((state, rawDelta) => {
    // First frame after the on-demand loop sat idle: rawDelta spans the idle time, so take
    // a small step instead of jumping. Mid-animation, use real time (capped) so motion
    // keeps pace even on slow devices.
    const delta = wasAnimating.current ? Math.min(rawDelta, 0.1) : 1 / 60;
    const position = goalPosition.current;
    const target = goalTarget.current;

    if (selectedId) {
      const { focus } = OBJECT_LAYOUT[selectedId];
      position.set(...focus.position);
      target.set(...focus.target);
    } else {
      // Pull back on narrow viewports so the whole desk stays in frame.
      const aspect = size.width / size.height;
      const pullBack = Math.max(1, OVERVIEW.referenceAspect / aspect) ** 0.85;
      target.set(...OVERVIEW.target);
      position
        .set(...OVERVIEW.position)
        .sub(target)
        .multiplyScalar(pullBack)
        .add(target);
      if (!reducedMotion) {
        position.x += state.pointer.x * 0.18;
        position.y += state.pointer.y * 0.08;
      }
    }

    const alpha = reducedMotion ? 1 : 1 - Math.exp(-DAMPING * delta);
    camera.position.lerp(position, alpha);
    lookAt.current.lerp(target, alpha);
    camera.lookAt(lookAt.current);

    const panelVisible = Boolean(selectedId) && size.width >= PANEL_BREAKPOINT;
    const goalOffset = panelVisible ? Math.min(PANEL_MAX_WIDTH, size.width * 0.42) / 2 : 0;
    viewOffset.current += (goalOffset - viewOffset.current) * alpha;
    if (goalOffset === 0 && Math.abs(viewOffset.current) < 0.5) {
      viewOffset.current = 0;
      camera.clearViewOffset();
    } else {
      camera.setViewOffset(size.width, size.height, viewOffset.current, 0, size.width, size.height);
    }

    const settled =
      camera.position.distanceToSquared(position) < 1e-6 &&
      lookAt.current.distanceToSquared(target) < 1e-6 &&
      Math.abs(goalOffset - viewOffset.current) < 0.5;
    wasAnimating.current = !settled;
    if (!settled) state.invalidate();

    // Development-only hook for checking camera framing from the browser console.
    if (import.meta.env.DEV) {
      window.__workspaceCamera = { position: camera.position.toArray(), settled };
    }
  });

  return null;
}
