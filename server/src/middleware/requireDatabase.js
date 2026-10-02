import { isDatabaseConnected } from '../config/db.js';
import { HttpError } from '../utils/HttpError.js';

/** Fails fast with 503 instead of letting queries hang while MongoDB is unreachable. */
export function requireDatabase(_req, _res, next) {
  if (!isDatabaseConnected()) {
    throw new HttpError(503, 'Service temporarily unavailable. Please try again shortly.');
  }
  next();
}
