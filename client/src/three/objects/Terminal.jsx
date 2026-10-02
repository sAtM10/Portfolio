import { palette } from '../palette';
import { Box, Glow, Screen, TextLines } from '../primitives';

/** Portrait secondary display with a shell — opens the developer journey. */
export function Terminal() {
  return (
    <group>
      <Box
        size={[0.2, 0.015, 0.14]}
        position={[0, 0.0075, 0]}
        color={palette.metal}
        metalness={0.6}
        roughness={0.35}
      />
      <Box
        size={[0.03, 0.15, 0.03]}
        position={[0, 0.09, -0.03]}
        color={palette.metal}
        metalness={0.6}
        roughness={0.35}
      />
      <Box size={[0.36, 0.52, 0.025]} position={[0, 0.41, 0]} color={palette.metalDark} />
      <group position={[0, 0.41, 0.0131]}>
        <Screen size={[0.33, 0.49]} />
        <Glow size={[0.012, 0.012]} position={[-0.142, 0.2, 0.001]} color={palette.accent} />
        <TextLines
          x={-0.125}
          y={0.2}
          widths={[0.12, 0.2, 0.16, 0.09, 0.22, 0.14, 0.18, 0.07, 0.15]}
          gap={0.035}
          color={palette.ambient}
          opacity={0.55}
        />
        <Glow size={[0.014, 0.022]} position={[-0.133, -0.12, 0.001]} color={palette.accent} />
      </group>
    </group>
  );
}
