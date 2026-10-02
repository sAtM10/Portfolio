// Empty VITE_API_URL means "same origin", e.g. when the API is served behind the same domain.
const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');

// A sleeping or unreachable API must never leave a request hanging indefinitely.
const DEFAULT_TIMEOUT_MS = 10_000;

export const apiUrl = (path) => `${API_URL}/api${path}`;

/** Error carrying the API's client-safe message, HTTP status and optional field details. */
export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

async function request(path, { body, headers, timeoutMs = DEFAULT_TIMEOUT_MS, ...options } = {}) {
  const response = await fetch(apiUrl(path), {
    ...options,
    signal: options.signal ?? AbortSignal.timeout(timeoutMs),
    headers: {
      Accept: 'application/json',
      ...(body !== undefined && { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      payload?.error?.message ?? `Request failed with status ${response.status}`,
      response.status,
      payload?.error?.details,
    );
  }

  return payload;
}

async function requestList(path) {
  const payload = await request(path);
  if (!Array.isArray(payload?.data)) {
    throw new ApiError(`Unexpected response shape from ${path}`, 200);
  }
  return payload.data;
}

export const getProjects = () => requestList('/projects');

export const getExperience = () => requestList('/experience');

export const sendContactMessage = (message) =>
  request('/contact', { method: 'POST', body: message, timeoutMs: 15_000 });
