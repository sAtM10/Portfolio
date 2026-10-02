import { Router } from 'express';

import * as eventController from '../controllers/event.controller.js';
import { allowedOriginOnly } from '../middleware/allowedOrigin.js';
import { eventLimiter } from '../middleware/rateLimit.js';
import { acceptTextJson } from '../middleware/textJson.js';
import { validate } from '../middleware/validate.js';
import { eventBody } from '../validators/event.validator.js';

const router = Router();

// Beacons are "no-cors" requests, so Helmet's default `Cross-Origin-Resource-Policy:
// same-origin` makes browsers block (and log) the response. Allow it for this
// write-only endpoint; the CORS allow-list and allowedOriginOnly still apply.
const allowCrossOriginResponse = (_req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
};

router.post(
  '/',
  allowCrossOriginResponse,
  eventLimiter,
  allowedOriginOnly,
  acceptTextJson,
  validate({ body: eventBody }),
  eventController.recordEvent,
);

export default router;
