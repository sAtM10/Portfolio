import { createApp } from './app.js';
import { connectDatabase, disconnectDatabase } from './config/db.js';
import { env } from './config/env.js';

// Connect before accepting traffic so the API never serves requests without a database.
try {
  await connectDatabase(env.mongodbUri, env.mongodbDbName);
} catch (error) {
  console.error(`[db] ${error.message}`);
  process.exit(1);
}

const app = createApp();

// Express 5 passes listen errors (e.g. EADDRINUSE) to this callback.
const server = app.listen(env.port, (error) => {
  if (error) {
    console.error(`Failed to start server on port ${env.port}:`, error.message);
    process.exit(1);
  }
  console.log(`API listening on http://localhost:${env.port} [${env.nodeEnv}]`);
});

function shutdown(signal) {
  console.log(`${signal} received, closing server...`);
  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
