// Empty VITE_API_URL means "same origin", e.g. when the API is served behind the same domain.
const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');

/** Error carrying the API's client-safe message, HTTP status and optional field details. */
export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

async function request(path, { body, headers, ...options } = {}) {
  const response = await fetch(`${API_URL}/api${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined && { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      data?.error?.message ?? `Request failed with status ${response.status}`,
      response.status,
      data?.error?.details,
    );
  }

  return data;
}

export const getHealth = (options) => request('/health', options);

export const sendContactMessage = (message, options) =>
  request('/contact', { ...options, method: 'POST', body: message });
