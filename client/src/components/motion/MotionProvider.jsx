import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';

import { EASE_CINEMATIC } from './easing';

/**
 * Motion setup for the animated (lazily loaded) pages:
 * - LazyMotion + domAnimation ships only animations, exit and in-view features (no layout
 *   or drag), roughly half the size of the full `motion` component. `strict` makes any
 *   accidental `motion.*` usage throw, so components must use the light `m.*` elements.
 * - `reducedMotion="user"` honours the OS setting: transforms are skipped, fades remain.
 * Kept out of App so the landing page bundle never includes Motion.
 */
export function MotionProvider({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.45, ease: EASE_CINEMATIC }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
