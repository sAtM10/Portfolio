import { palette } from '../palette';
import { Box, Glow } from '../primitives';

const DRAWER_HEIGHTS = [0.11, 0.31, 0.51];

/** Under-desk drawer unit — opens Projects. */
export function FileCabinet() {
  return (
    <group>
      <Box
        size={[0.45, 0.62, 0.55]}
        position={[0, 0.31, 0]}
        color="#1f232a"
        metalness={0.4}
        roughness={0.5}
      />
      {DRAWER_HEIGHTS.map((y) => (
        <group key={y} position={[0, y, 0.276]}>
          <Box size={[0.41, 0.17, 0.012]} color="#262b33" metalness={0.4} roughness={0.45} />
          <Box
            size={[0.12, 0.014, 0.018]}
            position={[0, 0.03, 0.012]}
            color={palette.metal}
            metalness={0.8}
            roughness={0.25}
          />
          <Glow
            size={[0.07, 0.025]}
            position={[0, -0.03, 0.0065]}
            color={palette.fgSubtle}
            opacity={0.35}
          />
        </group>
      ))}
    </group>
  );
}
