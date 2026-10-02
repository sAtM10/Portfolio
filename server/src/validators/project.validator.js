import * as z from 'zod';

import { PROJECT_CATEGORIES } from '../config/constants.js';

// Unknown query parameters are ignored; known ones must be valid.
export const projectListQuery = z.object({
  category: z
    .enum(PROJECT_CATEGORIES, { error: `Must be one of: ${PROJECT_CATEGORIES.join(', ')}.` })
    .optional(),
  featured: z
    .enum(['true', 'false'], { error: 'Must be "true" or "false".' })
    .transform((value) => value === 'true')
    .optional(),
});
