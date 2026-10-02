import { palette } from '../palette';
import { Box, Glow } from '../primitives';

const UNIT_HEIGHTS = Array.from({ length: 9 }, (_, index) => 0.17 + index * 0.16);

/** Floor-standing rack — opens the tech stack. */
export function ServerRack() {
  return (
    <group>
      {/* Low metalness: with little to reflect, metallic surfaces would read as black. */}
      <Box
        size={[0.55, 1.6, 0.6]}
        position={[0, 0.8, 0]}
        color="#272b33"
        metalness={0.25}
        roughness={0.55}
      />
      <Box size={[0.5, 1.5, 0.01]} position={[0, 0.8, 0.301]} color="#1d2128" />
      {UNIT_HEIGHTS.map((y, index) => (
        <group key={y} position={[0, y, 0.31]}>
          <Box size={[0.46, 0.12, 0.016]} color="#2e333b" roughness={0.5} />
          <Glow
            size={[0.018, 0.018]}
            position={[-0.19, 0.02, 0.009]}
            color={index % 3 === 1 ? palette.ambient : palette.accent}
          />
          <Glow
            size={[0.018, 0.018]}
            position={[-0.16, 0.02, 0.009]}
            color={palette.ambient}
            opacity={index % 2 ? 0.9 : 0.25}
          />
          <Box size={[0.22, 0.008, 0.004]} position={[0.07, 0.02, 0.009]} color="#0c0e11" />
          <Box size={[0.22, 0.008, 0.004]} position={[0.07, -0.02, 0.009]} color="#0c0e11" />
        </group>
      ))}
    </group>
  );
}
