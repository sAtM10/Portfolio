import { env } from '../config/env.js';

export function getHealth(_req, res) {
  res.status(200).json({
    status: 'ok',
    environment: env.nodeEnv,
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
}
