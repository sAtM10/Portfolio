import { DoubleSide } from 'three';

import { DESK_TOP_Y, LAMP_HEAD } from '../layout';
import { palette } from '../palette';
import { Box, Glow, Rod } from '../primitives';

const LEG_POSITIONS = [
  [-1.15, -0.8],
  [-1.15, 0],
  [1.35, -0.8],
  [1.35, 0],
];

const LAMP_BASE = [0.98, DESK_TOP_Y, -0.76];
const LAMP_ELBOW = [0.95, DESK_TOP_Y + 0.55, -0.8];

/** Static furniture: desk, keyboard, mouse, mug and the desk lamp (the key light). */
export function Desk() {
  return (
    <group>
      <Box
        size={[2.6, 0.05, 0.9]}
        position={[0.1, DESK_TOP_Y - 0.025, -0.4]}
        color={palette.desk}
        roughness={0.55}
      />
      {LEG_POSITIONS.map(([x, z]) => (
        <Box
          key={`${x}${z}`}
          size={[0.05, DESK_TOP_Y - 0.05, 0.05]}
          position={[x, (DESK_TOP_Y - 0.05) / 2, z]}
          color={palette.metal}
          metalness={0.7}
          roughness={0.35}
        />
      ))}

      {/* Keyboard + mouse */}
      <Box
        size={[0.44, 0.018, 0.14]}
        position={[0, DESK_TOP_Y + 0.009, -0.12]}
        color={palette.plastic}
      />
      <Box size={[0.4, 0.002, 0.1]} position={[0, DESK_TOP_Y + 0.019, -0.12]} color="#2a2f37" />
      <Box
        size={[0.06, 0.022, 0.1]}
        position={[0.33, DESK_TOP_Y + 0.011, -0.1]}
        color={palette.plastic}
        roughness={0.4}
      />

      {/* Mug */}
      <mesh position={[-0.42, DESK_TOP_Y + 0.045, -0.2]}>
        <cylinderGeometry args={[0.038, 0.034, 0.09, 24]} />
        <meshStandardMaterial color="#c9ccd1" roughness={0.45} />
      </mesh>

      {/* Desk lamp */}
      <mesh position={[LAMP_BASE[0], LAMP_BASE[1] + 0.01, LAMP_BASE[2]]}>
        <cylinderGeometry args={[0.07, 0.075, 0.02, 24]} />
        <meshStandardMaterial color={palette.metalDark} metalness={0.6} roughness={0.4} />
      </mesh>
      <Rod from={LAMP_BASE} to={LAMP_ELBOW} />
      <Rod from={LAMP_ELBOW} to={[LAMP_HEAD[0], LAMP_HEAD[1] + 0.05, LAMP_HEAD[2]]} />
      <mesh position={LAMP_HEAD} rotation={[0.3, 0, 0.35]}>
        <coneGeometry args={[0.07, 0.11, 24, 1, true]} />
        <meshStandardMaterial
          color={palette.metalDark}
          metalness={0.6}
          roughness={0.4}
          side={DoubleSide}
        />
      </mesh>
      <mesh position={[LAMP_HEAD[0], LAMP_HEAD[1] - 0.035, LAMP_HEAD[2] + 0.02]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color={palette.lampLight} toneMapped={false} />
      </mesh>

      {/* Faint warm pool of light on the desk under the lamp */}
      <Glow
        size={[0.5, 0.5]}
        rotation-x={-Math.PI / 2}
        position={[LAMP_HEAD[0] + 0.05, DESK_TOP_Y + 0.001, LAMP_HEAD[2] + 0.12]}
        color={palette.lampLight}
        opacity={0.04}
      />
    </group>
  );
}
