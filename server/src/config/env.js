// Single source of truth for runtime configuration. Values come from the
// environment (loaded from .env by `node --env-file-if-exists`), never from code.

const parseList = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const nodeEnv = process.env.NODE_ENV ?? 'development';

export const env = Object.freeze({
  nodeEnv,
  isProduction: nodeEnv === 'production',
  port: Number.parseInt(process.env.PORT ?? '', 10) || 5000,
  // Comma-separated so dev + preview + production origins can coexist.
  clientUrls: parseList(process.env.CLIENT_URL ?? 'http://localhost:5173'),
  mongodbUri: process.env.MONGODB_URI ?? '',
});
