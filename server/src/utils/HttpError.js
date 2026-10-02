/**
 * Error with an HTTP status. When `expose` is true the message (and optional field
 * `details`) is returned to the client; otherwise it is logged and replaced with a
 * generic message. 503 is exposed because its message is written for visitors.
 */
export class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.details = details;
    this.expose = status < 500 || status === 503;
  }
}

export const notFound = (resource) => new HttpError(404, `${resource} not found`);
