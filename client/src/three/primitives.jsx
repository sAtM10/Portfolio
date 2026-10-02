import { useMemo } from 'react';
import { Quaternion, Vector3 } from 'three';

import { palette } from './palette';

/** Solid box with a standard (lit) material. */
export function Box({ size, color, roughness = 0.6, metalness = 0.1, ...props }) {
  return (
    <mesh {...props}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

/** Unlit, untone-mapped plane for screen UI, LEDs and other self-lit details (faces +z). */
export function Glow({ size, color, opacity = 1, ...props }) {
  return (
    <mesh {...props}>
      <planeGeometry args={size} />
      <meshBasicMaterial
        color={color}
        toneMapped={false}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  );
}

/** Dark, faintly emissive display surface (faces +z). */
export function Screen({ size, glow = palette.screenGlow, ...props }) {
  return (
    <mesh {...props}>
      <planeGeometry args={size} />
      <meshStandardMaterial
        color={palette.screen}
        emissive={glow}
        emissiveIntensity={1.2}
        roughness={0.85}
      />
    </mesh>
  );
}

/** Horizontal "text" lines on a screen, left-aligned at `x`, top line at `y`. */
export function TextLines({ x, y, widths, gap = 0.02, height = 0.006, color, opacity = 0.7 }) {
  return widths.map((width, index) => (
    <Glow
      key={`${index}-${width}`}
      size={[width, height]}
      position={[x + width / 2, y - index * gap, 0.001]}
      color={color}
      opacity={opacity}
    />
  ));
}

const UP = new Vector3(0, 1, 0);

/** Cylinder spanning two points, e.g. lamp arms. */
export function Rod({ from, to, radius = 0.008, color = palette.metal }) {
  const { position, quaternion, length } = useMemo(() => {
    const start = new Vector3(...from);
    const end = new Vector3(...to);
    const direction = end.clone().sub(start);
    return {
      position: start.clone().add(end).multiplyScalar(0.5),
      quaternion: new Quaternion().setFromUnitVectors(UP, direction.clone().normalize()),
      length: direction.length(),
    };
  }, [from, to]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[radius, radius, length, 10]} />
      <meshStandardMaterial color={color} roughness={0.35} metalness={0.7} />
    </mesh>
  );
}
