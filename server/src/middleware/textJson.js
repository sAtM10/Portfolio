import express from 'express';

import { HttpError } from '../utils/HttpError.js';

const parseText = express.text({ type: 'text/plain', limit: '2kb' });

/**
 * Analytics beacons (navigator.sendBeacon) send JSON as text/plain so the browser
 * needs no CORS preflight. Parse those bodies as JSON; application/json bodies are
 * already handled by the app-level express.json().
 */
export function acceptTextJson(req, res, next) {
  parseText(req, res, (error) => {
    if (error) return next(error);
    if (typeof req.body === 'string') {
      try {
        req.body = JSON.parse(req.body);
      } catch {
        return next(new HttpError(400, 'Request body is not valid JSON.'));
      }
    }
    next();
  });
}
