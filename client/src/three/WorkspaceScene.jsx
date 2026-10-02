import { ContactShadows } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

import { CameraRig } from './CameraRig';
import { Interactive } from './Interactive';
import { DESK_TOP_Y, INTRO_POSITION, OVERVIEW } from './layout';
import { Lighting } from './Lighting';
import { MarkerProjector } from './MarkerProjector';
import { Desk } from './objects/Desk';
import { FileCabinet } from './objects/FileCabinet';
import { Laptop } from './objects/Laptop';
import { Monitor } from './objects/Monitor';
import { Phone } from './objects/Phone';
import { Room } from './objects/Room';
import { ServerRack } from './objects/ServerRack';
import { Shelf } from './objects/Shelf';
import { Terminal } from './objects/Terminal';
import { palette } from './palette';

const OBJECTS = {
  rack: ServerRack,
  terminal: Terminal,
  monitor: Monitor,
  laptop: Laptop,
  phone: Phone,
  cabinet: FileCabinet,
  shelf: Shelf,
};

/** Pointer moves only need a frame (for parallax) when the overview is showing. */
function ParallaxInvalidator({ enabled }) {
  const { gl, invalidate } = useThree();
  useEffect(() => {
    if (!enabled) return undefined;
    const element = gl.domElement;
    const onMove = () => invalidate();
    element.addEventListener('pointermove', onMove);
    return () => element.removeEventListener('pointermove', onMove);
  }, [enabled, gl, invalidate]);
  return null;
}

/** Reports once the first frame has been drawn, so the loading overlay can fade. */
function FirstFrameSignal({ onReady }) {
  const reported = useRef(false);
  useFrame(() => {
    if (reported.current) return;
    reported.current = true;
    requestAnimationFrame(() => onReady?.());
  });
  return null;
}

/**
 * The interactive 3D desk. Renders on demand (no continuous loop): frames are only
 * drawn while the camera moves or something changes, which keeps idle GPU use near zero.
 */
export default function WorkspaceScene({
  selectedId,
  hoveredId,
  onHover,
  onHoverEnd,
  onSelect,
  onDeselect,
  reducedMotion,
  markerElementsRef,
  onReady,
}) {
  return (
    <Canvas
      aria-hidden="true"
      frameloop="demand"
      // Capped below typical retina ratios: integrated GPUs stay smooth, edges stay crisp.
      dpr={[1, 1.5]}
      camera={{
        fov: 38,
        near: 0.1,
        far: 30,
        position: reducedMotion ? OVERVIEW.position : INTRO_POSITION,
      }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onPointerMissed={() => {
        if (selectedId) onDeselect();
      }}
    >
      <color attach="background" args={[palette.canvas]} />
      <fog attach="fog" args={[palette.canvas, 5.5, 12]} />

      <Lighting />
      <Room />
      <Desk />

      {Object.entries(OBJECTS).map(([id, Model]) => (
        <Interactive
          key={id}
          id={id}
          hovered={hoveredId === id}
          selected={selectedId === id}
          onHover={onHover}
          onHoverEnd={onHoverEnd}
          onSelect={onSelect}
        >
          <Model />
        </Interactive>
      ))}

      {/* Shadows are rendered once (frames={1}); the scene is static. */}
      <ContactShadows
        position={[0.1, 0.002, -0.3]}
        scale={7}
        blur={2.4}
        far={1.8}
        opacity={0.6}
        frames={1}
        resolution={512}
      />
      <ContactShadows
        position={[0.1, DESK_TOP_Y + 0.001, -0.4]}
        scale={[2.6, 0.9]}
        blur={1.6}
        far={0.6}
        opacity={0.5}
        frames={1}
        resolution={512}
      />

      <MarkerProjector elementsRef={markerElementsRef} />
      <CameraRig selectedId={selectedId} reducedMotion={reducedMotion} />
      <ParallaxInvalidator enabled={!reducedMotion && !selectedId} />
      <FirstFrameSignal onReady={onReady} />
    </Canvas>
  );
}
