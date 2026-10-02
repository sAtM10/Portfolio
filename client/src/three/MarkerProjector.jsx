import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3 } from 'three';

import { OBJECT_LAYOUT } from './layout';

/** Imperative DOM write, kept outside the component: it runs every frame, not on render. */
function placeMarker(element, x, y, visible) {
  element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  element.style.opacity = visible ? '1' : '0';
}

/**
 * Positions the DOM marker buttons (rendered by MarkerLayer, outside the canvas) over
 * their objects by projecting each anchor to screen space on every rendered frame.
 * Writing transforms directly avoids React re-renders and per-marker React roots.
 */
export function MarkerProjector({ elementsRef }) {
  const point = useRef(new Vector3());

  useFrame(({ camera, size }) => {
    for (const [id, element] of elementsRef.current) {
      const projected = point.current.set(...OBJECT_LAYOUT[id].marker).project(camera);
      placeMarker(
        element,
        (projected.x * 0.5 + 0.5) * size.width,
        (-projected.y * 0.5 + 0.5) * size.height,
        projected.z < 1 && Math.abs(projected.x) < 1.1 && Math.abs(projected.y) < 1.1,
      );
    }
  });

  return null;
}
