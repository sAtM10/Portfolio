import { env } from '../config/env.js';

// Express identifies error middleware by its 4-argument signature, so `_next`
// must stay even though it is unused.
export function errorHandler(err, _req, res, _next) {
  const status = err.status ?? err.statusCode ?? 500;
  // `expose` is set by http-errors (used by body-parser) for client-safe messages.
  const isClientError = status < 500 && err.expose !== false;

  if (!isClientError) {
    console.error(err);
  }

  res.status(status).json({
    error: {
      message: isClientError ? err.message : 'Internal server error',
      ...(!env.isProduction && !isClientError && { detail: err.message }),
    },
  });
}
