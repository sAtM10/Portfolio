import { Line } from '@react-three/drei';

import { palette } from '../palette';
import { Box, Glow, Screen, TextLines } from '../primitives';

const CHART = [
  [-0.22, -0.17],
  [-0.12, -0.11],
  [-0.02, -0.13],
  [0.08, -0.03],
  [0.18, -0.06],
  [0.28, 0.04],
  [0.38, 0.02],
].map(([x, y]) => [x, y, 0.002]);

/** Main display with a dashboard — opens experience. */
export function Monitor() {
  return (
    <group>
      <Box
        size={[0.28, 0.015, 0.18]}
        position={[0, 0.0075, 0]}
        color={palette.metal}
        metalness={0.6}
        roughness={0.35}
      />
      <Box
        size={[0.04, 0.22, 0.04]}
        position={[0, 0.11, -0.04]}
        color={palette.metal}
        metalness={0.6}
        roughness={0.35}
      />
      <Box size={[1.02, 0.6, 0.03]} position={[0, 0.5, 0]} color={palette.metalDark} />
      <group position={[0, 0.5, 0.0151]}>
        <Screen size={[0.98, 0.56]} />
        {/* Window chrome */}
        <Glow size={[0.98, 0.035]} position={[0, 0.2625, 0.001]} color="#12343a" opacity={0.9} />
        {[-0.46, -0.44, -0.42].map((x) => (
          <Glow
            key={x}
            size={[0.01, 0.01]}
            position={[x, 0.2625, 0.002]}
            color={palette.fgSubtle}
            opacity={0.7}
          />
        ))}
        {/* Sidebar + content */}
        <Glow size={[0.16, 0.46]} position={[-0.39, -0.03, 0.001]} color="#0f2629" opacity={0.9} />
        <TextLines
          x={-0.45}
          y={0.19}
          widths={[0.1, 0.08, 0.11, 0.07, 0.09]}
          gap={0.035}
          color={palette.ambient}
          opacity={0.5}
        />
        <TextLines
          x={-0.26}
          y={0.2}
          widths={[0.36, 0.24, 0.42, 0.3]}
          gap={0.032}
          color={palette.fg}
          opacity={0.35}
        />
        <Glow
          size={[0.62, 0.002]}
          position={[0.08, -0.2, 0.001]}
          color={palette.fgSubtle}
          opacity={0.4}
        />
        <Line points={CHART} color={palette.accent} lineWidth={2} />
      </group>
    </group>
  );
}
