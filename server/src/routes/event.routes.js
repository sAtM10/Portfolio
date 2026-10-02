import { Router } from 'express';

import * as eventController from '../controllers/event.controller.js';
import { eventLimiter } from '../middleware/rateLimit.js';
import { validate } from '../middleware/validate.js';
import { eventBody } from '../validators/event.validator.js';

const router = Router();

router.post('/', eventLimiter, validate({ body: eventBody }), eventController.recordEvent);

export default router;
