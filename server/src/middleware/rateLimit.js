import { rateLimit } from 'express-rate-limit';

import { HttpError } from '../utils/HttpError.js';

const MINUTE = 60 * 1000;

// In-memory store: counters live only in process memory and IP addresses are never
// persisted. Rejections go through the central error handler for a consistent body.
const limiter = ({ windowMs, limit, message }) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (_req, _res, next) => next(new HttpError(429, message)),
  });

export const readLimiter = limiter({
  windowMs: 15 * MINUTE,
  limit: 300,
  message: 'Too many requests. Please try again in a few minutes.',
});

export const contactLimiter = limiter({
  windowMs: 15 * MINUTE,
  limit: 5,
  message: 'Too many messages sent. Please try again in a few minutes.',
});

export const eventLimiter = limiter({
  windowMs: MINUTE,
  limit: 60,
  message: 'Too many events. Please slow down.',
});
