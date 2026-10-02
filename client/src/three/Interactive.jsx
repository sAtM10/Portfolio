import { useCursor } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { AdditiveBlending, CanvasTexture, SRGBColorSpace } from 'three';

import { OBJECT_LAYOUT } from './layout';
import { palette } from './palette';

const LIFT = 0.012; // metres
const GLOW = { hovered: 0.35, selected: 0.55 };
const RESPONSIVENESS = 10; // higher = snappier easing

// The halo plane must never steal pointer events from the objects around it.
const noRaycast = () => null;

let haloTexture;
/** Soft radial gradient, drawn once and shared by every halo. */
function getHaloTexture() {
  if (!haloTexture) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 128;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.45, 'rgba(255,255,255,0.35)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
    haloTexture = new CanvasTexture(canvas);
    haloTexture.colorSpace = SRGBColorSpace;
  }
  return haloTexture;
}

/**
 * Places a workspace object and makes it hoverable/clickable. Hover and selection ease
 * a small lift and a warm glow on the surface below. Pointer handlers stop propagation
 * so overlapping objects never select twice; hover-end only clears the hover if it still
 * belongs to this object.
 */
export function Interactive({
  id,
  hovered,
  selected,
  reducedMotion,
  onHover,
  onHoverEnd,
  onSelect,
  children,
}) {
  const { position, rotationY = 0, halo } = OBJECT_LAYOUT[id];
  const liftRef = useRef(null);
  const haloRef = useRef(null);
  const invalidate = useThree((state) => state.invalidate);
  useCursor(hovered);

  // The canvas renders on demand: request a frame whenever the target state changes.
  useEffect(() => {
    invalidate();
  }, [hovered, selected, invalidate]);

  useFrame((state, delta) => {
    const lift = liftRef.current;
    const material = haloRef.current.material;
    const goalLift = hovered || selected ? LIFT : 0;
    const goalGlow = selected ? GLOW.selected : hovered ? GLOW.hovered : 0;
    const ease = reducedMotion ? 1 : 1 - Math.exp(-RESPONSIVENESS * Math.min(delta, 0.1));

    lift.position.y += (goalLift - lift.position.y) * ease;
    material.opacity += (goalGlow - material.opacity) * ease;

    const moving =
      Math.abs(goalLift - lift.position.y) > 1e-4 || Math.abs(goalGlow - material.opacity) > 1e-3;
    if (moving) state.invalidate();
  });

  return (
    <group
      position={position}
      rotation-y={rotationY}
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover(id);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        onHoverEnd(id);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(id);
      }}
    >
      <mesh
        ref={haloRef}
        rotation-x={-Math.PI / 2}
        position-y={halo.y}
        scale={[halo.size[0], halo.size[1], 1]}
        raycast={noRaycast}
      >
        <planeGeometry />
        <meshBasicMaterial
          map={getHaloTexture()}
          color={palette.accent}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <group ref={liftRef}>{children}</group>
    </group>
  );
}
