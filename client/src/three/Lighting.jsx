import { Environment, Lightformer } from '@react-three/drei';

import { LAMP_HEAD } from './layout';
import { palette } from './palette';

/**
 * Cinematic three-point setup matching the 2D design: a warm desk-lamp key light, a
 * cool monitor fill and a soft rim. The environment (for metal reflections) is built
 * from local light-formers and rendered once — no HDR download.
 */
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.55} color="#a9bccb" />
      {/* Cool key from front-left so the rack and cabinet read against the dark wall. */}
      <directionalLight position={[-4, 3.5, 3.5]} intensity={1.1} color="#c4d2de" />
      <pointLight
        position={LAMP_HEAD}
        intensity={2.6}
        distance={4}
        decay={2}
        color={palette.lampLight}
      />
      <pointLight
        position={[0, 1.25, -0.3]}
        intensity={0.9}
        distance={2.4}
        decay={2}
        color={palette.ambient}
      />
      <pointLight
        position={[1.6, 2.2, 1.2]}
        intensity={1.2}
        distance={6}
        decay={2}
        color="#8aa0b4"
      />

      <Environment frames={1} resolution={128}>
        <Lightformer
          form="rect"
          intensity={1.2}
          color="#ffd9a0"
          position={[-2, 2.5, 2]}
          scale={[3, 1.5, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.6}
          color={palette.ambient}
          position={[3, 1.5, 1]}
          scale={[1.5, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.25}
          color="#ffffff"
          position={[0, 4, -1]}
          scale={[6, 1, 1]}
        />
      </Environment>
    </>
  );
}
