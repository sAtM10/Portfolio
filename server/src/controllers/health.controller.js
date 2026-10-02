import { getDatabaseState } from '../config/db.js';
import { env } from '../config/env.js';

export function getHealth(_req, res) {
  res.set('Cache-Control', 'no-store').json({
    data: {
      status: 'ok',
      database: getDatabaseState(),
      environment: env.nodeEnv,
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    },
  });
}
