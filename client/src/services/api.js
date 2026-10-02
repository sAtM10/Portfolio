// Empty VITE_API_URL means "same origin", e.g. when the API is served behind the same domain.
const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}/api${path}`, {
    ...options,
    headers: { Accept: 'application/json', ...options.headers },
  });

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }

  return response.json();
}

export const getHealth = (options) => request('/health', options);
