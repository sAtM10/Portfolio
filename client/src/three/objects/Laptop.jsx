import { palette } from '../palette';
import { Box, Screen, TextLines } from '../primitives';

/** Open laptop showing a profile card — opens About. */
export function Laptop() {
  return (
    <group>
      <Box
        size={[0.36, 0.018, 0.25]}
        position={[0, 0.009, 0]}
        color={palette.metal}
        metalness={0.6}
        roughness={0.35}
      />
      <Box size={[0.3, 0.002, 0.12]} position={[0, 0.0185, 0.02]} color="#15181d" />
      {/* Lid hinged at the back edge, tilted away from the viewer */}
      <group position={[0, 0.018, -0.125]} rotation-x={-0.28}>
        <Box
          size={[0.36, 0.24, 0.01]}
          position={[0, 0.12, -0.005]}
          color={palette.metal}
          metalness={0.6}
          roughness={0.35}
        />
        <group position={[0, 0.12, 0.0006]}>
          <Screen size={[0.33, 0.21]} />
          <mesh position={[-0.11, 0.035, 0.001]}>
            <circleGeometry args={[0.028, 32]} />
            <meshBasicMaterial color={palette.fgSubtle} toneMapped={false} />
          </mesh>
          <TextLines
            x={-0.065}
            y={0.05}
            widths={[0.14, 0.09]}
            gap={0.022}
            height={0.008}
            color={palette.fg}
            opacity={0.5}
          />
          <TextLines
            x={-0.14}
            y={-0.03}
            widths={[0.26, 0.22, 0.24]}
            gap={0.018}
            color={palette.ambient}
            opacity={0.45}
          />
        </group>
      </group>
    </group>
  );
}
