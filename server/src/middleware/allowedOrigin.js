import { env } from '../config/env.js';
import { HttpError } from '../utils/HttpError.js';

/**
 * Browsers always send `Origin` on POST requests. Rejecting unknown origins stops other
 * websites from submitting through their visitors' browsers — important for text/plain
 * beacons, which skip the CORS preflight. Requests without an Origin header (curl,
 * server-to-server) pass through and are rate-limited like everything else.
 */
export function allowedOriginOnly(req, _res, next) {
  const { origin } = req.headers;
  if (origin && !env.clientUrls.includes(origin)) {
    throw new HttpError(403, 'Origin not allowed.');
  }
  next();
}
