import { Router } from 'express';

import * as contactController from '../controllers/contact.controller.js';
import { contactLimiter } from '../middleware/rateLimit.js';
import { validate } from '../middleware/validate.js';
import { contactBody } from '../validators/contact.validator.js';

const router = Router();

// Rate limit runs first so invalid submissions also count towards the limit.
router.post(
  '/',
  contactLimiter,
  validate({ body: contactBody }),
  contactController.createContactMessage,
);

export default router;
