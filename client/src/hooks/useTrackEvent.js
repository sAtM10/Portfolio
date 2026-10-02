import { useEffect, useRef } from 'react';

import { trackEvent } from '@/services/analytics';

/**
 * Sends `eventType` once per mount. The ref survives StrictMode's dev-only
 * double effect run, so development doesn't double-count. Pass a stable `metadata`.
 */
export function useTrackEvent(eventType, metadata) {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    trackEvent(eventType, metadata);
  }, [eventType, metadata]);
}
