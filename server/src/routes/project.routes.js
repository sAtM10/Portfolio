import { Router } from 'express';

import * as projectController from '../controllers/project.controller.js';
import { validate } from '../middleware/validate.js';
import { idOrSlugParams } from '../validators/common.js';
import { projectListQuery } from '../validators/project.validator.js';

const router = Router();

router.get('/', validate({ query: projectListQuery }), projectController.listProjects);
router.get('/:id', validate({ params: idOrSlugParams }), projectController.getProject);

export default router;
