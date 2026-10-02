import * as z from 'zod';

import { EVENT_LIMITS, EVENT_TYPES } from '../config/constants.js';

const { metadataKeys, metadataKeyPattern, metadataStringMax, pathMax } = EVENT_LIMITS;

const metadataValue = z.union(
  [z.string().max(metadataStringMax), z.number().finite(), z.boolean(), z.null()],
  { error: `Metadata values must be short strings (≤ ${metadataStringMax}), numbers or booleans.` },
);

export const eventBody = z.object({
  eventType: z.enum(EVENT_TYPES, { error: `Must be one of: ${EVENT_TYPES.join(', ')}.` }),
  // Keys are plain identifiers, so `$`-operators and dotted paths can never be stored.
  metadata: z
    .record(z.string().regex(metadataKeyPattern), metadataValue, {
      // Zod reports bad keys as a generic "invalid_key" issue; replace it with a clear message.
      error: (issue) =>
        issue.code === 'invalid_key'
          ? 'Metadata keys must be simple identifiers (letters, digits, underscores).'
          : 'Metadata must be an object.',
    })
    .refine((value) => Object.keys(value).length <= metadataKeys, {
      error: `At most ${metadataKeys} metadata keys are allowed.`,
    })
    .optional()
    .default({}),
  path: z
    .string()
    .max(pathMax)
    .regex(/^\/[^?#\s]*$/, 'Path must be a pathname like "/portfolio", without query or hash.')
    .optional(),
});
