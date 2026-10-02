import * as z from 'zod';

import { OBJECT_ID_PATTERN, SLUG_PATTERN } from '../config/constants.js';

/** `:id` route param: a kebab-case slug (preferred) or a 24-hex MongoDB ObjectId. */
export const idOrSlugParams = z.object({
  id: z
    .string()
    .max(100)
    .refine((value) => SLUG_PATTERN.test(value) || OBJECT_ID_PATTERN.test(value), {
      error: 'Must be a slug (e.g. "workshop-partner-portal") or a 24-character ID.',
    }),
});
