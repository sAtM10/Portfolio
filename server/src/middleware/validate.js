import { HttpError } from '../utils/HttpError.js';

/** Keeps the first message per field: `{ "email": "Please enter a valid email address." }`. */
function toFieldErrors(issues) {
  const details = {};
  for (const issue of issues) {
    const field = issue.path.join('.') || '_';
    details[field] ??= issue.message;
  }
  return details;
}

/**
 * Validates `req.body` / `req.params` / `req.query` against Zod schemas and stores
 * the parsed (trimmed, defaulted) values on `req.validated`. Express 5 makes
 * `req.query` read-only, so parsed values are never written back onto `req`.
 */
export const validate = (schemas) => (req, _res, next) => {
  req.validated ??= {};

  for (const [source, schema] of Object.entries(schemas)) {
    const result = schema.safeParse(req[source] ?? {});
    if (!result.success) {
      throw new HttpError(400, 'Validation failed', toFieldErrors(result.error.issues));
    }
    req.validated[source] = result.data;
  }

  next();
};
