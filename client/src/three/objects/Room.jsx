import { Box } from '../primitives';
import { palette } from '../palette';

export function Room() {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 1]}>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color={palette.floor} roughness={0.92} />
      </mesh>
      <mesh position={[0, 2.5, -0.95]}>
        <planeGeometry args={[14, 5]} />
        <meshStandardMaterial color={palette.wall} roughness={0.95} />
      </mesh>
      <Box size={[14, 0.08, 0.02]} position={[0, 0.04, -0.94]} color={palette.metalDark} />
    </group>
  );
}
