import { palette } from '../palette';
import { Box, Glow, Screen, TextLines } from '../primitives';

/** Phone on a stand with a notification — opens Contact. */
export function Phone() {
  return (
    <group>
      <Box
        size={[0.08, 0.01, 0.07]}
        position={[0, 0.005, 0]}
        color={palette.metal}
        metalness={0.6}
        roughness={0.35}
      />
      <group position={[0, 0.012, 0.012]} rotation-x={-0.3}>
        <Box
          size={[0.075, 0.15, 0.008]}
          position={[0, 0.075, 0]}
          color="#0f1115"
          metalness={0.3}
          roughness={0.3}
        />
        <group position={[0, 0.075, 0.0042]}>
          <Screen size={[0.066, 0.135]} glow="#0d2a2e" />
          <Glow
            size={[0.052, 0.018]}
            position={[0, 0.04, 0.001]}
            color={palette.accent}
            opacity={0.9}
          />
          <TextLines
            x={-0.026}
            y={0.0}
            widths={[0.05, 0.034, 0.044]}
            gap={0.012}
            height={0.004}
            color={palette.fg}
            opacity={0.4}
          />
        </group>
      </group>
    </group>
  );
}
