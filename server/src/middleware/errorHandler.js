import { env } from '../config/env.js';

// Friendlier messages for body-parser failures (malformed JSON, oversized bodies).
const BODY_PARSER_MESSAGES = {
  'entity.parse.failed': 'Request body is not valid JSON.',
  'entity.too.large': 'Request body is too large.',
  'encoding.unsupported': 'Unsupported request encoding.',
};

// Express identifies error middleware by its 4-argument signature, so `_next`
// must stay even though it is unused.
export function errorHandler(err, _req, res, _next) {
  const status = err.status ?? err.statusCode ?? 500;
  // HttpError and http-errors (used by body-parser) flag client-safe messages with `expose`.
  const isExposed = err.expose === true;

  if (!isExposed) {
    console.error(err);
  }

  res.status(status).json({
    error: {
      message: isExposed
        ? (BODY_PARSER_MESSAGES[err.type] ?? err.message)
        : 'Internal server error',
      ...(isExposed && err.details && { details: err.details }),
      ...(!env.isProduction && !isExposed && { detail: err.message }),
    },
  });
}
