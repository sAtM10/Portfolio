import { Router } from 'express';

import * as experienceController from '../controllers/experience.controller.js';
import { validate } from '../middleware/validate.js';
import { idOrSlugParams } from '../validators/common.js';

const router = Router();

router.get('/', experienceController.listExperience);
router.get('/:id', validate({ params: idOrSlugParams }), experienceController.getExperience);

export default router;
