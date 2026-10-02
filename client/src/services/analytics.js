import { apiUrl } from './api';

const EVENTS_ENDPOINT = apiUrl('/events');
const PATH_MAX = 200;

/** Honour browser privacy signals: Global Privacy Control and Do Not Track. */
function isTrackingAllowed() {
  if (typeof navigator === 'undefined') return false;
  return !(navigator.globalPrivacyControl === true || navigator.doNotTrack === '1');
}

/**
 * Fire-and-forget anonymous event — no cookies, IDs or personal data. Sent as a
 * text/plain beacon, so it needs no CORS preflight and survives page navigation.
 * Failures are ignored by design: analytics must never affect the visitor.
 */
export function trackEvent(eventType, metadata) {
  if (!isTrackingAllowed()) return;

  const body = JSON.stringify({
    eventType,
    path: window.location.pathname.slice(0, PATH_MAX),
    ...(metadata && { metadata }),
  });

  try {
    if (navigator.sendBeacon?.(EVENTS_ENDPOINT, body)) return;
  } catch {
    // Some privacy extensions make sendBeacon throw; fall back to fetch below.
  }

  fetch(EVENTS_ENDPOINT, {
    method: 'POST',
    body,
    keepalive: true,
    headers: { 'Content-Type': 'text/plain' },
  }).catch(() => {});
}

let visitTracked = false;

/**
 * One `portfolio_visit` per browser-tab session. The sessionStorage flag only
 * de-duplicates reloads; it is not an identifier and never leaves the browser.
 */
export function trackVisit() {
  if (visitTracked) return;
  visitTracked = true;

  try {
    if (sessionStorage.getItem('visit-tracked')) return;
    sessionStorage.setItem('visit-tracked', '1');
  } catch {
    // Storage unavailable (private mode, blocked): still count the visit.
  }

  trackEvent('portfolio_visit');
}
