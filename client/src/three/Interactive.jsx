import { useCursor } from '@react-three/drei';

import { OBJECT_LAYOUT } from './layout';

/**
 * Places a workspace object and makes it hoverable/clickable. Pointer handlers stop
 * propagation so overlapping objects never select twice; hover-end only clears the
 * hover if it still belongs to this object.
 */
export function Interactive({ id, hovered, selected, onHover, onHoverEnd, onSelect, children }) {
  const { position, rotationY = 0 } = OBJECT_LAYOUT[id];
  useCursor(hovered);

  return (
    <group
      position={position}
      rotation-y={rotationY}
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover(id);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        onHoverEnd(id);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(id);
      }}
    >
      {/* Slight lift as hover/selection feedback; transitions arrive in Phase 7. */}
      <group position-y={hovered || selected ? 0.012 : 0}>{children}</group>
    </group>
  );
}
