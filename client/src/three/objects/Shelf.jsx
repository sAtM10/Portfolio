import { RoundedBox } from '@react-three/drei';

import { palette } from '../palette';
import { Box, Glow } from '../primitives';

const SHELF_Y = 1.75;
const SHELF_TOP = SHELF_Y + 0.015;

/** Wall shelf with a football, controller and headphones — opens Interests. */
export function Shelf() {
  return (
    <group>
      <Box
        size={[0.9, 0.03, 0.2]}
        position={[0, SHELF_Y, 0]}
        color={palette.desk}
        roughness={0.55}
      />
      <Box
        size={[0.02, 0.1, 0.12]}
        position={[-0.38, SHELF_Y - 0.06, -0.03]}
        color={palette.metal}
        metalness={0.6}
      />
      <Box
        size={[0.02, 0.1, 0.12]}
        position={[0.38, SHELF_Y - 0.06, -0.03]}
        color={palette.metal}
        metalness={0.6}
      />

      {/* Warm LED strip under the shelf, washing the wall */}
      <Glow
        size={[0.86, 0.008]}
        rotation-x={Math.PI / 2}
        position={[0, SHELF_Y - 0.016, 0.06]}
        color={palette.accent}
        opacity={0.7}
      />
      <pointLight
        position={[0, SHELF_Y - 0.05, 0.05]}
        intensity={0.25}
        distance={0.9}
        decay={2}
        color={palette.lampLight}
      />

      {/* Football */}
      <mesh position={[-0.3, SHELF_TOP + 0.085, 0]}>
        <icosahedronGeometry args={[0.085, 1]} />
        <meshStandardMaterial color="#d6dade" roughness={0.6} flatShading />
      </mesh>

      {/* Game controller */}
      <group position={[0.0, SHELF_TOP + 0.018, 0.02]} rotation-y={0.25}>
        <RoundedBox args={[0.16, 0.035, 0.1]} radius={0.015}>
          <meshStandardMaterial color={palette.plastic} roughness={0.5} />
        </RoundedBox>
        {[-0.06, 0.06].map((x) => (
          <mesh key={x} position={[x, -0.004, 0.035]}>
            <sphereGeometry args={[0.028, 16, 16]} />
            <meshStandardMaterial color={palette.plastic} roughness={0.5} />
          </mesh>
        ))}
        <Glow
          size={[0.012, 0.012]}
          rotation-x={-Math.PI / 2}
          position={[0.045, 0.0185, -0.01]}
          color={palette.accent}
        />
        <Glow
          size={[0.012, 0.012]}
          rotation-x={-Math.PI / 2}
          position={[0.03, 0.0185, 0.005]}
          color={palette.ambient}
        />
      </group>

      {/* Headphones */}
      <group position={[0.3, SHELF_TOP + 0.032, 0]}>
        <mesh>
          <torusGeometry args={[0.065, 0.01, 8, 32, Math.PI]} />
          <meshStandardMaterial color={palette.metal} metalness={0.5} roughness={0.4} />
        </mesh>
        {[-0.065, 0.065].map((x) => (
          <mesh key={x} position={[x, 0, 0]} rotation-z={Math.PI / 2}>
            <cylinderGeometry args={[0.032, 0.032, 0.025, 24]} />
            <meshStandardMaterial color={palette.plastic} roughness={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
