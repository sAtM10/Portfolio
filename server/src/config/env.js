// Single source of truth for runtime configuration. Values come from the
// environment (loaded from .env by `node --env-file-if-exists`), never from code.

const parseList = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

// Express "trust proxy": number of reverse-proxy hops in front of the API. Needed in
// production so rate limiting sees the real client IP instead of the host's proxy.
function parseTrustProxy(value, isProduction) {
  if (value === undefined || value === '') return isProduction ? 1 : false;
  if (value === 'false') return false;
  const hops = Number.parseInt(value, 10);
  return Number.isNaN(hops) ? value : hops;
}

const nodeEnv = process.env.NODE_ENV ?? 'development';
const isProduction = nodeEnv === 'production';

export const env = Object.freeze({
  nodeEnv,
  isProduction,
  port: Number.parseInt(process.env.PORT ?? '', 10) || 5000,
  // Comma-separated so dev + preview + production origins can coexist.
  clientUrls: parseList(process.env.CLIENT_URL ?? 'http://localhost:5173'),
  mongodbUri: process.env.MONGODB_URI ?? '',
  // Optional: overrides the database named in MONGODB_URI (e.g. portfolio-prod).
  mongodbDbName: process.env.MONGODB_DB_NAME || undefined,
  trustProxy: parseTrustProxy(process.env.TRUST_PROXY, isProduction),
});
