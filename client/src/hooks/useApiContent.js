import { useEffect, useState } from 'react';

// Session-wide cache: revisiting a page reuses the first successful response, and
// concurrent mounts share one in-flight request.
const cache = new Map();
const inflight = new Map();

function load(key, loader) {
  if (!inflight.has(key)) {
    const promise = loader()
      .then((data) => {
        cache.set(key, data);
        return data;
      })
      .finally(() => inflight.delete(key));
    inflight.set(key, promise);
  }
  return inflight.get(key);
}

/**
 * Stale-while-revalidate against a bundled snapshot: renders `fallback` (content
 * shipped with the app) immediately, then swaps in the API response when it arrives.
 * A slow, sleeping or unreachable API therefore never leaves visitors without content.
 *
 * `loader` and `fallback` must be stable (module-level) values.
 * Returns `{ data, source: 'api' | 'fallback', status: 'loading' | 'ready' | 'error' }`.
 */
export function useApiContent(key, loader, fallback) {
  const [state, setState] = useState(() =>
    cache.has(key)
      ? { data: cache.get(key), source: 'api', status: 'ready' }
      : { data: fallback, source: 'fallback', status: 'loading' },
  );

  useEffect(() => {
    if (cache.has(key)) return undefined;
    let active = true;

    load(key, loader)
      .then((data) => {
        if (active) setState({ data, source: 'api', status: 'ready' });
      })
      .catch((error) => {
        if (!active) return;
        if (import.meta.env.DEV) {
          console.warn(`[content] "${key}" API unavailable — showing bundled copy.`, error.message);
        }
        setState((current) => ({ ...current, status: 'error' }));
      });

    return () => {
      active = false;
    };
  }, [key, loader]);

  return state;
}
