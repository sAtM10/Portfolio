import { Router } from 'express';

import { readLimiter } from '../middleware/rateLimit.js';
import { requireDatabase } from '../middleware/requireDatabase.js';

import contactRoutes from './contact.routes.js';
import eventRoutes from './event.routes.js';
import experienceRoutes from './experience.routes.js';
import healthRoutes from './health.routes.js';
import projectRoutes from './project.routes.js';

const router = Router();

// Health stays available even when the database is down (it reports the DB state).
router.use('/health', healthRoutes);

router.use(requireDatabase);
router.use('/projects', readLimiter, projectRoutes);
router.use('/experience', readLimiter, experienceRoutes);
router.use('/contact', contactRoutes);
router.use('/events', eventRoutes);

export default router;
